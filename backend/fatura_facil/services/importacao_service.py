"""Importação de fatura: prévia (lê e classifica, sem gravar) e importação.

A importação relê o arquivo e refaz a classificação, aplicando as decisões do
usuário por linha. Assim nada fica guardado entre a prévia e a confirmação.
"""

import hashlib
from dataclasses import dataclass
from datetime import date
from decimal import Decimal

from django.db import transaction

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Compra, Fonte, Lancamento, LoteImportacao, Origem
from fatura_facil.services.competencia_service import (
    competencia_da_compra_no_cartao,
    competencia_em_aberto,
    somar_meses,
)
from fatura_facil.services.compra_service import CompraService
from fatura_facil.services.fatura.classificacao import (
    Classificacao,
    LinhaClassificada,
    classificar,
    e_ignorada,
    total_considerado,
)
from fatura_facil.services.fatura.leitor import ler_fatura
from fatura_facil.services.fatura.leitura import FaturaLida, FormatoDeFaturaDesconhecidoError, LinhaDaFatura

__all__ = ["DECISAO_PADRAO", "DECISOES_PERMITIDAS", "Decisao", "ImportacaoService", "Previa", "ResultadoDaImportacao"]

TAMANHO_MAXIMO = 5 * 1024 * 1024


class Decisao:
    VINCULAR = "vincular"  # é o mesmo lançamento: confirma o que já existe
    INSERIR = "inserir"  # é outro: cria
    IGNORAR = "ignorar"


# Decisão de cada classificação quando o usuário não escolhe, e as que ele pode escolher.
DECISAO_PADRAO = {
    Classificacao.EXISTENTE: Decisao.VINCULAR,
    Classificacao.SUSPEITA: Decisao.VINCULAR,
    Classificacao.NOVA: Decisao.INSERIR,
    Classificacao.IGNORADA: Decisao.IGNORAR,
}
DECISOES_PERMITIDAS = {
    Classificacao.EXISTENTE: {Decisao.VINCULAR, Decisao.IGNORAR},
    Classificacao.SUSPEITA: {Decisao.VINCULAR, Decisao.INSERIR, Decisao.IGNORAR},
    Classificacao.NOVA: {Decisao.INSERIR, Decisao.IGNORAR},
    Classificacao.IGNORADA: {Decisao.IGNORAR},
}


@dataclass
class Previa:
    fatura: FaturaLida
    competencia: date
    competencia_sugerida: date
    linhas: list[LinhaClassificada]
    faltas: list[Lancamento]

    @property
    def total_lido(self) -> Decimal:
        return total_considerado(self.linhas)


@dataclass
class ResultadoDaImportacao:
    lote: LoteImportacao
    criados: int = 0
    confirmados: int = 0
    ignorados: int = 0


class ImportacaoService:
    def previa(self, *, fonte: Fonte, conteudo: bytes, competencia: date | None = None) -> Previa:
        if not fonte.ativa:
            raise RegraDeNegocioError(f"A fonte {fonte.nome} está inativa.")
        if len(conteudo) > TAMANHO_MAXIMO:
            raise RegraDeNegocioError("O arquivo passa de 5 MB.")
        try:
            fatura = ler_fatura(conteudo)
        except FormatoDeFaturaDesconhecidoError as erro:
            raise RegraDeNegocioError(str(erro)) from erro

        sugerida = self.competencia_sugerida(fonte, fatura)
        competencia = competencia or sugerida
        linhas, faltas = classificar(fatura.linhas, fonte, competencia)
        return Previa(fatura, competencia, sugerida, linhas, faltas)

    @staticmethod
    def competencia_sugerida(fonte: Fonte, fatura: FaturaLida) -> date:
        """A da compra mais recente da fatura (pagamentos e saldo não contam)."""
        datas = [linha.data for linha in fatura.linhas if not e_ignorada(linha)]
        ultima = max(datas, default=fatura.emitida_em)
        if fonte.e_cartao:
            return competencia_da_compra_no_cartao(
                ultima, dia_fechamento=fonte.dia_fechamento, dia_vencimento=fonte.dia_vencimento
            )
        return competencia_em_aberto(ultima)

    @transaction.atomic
    def importar(
        self,
        *,
        fonte: Fonte,
        conteudo: bytes,
        nome_arquivo: str,
        competencia: date,
        decisoes: dict[int, str] | None = None,
    ) -> ResultadoDaImportacao:
        previa = self.previa(fonte=fonte, conteudo=conteudo, competencia=competencia)
        escolhidas = self._decisoes(previa.linhas, decisoes or {})

        lote = LoteImportacao.objects.create(
            fonte=fonte,
            competencia=competencia,
            nome_arquivo=nome_arquivo[:255],
            arquivo_hash=hashlib.sha256(conteudo).hexdigest(),
        )
        resultado = ResultadoDaImportacao(lote=lote)
        criadas: dict[int, Compra] = {}

        # Na ordem das parcelas: a linha que cria uma compra vem antes das que casam com ela.
        for item in sorted(previa.linhas, key=lambda item: (item.linha.parcela or 0, item.indice)):
            decisao = escolhidas[item.indice]
            if decisao == Decisao.IGNORAR:
                resultado.ignorados += item.classificacao != Classificacao.IGNORADA
                continue
            if decisao == Decisao.VINCULAR and item.parcela_de in criadas:
                vinculo = criadas[item.parcela_de].lancamentos.get(parcela=item.linha.parcela)
                self._confirmar(vinculo, item.linha, lote)
                resultado.confirmados += 1
            elif decisao == Decisao.VINCULAR and item.vinculo is not None:
                self._confirmar(item.vinculo, item.linha, lote)
                resultado.confirmados += 1
            else:
                # Inserir, ou parcela cuja compra nova foi ignorada: cria a própria.
                compra = self._criar(item.linha, fonte, competencia, lote)
                if compra is not None:
                    criadas[item.indice] = compra
                resultado.criados += 1
        return resultado

    @staticmethod
    def _decisoes(linhas: list[LinhaClassificada], decisoes: dict[int, str]) -> dict[int, str]:
        indices = {item.indice for item in linhas}
        if desconhecidas := set(decisoes) - indices:
            raise RegraDeNegocioError(f"Linhas inexistentes na fatura: {sorted(desconhecidas)}.")
        escolhidas = {}
        for item in linhas:
            decisao = decisoes.get(item.indice, DECISAO_PADRAO[item.classificacao])
            if decisao not in DECISOES_PERMITIDAS[item.classificacao]:
                raise RegraDeNegocioError(
                    f"A linha {item.indice + 1} ({item.linha.descricao}) é {item.classificacao}"
                    f" e não aceita a decisão '{decisao}'."
                )
            escolhidas[item.indice] = decisao
        return escolhidas

    @staticmethod
    def _confirmar(lancamento: Lancamento, linha: LinhaDaFatura, lote: LoteImportacao) -> None:
        """O lançamento passa a ter o valor e a competência da fatura."""
        if lancamento.compra_id is not None and lancamento.valor != linha.valor:
            CompraService().ajustar_parcela(lancamento, linha.valor)
        if lancamento.compra_id is not None:
            compra = lancamento.compra
            # Na próxima fatura a parcela seguinte casa pela descrição, e a compra
            # à vista pela data (a da planilha era só o dia 1 da competência).
            compra.descricao_original = compra.descricao_original or linha.descricao[:200]
            if compra.n_parcelas == 1:
                compra.data = linha.data
            compra.save(update_fields=["descricao_original", "data", "atualizado_em"])
        lancamento.valor = linha.valor
        lancamento.texto = linha.descricao[:200]
        lancamento.competencia = lote.competencia
        lancamento.status = Lancamento.Status.CONFIRMADO
        lancamento.origem = Origem.IMPORTACAO
        lancamento.lote = lote
        lancamento.save(update_fields=["valor", "texto", "competencia", "status", "origem", "lote", "atualizado_em"])

    @staticmethod
    def _criar(linha: LinhaDaFatura, fonte: Fonte, competencia: date, lote: LoteImportacao) -> Compra | None:
        if linha.valor < 0:
            Lancamento.objects.create(
                fonte=fonte,
                competencia=competencia,
                valor=linha.valor,
                texto=linha.descricao[:200],
                tipo=Lancamento.Tipo.ESTORNO,
                status=Lancamento.Status.CONFIRMADO,
                origem=Origem.IMPORTACAO,
                lote=lote,
            )
            return None

        # Parcela k/n sem compra: cria a compra com as parcelas k..n (as anteriores
        # não são da conta deste sistema), todas com o valor desta.
        atual = linha.parcela if linha.parcelada else 1
        total = linha.n_parcelas if linha.parcelada else 1
        compra = Compra.objects.create(
            fonte=fonte,
            data=linha.data,
            descricao=linha.descricao[:200],
            descricao_original=linha.descricao[:200],
            valor_total=linha.valor * (total - atual + 1),
            n_parcelas=total,
            competencia_inicial=somar_meses(competencia, 1 - atual),
            origem=Origem.IMPORTACAO,
        )
        Lancamento.objects.bulk_create(
            Lancamento(
                compra=compra,
                fonte=fonte,
                competencia=somar_meses(competencia, parcela - atual),
                parcela=parcela,
                valor=linha.valor,
                texto=linha.descricao[:200] if parcela == atual else "",
                status=Lancamento.Status.CONFIRMADO if parcela == atual else Lancamento.Status.PREVISTO,
                origem=Origem.IMPORTACAO,
                lote=lote,
            )
            for parcela in range(atual, total + 1)
        )
        return compra
