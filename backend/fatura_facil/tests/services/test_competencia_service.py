from datetime import date

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.services.competencia_service import (
    competencia_da_compra_no_cartao,
    competencia_da_data,
    formatar_competencia,
    interpretar_competencia,
    somar_meses,
)


class TestCompetenciaDaData:
    @pytest.mark.parametrize(
        ("data", "esperado"),
        [
            (date(2026, 11, 1), date(2026, 11, 1)),
            (date(2026, 11, 19), date(2026, 11, 1)),
            (date(2026, 12, 31), date(2026, 12, 1)),
        ],
    )
    def test_e_o_primeiro_dia_do_mes_da_data(self, data, esperado):
        assert competencia_da_data(data) == esperado


class TestSomarMeses:
    @pytest.mark.parametrize(
        ("competencia", "meses", "esperado"),
        [
            (date(2026, 11, 1), 0, date(2026, 11, 1)),
            (date(2026, 11, 1), 1, date(2026, 12, 1)),
            (date(2026, 12, 1), 1, date(2027, 1, 1)),
            (date(2026, 12, 1), 9, date(2027, 9, 1)),
            (date(2026, 12, 1), 25, date(2029, 1, 1)),
            (date(2027, 1, 1), -1, date(2026, 12, 1)),
        ],
    )
    def test_soma_e_subtrai_meses_atravessando_o_ano(self, competencia, meses, esperado):
        assert somar_meses(competencia, meses) == esperado

    def test_recusa_data_que_nao_e_primeiro_dia(self):
        with pytest.raises(ValueError):
            somar_meses(date(2026, 11, 19), 1)


class TestCompetenciaDaCompraNoCartao:
    """Competência = mês do VENCIMENTO da fatura em que a compra entra.

    Compra com dia >= dia de fechamento vai para a fatura seguinte.
    """

    # Critério de aceite do MVP (1.3): fecha dia 25, vence dia 5.
    def test_compra_antes_do_fechamento_cai_na_fatura_que_fecha_no_mes(self):
        assert competencia_da_compra_no_cartao(date(2026, 11, 24), dia_fechamento=25, dia_vencimento=5) == date(
            2026, 12, 1
        )

    def test_compra_no_dia_do_fechamento_vai_para_a_fatura_seguinte(self):
        assert competencia_da_compra_no_cartao(date(2026, 11, 25), dia_fechamento=25, dia_vencimento=5) == date(
            2027, 1, 1
        )

    # Exemplo do CLAUDE.md: compra em 30/10 pode cair na fatura de dezembro.
    def test_compra_depois_do_fechamento_com_vencimento_no_mes_seguinte(self):
        assert competencia_da_compra_no_cartao(date(2026, 10, 30), dia_fechamento=25, dia_vencimento=5) == date(
            2026, 12, 1
        )

    @pytest.mark.parametrize(
        ("data", "esperado"),
        [
            # Vence no mesmo mês em que fecha (fecha 3, vence 10).
            (date(2026, 11, 2), date(2026, 11, 1)),
            (date(2026, 11, 3), date(2026, 12, 1)),
            (date(2026, 11, 30), date(2026, 12, 1)),
        ],
    )
    def test_vencimento_depois_do_fechamento_no_mesmo_mes(self, data, esperado):
        assert competencia_da_compra_no_cartao(data, dia_fechamento=3, dia_vencimento=10) == esperado

    def test_virada_de_ano(self):
        assert competencia_da_compra_no_cartao(date(2026, 12, 28), dia_fechamento=25, dia_vencimento=5) == date(
            2027, 2, 1
        )

    def test_vencimento_igual_ao_fechamento_vence_no_mes_seguinte(self):
        assert competencia_da_compra_no_cartao(date(2026, 11, 10), dia_fechamento=15, dia_vencimento=15) == date(
            2026, 12, 1
        )

    @pytest.mark.parametrize(
        ("data", "esperado"),
        [
            # Fechamento dia 31 em fevereiro fecha no último dia do mês (28).
            (date(2027, 2, 27), date(2027, 3, 1)),
            (date(2027, 2, 28), date(2027, 4, 1)),
        ],
    )
    def test_dia_de_fechamento_maior_que_o_mes_usa_o_ultimo_dia(self, data, esperado):
        assert competencia_da_compra_no_cartao(data, dia_fechamento=31, dia_vencimento=10) == esperado

    @pytest.mark.parametrize(("fechamento", "vencimento"), [(0, 5), (32, 5), (25, 0), (25, 32)])
    def test_recusa_dias_invalidos(self, fechamento, vencimento):
        with pytest.raises(RegraDeNegocioError):
            competencia_da_compra_no_cartao(date(2026, 11, 1), dia_fechamento=fechamento, dia_vencimento=vencimento)


class TestFormatarEInterpretar:
    def test_formata_como_ano_mes(self):
        assert formatar_competencia(date(2026, 1, 1)) == "2026-01"

    def test_interpreta_ano_mes(self):
        assert interpretar_competencia("2026-12") == date(2026, 12, 1)

    @pytest.mark.parametrize("valor", ["2026-13", "2026-1", "26-12", "2026/12", "2026-12-01", "", "abcd-ef"])
    def test_recusa_formato_invalido(self, valor):
        with pytest.raises(RegraDeNegocioError):
            interpretar_competencia(valor)
