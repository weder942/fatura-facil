"""Grava no banco o histórico lido das planilhas e confere os totais com elas."""

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

from django.db import transaction
from django.db.models import Q, Sum

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import (
    Avulso,
    Compra,
    Fonte,
    Grupo,
    Lancamento,
    Origem,
    Recorrente,
    ValorDoMes,
    ValorRecorrente,
)
from fatura_facil.services.planilha.leitura import ItemDaPlanilha, LeituraDaPlanilha
from fatura_facil.services.planilha.parcelas import CadeiaDeParcelas, LancamentoSolto, encadear
from fatura_facil.services.planilha.recorrentes import PlanoDeAvulso, PlanoDeRecorrente, planejar_grupo
from fatura_facil.services.planilha.texto import chave
from fatura_facil.services.recorrente_service import RecorrenteService

__all__ = ["Conferencia", "ImportadorDePlanilha", "ResultadoDaImportacao"]

ZERO = Decimal("0.00")
_GRUPOS = {"rendimentos": Grupo.RENDIMENTO, "fixas": Grupo.FIXA}
# Blocos de totais calculados pela própria planilha.
_IGNORADOS = {"despesas", "totais", "totaisdespesas"}
_APELIDOS_DE_FONTE = {"emdinheiro": "dinheiro"}
# Duas fixas com o mesmo nome no mês: o nome de cada uma, na ordem em que aparecem.
_NOMES_REPETIDOS = {Grupo.FIXA: {"mae": ("Mãe saúde", "Mãe")}}
# O mesmo recorrente com nomes diferentes ao longo dos anos.
_SINONIMOS = {Grupo.FIXA: {"psiquiatria": "psiquiatra"}}


@dataclass(frozen=True)
class Conferencia:
    competencia: date
    coluna: str
    na_planilha: Decimal
    no_sistema: Decimal

    @property
    def confere(self) -> bool:
        return self.na_planilha == self.no_sistema


@dataclass
class ResultadoDaImportacao:
    meses: int = 0
    recorrentes: int = 0
    vigencias: int = 0
    valores_do_mes: int = 0
    avulsos: int = 0
    compras: int = 0
    parcelas: int = 0
    parcelas_projetadas: int = 0
    creditos: int = 0
    conferencias: list[Conferencia] = field(default_factory=list)
    problemas: list[str] = field(default_factory=list)

    @property
    def divergencias(self) -> list[Conferencia]:
        return [conferencia for conferencia in self.conferencias if not conferencia.confere]


@dataclass
class _Colunas:
    """O que foi lido, já separado por destino."""

    por_grupo: dict[str, list[tuple[date, list[ItemDaPlanilha]]]] = field(default_factory=lambda: defaultdict(list))
    por_fonte: dict[Fonte, list[tuple[date, list[ItemDaPlanilha]]]] = field(default_factory=lambda: defaultdict(list))
    # (competência, rótulo da coluna, destino, soma na planilha) para a conferência
    somas: list[tuple[date, str, str | Fonte, Decimal]] = field(default_factory=list)


class ImportadorDePlanilha:
    def __init__(self, apelidos_de_fonte: dict[str, str] | None = None):
        """`apelidos_de_fonte`: cabeçalho da planilha → nome da fonte cadastrada (ex.: {"Em dinheiro": "Dinheiro"})."""
        self.apelidos = dict(_APELIDOS_DE_FONTE)
        self.apelidos.update({chave(cabecalho): chave(nome) for cabecalho, nome in (apelidos_de_fonte or {}).items()})

    @transaction.atomic
    def importar(self, leituras: list[LeituraDaPlanilha], *, substituir: bool = False) -> ResultadoDaImportacao:
        meses = sorted((mes for leitura in leituras for mes in leitura.meses), key=lambda mes: mes.competencia)
        if not meses:
            raise RegraDeNegocioError("Nenhuma aba de mês encontrada nas planilhas.")
        resultado = ResultadoDaImportacao(meses=len(meses))
        colunas = self._separar(meses, resultado)
        self._preparar_banco(substituir)

        primeira, ultima = meses[0].competencia, meses[-1].competencia
        for grupo, meses_do_grupo in colunas.por_grupo.items():
            recorrentes, avulsos = planejar_grupo(
                meses_do_grupo,
                ultima_competencia=ultima,
                nomes_repetidos=_NOMES_REPETIDOS.get(grupo),
                sinonimos=_SINONIMOS.get(grupo),
            )
            self._gravar_recorrentes(grupo, recorrentes, resultado)
            self._gravar_avulsos(grupo, avulsos, resultado)
        for fonte, meses_da_fonte in colunas.por_fonte.items():
            cadeias, soltos = encadear(meses_da_fonte, ultima_competencia=ultima)
            resultado.problemas.extend(_sem_continuacao(fonte, cadeias, primeira, ultima))
            self._gravar_cadeias(fonte, cadeias, resultado)
            self._gravar_soltos(fonte, soltos, resultado)

        resultado.conferencias = self._conferir(colunas.somas)
        return resultado

    def _separar(self, meses, resultado: ResultadoDaImportacao) -> _Colunas:
        fontes = {chave(fonte.nome): fonte for fonte in Fonte.objects.all()}
        colunas, sem_fonte = _Colunas(), set()
        for mes in meses:
            for coluna in mes.colunas:
                identificador = chave(coluna.cabecalho)
                if identificador in _IGNORADOS:
                    continue
                destino = _GRUPOS.get(identificador) or fontes.get(self.apelidos.get(identificador, identificador))
                if destino is None:
                    sem_fonte.add(coluna.cabecalho)
                    continue
                if isinstance(destino, Fonte):
                    colunas.por_fonte[destino].append((mes.competencia, coluna.itens))
                else:
                    colunas.por_grupo[destino].append((mes.competencia, coluna.itens))
                soma = sum((item.valor for item in coluna.itens), ZERO)
                colunas.somas.append((mes.competencia, coluna.cabecalho, destino, soma))
                resultado.problemas.extend(coluna.problemas)
        if sem_fonte:
            raise RegraDeNegocioError(
                f"Sem fonte cadastrada para as colunas: {', '.join(sorted(sem_fonte))}. "
                "Cadastre-as (com os dias de fechamento e vencimento, se forem cartões) "
                'ou indique a fonte com --fonte "Coluna=Fonte".'
            )
        return colunas

    @staticmethod
    def _preparar_banco(substituir: bool) -> None:
        da_planilha = Origem.PLANILHA
        existentes = (
            Compra.objects.filter(origem=da_planilha).exists()
            or Lancamento.objects.filter(origem=da_planilha).exists()
            or Recorrente.objects.filter(origem=da_planilha).exists()
            or Avulso.objects.filter(origem=da_planilha).exists()
        )
        if existentes and not substituir:
            raise RegraDeNegocioError("A planilha já foi importada. Use --substituir para apagar e importar de novo.")
        if substituir:
            Lancamento.objects.filter(Q(origem=da_planilha) | Q(compra__origem=da_planilha)).delete()
            Compra.objects.filter(origem=da_planilha).delete()
            Recorrente.objects.filter(origem=da_planilha).delete()
            Avulso.objects.filter(origem=da_planilha).delete()

    @staticmethod
    def _gravar_recorrentes(grupo: str, planos: list[PlanoDeRecorrente], resultado: ResultadoDaImportacao) -> None:
        repetidos = Recorrente.objects.filter(grupo=grupo, nome__in=[plano.nome for plano in planos])
        if repetidos.exists():
            nomes = ", ".join(repetidos.values_list("nome", flat=True))
            raise RegraDeNegocioError(f"Já existem recorrentes com estes nomes: {nomes}. Renomeie ou exclua antes.")
        for ordem, plano in enumerate(planos, start=1):
            recorrente = Recorrente.objects.create(
                nome=plano.nome, grupo=grupo, variavel=plano.variavel, ordem=ordem, origem=Origem.PLANILHA
            )
            ValorRecorrente.objects.bulk_create(
                ValorRecorrente(recorrente=recorrente, valor=v.valor, a_partir_de=v.a_partir_de, ate=v.ate)
                for v in plano.vigencias
            )
            ValorDoMes.objects.bulk_create(
                ValorDoMes(recorrente=recorrente, competencia=competencia, valor=valor)
                for competencia, valor in plano.valores_do_mes.items()
            )
            resultado.recorrentes += 1
            resultado.vigencias += len(plano.vigencias)
            resultado.valores_do_mes += len(plano.valores_do_mes)

    @staticmethod
    def _gravar_avulsos(grupo: str, planos: list[PlanoDeAvulso], resultado: ResultadoDaImportacao) -> None:
        Avulso.objects.bulk_create(
            Avulso(
                grupo=grupo,
                competencia=plano.competencia,
                descricao=plano.descricao[:200],
                valor=plano.valor,
                origem=Origem.PLANILHA,
            )
            for plano in planos
        )
        resultado.avulsos += len(planos)

    @staticmethod
    def _gravar_cadeias(fonte: Fonte, cadeias: list[CadeiaDeParcelas], resultado: ResultadoDaImportacao) -> None:
        for cadeia in cadeias:
            compra = Compra.objects.create(
                fonte=fonte,
                data=cadeia.competencia_inicial,
                descricao=cadeia.nome[:200],
                descricao_original=cadeia.descricao_original[:200],
                valor_total=sum((parcela.valor for parcela in cadeia.parcelas), ZERO),
                n_parcelas=cadeia.total,
                competencia_inicial=cadeia.competencia_inicial,
                origem=Origem.PLANILHA,
            )
            Lancamento.objects.bulk_create(
                Lancamento(
                    compra=compra,
                    fonte=fonte,
                    competencia=parcela.competencia,
                    parcela=parcela.numero,
                    valor=parcela.valor,
                    origem=Origem.PLANILHA,
                )
                for parcela in cadeia.parcelas
            )
            resultado.compras += 1
            resultado.parcelas += len(cadeia.parcelas)
            resultado.parcelas_projetadas += sum(parcela.projetada for parcela in cadeia.parcelas)

    @staticmethod
    def _gravar_soltos(fonte: Fonte, soltos: list[LancamentoSolto], resultado: ResultadoDaImportacao) -> None:
        for solto in soltos:
            if solto.valor > 0:
                compra = Compra.objects.create(
                    fonte=fonte,
                    data=solto.competencia,
                    descricao=solto.descricao[:200],
                    descricao_original=solto.descricao[:200],
                    valor_total=solto.valor,
                    competencia_inicial=solto.competencia,
                    origem=Origem.PLANILHA,
                )
                Lancamento.objects.create(
                    compra=compra,
                    fonte=fonte,
                    competencia=solto.competencia,
                    parcela=1,
                    valor=solto.valor,
                    origem=Origem.PLANILHA,
                )
                resultado.compras += 1
                resultado.parcelas += 1
            elif solto.valor < 0:
                Lancamento.objects.create(
                    fonte=fonte,
                    competencia=solto.competencia,
                    valor=solto.valor,
                    texto=solto.descricao[:200],
                    tipo=Lancamento.Tipo.ESTORNO,
                    origem=Origem.PLANILHA,
                )
                resultado.creditos += 1
            else:
                resultado.problemas.append(
                    f"{solto.competencia:%Y-%m} {fonte.nome}: {solto.descricao!r} com valor zero ignorado."
                )

    @staticmethod
    def _conferir(somas) -> list[Conferencia]:
        conferencias = []
        recorrentes = RecorrenteService()
        for competencia, rotulo, destino, na_planilha in somas:
            if isinstance(destino, Fonte):
                no_sistema = Lancamento.objects.filter(fonte=destino, competencia=competencia).aggregate(
                    total=Sum("valor")
                )["total"]
            else:
                no_sistema = sum((item.valor for item in recorrentes.itens_do_mes(destino, competencia)), ZERO)
            # O SUM do SQLite perde as casas decimais (13 em vez de 13.00).
            conferencias.append(Conferencia(competencia, rotulo, na_planilha, (no_sistema or ZERO).quantize(ZERO)))
        return conferencias


def _sem_continuacao(fonte: Fonte, cadeias: list[CadeiaDeParcelas], primeira: date, ultima: date) -> list[str]:
    """Parcelas que não se encadearam: começam no meio depois do 1º mês ou param antes da última.

    Costumam ser parcelas antecipadas, numeração digitada errada ou um mês pulado na planilha.
    """
    avisos = []
    for cadeia in cadeias:
        inicio, fim = cadeia.parcelas[0], cadeia.ultima
        if (inicio.numero > 1 and inicio.competencia > primeira) or (
            fim.numero < cadeia.total and fim.competencia < ultima
        ):
            avisos.append(
                f"{inicio.competencia:%Y-%m} {fonte.nome}: {cadeia.descricao_original!r} ficou com as parcelas "
                f"{inicio.numero} a {fim.numero} de {cadeia.total} (sem continuação na planilha)."
            )
    return avisos
