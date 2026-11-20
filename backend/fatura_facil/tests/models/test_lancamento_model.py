from datetime import date
from decimal import Decimal

import pytest
from django.db import IntegrityError

from fatura_facil.models import Lancamento
from fatura_facil.tests.factories import criar_compra

pytestmark = pytest.mark.django_db


def test_parcela_formatada_no_formato_do_banco():
    compra = criar_compra(valor_total=Decimal("300.00"), n_parcelas=3)
    segunda = compra.lancamentos.get(parcela=2)

    assert segunda.parcela_formatada == "2/3"
    assert segunda.descricao == "Compra de teste"
    assert str(segunda) == "Compra de teste 2/3 — 100.00"


def test_compra_a_vista_nao_mostra_parcela():
    compra = criar_compra()

    assert compra.lancamentos.get().parcela_formatada == ""
    assert str(compra) == "Compra de teste (10/11/2026)"


def test_lancamento_sem_compra():
    compra = criar_compra()
    avulso = Lancamento(fonte=compra.fonte, competencia=date(2026, 11, 1), valor=Decimal("1.00"))

    assert avulso.descricao == ""
    assert avulso.parcela_formatada == ""


def test_parcela_unica_por_compra():
    compra = criar_compra(n_parcelas=2)

    with pytest.raises(IntegrityError):
        Lancamento.objects.create(
            compra=compra, fonte=compra.fonte, competencia=date(2027, 1, 1), parcela=1, valor=Decimal("1.00")
        )
