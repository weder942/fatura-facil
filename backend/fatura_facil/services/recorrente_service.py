from dataclasses import dataclass
from datetime import date
from decimal import Decimal

from django.db import transaction
from django.db.models import Prefetch

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Avulso, Origem, Recorrente, ValorDoMes, ValorRecorrente

__all__ = ["ItemDoMes", "RecorrenteService", "valor_vigente"]


@dataclass(frozen=True)
class ItemDoMes:
    """Uma linha de rendimentos ou fixas na visão mensal."""

    tipo: str  # "recorrente" | "avulso"
    id: int
    descricao: str
    valor: Decimal
    variavel: bool = False
    pendente: bool = False  # variável sem o valor real do mês: o valor é estimativa
    ajustado: bool = False  # fixo com valor sobrescrito só neste mês
    familia: int | None = None  # avulso gerado por uma família (o membro do mês devolve a mensalidade)


def valor_vigente(valores: list[ValorRecorrente], competencia: date) -> Decimal | None:
    """Valor da vigência mais recente com `a_partir_de <= competencia`, se ela não tiver terminado."""
    vigente = None
    for valor in valores:
        if valor.a_partir_de <= competencia and (vigente is None or valor.a_partir_de > vigente.a_partir_de):
            vigente = valor
    if vigente is None or (vigente.ate is not None and vigente.ate < competencia):
        return None
    return vigente.valor


class RecorrenteService:
    @transaction.atomic
    def criar(
        self,
        *,
        nome: str,
        grupo: str,
        valor: Decimal,
        a_partir_de: date,
        variavel: bool = False,
        ordem: int = 0,
        origem: str = Origem.MANUAL,
    ) -> Recorrente:
        recorrente = Recorrente.objects.create(nome=nome, grupo=grupo, variavel=variavel, ordem=ordem, origem=origem)
        ValorRecorrente.objects.create(recorrente=recorrente, valor=valor, a_partir_de=a_partir_de)
        return recorrente

    @transaction.atomic
    def reajustar(self, recorrente: Recorrente, *, valor: Decimal, a_partir_de: date) -> ValorRecorrente:
        """Novo valor a partir de uma competência; os meses seguintes passam a usá-lo.

        Reajustar na mesma competência de uma vigência existente troca o valor dela.
        """
        vigencia, _ = ValorRecorrente.objects.update_or_create(
            recorrente=recorrente, a_partir_de=a_partir_de, defaults={"valor": valor, "ate": None}
        )
        return vigencia

    @transaction.atomic
    def encerrar(self, recorrente: Recorrente, *, ate: date) -> None:
        """O recorrente deixa de existir depois da competência `ate`."""
        vigencias = list(recorrente.valores.order_by("a_partir_de"))
        anteriores = [v for v in vigencias if v.a_partir_de <= ate]
        if not anteriores:
            raise RegraDeNegocioError("O fim não pode ser antes do primeiro valor do recorrente.")
        recorrente.valores.filter(a_partir_de__gt=ate).delete()
        ultima = anteriores[-1]
        ultima.ate = ate
        ultima.save(update_fields=["ate"])

    @transaction.atomic
    def remover_vigencia(self, vigencia: ValorRecorrente) -> None:
        if vigencia.recorrente.valores.count() == 1:
            raise RegraDeNegocioError("O recorrente precisa de pelo menos um valor. Exclua o recorrente.")
        vigencia.delete()

    def definir_no_mes(self, recorrente: Recorrente, *, competencia: date, valor: Decimal) -> ValorDoMes:
        valor_do_mes, _ = ValorDoMes.objects.update_or_create(
            recorrente=recorrente, competencia=competencia, defaults={"valor": valor}
        )
        return valor_do_mes

    def limpar_no_mes(self, recorrente: Recorrente, *, competencia: date) -> None:
        recorrente.valores_do_mes.filter(competencia=competencia).delete()

    def itens_do_mes(self, grupo: str, competencia: date) -> list[ItemDoMes]:
        """Recorrentes vigentes (ou ajustados) no mês, seguidos dos avulsos do mês."""
        recorrentes = Recorrente.objects.filter(grupo=grupo).prefetch_related(
            "valores",
            Prefetch(
                "valores_do_mes",
                queryset=ValorDoMes.objects.filter(competencia__lte=competencia).order_by("-competencia"),
                to_attr="informados_ate_o_mes",
            ),
        )
        itens = [item for r in recorrentes if (item := self._item(r, competencia)) is not None]
        avulsos = Avulso.objects.filter(grupo=grupo, competencia=competencia)
        itens.extend(
            ItemDoMes(
                tipo="avulso",
                id=avulso.pk,
                descricao=avulso.descricao,
                valor=avulso.valor,
                familia=avulso.familia_id,
            )
            for avulso in avulsos
        )
        return itens

    @staticmethod
    def _item(recorrente: Recorrente, competencia: date) -> ItemDoMes | None:
        informados = recorrente.informados_ate_o_mes  # mais recente primeiro
        do_mes = informados[0] if informados and informados[0].competencia == competencia else None
        vigente = valor_vigente(list(recorrente.valores.all()), competencia)

        if do_mes is not None:
            valor = do_mes.valor
        elif vigente is None:
            return None  # fora da vigência e sem ajuste no mês
        elif recorrente.variavel and informados:
            valor = informados[0].valor  # estimativa: o último valor real informado
        else:
            valor = vigente

        return ItemDoMes(
            tipo="recorrente",
            id=recorrente.pk,
            descricao=recorrente.nome,
            valor=valor,
            variavel=recorrente.variavel,
            pendente=recorrente.variavel and do_mes is None,
            ajustado=not recorrente.variavel and do_mes is not None,
        )
