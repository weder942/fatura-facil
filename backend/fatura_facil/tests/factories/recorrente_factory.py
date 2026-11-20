from datetime import date
from decimal import Decimal

from fatura_facil.models import Grupo, Recorrente
from fatura_facil.services.recorrente_service import RecorrenteService

__all__ = ["criar_recorrente"]


def criar_recorrente(**kwargs) -> Recorrente:
    """Cria pelo service, com a primeira vigência. Padrão: fixa de R$ 100,00 desde 2026-01."""
    dados = {
        "nome": "Aluguel",
        "grupo": Grupo.FIXA,
        "valor": Decimal("100.00"),
        "a_partir_de": date(2026, 1, 1),
    }
    dados.update(kwargs)
    return RecorrenteService().criar(**dados)
