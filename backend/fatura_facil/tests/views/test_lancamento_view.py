from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.tests.factories import criar_compra

pytestmark = pytest.mark.django_db


def _url(lancamento):
    return reverse("fatura_facil:lancamento-detail", args=[lancamento.pk])


def test_ajusta_o_valor_da_parcela(api_client_logado):
    compra = criar_compra(valor_total=Decimal("416.00"), n_parcelas=3)
    primeira = compra.lancamentos.get(parcela=1)

    resposta = api_client_logado.patch(_url(primeira), {"valor": "138.67"}, format="json")

    assert resposta.status_code == 200
    assert resposta.json()["valor"] == "138.67"
    assert resposta.json()["parcela"] == "1/3"
    compra.refresh_from_db()
    assert compra.valor_total == Decimal("415.99")


def test_outros_campos_sao_ignorados(api_client_logado):
    lancamento = criar_compra().lancamentos.get()

    resposta = api_client_logado.patch(_url(lancamento), {"valor": "90.00", "status": "confirmado"}, format="json")

    assert resposta.json()["status"] == "previsto"


def test_valor_invalido(api_client_logado):
    lancamento = criar_compra().lancamentos.get()

    resposta = api_client_logado.patch(_url(lancamento), {"valor": "-1.00"}, format="json")

    assert resposta.status_code == 400
    assert "detail" in resposta.json()


def test_put_e_delete_nao_existem(api_client_logado):
    lancamento = criar_compra().lancamentos.get()

    assert api_client_logado.put(_url(lancamento), {"valor": "1.00"}, format="json").status_code == 405
    assert api_client_logado.delete(_url(lancamento)).status_code == 405


def test_exige_login(api_client):
    lancamento = criar_compra().lancamentos.get()

    assert api_client.get(_url(lancamento)).status_code == 401
