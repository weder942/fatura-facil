from datetime import date
from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.models import Avulso, Grupo

pytestmark = pytest.mark.django_db
LISTA = reverse("fatura_facil:avulso-list")


def test_exige_login(api_client):
    assert api_client.get(LISTA).status_code == 401


def test_cria(api_client_logado):
    resposta = api_client_logado.post(
        LISTA,
        {"grupo": "rendimento", "competencia": "2026-11", "descricao": "Icloud (Natalia)", "valor": "66.90"},
        format="json",
    )

    assert resposta.status_code == 201
    assert resposta.json() == {
        "id": resposta.json()["id"],
        "grupo": "rendimento",
        "competencia": "2026-11",
        "descricao": "Icloud (Natalia)",
        "valor": "66.90",
    }


def test_filtra_por_competencia(api_client_logado):
    Avulso.objects.create(grupo=Grupo.FIXA, competencia=date(2026, 11, 1), descricao="Novembro", valor=Decimal(1))
    Avulso.objects.create(grupo=Grupo.FIXA, competencia=date(2026, 12, 1), descricao="Dezembro", valor=Decimal(1))

    resposta = api_client_logado.get(LISTA, {"competencia": "2026-12"})

    assert [a["descricao"] for a in resposta.json()] == ["Dezembro"]
    assert len(api_client_logado.get(LISTA).json()) == 2
