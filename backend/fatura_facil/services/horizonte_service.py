from datetime import date

from django.db.models import Max, Min
from django.utils import timezone

from fatura_facil.models import Lancamento
from fatura_facil.services.competencia_service import competencia_da_data, somar_meses

__all__ = ["HorizonteService"]


class HorizonteService:
    """Meses navegáveis: do primeiro mês com dados até o mais distante entre
    dezembro do ano corrente e a última competência com lançamento.

    O mês atual sempre faz parte, mesmo sem dados.
    """

    def competencias(self, hoje: date | None = None) -> list[date]:
        hoje = hoje or timezone.localdate()
        atual = competencia_da_data(hoje)
        limites = Lancamento.objects.aggregate(primeira=Min("competencia"), ultima=Max("competencia"))

        inicio = min(limites["primeira"] or atual, atual)
        fim = max(date(hoje.year, 12, 1), limites["ultima"] or atual)

        competencias = []
        competencia = inicio
        while competencia <= fim:
            competencias.append(competencia)
            competencia = somar_meses(competencia, 1)
        return competencias
