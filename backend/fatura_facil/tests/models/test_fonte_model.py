import pytest
from django.db import IntegrityError

from fatura_facil.models import Fonte
from fatura_facil.tests.factories import FonteFactory

pytestmark = pytest.mark.django_db


class TestFonteConstraints:
    def test_cartao_exige_dias(self):
        with pytest.raises(IntegrityError):
            Fonte.objects.create(nome="Nubank", tipo=Fonte.Tipo.CARTAO, dia_fechamento=3)

    def test_dinheiro_nao_tem_dias(self):
        with pytest.raises(IntegrityError):
            Fonte.objects.create(nome="Dinheiro", tipo=Fonte.Tipo.DINHEIRO, dia_fechamento=3, dia_vencimento=10)

    def test_dia_fora_do_mes(self):
        with pytest.raises(IntegrityError):
            Fonte.objects.create(nome="Nubank", tipo=Fonte.Tipo.CARTAO, dia_fechamento=32, dia_vencimento=10)

    def test_nome_unico(self):
        FonteFactory(nome="Nubank")
        with pytest.raises(IntegrityError):
            FonteFactory(nome="Nubank")


def test_str_e_e_cartao():
    fonte = Fonte(nome="Bradesco 9241", tipo=Fonte.Tipo.CARTAO)

    assert str(fonte) == "Bradesco 9241"
    assert fonte.e_cartao
    assert not Fonte(tipo=Fonte.Tipo.CONTA).e_cartao
