import factory
from factory.django import DjangoModelFactory

from fatura_facil.models import Fonte

__all__ = ["FonteFactory"]


class FonteFactory(DjangoModelFactory):
    """Dinheiro por padrão; `FonteFactory(cartao=True)` cria um cartão (fecha 25, vence 5)."""

    class Meta:
        model = Fonte

    class Params:
        cartao = factory.Trait(tipo=Fonte.Tipo.CARTAO, dia_fechamento=25, dia_vencimento=5)

    nome = factory.Sequence(lambda n: f"Fonte {n}")
    tipo = Fonte.Tipo.DINHEIRO
