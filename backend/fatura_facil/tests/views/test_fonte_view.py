import pytest
from django.urls import reverse

from fatura_facil.models import Fonte
from fatura_facil.tests.factories import FonteFactory, criar_compra

pytestmark = pytest.mark.django_db

LISTA = reverse("fatura_facil:fonte-list")


def _detalhe(fonte):
    return reverse("fatura_facil:fonte-detail", args=[fonte.pk])


def test_exige_login(api_client):
    assert api_client.get(LISTA).status_code == 401


def test_lista_na_ordem_definida(api_client_logado):
    FonteFactory(nome="Bradesco", ordem=2)
    FonteFactory(nome="Dinheiro", ordem=1)

    resposta = api_client_logado.get(LISTA)

    assert [f["nome"] for f in resposta.json()] == ["Dinheiro", "Bradesco"]


def test_cria_cartao(api_client_logado):
    resposta = api_client_logado.post(
        LISTA, {"nome": "Nubank", "tipo": "cartao", "dia_fechamento": 3, "dia_vencimento": 10}, format="json"
    )

    assert resposta.status_code == 201
    assert resposta.json() == {
        "id": resposta.json()["id"],
        "nome": "Nubank",
        "tipo": "cartao",
        "dia_fechamento": 3,
        "dia_vencimento": 10,
        "ativa": True,
        "ordem": 0,
    }


def test_cartao_exige_os_dias(api_client_logado):
    resposta = api_client_logado.post(LISTA, {"nome": "Nubank", "tipo": "cartao"}, format="json")

    assert resposta.status_code == 400
    assert set(resposta.json()) == {"dia_fechamento", "dia_vencimento"}


def test_dia_fora_do_intervalo(api_client_logado):
    resposta = api_client_logado.post(
        LISTA, {"nome": "Nubank", "tipo": "cartao", "dia_fechamento": 32, "dia_vencimento": 10}, format="json"
    )

    assert resposta.status_code == 400
    assert "dia_fechamento" in resposta.json()


def test_dinheiro_ignora_os_dias(api_client_logado):
    resposta = api_client_logado.post(
        LISTA, {"nome": "Dinheiro", "tipo": "dinheiro", "dia_fechamento": 3, "dia_vencimento": 10}, format="json"
    )

    assert resposta.status_code == 201
    assert resposta.json()["dia_fechamento"] is None


def test_edicao_parcial_de_cartao_mantem_os_dias(api_client_logado):
    cartao = FonteFactory(cartao=True)

    resposta = api_client_logado.patch(_detalhe(cartao), {"nome": "Bradesco 9241"}, format="json")

    assert resposta.status_code == 200
    assert resposta.json()["dia_fechamento"] == 25


def test_desativar(api_client_logado):
    fonte = FonteFactory()

    api_client_logado.patch(_detalhe(fonte), {"ativa": False}, format="json")

    fonte.refresh_from_db()
    assert fonte.ativa is False


def test_nao_muda_o_tipo_com_compras(api_client_logado):
    fonte = FonteFactory()
    criar_compra(fonte=fonte)

    resposta = api_client_logado.patch(
        _detalhe(fonte), {"tipo": "cartao", "dia_fechamento": 3, "dia_vencimento": 10}, format="json"
    )

    assert resposta.status_code == 400
    assert "tipo" in resposta.json()


def test_exclui_fonte_sem_compras(api_client_logado):
    fonte = FonteFactory()

    assert api_client_logado.delete(_detalhe(fonte)).status_code == 204
    assert not Fonte.objects.exists()


def test_nao_exclui_fonte_com_compras(api_client_logado):
    fonte = FonteFactory()
    criar_compra(fonte=fonte)

    resposta = api_client_logado.delete(_detalhe(fonte))

    assert resposta.status_code == 400
    assert resposta.json() == {"detail": "Esta fonte tem compras. Desative-a em vez de excluir."}


class TestCompetenciaSugerida:
    def _url(self, fonte):
        return reverse("fatura_facil:fonte-competencia-sugerida", args=[fonte.pk])

    def test_cartao(self, api_client_logado):
        resposta = api_client_logado.get(self._url(FonteFactory(cartao=True)), {"data": "2026-11-25"})

        assert resposta.status_code == 200
        assert resposta.json() == {"competencia": "2027-01"}

    def test_data_invalida(self, api_client_logado):
        resposta = api_client_logado.get(self._url(FonteFactory()), {"data": "25/11/2026"})

        assert resposta.status_code == 400
