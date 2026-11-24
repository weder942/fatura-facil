import json
from datetime import date
from decimal import Decimal as D

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from fatura_facil.models import Compra, LoteImportacao
from fatura_facil.tests.factories import Cabecalho, Cartao, FonteFactory, Lancamento, criar_compra, criar_pdf_bradesco

pytestmark = pytest.mark.django_db

PREVIA = reverse("fatura_facil:importacao-previa")
IMPORTAR = reverse("fatura_facil:importacao-list")


@pytest.fixture
def cartao():
    return FonteFactory(nome="Bradesco", cartao=True, dia_fechamento=25, dia_vencimento=5)


def _arquivo():
    pdf = criar_pdf_bradesco(
        [
            Cartao("1234"),
            Cabecalho(),
            Lancamento("21/11", "RESTAURANTE", "33,69"),
            Lancamento("10/11", "PAGTO. POR DEB EM C/C", "-100,00"),
            Lancamento("03/10", "ELIANE PEREIRA 2/3", "138,66"),
        ],
        total="72,35",
    )
    return SimpleUploadedFile("fatura.pdf", pdf, content_type="application/pdf")


def test_previa(api_client_logado, cartao):
    oculos = criar_compra(
        fonte=cartao,
        descricao="Óculos",
        valor_total=D("416.01"),
        n_parcelas=3,
        competencia_inicial=date(2026, 11, 1),
    )

    resposta = api_client_logado.post(PREVIA, {"fonte": cartao.pk, "arquivo": _arquivo()}, format="multipart")

    assert resposta.status_code == 200
    corpo = resposta.json()
    assert {chave: valor for chave, valor in corpo.items() if chave not in ("linhas", "faltas")} == {
        "banco": "Bradesco Cartões",
        "emitida_em": "2026-11-24",
        "competencia": "2026-12",
        "competencia_sugerida": "2026-12",
        "total_da_fatura": "72.35",
        "total_lido": "172.35",
    }
    assert corpo["linhas"][0] == {
        "indice": 0,
        "data": "2026-11-21",
        "descricao": "RESTAURANTE",
        "cartao": "1234",
        "parcela": "",
        "valor": "33.69",
        "classificacao": "nova",
        "motivo": "",
        "vinculo": None,
        "decisao": "inserir",
        "decisoes": ["ignorar", "inserir"],
    }
    assert corpo["linhas"][2]["parcela"] == "2/3"
    assert corpo["linhas"][2]["vinculo"] == {
        "id": oculos.lancamentos.get(parcela=2).pk,
        "descricao": "Óculos",
        "competencia": "2026-12",
        "parcela": "2/3",
        "valor": "138.67",
    }
    assert [linha["classificacao"] for linha in corpo["linhas"]] == ["nova", "ignorada", "existente"]
    assert [falta["parcela"] for falta in corpo["faltas"]] == []


def test_previa_com_outra_competencia_e_arquivo_invalido(api_client_logado, cartao):
    resposta = api_client_logado.post(
        PREVIA, {"fonte": cartao.pk, "arquivo": _arquivo(), "competencia": "2027-01"}, format="multipart"
    )
    assert resposta.json()["competencia"] == "2027-01"

    invalido = SimpleUploadedFile("notas.txt", b"nada", content_type="text/plain")
    resposta = api_client_logado.post(PREVIA, {"fonte": cartao.pk, "arquivo": invalido}, format="multipart")
    assert resposta.status_code == 400
    assert resposta.json() == {"detail": "O arquivo não é um PDF."}


def test_importar(api_client_logado, cartao):
    resposta = api_client_logado.post(
        IMPORTAR,
        {"fonte": cartao.pk, "arquivo": _arquivo(), "competencia": "2026-12", "decisoes": json.dumps({"2": "ignorar"})},
        format="multipart",
    )

    assert resposta.status_code == 201
    lote = LoteImportacao.objects.get()
    assert resposta.json() == {
        "lote": lote.pk,
        "competencia": "2026-12",
        "criados": 1,
        "confirmados": 0,
        "ignorados": 1,
    }
    assert list(Compra.objects.values_list("descricao", flat=True)) == ["RESTAURANTE"]


def test_importar_exige_a_competencia(api_client_logado, cartao):
    resposta = api_client_logado.post(IMPORTAR, {"fonte": cartao.pk, "arquivo": _arquivo()}, format="multipart")

    assert resposta.status_code == 400
    assert "competencia" in resposta.json()


@pytest.mark.parametrize(
    ("decisoes", "erro"),
    [
        ("[1, 2]", "Envie um objeto {índice: decisão}."),
        ('{"a": "ignorar"}', "Os índices das linhas devem ser números."),
        ("{nao e json", "Valor deve ser JSON válido."),
    ],
)
def test_decisoes_invalidas(api_client_logado, cartao, decisoes, erro):
    resposta = api_client_logado.post(
        IMPORTAR,
        {"fonte": cartao.pk, "arquivo": _arquivo(), "competencia": "2026-12", "decisoes": decisoes},
        format="multipart",
    )

    assert resposta.status_code == 400
    assert resposta.json() == {"decisoes": [erro]}


def test_exige_login(api_client, cartao):
    assert api_client.post(PREVIA, {"fonte": cartao.pk, "arquivo": _arquivo()}, format="multipart").status_code == 401
