from datetime import date

import pytest
from django.urls import reverse

from fatura_facil.models import Avulso, Familia, Lancamento
from fatura_facil.tests.factories import FonteFactory

pytestmark = pytest.mark.django_db
LISTA = reverse("fatura_facil:familia-list")
MEMBROS = [
    {"nome": "Weder", "administrador": True},
    {"nome": "Gustavo", "administrador": False},
    {"nome": "Edson", "administrador": False},
    {"nome": "Natalia", "administrador": False},
]


def _url(nome, familia):
    return reverse(f"fatura_facil:familia-{nome}", args=[familia["id"]])


@pytest.fixture(autouse=True)
def hoje(mocker):
    mocker.patch("fatura_facil.services.familia_service.timezone.localdate", return_value=date(2026, 11, 26))


@pytest.fixture
def amazon():
    return FonteFactory(nome="Amazon", cartao=True)


@pytest.fixture
def familia(api_client_logado, amazon):
    resposta = api_client_logado.post(
        LISTA,
        {"fonte": amazon.pk, "nome": "Apple icloud", "valor": "66.90", "inicio": "2026-12", "membros": MEMBROS},
        format="json",
    )
    assert resposta.status_code == 201
    return resposta.json()


def test_exige_login(api_client):
    assert api_client.get(LISTA).status_code == 401


def test_cria_e_gera_os_meses(familia, amazon):
    assert familia == {
        "id": familia["id"],
        "nome": "Apple icloud",
        "fonte": amazon.pk,
        "valor": "66.90",
        "inicio": "2026-12",
        "ate": None,
        "membros": MEMBROS,
        "primeira_editavel": "2026-12",
    }
    assert Lancamento.objects.filter(familia=familia["id"]).count() == 12


def test_lista_e_detalhe(api_client_logado, familia):
    assert [item["id"] for item in api_client_logado.get(LISTA).json()] == [familia["id"]]
    assert api_client_logado.get(_url("detail", familia)).json() == familia


def test_criar_valida_a_entrada(api_client_logado, amazon):
    resposta = api_client_logado.post(
        LISTA, {"fonte": amazon.pk, "nome": "X", "valor": "0", "inicio": "2026-12", "membros": []}, format="json"
    )

    assert resposta.status_code == 400
    assert set(resposta.json()) == {"valor", "membros"}


def test_alterar(api_client_logado, familia):
    resposta = api_client_logado.post(
        _url("alterar", familia),
        {**familia, "valor": "79.90", "a_partir_de": "2027-03", "membros": MEMBROS[:2]},
        format="json",
    )

    assert resposta.status_code == 200
    assert resposta.json()["inicio"] == "2027-03"
    assert resposta.json()["membros"] == MEMBROS[:2]
    lancamento = Lancamento.objects.get(familia=familia["id"], competencia=date(2027, 3, 1))
    assert lancamento.texto == "Apple icloud Weder (Weder - Gustavo)"


def test_alterar_mes_fechado_e_recusado(api_client_logado, familia):
    resposta = api_client_logado.post(_url("alterar", familia), {**familia, "a_partir_de": "2026-11"}, format="json")

    assert resposta.status_code == 400
    assert "fechados" in resposta.json()["detail"]


def test_encerrar(api_client_logado, familia):
    resposta = api_client_logado.post(_url("encerrar", familia), {"a_partir_de": "2027-02"}, format="json")

    assert resposta.status_code == 200
    assert resposta.json()["ate"] == "2027-01"
    assert Lancamento.objects.filter(familia=familia["id"]).count() == 2


def test_encerrar_no_inicio_apaga(api_client_logado, familia):
    resposta = api_client_logado.post(_url("encerrar", familia), {"a_partir_de": "2026-12"}, format="json")

    assert resposta.status_code == 204
    assert not Familia.objects.exists() and not Avulso.objects.exists()


def test_visao_do_mes_estende_e_identifica_a_familia(api_client_logado, familia, mocker):
    mocker.patch("fatura_facil.services.familia_service.timezone.localdate", return_value=date(2027, 3, 2))

    resposta = api_client_logado.get(reverse("fatura_facil:mes-detail", args=["2028-02"]))

    corpo = resposta.json()
    lancamento = corpo["fontes"][0]["lancamentos"][0]
    assert (lancamento["descricao"], lancamento["familia"]) == (
        "Apple icloud Edson (Weder - Gustavo - Edson - Natalia)",
        familia["id"],
    )
    assert [(item["descricao"], item["familia"]) for item in corpo["rendimentos"]] == [
        ("Apple icloud (Edson)", familia["id"])
    ]


def test_horizonte_estende_as_familias(api_client_logado, familia, mocker):
    mocker.patch("fatura_facil.views.mes_view.timezone.localdate", return_value=date(2027, 3, 2))

    competencias = api_client_logado.get(reverse("fatura_facil:mes-list")).json()

    assert competencias[-1]["competencia"] == "2028-03"  # abril em aberto + 11 meses
