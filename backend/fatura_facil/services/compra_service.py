from datetime import date
from decimal import Decimal

from django.db import transaction

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Compra, Fonte, Lancamento, Origem
from fatura_facil.services.competencia_service import competencia_da_compra_no_cartao, competencia_da_data
from fatura_facil.services.parcelamento_service import (
    CENTAVO,
    Parcela,
    gerar_parcelas,
    redistribuir_parcelas,
)

__all__ = ["CompraService"]

_CAMPOS_EDITAVEIS = {"fonte", "data", "descricao", "valor_total", "n_parcelas", "competencia_inicial"}


class CompraService:
    """Cria, edita e exclui compras mantendo as parcelas (lançamentos) em dia.

    Invariante: a soma dos lançamentos normais de uma compra é o valor total.
    """

    @staticmethod
    def competencia_sugerida(fonte: Fonte, data: date) -> date:
        if fonte.e_cartao:
            return competencia_da_compra_no_cartao(
                data, dia_fechamento=fonte.dia_fechamento, dia_vencimento=fonte.dia_vencimento
            )
        return competencia_da_data(data)

    @transaction.atomic
    def criar(
        self,
        *,
        fonte: Fonte,
        data: date,
        descricao: str,
        valor_total: Decimal,
        n_parcelas: int = 1,
        competencia_inicial: date | None = None,
        descricao_original: str = "",
        origem: str = Origem.MANUAL,
    ) -> Compra:
        if not fonte.ativa:
            raise RegraDeNegocioError(f"A fonte {fonte.nome} está inativa.")
        competencia_inicial = competencia_inicial or self.competencia_sugerida(fonte, data)
        parcelas = gerar_parcelas(valor_total, n_parcelas, competencia_inicial)

        compra = Compra.objects.create(
            fonte=fonte,
            data=data,
            descricao=descricao,
            descricao_original=descricao_original,
            valor_total=valor_total,
            n_parcelas=n_parcelas,
            competencia_inicial=competencia_inicial,
            origem=origem,
        )
        self._criar_lancamentos(compra, parcelas)
        return compra

    @transaction.atomic
    def atualizar(self, compra: Compra, **alteracoes) -> Compra:
        """Aplica as alterações e regera as parcelas não confirmadas, se preciso.

        - Sem `competencia_inicial` explícita, mudar a data ou a fonte recalcula
          a competência sugerida.
        - Parcelas confirmadas por importação não mudam; a fonte não pode
          mudar se houver alguma.
        - Só mudar a descrição não mexe nas parcelas (preserva ajustes de
          centavos feitos parcela a parcela).
        """
        desconhecidos = set(alteracoes) - _CAMPOS_EDITAVEIS
        if desconhecidos:
            raise ValueError(f"Campos não editáveis: {sorted(desconhecidos)}")

        confirmadas = dict(
            self._normais(compra).filter(status=Lancamento.Status.CONFIRMADO).values_list("parcela", "valor")
        )
        nova_fonte = alteracoes.get("fonte", compra.fonte)
        fonte_mudou = nova_fonte.pk != compra.fonte_id
        if fonte_mudou and confirmadas:
            raise RegraDeNegocioError("A fonte não pode mudar: há parcelas confirmadas pela fatura.")
        if fonte_mudou and not nova_fonte.ativa:
            raise RegraDeNegocioError(f"A fonte {nova_fonte.nome} está inativa.")

        data_mudou = "data" in alteracoes and alteracoes["data"] != compra.data
        antes = (compra.valor_total, compra.n_parcelas, compra.competencia_inicial)

        for campo, valor in alteracoes.items():
            setattr(compra, campo, valor)
        if alteracoes.get("competencia_inicial") is None and (fonte_mudou or data_mudou):
            compra.competencia_inicial = self.competencia_sugerida(compra.fonte, compra.data)

        depois = (compra.valor_total, compra.n_parcelas, compra.competencia_inicial)
        if fonte_mudou or antes != depois:
            parcelas = redistribuir_parcelas(
                compra.valor_total, compra.n_parcelas, compra.competencia_inicial, confirmadas=confirmadas
            )
            self._normais(compra).filter(status=Lancamento.Status.PREVISTO).delete()
            self._criar_lancamentos(compra, parcelas)

        compra.save()
        return compra

    @transaction.atomic
    def ajustar_parcela(self, lancamento: Lancamento, valor: Decimal) -> Lancamento:
        """Muda o valor de uma parcela (ex.: acertar centavos); o total da compra acompanha."""
        if lancamento.tipo != Lancamento.Tipo.NORMAL or lancamento.compra_id is None:
            raise RegraDeNegocioError("Só parcelas de compras podem ter o valor ajustado.")
        if valor <= 0 or valor != valor.quantize(CENTAVO):
            raise RegraDeNegocioError("O valor da parcela deve ser positivo e ter no máximo duas casas decimais.")

        lancamento.valor = valor
        lancamento.save(update_fields=["valor", "atualizado_em"])

        compra = lancamento.compra
        compra.valor_total = sum(self._normais(compra).values_list("valor", flat=True), Decimal(0))
        compra.save(update_fields=["valor_total", "atualizado_em"])
        return lancamento

    @staticmethod
    def _normais(compra: Compra):
        return compra.lancamentos.filter(tipo=Lancamento.Tipo.NORMAL)

    @staticmethod
    def _criar_lancamentos(compra: Compra, parcelas: list[Parcela]) -> None:
        Lancamento.objects.bulk_create(
            Lancamento(
                compra=compra,
                fonte=compra.fonte,
                competencia=parcela.competencia,
                parcela=parcela.numero,
                valor=parcela.valor,
                origem=compra.origem,
            )
            for parcela in parcelas
        )
