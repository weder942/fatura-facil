from datetime import date
from decimal import Decimal

import pytest
from django.urls import reverse

from fatura_facil.models import Banco, Cofrinho, MovimentoDoCofrinho, TaxaSelic
from fatura_facil.tests.factories import BancoFactory

pytestmark = pytest.mark.django_db
COFRINHOS = reverse("fatura_facil:cofrinho-list")
BANCOS = reverse("fatura_facil:banco-list")
TAXAS = reverse("fatura_facil:taxa-selic-list")


@pytest.fixture(autouse=True)
def hoje(mocker):
    mocker.patch("django.utils.timezone.localdate", return_value=date(2026, 11, 26))


@pytest.fixture
def picpay():
    return BancoFactory(nome="PicPay")


@pytest.fixture
def selic(api_client_logado):
    resposta = api_client_logado.post(TAXAS, {"vigente_desde": "2026-09-18", "selic": "13.75"}, format="json")
    assert resposta.status_code == 201
    return resposta.json()


@pytest.fixture
def cofrinho(api_client_logado, selic, picpay):
    resposta = api_client_logado.post(
        COFRINHOS,
        {"nome": "Reserva", "banco": picpay.pk, "inicio": "2026-11-02", "saldo": "10000.00", "percentual": "102"},
        format="json",
    )
    assert resposta.status_code == 201
    return resposta.json()


def _url(nome, cofrinho, *args):
    return reverse(f"fatura_facil:cofrinho-{nome}", args=[cofrinho["id"], *args])


@pytest.mark.parametrize("url", [COFRINHOS, BANCOS, TAXAS])
def test_exige_login(api_client, url):
    assert api_client.get(url).status_code == 401


class TestBancos:
    def test_crud(self, api_client_logado):
        criado = api_client_logado.post(BANCOS, {"nome": "Nubank"}, format="json").json()
        assert criado == {"id": criado["id"], "nome": "Nubank", "ativo": True}

        url = reverse("fatura_facil:banco-detail", args=[criado["id"]])
        assert api_client_logado.patch(url, {"ativo": False}, format="json").json()["ativo"] is False
        assert api_client_logado.delete(url).status_code == 204
        assert not Banco.objects.exists()

    def test_nao_exclui_banco_com_cofrinho(self, api_client_logado, cofrinho, picpay):
        resposta = api_client_logado.delete(reverse("fatura_facil:banco-detail", args=[picpay.pk]))

        assert resposta.status_code == 400
        assert resposta.json() == {"detail": "Este banco tem cofrinhos. Desative-o em vez de excluir."}


class TestTaxasSelic:
    def test_cria_com_o_cdi_padrao_e_lista(self, api_client_logado, selic):
        assert selic == {"id": selic["id"], "vigente_desde": "2026-09-18", "selic": "13.75", "cdi": "13.65"}
        assert api_client_logado.get(TAXAS).json() == [selic]

    def test_cdi_informado(self, api_client_logado):
        resposta = api_client_logado.post(
            TAXAS, {"vigente_desde": "2026-09-18", "selic": "13.75", "cdi": "13.70"}, format="json"
        )

        assert resposta.json()["cdi"] == "13.70"

    def test_valida(self, api_client_logado):
        resposta = api_client_logado.post(TAXAS, {"vigente_desde": "2026-09-18", "selic": "0"}, format="json")

        assert resposta.status_code == 400
        assert "selic" in resposta.json()

    def test_exclui(self, api_client_logado, selic):
        resposta = api_client_logado.delete(reverse("fatura_facil:taxa-selic-detail", args=[selic["id"]]))

        assert resposta.status_code == 204
        assert not TaxaSelic.objects.exists()

    def test_nao_exclui_a_que_um_cofrinho_usa(self, api_client_logado, cofrinho, selic):
        resposta = api_client_logado.delete(reverse("fatura_facil:taxa-selic-detail", args=[selic["id"]]))

        assert resposta.status_code == 400


class TestCofrinhos:
    def test_cria(self, cofrinho, picpay):
        assert cofrinho == {
            "id": cofrinho["id"],
            "nome": "Reserva",
            "banco": picpay.pk,
            "banco_nome": "PicPay",
            "inicio": "2026-11-02",
            "percentual": "102.00",
            "percentuais": [{"vigente_desde": "2026-11-02", "percentual": "102.00"}],
            "saldo_bruto": cofrinho["saldo_bruto"],
            "saldo_liquido": cofrinho["saldo_liquido"],
            "ir_estimado": cofrinho["ir_estimado"],
            "iof_estimado": cofrinho["iof_estimado"],
            "ja_rendeu": cofrinho["ja_rendeu"],
            "rendeu_no_mes": cofrinho["ja_rendeu"],
        }
        bruto, liquido = Decimal(cofrinho["saldo_bruto"]), Decimal(cofrinho["saldo_liquido"])
        assert bruto > Decimal(10000)
        assert liquido == bruto - Decimal(cofrinho["ir_estimado"]) - Decimal(cofrinho["iof_estimado"])
        assert liquido == Decimal(10000) + Decimal(cofrinho["ja_rendeu"])

    def test_valida_a_entrada(self, api_client_logado, picpay):
        resposta = api_client_logado.post(COFRINHOS, {"nome": "X", "banco": picpay.pk}, format="json")

        assert resposta.status_code == 400
        assert set(resposta.json()) == {"inicio", "saldo", "percentual"}

    def test_lista_e_detalha_atualizando_os_rendimentos(self, api_client_logado, cofrinho, mocker):
        mocker.patch("django.utils.timezone.localdate", return_value=date(2026, 11, 30))

        (listado,) = api_client_logado.get(COFRINHOS).json()
        detalhe = api_client_logado.get(_url("detail", cofrinho)).json()

        assert listado == detalhe
        assert Decimal(detalhe["saldo_bruto"]) > Decimal(cofrinho["saldo_bruto"])
        assert Cofrinho.objects.get().rendimento_ate == date(2026, 11, 30)

    def test_altera_nome_e_banco(self, api_client_logado, cofrinho):
        nubank = BancoFactory(nome="Nubank")

        resposta = api_client_logado.patch(
            _url("detail", cofrinho), {"nome": "Viagem", "banco": nubank.pk}, format="json"
        )

        assert (resposta.json()["nome"], resposta.json()["banco_nome"]) == ("Viagem", "Nubank")

    def test_exclui(self, api_client_logado, cofrinho):
        assert api_client_logado.delete(_url("detail", cofrinho)).status_code == 204
        assert not MovimentoDoCofrinho.objects.exists()

    def test_novo_percentual(self, api_client_logado, cofrinho):
        resposta = api_client_logado.post(
            _url("percentual", cofrinho), {"percentual": "105", "a_partir_de": "2026-11-20"}, format="json"
        )

        assert resposta.status_code == 200
        assert resposta.json()["percentual"] == "105.00"
        assert resposta.json()["percentuais"] == [
            {"vigente_desde": "2026-11-20", "percentual": "105.00"},
            {"vigente_desde": "2026-11-02", "percentual": "102.00"},
        ]

    def test_percentual_futuro_ainda_nao_vale(self, api_client_logado, cofrinho):
        resposta = api_client_logado.post(
            _url("percentual", cofrinho), {"percentual": "105", "a_partir_de": "2026-12-01"}, format="json"
        )

        assert resposta.json()["percentual"] == "102.00"


class TestMovimentos:
    def test_resgata(self, api_client_logado, cofrinho):
        resposta = api_client_logado.post(
            _url("movimentos", cofrinho),
            {"tipo": "resgatado", "data": "2026-11-26", "informado": "1000"},
            format="json",
        )

        assert resposta.status_code == 201
        corpo = resposta.json()
        assert (corpo["tipo"], corpo["informado"], corpo["liquido"], corpo["inicial"]) == (
            "resgatado",
            "1000.00",
            "1000.00",
            False,
        )
        assert Decimal(corpo["valor"]) == -(Decimal(1000) + Decimal(corpo["ir"]) + Decimal(corpo["iof"]))

    def test_nao_informa_rendimento(self, api_client_logado, cofrinho):
        resposta = api_client_logado.post(
            _url("movimentos", cofrinho), {"tipo": "rendimento", "data": "2026-11-26", "informado": "1"}, format="json"
        )

        assert resposta.status_code == 400
        assert "tipo" in resposta.json()

    def test_resgate_maior_que_o_saldo(self, api_client_logado, cofrinho):
        resposta = api_client_logado.post(
            _url("movimentos", cofrinho),
            {"tipo": "resgatado", "data": "2026-11-26", "informado": "99999"},
            format="json",
        )

        assert resposta.status_code == 400
        assert "líquidos para resgatar" in resposta.json()["detail"]

    def test_exclui(self, api_client_logado, cofrinho):
        movimento = api_client_logado.post(
            _url("movimentos", cofrinho), {"tipo": "guardado", "data": "2026-11-26", "informado": "10"}, format="json"
        ).json()

        resposta = api_client_logado.delete(_url("excluir-movimento", cofrinho, movimento["id"]))

        assert resposta.status_code == 204
        assert not MovimentoDoCofrinho.objects.filter(pk=movimento["id"]).exists()

    def test_excluir_de_outro_cofrinho(self, api_client_logado, cofrinho):
        resposta = api_client_logado.delete(_url("excluir-movimento", cofrinho, 999999))

        assert resposta.status_code == 404

    def test_nao_exclui_o_inicial(self, api_client_logado, cofrinho):
        inicial = MovimentoDoCofrinho.objects.get(inicial=True)

        resposta = api_client_logado.delete(_url("excluir-movimento", cofrinho, inicial.pk))

        assert resposta.status_code == 400


class TestExtrato:
    def test_do_mais_recente_ao_mais_antigo(self, api_client_logado, cofrinho):
        extrato = api_client_logado.get(_url("extrato", cofrinho)).json()

        assert extrato[0]["data"] == "2026-11-26"
        assert extrato[-1]["inicial"] is True
        assert [m["data"] for m in extrato] == sorted((m["data"] for m in extrato), reverse=True)

    def test_filtra_e_limita(self, api_client_logado, cofrinho):
        rendimentos = api_client_logado.get(_url("extrato", cofrinho), {"tipo": "rendimento", "limite": 5}).json()
        guardados = api_client_logado.get(_url("extrato", cofrinho), {"tipo": "guardado"}).json()

        assert len(rendimentos) == 5
        assert {m["tipo"] for m in rendimentos} == {"rendimento"}
        assert rendimentos[0]["informado"] is None
        assert [m["inicial"] for m in guardados] == [True]

    def test_filtro_invalido(self, api_client_logado, cofrinho):
        resposta = api_client_logado.get(_url("extrato", cofrinho), {"tipo": "outro"})

        assert resposta.status_code == 400


def test_rendimentos_por_mes(api_client_logado, cofrinho):
    (novembro,) = api_client_logado.get(_url("rendimentos", cofrinho)).json()

    assert novembro["mes"] == "2026-11"
    assert set(novembro) == {"mes", "bruto", "ajustes", "ir", "iof", "liquido"}
    assert novembro["liquido"] == cofrinho["ja_rendeu"]
