from datetime import date
from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.models import Grupo, Recorrente, ValorDoMes
from fatura_facil.services.recorrente_service import RecorrenteService
from fatura_facil.tests.factories import criar_recorrente

pytestmark = pytest.mark.django_db
D = Decimal
LISTA = reverse("fatura_facil:recorrente-list")


def _url(nome, recorrente, *args):
    return reverse(f"fatura_facil:recorrente-{nome}", args=[recorrente.pk, *args])


def test_exige_login(api_client):
    assert api_client.get(LISTA).status_code == 401


@pytest.fixture
def hoje(mocker):
    mocker.patch("fatura_facil.serializers.recorrente_serializer.timezone.localdate", return_value=date(2026, 11, 20))


def test_cria_com_a_primeira_vigencia(api_client_logado, hoje):
    resposta = api_client_logado.post(
        LISTA,
        {"nome": "Aluguel", "grupo": "fixa", "valor": "1277.99", "a_partir_de": "2025-01"},
        format="json",
    )

    assert resposta.status_code == 201
    corpo = resposta.json()
    assert corpo == {
        "id": corpo["id"],
        "nome": "Aluguel",
        "grupo": "fixa",
        "variavel": False,
        "ordem": 0,
        "valores": [{"id": corpo["valores"][0]["id"], "valor": "1277.99", "a_partir_de": "2025-01", "ate": None}],
        "valor_atual": "1277.99",
    }


def test_criar_exige_valor_e_inicio(api_client_logado):
    resposta = api_client_logado.post(LISTA, {"nome": "Aluguel", "grupo": "fixa"}, format="json")

    assert resposta.status_code == 400
    assert set(resposta.json()) == {"valor", "a_partir_de"}


def test_nome_repetido_no_mesmo_grupo_e_recusado(api_client_logado):
    criar_recorrente(nome="Mãe")

    resposta = api_client_logado.post(
        LISTA, {"nome": "Mãe", "grupo": "fixa", "valor": "75.00", "a_partir_de": "2026-01"}, format="json"
    )

    assert resposta.status_code == 400


def test_filtra_por_grupo(api_client_logado):
    criar_recorrente(nome="Salário", grupo=Grupo.RENDIMENTO)
    criar_recorrente(nome="Aluguel", grupo=Grupo.FIXA)

    resposta = api_client_logado.get(LISTA, {"grupo": "rendimento"})

    assert [r["nome"] for r in resposta.json()] == ["Salário"]


def test_valor_atual_vazio_quando_encerrado(api_client_logado, hoje):
    moto = criar_recorrente(nome="Moto")
    RecorrenteService().encerrar(moto, ate=date(2026, 3, 1))

    assert api_client_logado.get(LISTA).json()[0]["valor_atual"] is None


def test_editar_nao_mexe_no_valor(api_client_logado):
    aluguel = criar_recorrente(valor=D("100.00"))

    resposta = api_client_logado.patch(
        _url("detail", aluguel), {"nome": "Aluguel casa", "valor": "999.00"}, format="json"
    )

    assert resposta.status_code == 200
    assert resposta.json()["nome"] == "Aluguel casa"
    assert aluguel.valores.get().valor == D("100.00")


def test_reajustar(api_client_logado):
    aluguel = criar_recorrente(valor=D("1201.99"), a_partir_de=date(2025, 1, 1))

    resposta = api_client_logado.post(
        _url("reajustar", aluguel), {"valor": "1277.99", "a_partir_de": "2026-01"}, format="json"
    )

    assert resposta.status_code == 200
    assert [(v["valor"], v["a_partir_de"]) for v in resposta.json()["valores"]] == [
        ("1201.99", "2025-01"),
        ("1277.99", "2026-01"),
    ]


def test_reajustar_valida_a_competencia(api_client_logado):
    aluguel = criar_recorrente()

    resposta = api_client_logado.post(
        _url("reajustar", aluguel), {"valor": "1.00", "a_partir_de": "janeiro"}, format="json"
    )

    assert resposta.status_code == 400
    assert "a_partir_de" in resposta.json()


def test_encerrar(api_client_logado):
    moto = criar_recorrente(nome="Moto", a_partir_de=date(2026, 1, 1))

    resposta = api_client_logado.post(_url("encerrar", moto), {"ate": "2026-06"}, format="json")

    assert resposta.status_code == 200
    assert resposta.json()["valores"][0]["ate"] == "2026-06"


def test_encerrar_antes_do_inicio_responde_400(api_client_logado):
    moto = criar_recorrente(nome="Moto", a_partir_de=date(2026, 6, 1))

    resposta = api_client_logado.post(_url("encerrar", moto), {"ate": "2026-01"}, format="json")

    assert resposta.status_code == 400
    assert "antes do primeiro valor" in resposta.json()["detail"]


def test_remover_vigencia(api_client_logado):
    aluguel = criar_recorrente(valor=D("100.00"))
    reajuste = RecorrenteService().reajustar(aluguel, valor=D("150.00"), a_partir_de=date(2026, 6, 1))

    resposta = api_client_logado.delete(_url("remover-vigencia", aluguel, reajuste.pk))

    assert resposta.status_code == 200
    assert [v["valor"] for v in resposta.json()["valores"]] == ["100.00"]


def test_remover_vigencia_de_outro_recorrente_responde_404(api_client_logado):
    aluguel = criar_recorrente(nome="Aluguel")
    outro = criar_recorrente(nome="Internet")

    resposta = api_client_logado.delete(_url("remover-vigencia", aluguel, outro.valores.get().pk))

    assert resposta.status_code == 404


def test_informar_e_limpar_valor_do_mes(api_client_logado):
    energia = criar_recorrente(nome="Energia", variavel=True)
    url = _url("valor-do-mes", energia, "2026-11")

    informado = api_client_logado.put(url, {"valor": "432.80"}, format="json")
    corrigido = api_client_logado.put(url, {"valor": "432.90"}, format="json")

    assert informado.status_code == 200
    assert corrigido.json() == {"valor": "432.90"}
    assert ValorDoMes.objects.get().valor == D("432.90")

    assert api_client_logado.delete(url).status_code == 204
    assert not ValorDoMes.objects.exists()


def test_valor_do_mes_exige_valor(api_client_logado):
    energia = criar_recorrente(nome="Energia", variavel=True)

    resposta = api_client_logado.put(_url("valor-do-mes", energia, "2026-11"), {}, format="json")

    assert resposta.status_code == 400


def test_excluir_apaga_vigencias_e_valores_do_mes(api_client_logado):
    energia = criar_recorrente(nome="Energia")
    RecorrenteService().definir_no_mes(energia, competencia=date(2026, 3, 1), valor=D("1.00"))

    assert api_client_logado.delete(_url("detail", energia)).status_code == 204
    assert not Recorrente.objects.exists()
