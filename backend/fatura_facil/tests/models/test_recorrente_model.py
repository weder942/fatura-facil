from datetime import date
from decimal import Decimal

import pytest
from django.db import IntegrityError

from fatura_facil.models import Avulso, Grupo, ValorDoMes, ValorRecorrente
from fatura_facil.tests.factories import criar_recorrente

pytestmark = pytest.mark.django_db


def test_textos_no_admin():
    aluguel = criar_recorrente(nome="Aluguel", valor=Decimal("1277.99"), a_partir_de=date(2026, 1, 1))
    valor_do_mes = ValorDoMes.objects.create(recorrente=aluguel, competencia=date(2026, 3, 1), valor=Decimal(1))
    avulso = Avulso(grupo=Grupo.RENDIMENTO, competencia=date(2026, 11, 1), descricao="Férias", valor=Decimal(5))

    assert str(aluguel) == "Aluguel"
    assert str(aluguel.valores.get()) == "Aluguel 1277.99 a partir de 2026-01"
    assert str(valor_do_mes) == "Aluguel 2026-03: 1"
    assert str(avulso) == "Férias 2026-11: 5"


def test_vigencia_nao_termina_antes_de_comecar():
    aluguel = criar_recorrente(a_partir_de=date(2026, 6, 1))

    with pytest.raises(IntegrityError):
        ValorRecorrente.objects.filter(recorrente=aluguel).update(ate=date(2026, 1, 1))
