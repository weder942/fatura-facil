from datetime import date
from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.tests.factories import FonteFactory, criar_compra

pytestmark = pytest.mark.django_db


def _url(competencia):
    return reverse("fatura_facil:mes-detail", args=[competencia])


def test_horizonte_marca_o_mes_atual(api_client_logado, mocker):
    mocker.patch("fatura_facil.views.mes_view.timezone.localdate", return_value=date(2026, 11, 19))

    resposta = api_client_logado.get(reverse("fatura_facil:mes-list"))

    assert resposta.status_code == 200
    assert resposta.json() == [{"competencia": "2026-11", "atual": True}, {"competencia": "2026-12", "atual": False}]


def test_visao_do_mes(api_client_logado):
    nubank = FonteFactory(nome="Nubank", cartao=True, dia_fechamento=3, dia_vencimento=10)
    criar_compra(
        fonte=nubank, data=date(2026, 11, 1), descricao="Passagem", valor_total=Decimal("300.00"), n_parcelas=3
    )

    resposta = api_client_logado.get(_url("2026-11"))

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert corpo["competencia"] == "2026-11"
    assert corpo["rendimentos"] == [] and corpo["fixas"] == []
    bloco = corpo["fontes"][0]
    assert bloco["fonte"] == {"id": nubank.pk, "nome": "Nubank", "tipo": "cartao", "ativa": True}
    assert bloco["total"] == "100.00"
    lancamento = bloco["lancamentos"][0]
    assert {k: lancamento[k] for k in ("descricao", "parcela", "valor", "competencia", "origem", "status")} == {
        "descricao": "Passagem",
        "parcela": "1/3",
        "valor": "100.00",
        "competencia": "2026-11",
        "origem": "manual",
        "status": "previsto",
    }
    assert corpo["resumo"] == {
        "total_rendimentos": "0.00",
        "total_fixas": "0.00",
        "total_dinheiro_e_contas": "0.00",
        "total_cartoes": "100.00",
        "saldo": "-100.00",
    }


def test_competencia_invalida(api_client_logado):
    resposta = api_client_logado.get(_url("2026-13"))

    assert resposta.status_code == 400
    assert "detail" in resposta.json()


def test_exige_login(api_client):
    assert api_client.get(_url("2026-11")).status_code == 401
