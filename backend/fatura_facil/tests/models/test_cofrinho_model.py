from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.models import Cofrinho, MovimentoDoCofrinho, PercentualDoCofrinho, TaxaSelic
from fatura_facil.tests.factories import BancoFactory

pytestmark = pytest.mark.django_db


def test_representacoes():
    banco = BancoFactory(nome="PicPay")
    cofrinho = Cofrinho.objects.create(
        nome="Reserva", banco=banco, inicio=date(2026, 11, 2), rendimento_ate=date(2026, 11, 2)
    )
    percentual = PercentualDoCofrinho(cofrinho=cofrinho, vigente_desde=date(2026, 11, 2), percentual=Decimal("102.00"))
    movimento = MovimentoDoCofrinho(
        cofrinho=cofrinho, data=date(2026, 11, 2), tipo="guardado", informado=Decimal(10), valor=Decimal("10.00")
    )
    taxa = TaxaSelic(vigente_desde=date(2026, 9, 18), selic=Decimal("13.75"), cdi=Decimal("13.65"))

    assert str(banco) == "PicPay"
    assert str(cofrinho) == "Reserva"
    assert str(percentual) == "102.00% do CDI desde 02/11/2026"
    assert str(movimento) == "Guardado 10.00 em 02/11/2026"
    assert str(taxa) == "13.75% desde 18/09/2026"
