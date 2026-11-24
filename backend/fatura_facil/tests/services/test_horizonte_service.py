from datetime import date

import pytest

from fatura_facil.services.horizonte_service import HorizonteService
from fatura_facil.tests.factories import criar_compra

pytestmark = pytest.mark.django_db

HOJE = date(2026, 11, 19)


def _meses(competencias):
    return [f"{c:%Y-%m}" for c in competencias]


def test_sem_dados_vai_do_mes_em_aberto_a_dezembro():
    assert _meses(HorizonteService().competencias(HOJE)) == ["2026-12"]


def test_em_dezembro_o_mes_em_aberto_e_janeiro_e_vai_ate_dezembro_seguinte():
    competencias = _meses(HorizonteService().competencias(date(2026, 12, 5)))

    assert competencias[0] == "2027-01"
    assert competencias[-1] == "2027-12"


def test_comeca_no_primeiro_mes_com_dados():
    criar_compra(data=date(2026, 8, 5))  # dinheiro: entra em setembro

    assert _meses(HorizonteService().competencias(HOJE))[0] == "2026-09"


# Exemplos do MVP (1.5).
def test_ultima_parcela_antes_de_dezembro_vai_ate_dezembro():
    criar_compra(data=date(2026, 11, 5), n_parcelas=4)  # última em 2027-02

    competencias = HorizonteService().competencias(date(2027, 1, 10))

    assert _meses(competencias)[-1] == "2027-12"


def test_ultima_parcela_depois_de_dezembro_define_o_fim():
    criar_compra(data=date(2026, 10, 5), n_parcelas=24)  # 2026-11 a 2028-10

    competencias = HorizonteService().competencias(HOJE)

    assert _meses(competencias)[-1] == "2028-10"
    assert len(competencias) == 24


def test_usa_a_data_local_quando_nao_informada():
    assert HorizonteService().competencias()
