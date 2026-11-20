from datetime import date
from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.models import Lancamento
from fatura_facil.tests.factories import FonteFactory, criar_compra

pytestmark = pytest.mark.django_db

LISTA = reverse("fatura_facil:compra-list")


def _detalhe(compra):
    return reverse("fatura_facil:compra-detail", args=[compra.pk])


def test_exige_login(api_client):
    assert api_client.get(LISTA).status_code == 401


def test_cria_compra_parcelada_no_cartao(api_client_logado):
    cartao = FonteFactory(cartao=True)

    resposta = api_client_logado.post(
        LISTA,
        {"fonte": cartao.pk, "data": "2026-11-24", "descricao": "Óculos", "valor_total": "416.00", "n_parcelas": 3},
        format="json",
    )

    assert resposta.status_code == 201
    corpo = resposta.json()
    assert corpo["competencia_inicial"] == "2026-12"
    assert corpo["valor_total"] == "416.00"
    assert corpo["origem"] == "manual"
    assert [(p["parcela"], p["competencia"], p["valor"]) for p in corpo["parcelas"]] == [
        (1, "2026-12", "138.68"),
        (2, "2027-01", "138.66"),
        (3, "2027-02", "138.66"),
    ]


def test_cria_com_competencia_escolhida(api_client_logado):
    fonte = FonteFactory()

    resposta = api_client_logado.post(
        LISTA,
        {
            "fonte": fonte.pk,
            "data": "2026-11-24",
            "descricao": "X",
            "valor_total": "10.00",
            "competencia_inicial": "2027-01",
        },
        format="json",
    )

    assert resposta.json()["parcelas"][0]["competencia"] == "2027-01"


@pytest.mark.parametrize(
    ("campo", "valor"),
    [
        ("valor_total", "0.00"),
        ("valor_total", "1.234"),
        ("n_parcelas", 0),
        ("n_parcelas", 121),
        ("competencia_inicial", "2027-13"),
    ],
)
def test_validacao_de_campos(api_client_logado, campo, valor):
    dados = {"fonte": FonteFactory().pk, "data": "2026-11-24", "descricao": "X", "valor_total": "10.00", campo: valor}

    resposta = api_client_logado.post(LISTA, dados, format="json")

    assert resposta.status_code == 400
    assert campo in resposta.json()


def test_regra_de_negocio_vira_detail(api_client_logado):
    dados = {"fonte": FonteFactory().pk, "data": "2026-11-24", "descricao": "X", "valor_total": "0.02", "n_parcelas": 3}

    resposta = api_client_logado.post(LISTA, dados, format="json")

    assert resposta.status_code == 400
    assert "detail" in resposta.json()


def test_lista_e_filtra_por_fonte(api_client_logado):
    fonte = FonteFactory()
    criar_compra(fonte=fonte, descricao="Desta fonte")
    criar_compra(descricao="De outra")

    assert len(api_client_logado.get(LISTA).json()) == 2
    resposta = api_client_logado.get(LISTA, {"fonte": fonte.pk})
    assert [c["descricao"] for c in resposta.json()] == ["Desta fonte"]


def test_edita_e_redistribui(api_client_logado):
    compra = criar_compra(valor_total=Decimal("300.00"), n_parcelas=3)
    primeira = compra.lancamentos.get(parcela=1)
    primeira.status = Lancamento.Status.CONFIRMADO
    primeira.save()

    resposta = api_client_logado.patch(_detalhe(compra), {"valor_total": "330.00"}, format="json")

    assert resposta.status_code == 200
    assert [p["valor"] for p in resposta.json()["parcelas"]] == ["100.00", "115.00", "115.00"]


def test_exclui_com_as_parcelas(api_client_logado):
    compra = criar_compra(n_parcelas=3)

    assert api_client_logado.delete(_detalhe(compra)).status_code == 204
    assert not Lancamento.objects.exists()


def test_detalhe(api_client_logado):
    compra = criar_compra(data=date(2026, 11, 10))

    assert api_client_logado.get(_detalhe(compra)).json()["data"] == "2026-11-10"


def test_lista_sem_uma_consulta_por_compra(api_client_logado, django_assert_max_num_queries):
    fonte = FonteFactory()
    for _ in range(5):
        criar_compra(fonte=fonte, n_parcelas=3)

    with django_assert_max_num_queries(4):
        resposta = api_client_logado.get(LISTA)

    assert len(resposta.json()) == 5


def test_cria_com_valor_da_primeira_parcela(api_client_logado):
    dados = {
        "fonte": FonteFactory().pk,
        "data": "2026-11-24",
        "descricao": "Óculos",
        "valor_total": "416.00",
        "n_parcelas": 3,
        "valor_primeira_parcela": "138.66",
    }

    resposta = api_client_logado.post(LISTA, dados, format="json")

    assert resposta.status_code == 201
    assert [p["valor"] for p in resposta.json()["parcelas"]] == ["138.66", "138.67", "138.67"]
    assert "valor_primeira_parcela" not in resposta.json()
