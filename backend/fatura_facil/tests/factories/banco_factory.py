import factory
from factory.django import DjangoModelFactory

from fatura_facil.models import Banco

__all__ = ["BancoFactory"]


class BancoFactory(DjangoModelFactory):
    class Meta:
        model = Banco

    nome = factory.Sequence(lambda n: f"Banco {n}")
