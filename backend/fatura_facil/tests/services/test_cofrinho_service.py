from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import MovimentoDoCofrinho, TaxaSelic
from fatura_facil.services.cofrinho_service import CofrinhoService, TaxaSelicService
from fatura_facil.tests.factories import BancoFactory

pytestmark = pytest.mark.django_db
D = Decimal
HOJE = date(2026, 11, 26)  # quinta
Tipo = MovimentoDoCofrinho.Tipo


@pytest.fixture(autouse=True)
def hoje(mocker):
    mocker.patch("django.utils.timezone.localdate", return_value=HOJE)


@pytest.fixture
def selic():
    return TaxaSelicService().salvar(vigente_desde=date(2026, 9, 18), selic=D("13.75"))


@pytest.fixture
def cofrinho(selic):
    return CofrinhoService().criar(
        nome="Reserva", banco=BancoFactory(nome="PicPay"), inicio=date(2026, 11, 2), saldo=D(10000), percentual=D(102)
    )


def _rendimentos(cofrinho):
    return list(cofrinho.movimentos.filter(tipo=Tipo.RENDIMENTO).order_by("data").values_list("data", "valor"))


class TestTaxaSelic:
    def test_cdi_padrao_e_a_selic_menos_dez_centesimos(self, selic):
        assert selic.cdi == D("13.65")

    def test_cdi_informado(self):
        taxa = TaxaSelicService().salvar(vigente_desde=date(2026, 9, 18), selic=D("13.75"), cdi=D("13.70"))

        assert taxa.cdi == D("13.70")

    def test_mesma_data_corrige_e_refaz_os_rendimentos(self, cofrinho):
        antes = _rendimentos(cofrinho)

        TaxaSelicService().salvar(vigente_desde=date(2026, 9, 18), selic=D("15.00"))

        assert TaxaSelic.objects.count() == 1
        depois = _rendimentos(cofrinho)
        assert [data for data, _ in depois] == [data for data, _ in antes]
        assert depois[0][1] > antes[0][1]

    def test_nova_taxa_so_muda_dali_em_diante(self, cofrinho):
        antes = dict(_rendimentos(cofrinho))

        TaxaSelicService().salvar(vigente_desde=date(2026, 11, 20), selic=D("10.00"))

        depois = dict(_rendimentos(cofrinho))
        assert depois[date(2026, 11, 19)] == antes[date(2026, 11, 19)]
        assert depois[date(2026, 11, 24)] < antes[date(2026, 11, 24)]

    def test_excluir_refaz_os_rendimentos(self, cofrinho):
        nova = TaxaSelicService().salvar(vigente_desde=date(2026, 11, 20), selic=D("10.00"))
        antes = dict(_rendimentos(cofrinho))

        TaxaSelicService().excluir(nova)

        assert dict(_rendimentos(cofrinho))[date(2026, 11, 24)] > antes[date(2026, 11, 24)]

    def test_nao_exclui_a_que_cobre_o_inicio_de_um_cofrinho(self, cofrinho, selic):
        with pytest.raises(RegraDeNegocioError, match="02/11/2026 ficaria sem Selic"):
            TaxaSelicService().excluir(selic)

    def test_exclui_qualquer_uma_sem_cofrinhos(self, selic):
        TaxaSelicService().excluir(selic)

        assert not TaxaSelic.objects.exists()


class TestCriar:
    def test_cria_com_o_saldo_inicial_e_os_rendimentos_ate_hoje(self, cofrinho):
        inicial = cofrinho.movimentos.get(inicial=True)
        assert (inicial.tipo, inicial.data, inicial.informado, inicial.valor) == (
            Tipo.GUARDADO,
            date(2026, 11, 2),
            D(10000),
            D(10000),
        )
        assert cofrinho.percentuais.get().percentual == D(102)
        # 2/11 é feriado: o primeiro dia útil é 3/11, que rende no dia 4.
        datas = [data for data, _ in _rendimentos(cofrinho)]
        assert datas[0] == date(2026, 11, 4)
        assert datas[-1] == HOJE
        assert cofrinho.rendimento_ate == HOJE

    def test_banco_inativo(self, selic):
        with pytest.raises(RegraDeNegocioError, match="inativo"):
            CofrinhoService().criar(
                nome="X", banco=BancoFactory(ativo=False), inicio=HOJE, saldo=D(1), percentual=D(100)
            )

    def test_no_futuro(self, selic):
        with pytest.raises(RegraDeNegocioError, match="futuro"):
            CofrinhoService().criar(
                nome="X", banco=BancoFactory(), inicio=date(2026, 11, 27), saldo=D(1), percentual=D(100)
            )

    def test_sem_selic(self):
        with pytest.raises(RegraDeNegocioError, match="Cadastre a taxa Selic vigente em 26/11/2026"):
            CofrinhoService().criar(nome="X", banco=BancoFactory(), inicio=HOJE, saldo=D(1), percentual=D(100))


class TestAtualizar:
    def test_gera_os_dias_que_passaram(self, cofrinho, mocker):
        segunda = date(2026, 11, 30)
        mocker.patch("django.utils.timezone.localdate", return_value=segunda)

        CofrinhoService().atualizar()

        cofrinho.refresh_from_db()
        assert cofrinho.rendimento_ate == segunda
        assert [data for data, _ in _rendimentos(cofrinho)][-3:] == [HOJE, date(2026, 11, 27), segunda]

    def test_em_dia_nao_mexe(self, cofrinho):
        ids = set(cofrinho.movimentos.values_list("id", flat=True))

        CofrinhoService().atualizar()

        assert set(cofrinho.movimentos.values_list("id", flat=True)) == ids


class TestMovimentar:
    def test_guardar_com_data_passada_refaz_dali_em_diante(self, cofrinho):
        antes = dict(_rendimentos(cofrinho))

        movimento = CofrinhoService().movimentar(
            cofrinho, tipo=Tipo.GUARDADO, data=date(2026, 11, 23), informado=D(5000)
        )

        assert movimento.valor == D(5000)
        depois = dict(_rendimentos(cofrinho))
        assert depois[date(2026, 11, 23)] == antes[date(2026, 11, 23)]
        assert depois[date(2026, 11, 24)] > antes[date(2026, 11, 24)]

    def test_resgatar_calcula_os_impostos(self, cofrinho):
        movimento = CofrinhoService().movimentar(cofrinho, tipo=Tipo.RESGATADO, data=HOJE, informado=D(1000))

        assert movimento.liquido == D(1000)
        assert movimento.ir > 0
        assert movimento.iof > 0
        assert movimento.valor == -(movimento.liquido + movimento.ir + movimento.iof)

    def test_resgate_retroativo_recalcula_os_impostos_dos_seguintes(self, cofrinho):
        resgate = CofrinhoService().movimentar(cofrinho, tipo=Tipo.RESGATADO, data=HOJE, informado=D(1000))

        CofrinhoService().movimentar(cofrinho, tipo=Tipo.GUARDADO, data=date(2026, 11, 3), informado=D(1000))

        resgate.refresh_from_db()
        assert resgate.ir != D(0)
        assert resgate.valor == -(resgate.liquido + resgate.ir + resgate.iof)

    def test_resgate_maior_que_o_saldo_nao_grava_nada(self, cofrinho):
        total = cofrinho.movimentos.count()

        with pytest.raises(RegraDeNegocioError, match="líquidos para resgatar"):
            CofrinhoService().movimentar(cofrinho, tipo=Tipo.RESGATADO, data=HOJE, informado=D(20000))

        assert cofrinho.movimentos.count() == total

    def test_ajuste_de_saldo(self, cofrinho):
        CofrinhoService().movimentar(cofrinho, tipo=Tipo.AJUSTE, data=HOJE, informado=D(10050))

        assert abs(CofrinhoService.simular(cofrinho).saldo_liquido - D(10050)) <= D("0.01")

    @pytest.mark.parametrize(
        ("tipo", "data", "informado", "erro"),
        [
            (Tipo.RENDIMENTO, HOJE, D(1), "calculados"),
            (Tipo.GUARDADO, date(2026, 11, 1), D(1), "entre 02/11/2026 e hoje"),
            (Tipo.GUARDADO, date(2026, 11, 27), D(1), "entre 02/11/2026 e hoje"),
            (Tipo.GUARDADO, HOJE, D(0), "maior que zero"),
            (Tipo.RESGATADO, HOJE, D(0), "maior que zero"),
        ],
    )
    def test_validacoes(self, cofrinho, tipo, data, informado, erro):
        with pytest.raises(RegraDeNegocioError, match=erro):
            CofrinhoService().movimentar(cofrinho, tipo=tipo, data=data, informado=informado)


class TestExcluirMovimento:
    def test_exclui_e_refaz(self, cofrinho):
        movimento = CofrinhoService().movimentar(
            cofrinho, tipo=Tipo.GUARDADO, data=date(2026, 11, 23), informado=D(5000)
        )
        antes = dict(_rendimentos(cofrinho))

        CofrinhoService().excluir_movimento(movimento)

        assert dict(_rendimentos(cofrinho))[date(2026, 11, 24)] < antes[date(2026, 11, 24)]

    def test_nao_exclui_o_resgate_se_o_saldo_nao_cobrir(self, cofrinho):
        guardado = CofrinhoService().movimentar(cofrinho, tipo=Tipo.GUARDADO, data=HOJE, informado=D(5000))
        CofrinhoService().movimentar(cofrinho, tipo=Tipo.RESGATADO, data=HOJE, informado=D(12000))
        pk = guardado.pk

        with pytest.raises(RegraDeNegocioError, match="líquidos para resgatar"):
            CofrinhoService().excluir_movimento(guardado)

        assert cofrinho.movimentos.filter(pk=pk).exists()

    def test_nao_exclui_rendimento(self, cofrinho):
        with pytest.raises(RegraDeNegocioError, match="calculados"):
            CofrinhoService().excluir_movimento(cofrinho.movimentos.filter(tipo=Tipo.RENDIMENTO).first())

    def test_nao_exclui_o_saldo_inicial(self, cofrinho):
        with pytest.raises(RegraDeNegocioError, match="saldo inicial"):
            CofrinhoService().excluir_movimento(cofrinho.movimentos.get(inicial=True))


class TestPercentual:
    def test_novo_percentual_refaz_dali_em_diante(self, cofrinho):
        antes = dict(_rendimentos(cofrinho))

        CofrinhoService().definir_percentual(cofrinho, percentual=D(105), a_partir_de=date(2026, 11, 20))

        depois = dict(_rendimentos(cofrinho))
        assert depois[date(2026, 11, 19)] == antes[date(2026, 11, 19)]
        assert depois[date(2026, 11, 24)] > antes[date(2026, 11, 24)]

    def test_na_mesma_data_corrige(self, cofrinho):
        CofrinhoService().definir_percentual(cofrinho, percentual=D(105), a_partir_de=date(2026, 11, 2))

        assert list(cofrinho.percentuais.values_list("percentual", flat=True)) == [D(105)]

    def test_antes_do_inicio(self, cofrinho):
        with pytest.raises(RegraDeNegocioError, match="começa em 02/11/2026"):
            CofrinhoService().definir_percentual(cofrinho, percentual=D(105), a_partir_de=date(2026, 11, 1))


def test_simulacao_sem_taxa_vira_regra_de_negocio(cofrinho):
    TaxaSelic.objects.all().delete()

    with pytest.raises(RegraDeNegocioError, match="Não há taxa Selic vigente"):
        CofrinhoService.simular(cofrinho)
