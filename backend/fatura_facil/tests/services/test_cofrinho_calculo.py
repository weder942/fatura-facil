from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.services.cofrinho_calculo import (
    Entrada,
    SaldoInsuficienteError,
    SemTaxaError,
    simular,
)
from fatura_facil.services.tributacao_service import taxa_diaria

D = Decimal
CDI = [(date(2026, 1, 1), D("13.65"))]
TAXA_102 = taxa_diaria(D("13.65"), D(102))


def _centavos(valor):
    return valor.quantize(D("0.01"))


def _simular(entradas, ate, inicio=None, cdi=CDI, percentuais=None):
    inicio = inicio or entradas[0][1]
    return simular(
        inicio=inicio,
        entradas=[Entrada(i, data, tipo, D(valor)) for i, (tipo, data, valor) in enumerate(entradas, start=1)],
        cdi=cdi,
        percentuais=percentuais or [(inicio, D(102))],
        ate=ate,
    )


class TestRendimento:
    def test_rende_o_saldo_do_dia_util_anterior(self):
        # Segunda 23/11 guarda; terça 24 rende o saldo de segunda.
        resultado = _simular([("guardado", date(2026, 11, 23), "1000")], ate=date(2026, 11, 24))

        assert [(r.data, r.valor) for r in resultado.rendimentos] == [(date(2026, 11, 24), D("0.52"))]
        assert resultado.saldo_bruto == D("1000.52")

    def test_fim_de_semana_e_feriado_nao_rendem(self):
        # Quinta 19/11 guarda; sexta 20/11 é feriado; sábado e domingo também não.
        resultado = _simular([("guardado", date(2026, 11, 19), "1000")], ate=date(2026, 11, 24))

        assert [r.data for r in resultado.rendimentos] == [date(2026, 11, 23), date(2026, 11, 24)]

    def test_guardado_no_fim_de_semana_so_rende_depois_do_dia_util_seguinte(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 13), "1000"), ("guardado", date(2026, 11, 14), "1000")],
            ate=date(2026, 11, 17),
        )

        segunda, terca = resultado.rendimentos
        assert segunda.valor == _centavos(D(1000) * TAXA_102)  # sábado ainda não conta
        assert terca.valor == _centavos((D(2000) + segunda.valor) * TAXA_102)

    def test_guardado_no_ultimo_dia_mesmo_sem_ser_util_entra_no_saldo(self):
        resultado = _simular([("guardado", date(2026, 11, 28), "1000")], ate=date(2026, 11, 28))

        assert resultado.saldo_bruto == D(1000)

    def test_usa_a_selic_e_o_percentual_vigentes_no_dia_util_anterior(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 23), "10000")],
            ate=date(2026, 11, 25),
            cdi=[(date(2026, 1, 1), D("13.65")), (date(2026, 11, 25), D("10.00"))],
            percentuais=[(date(2026, 11, 23), D(102)), (date(2026, 11, 24), D(200))],
        )

        terca, quarta = resultado.rendimentos
        assert terca.valor == _centavos(D(10000) * TAXA_102)
        # Quarta usa terça: percentual novo (200%), Selic antiga.
        assert quarta.valor == _centavos((D(10000) + terca.valor) * taxa_diaria(D("13.65"), D(200)))

    def test_rendimento_liquido_desconta_o_ir_do_prazo(self):
        resultado = _simular([("guardado", date(2026, 11, 23), "10000")], ate=date(2026, 11, 24))

        (rendimento,) = resultado.rendimentos
        assert rendimento.valor == D("5.18")
        assert rendimento.liquido == _centavos(D("5.18") * D("0.775"))

    def test_centavos_que_nao_rendem_nada(self):
        resultado = _simular([("guardado", date(2026, 11, 23), "0.01")], ate=date(2026, 11, 30))

        assert resultado.rendimentos == []

    def test_sem_saldo_nao_rende(self):
        resultado = _simular([("guardado", date(2026, 11, 23), "0")], ate=date(2026, 11, 30))

        assert resultado.rendimentos == []
        assert resultado.saldo_bruto == 0

    def test_sem_selic_vigente(self):
        with pytest.raises(SemTaxaError, match="taxa Selic vigente em 23/11/2026"):
            _simular(
                [("guardado", date(2026, 11, 23), "1000")],
                ate=date(2026, 11, 24),
                cdi=[(date(2026, 12, 1), D(10))],
            )


class TestResgate:
    def test_o_informado_e_o_que_caiu_na_conta(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "10000"), ("resgatado", date(2026, 11, 26), "1000")],
            ate=date(2026, 11, 26),
        )

        efeito = resultado.efeitos[2]
        assert efeito.liquido == D(1000)
        assert efeito.ir > 0
        assert efeito.iof > 0  # 24 dias: ainda tem IOF
        assert -efeito.valor == efeito.liquido + efeito.ir + efeito.iof

    def test_depois_de_30_dias_nao_tem_iof(self):
        resultado = _simular(
            [("guardado", date(2026, 10, 1), "10000"), ("resgatado", date(2026, 11, 26), "1000")],
            ate=date(2026, 11, 26),
        )

        assert resultado.efeitos[2].iof == 0
        assert resultado.efeitos[2].ir > 0

    def test_consome_os_aportes_mais_antigos_primeiro(self):
        # O aporte novo não tem ganho: resgatar só dele não teria imposto.
        entradas = [
            ("guardado", date(2026, 10, 1), "1000"),
            ("guardado", date(2026, 11, 26), "5000"),
            ("resgatado", date(2026, 11, 26), "500"),
        ]
        resultado = _simular(entradas, ate=date(2026, 11, 26))

        assert resultado.efeitos[3].ir > 0

    def test_resgatar_tudo_zera_o_saldo(self):
        guardar = [("guardado", date(2026, 11, 2), "1000")]
        disponivel = _simular(guardar, ate=date(2026, 11, 26)).saldo_liquido

        resultado = _simular([*guardar, ("resgatado", date(2026, 11, 26), str(disponivel))], ate=date(2026, 11, 26))

        assert resultado.saldo_bruto == 0
        assert resultado.efeitos[2].liquido == disponivel
        assert resultado.ir_estimado == resultado.iof_estimado == 0

    def test_resgatar_tudo_em_dois_aportes(self):
        guardar = [("guardado", date(2026, 11, 2), "1000"), ("guardado", date(2026, 11, 16), "1000")]
        disponivel = _simular(guardar, ate=date(2026, 11, 26)).saldo_liquido

        resultado = _simular([*guardar, ("resgatado", date(2026, 11, 26), str(disponivel))], ate=date(2026, 11, 26))

        assert resultado.saldo_bruto == 0

    def test_mais_que_o_saldo(self):
        with pytest.raises(SaldoInsuficienteError, match="só R\\$ 1000.00 líquidos") as erro:
            _simular(
                [("guardado", date(2026, 11, 23), "1000"), ("resgatado", date(2026, 11, 23), "1000.02")],
                ate=date(2026, 11, 23),
            )
        assert erro.value.data == date(2026, 11, 23)


class TestAjuste:
    def test_o_saldo_liquido_passa_a_ser_o_informado(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "10000"), ("ajuste", date(2026, 11, 26), "10100")],
            ate=date(2026, 11, 26),
        )

        assert abs(resultado.saldo_liquido - D(10100)) <= D("0.01")
        assert (
            resultado.efeitos[2].liquido
            == D(10100) - _simular([("guardado", date(2026, 11, 2), "10000")], ate=date(2026, 11, 26)).saldo_liquido
        )

    def test_ajuste_para_baixo(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "10000"), ("ajuste", date(2026, 11, 26), "9000")],
            ate=date(2026, 11, 26),
        )

        assert abs(resultado.saldo_liquido - D(9000)) <= D("0.01")
        assert resultado.efeitos[2].valor < 0

    def test_ajuste_para_zero(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "10000"), ("ajuste", date(2026, 11, 26), "0")],
            ate=date(2026, 11, 26),
        )

        assert resultado.saldo_bruto == 0

    def test_em_cofrinho_vazio_vira_um_aporte(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "0"), ("ajuste", date(2026, 11, 3), "500")],
            ate=date(2026, 11, 3),
        )

        assert resultado.saldo_bruto == D(500)
        assert resultado.meses[0].ajustes == D(500)


class TestMeses:
    def test_resumo_de_cada_mes_desde_o_inicio(self):
        resultado = _simular([("guardado", date(2026, 9, 15), "10000")], ate=date(2026, 11, 26))

        assert [mes.inicio for mes in resultado.meses] == [date(2026, 9, 1), date(2026, 10, 1), date(2026, 11, 1)]
        assert sum(mes.bruto for mes in resultado.meses) == sum(r.valor for r in resultado.rendimentos)
        assert resultado.ja_rendeu == sum(mes.liquido for mes in resultado.meses)
        assert resultado.saldo_liquido == D(10000) + resultado.ja_rendeu

    def test_iof_provisionado_volta_depois_de_30_dias(self):
        # Setembro: aporte recente, provisão de IOF. Outubro: passa dos 30 dias, o IOF é restituído.
        setembro, outubro, _ = _simular([("guardado", date(2026, 9, 15), "10000")], ate=date(2026, 11, 26)).meses

        assert setembro.iof > 0
        assert outubro.iof == -setembro.iof
        assert outubro.liquido > outubro.bruto - outubro.ir

    def test_impostos_retidos_entram_no_mes_do_resgate(self):
        resultado = _simular(
            [("guardado", date(2026, 11, 2), "10000"), ("resgatado", date(2026, 11, 26), "10000")],
            ate=date(2026, 11, 26),
        )

        (novembro,) = resultado.meses
        efeito = resultado.efeitos[2]
        assert novembro.liquido == novembro.bruto - novembro.ir - novembro.iof
        assert novembro.ir == efeito.ir + resultado.ir_estimado
        assert novembro.iof == efeito.iof + resultado.iof_estimado

    def test_mes_sem_movimento(self):
        resultado = _simular([("guardado", date(2026, 11, 30), "0")], inicio=date(2026, 10, 31), ate=date(2026, 11, 30))

        assert [mes.bruto for mes in resultado.meses] == [0, 0]
