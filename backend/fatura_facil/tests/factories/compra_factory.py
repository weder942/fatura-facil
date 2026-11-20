from datetime import date
from decimal import Decimal

from fatura_facil.services.compra_service import CompraService
from fatura_facil.tests.factories.fonte_factory import FonteFactory

__all__ = ["criar_compra"]


def criar_compra(**kwargs):
    """Cria uma compra pelo CompraService (com as parcelas), com valores padrão."""
    dados = {
        "data": date(2026, 11, 10),
        "descricao": "Compra de teste",
        "valor_total": Decimal("100.00"),
        "n_parcelas": 1,
        **kwargs,
    }
    if "fonte" not in dados:
        dados["fonte"] = FonteFactory()
    return CompraService().criar(**dados)
