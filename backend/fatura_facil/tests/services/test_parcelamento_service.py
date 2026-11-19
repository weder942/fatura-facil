from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.services.parcelamento_service import (
    Parcela,
    dividir_valor,
    gerar_parcelas,
    redistribuir_parcelas,
)

D = Decimal


class TestDividirValor:
    # Critério de aceite do MVP (1.3).
    def test_sobra_dos_centavos_vai_para_a_primeira_parcela(self):
        assert dividir_valor(D("416.00"), 3) == [D("138.68"), D("138.66"), D("138.66")]

    # Caso real do Mercado Livre (2.4): divisão exata.
    def test_divisao_exata(self):
        assert dividir_valor(D("474.05"), 5) == [D("94.81")] * 5

    def test_a_vista_e_uma_parcela_com_o_total(self):
        assert dividir_valor(D("12.00"), 1) == [D("12.00")]

    def test_parcelas_sempre_com_duas_casas(self):
        assert [str(v) for v in dividir_valor(D("100"), 3)] == ["33.34", "33.33", "33.33"]

    @pytest.mark.parametrize(
        ("total", "n"),
        [
            (total, n)
            for total in ["0.01", "1.00", "99.99", "416.00", "1000.00", "12345.67"]
            for n in [1, 2, 3, 5, 7, 10, 12, 24]
            if D(total) * 100 >= n  # pelo menos 1 centavo por parcela
        ],
    )
    def test_soma_das_parcelas_e_sempre_o_total(self, total, n):
        parcelas = dividir_valor(D(total), n)

        assert len(parcelas) == n
        assert sum(parcelas) == D(total)
        assert parcelas[0] >= parcelas[-1]
        assert len(set(parcelas[1:])) <= 1

    @pytest.mark.parametrize("total", [D("0"), D("-10.00")])
    def test_recusa_total_zero_ou_negativo(self, total):
        with pytest.raises(RegraDeNegocioError):
            dividir_valor(total, 2)

    @pytest.mark.parametrize("n", [0, -1])
    def test_recusa_numero_de_parcelas_invalido(self, n):
        with pytest.raises(RegraDeNegocioError):
            dividir_valor(D("10.00"), n)

    def test_recusa_mais_de_dois_decimais(self):
        with pytest.raises(RegraDeNegocioError):
            dividir_valor(D("10.005"), 2)

    def test_recusa_parcela_menor_que_um_centavo(self):
        with pytest.raises(RegraDeNegocioError):
            dividir_valor(D("0.02"), 3)

    def test_recusa_float(self):
        with pytest.raises(TypeError):
            dividir_valor(10.0, 2)


class TestGerarParcelas:
    # Critério de aceite do MVP (1.3).
    def test_dez_parcelas_em_competencias_consecutivas(self):
        parcelas = gerar_parcelas(D("1000.00"), 10, date(2026, 12, 1))

        assert [p.numero for p in parcelas] == list(range(1, 11))
        assert parcelas[0].competencia == date(2026, 12, 1)
        assert parcelas[-1].competencia == date(2027, 9, 1)
        assert all(p.valor == D("100.00") for p in parcelas)

    def test_combina_valores_e_competencias(self):
        assert gerar_parcelas(D("416.00"), 3, date(2026, 11, 1)) == [
            Parcela(numero=1, competencia=date(2026, 11, 1), valor=D("138.68")),
            Parcela(numero=2, competencia=date(2026, 12, 1), valor=D("138.66")),
            Parcela(numero=3, competencia=date(2027, 1, 1), valor=D("138.66")),
        ]

    def test_recusa_competencia_que_nao_e_primeiro_dia(self):
        with pytest.raises(ValueError):
            gerar_parcelas(D("10.00"), 2, date(2026, 11, 15))


class TestRedistribuirParcelas:
    """Edição de compra: confirmadas não mudam; o restante é dividido entre as outras."""

    # Critério de aceite do MVP (1.3).
    def test_divide_o_restante_entre_as_nao_confirmadas(self):
        parcelas = redistribuir_parcelas(D("330.00"), 3, date(2026, 11, 1), confirmadas={1: D("100.00")})

        assert parcelas == [
            Parcela(numero=2, competencia=date(2026, 12, 1), valor=D("115.00")),
            Parcela(numero=3, competencia=date(2027, 1, 1), valor=D("115.00")),
        ]

    def test_sobra_vai_para_a_primeira_nao_confirmada(self):
        parcelas = redistribuir_parcelas(D("300.00"), 4, date(2026, 11, 1), confirmadas={1: D("75.00"), 3: D("80.00")})

        assert [(p.numero, p.valor) for p in parcelas] == [(2, D("72.50")), (4, D("72.50"))]

    def test_sobra_de_centavos_com_confirmada_no_meio(self):
        parcelas = redistribuir_parcelas(D("100.00"), 4, date(2026, 11, 1), confirmadas={2: D("10.00")})

        assert [(p.numero, p.valor) for p in parcelas] == [(1, D("30.00")), (3, D("30.00")), (4, D("30.00"))]
        parcelas = redistribuir_parcelas(D("100.01"), 4, date(2026, 11, 1), confirmadas={2: D("10.00")})
        assert [p.valor for p in parcelas] == [D("30.01"), D("30.00"), D("30.00")]

    def test_sem_confirmadas_equivale_a_gerar(self):
        assert redistribuir_parcelas(D("416.00"), 3, date(2026, 11, 1), confirmadas={}) == gerar_parcelas(
            D("416.00"), 3, date(2026, 11, 1)
        )

    def test_aumentar_o_numero_de_parcelas(self):
        parcelas = redistribuir_parcelas(D("300.00"), 5, date(2026, 11, 1), confirmadas={1: D("100.00")})

        assert [p.numero for p in parcelas] == [2, 3, 4, 5]
        assert sum(p.valor for p in parcelas) == D("200.00")
        assert parcelas[-1].competencia == date(2027, 3, 1)

    def test_todas_confirmadas_e_total_igual_nao_gera_nada(self):
        assert (
            redistribuir_parcelas(D("200.00"), 2, date(2026, 11, 1), confirmadas={1: D("100.00"), 2: D("100.00")}) == []
        )

    def test_todas_confirmadas_e_total_diferente_e_recusado(self):
        with pytest.raises(RegraDeNegocioError):
            redistribuir_parcelas(D("250.00"), 2, date(2026, 11, 1), confirmadas={1: D("100.00"), 2: D("100.00")})

    def test_recusa_reduzir_para_menos_parcelas_que_uma_confirmada(self):
        with pytest.raises(RegraDeNegocioError):
            redistribuir_parcelas(D("300.00"), 2, date(2026, 11, 1), confirmadas={3: D("100.00")})

    def test_recusa_total_menor_que_as_confirmadas(self):
        with pytest.raises(RegraDeNegocioError):
            redistribuir_parcelas(D("90.00"), 3, date(2026, 11, 1), confirmadas={1: D("100.00")})

    def test_recusa_restante_menor_que_um_centavo_por_parcela(self):
        with pytest.raises(RegraDeNegocioError):
            redistribuir_parcelas(D("100.01"), 3, date(2026, 11, 1), confirmadas={1: D("100.00")})
