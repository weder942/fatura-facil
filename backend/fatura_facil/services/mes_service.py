from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

from django.db.models import Q

from fatura_facil.models import Fonte, Lancamento

__all__ = ["BlocoDaFonte", "MesService", "ResumoDoMes", "VisaoDoMes"]

ZERO = Decimal("0.00")


@dataclass
class BlocoDaFonte:
    fonte: Fonte
    lancamentos: list[Lancamento] = field(default_factory=list)

    @property
    def total(self) -> Decimal:
        return sum((lancamento.valor for lancamento in self.lancamentos), ZERO)


@dataclass
class ResumoDoMes:
    total_rendimentos: Decimal
    total_fixas: Decimal
    total_dinheiro_e_contas: Decimal
    total_cartoes: Decimal

    @property
    def saldo(self) -> Decimal:
        return self.total_rendimentos - self.total_fixas - self.total_dinheiro_e_contas - self.total_cartoes


@dataclass
class VisaoDoMes:
    competencia: date
    fontes: list[BlocoDaFonte]
    resumo: ResumoDoMes
    # Rendimentos e fixas vêm dos recorrentes (Fase 2); por enquanto, vazios.
    rendimentos: list = field(default_factory=list)
    fixas: list = field(default_factory=list)


class MesService:
    def visao(self, competencia: date) -> VisaoDoMes:
        """Um bloco por fonte ativa (e por fonte inativa que tenha lançamento no mês)."""
        lancamentos = (
            Lancamento.objects.filter(competencia=competencia)
            .select_related("compra", "fonte")
            .order_by("compra__data", "id")
        )
        fontes = Fonte.objects.filter(Q(ativa=True) | Q(lancamentos__competencia=competencia)).distinct()

        blocos = {fonte.pk: BlocoDaFonte(fonte=fonte) for fonte in fontes}
        for lancamento in lancamentos:
            blocos[lancamento.fonte_id].lancamentos.append(lancamento)

        total_cartoes = sum((b.total for b in blocos.values() if b.fonte.e_cartao), ZERO)
        total_outros = sum((b.total for b in blocos.values() if not b.fonte.e_cartao), ZERO)

        return VisaoDoMes(
            competencia=competencia,
            fontes=list(blocos.values()),
            resumo=ResumoDoMes(
                total_rendimentos=ZERO,
                total_fixas=ZERO,
                total_dinheiro_e_contas=total_outros,
                total_cartoes=total_cartoes,
            ),
        )
