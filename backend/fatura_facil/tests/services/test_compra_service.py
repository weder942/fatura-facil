from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Lancamento
from fatura_facil.services.compra_service import CompraService
from fatura_facil.tests.factories import FonteFactory, criar_compra

pytestmark = pytest.mark.django_db
D = Decimal


def _parcelas(compra):
    return [
        (lancamento.parcela, lancamento.competencia, lancamento.valor, lancamento.fonte_id)
        for lancamento in compra.lancamentos.order_by("parcela")
    ]


def _confirmar(compra, parcela, valor=None):
    lancamento = compra.lancamentos.get(parcela=parcela)
    lancamento.status = Lancamento.Status.CONFIRMADO
    if valor is not None:
        lancamento.valor = valor
    lancamento.save()


class TestCompetenciaSugerida:
    def test_cartao_usa_fechamento_e_vencimento(self):
        cartao = FonteFactory(cartao=True)

        assert CompraService.competencia_sugerida(cartao, date(2026, 11, 25)) == date(2027, 1, 1)

    def test_dinheiro_usa_o_mes_da_data(self):
        assert CompraService.competencia_sugerida(FonteFactory(), date(2026, 11, 25)) == date(2026, 11, 1)


class TestCriar:
    def test_gera_as_parcelas_na_fonte_e_competencias_certas(self):
        cartao = FonteFactory(cartao=True)

        compra = criar_compra(fonte=cartao, data=date(2026, 11, 24), valor_total=D("416.00"), n_parcelas=3)

        assert compra.competencia_inicial == date(2026, 12, 1)
        assert _parcelas(compra) == [
            (1, date(2026, 12, 1), D("138.68"), cartao.pk),
            (2, date(2027, 1, 1), D("138.66"), cartao.pk),
            (3, date(2027, 2, 1), D("138.66"), cartao.pk),
        ]
        assert set(compra.lancamentos.values_list("status", "tipo", "origem")) == {("previsto", "normal", "manual")}

    def test_competencia_informada_prevalece(self):
        compra = criar_compra(fonte=FonteFactory(cartao=True), competencia_inicial=date(2027, 3, 1))

        assert compra.lancamentos.get().competencia == date(2027, 3, 1)

    def test_recusa_fonte_inativa(self):
        with pytest.raises(RegraDeNegocioError):
            criar_compra(fonte=FonteFactory(ativa=False))

    def test_valor_invalido_nao_cria_nada(self):
        fonte = FonteFactory()

        with pytest.raises(RegraDeNegocioError):
            criar_compra(fonte=fonte, valor_total=D("0.02"), n_parcelas=3)

        assert not fonte.compras.exists()


class TestAtualizar:
    def test_mudar_total_regera_parcelas(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3)

        CompraService().atualizar(compra, valor_total=D("416.00"))

        assert [p[2] for p in _parcelas(compra)] == [D("138.68"), D("138.66"), D("138.66")]
        assert compra.valor_total == D("416.00")

    # Critério de aceite do MVP (1.3).
    def test_confirmadas_nao_mudam_e_o_restante_e_redistribuido(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3)
        _confirmar(compra, 1)

        CompraService().atualizar(compra, valor_total=D("330.00"))

        assert [(p[0], p[2]) for p in _parcelas(compra)] == [(1, D("100.00")), (2, D("115.00")), (3, D("115.00"))]
        assert compra.lancamentos.get(parcela=1).status == Lancamento.Status.CONFIRMADO

    def test_mudar_numero_de_parcelas(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3, data=date(2026, 11, 10))

        CompraService().atualizar(compra, n_parcelas=2)

        assert [(p[0], p[1], p[2]) for p in _parcelas(compra)] == [
            (1, date(2026, 11, 1), D("150.00")),
            (2, date(2026, 12, 1), D("150.00")),
        ]

    def test_mudar_competencia_inicial_move_as_parcelas(self):
        compra = criar_compra(n_parcelas=2)

        CompraService().atualizar(compra, competencia_inicial=date(2027, 1, 1))

        assert [p[1] for p in _parcelas(compra)] == [date(2027, 1, 1), date(2027, 2, 1)]

    def test_mudar_a_data_recalcula_a_competencia(self):
        compra = criar_compra(fonte=FonteFactory(cartao=True), data=date(2026, 11, 24))

        CompraService().atualizar(compra, data=date(2026, 11, 26))

        assert compra.competencia_inicial == date(2027, 1, 1)
        assert compra.lancamentos.get().competencia == date(2027, 1, 1)

    def test_mudar_a_fonte_move_os_lancamentos(self):
        compra = criar_compra(data=date(2026, 11, 26))
        cartao = FonteFactory(cartao=True)

        CompraService().atualizar(compra, fonte=cartao)

        assert _parcelas(compra) == [(1, date(2027, 1, 1), D("100.00"), cartao.pk)]

    def test_nao_muda_a_fonte_com_parcela_confirmada(self):
        compra = criar_compra(n_parcelas=2)
        _confirmar(compra, 1)

        with pytest.raises(RegraDeNegocioError):
            CompraService().atualizar(compra, fonte=FonteFactory())

    def test_nao_muda_para_fonte_inativa(self):
        compra = criar_compra()

        with pytest.raises(RegraDeNegocioError):
            CompraService().atualizar(compra, fonte=FonteFactory(ativa=False))

    def test_so_a_descricao_preserva_ajuste_de_centavos(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3)
        CompraService().ajustar_parcela(compra.lancamentos.get(parcela=2), D("100.01"))

        CompraService().atualizar(compra, descricao="Novo nome")

        assert compra.lancamentos.get(parcela=2).valor == D("100.01")
        compra.refresh_from_db()
        assert compra.descricao == "Novo nome"

    def test_falha_na_redistribuicao_nao_altera_nada(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3)
        _confirmar(compra, 3)

        with pytest.raises(RegraDeNegocioError):
            CompraService().atualizar(compra, n_parcelas=2)

        compra.refresh_from_db()
        assert compra.n_parcelas == 3
        assert compra.lancamentos.count() == 3

    def test_recusa_campo_nao_editavel(self):
        with pytest.raises(ValueError):
            CompraService().atualizar(criar_compra(), origem="importacao")


class TestAjustarParcela:
    def test_total_da_compra_acompanha(self):
        compra = criar_compra(valor_total=D("416.00"), n_parcelas=3)

        CompraService().ajustar_parcela(compra.lancamentos.get(parcela=1), D("138.67"))

        compra.refresh_from_db()
        assert compra.valor_total == D("415.99")

    @pytest.mark.parametrize("valor", [D("0"), D("-1.00"), D("1.001")])
    def test_recusa_valor_invalido(self, valor):
        compra = criar_compra()

        with pytest.raises(RegraDeNegocioError):
            CompraService().ajustar_parcela(compra.lancamentos.get(), valor)

    def test_recusa_lancamento_que_nao_e_parcela(self):
        compra = criar_compra()
        lancamento = compra.lancamentos.get()
        lancamento.tipo = Lancamento.Tipo.ESTORNO

        with pytest.raises(RegraDeNegocioError):
            CompraService().ajustar_parcela(lancamento, D("1.00"))


class TestValorDaPrimeiraParcela:
    def test_criar_com_a_primeira_informada(self):
        compra = criar_compra(valor_total=D("416.00"), n_parcelas=3, valor_primeira_parcela=D("138.66"))

        assert [p[2] for p in _parcelas(compra)] == [D("138.66"), D("138.67"), D("138.67")]

    def test_editar_a_primeira_regera_as_demais(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3)

        CompraService().atualizar(compra, valor_primeira_parcela=D("120.00"))

        assert [p[2] for p in _parcelas(compra)] == [D("120.00"), D("90.00"), D("90.00")]

    def test_editar_o_total_sem_a_primeira_volta_a_dividir_igual(self):
        compra = criar_compra(valor_total=D("300.00"), n_parcelas=3, valor_primeira_parcela=D("120.00"))

        CompraService().atualizar(compra, valor_total=D("330.00"))

        assert [p[2] for p in _parcelas(compra)] == [D("110.00"), D("110.00"), D("110.00")]


def test_compra_importada_incompleta_nao_regera_parcelas():
    from fatura_facil.models import Compra, Lancamento
    from fatura_facil.tests.factories import FonteFactory

    fonte = FonteFactory()
    compra = Compra.objects.create(
        fonte=fonte,
        data=date(2026, 5, 1),
        descricao="Ipad",
        valor_total=Decimal("199.99"),
        n_parcelas=10,
        competencia_inicial=date(2026, 5, 1),
        origem="planilha",
    )
    Lancamento.objects.create(
        compra=compra, fonte=fonte, competencia=date(2026, 12, 1), parcela=8, valor=Decimal("199.99")
    )

    with pytest.raises(RegraDeNegocioError, match="sem as primeiras parcelas"):
        CompraService().atualizar(compra, valor_total=Decimal("300.00"))

    CompraService().atualizar(compra, descricao="iPad")
    assert compra.descricao == "iPad"
