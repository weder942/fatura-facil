from datetime import date
from decimal import Decimal

from fatura_facil.services.planilha.leitura import ItemDaPlanilha
from fatura_facil.services.planilha.recorrentes import PlanoDeAvulso, Vigencia, planejar_grupo

D = Decimal


def _mes(n):
    return date(2025 + (n - 1) // 12, (n - 1) % 12 + 1, 1)


def _meses(*colunas):
    """Cada argumento é a lista de (descrição, valor) de um mês, a partir de jan/2025."""
    return [
        (_mes(n), [ItemDaPlanilha(descricao, D(str(valor)), "x") for descricao, valor in itens])
        for n, itens in enumerate(colunas, start=1)
    ]


def test_tres_meses_seguidos_viram_recorrente_com_reajuste():
    meses = _meses(*([[("Aluguel", "1201.99")]] * 3), *([[("Aluguel", "1277.99")]] * 3))

    [aluguel], avulsos = planejar_grupo(meses, ultima_competencia=_mes(6))

    assert avulsos == []
    assert (aluguel.nome, aluguel.variavel) == ("Aluguel", False)
    assert aluguel.vigencias == [Vigencia(D("1201.99"), _mes(1), None), Vigencia(D("1277.99"), _mes(4), None)]


def test_mudanca_que_volta_no_mes_seguinte_e_ajuste_do_mes():
    meses = _meses(*[[("Salário Calc.", valor)] for valor in ("100", "100", "130", "100", "100")])

    [salario], _ = planejar_grupo(meses, ultima_competencia=_mes(5))

    assert salario.nome == "Salário"
    assert salario.vigencias == [Vigencia(D("100"), _mes(1), None)]
    assert salario.valores_do_mes == {_mes(3): D("130")}


def test_variavel_tem_uma_vigencia_e_o_valor_real_de_cada_mes():
    meses = _meses(*[[("Energia", valor)] for valor in ("380.40", "320.44", "432.80", "300.00")])

    [energia], _ = planejar_grupo(meses, ultima_competencia=_mes(4))

    assert energia.variavel
    assert energia.vigencias == [Vigencia(D("380.40"), _mes(1), None)]
    assert list(energia.valores_do_mes.values()) == [D("380.40"), D("320.44"), D("432.80"), D("300.00")]


def test_lacuna_encerra_e_mes_isolado_vira_valor_do_mes():
    meses = _meses(
        [("Moto", "75")],
        [("Moto", "75")],
        [("Moto", "75")],
        [],
        [("Moto", "50")],
        [],
        [("Moto", "60")],
        [("Moto", "60")],
        [("Moto", "60")],
    )

    [moto], _ = planejar_grupo(meses, ultima_competencia=_mes(12))

    assert moto.vigencias == [Vigencia(D("75"), _mes(1), _mes(3)), Vigencia(D("60"), _mes(7), _mes(9))]
    assert moto.valores_do_mes == {_mes(5): D("50")}


def test_variavel_que_termina_antes_do_fim():
    meses = _meses(*[[("Jet", valor)] for valor in ("1", "2", "3")], [])

    [jet], _ = planejar_grupo(meses, ultima_competencia=_mes(4))

    assert jet.vigencias == [Vigencia(D("1"), _mes(1), _mes(3))]


def test_poucos_meses_ou_meses_soltos_viram_avulsos_com_o_texto_original():
    meses = _meses(
        [("Icloud (Natalia)", "66.90")], [], [("Icloud (Natalia)", "66.90")], [], [("Etanol", "10"), ("Etanol", "20")]
    )

    recorrentes, avulsos = planejar_grupo(meses, ultima_competencia=_mes(5))

    assert recorrentes == []
    assert avulsos == [
        PlanoDeAvulso(_mes(1), "Icloud (Natalia)", D("66.90")),
        PlanoDeAvulso(_mes(3), "Icloud (Natalia)", D("66.90")),
        PlanoDeAvulso(_mes(5), "Etanol", D("10")),
        PlanoDeAvulso(_mes(5), "Etanol", D("20")),
    ]


def test_sem_descricao_sempre_avulso():
    meses = _meses([("", "5")], [("", "5")], [("", "5")])

    recorrentes, avulsos = planejar_grupo(meses, ultima_competencia=_mes(3))

    assert recorrentes == []
    assert [avulso.descricao for avulso in avulsos] == ["(sem descrição)"] * 3


def test_nomes_repetidos_no_mes_e_sinonimos():
    mes = [("Aluguel", "1"), ("Mãe", "75"), ("Psiquiatria", "200"), ("Mãe", "300"), ("Mãe", "9")]
    meses = _meses(mes, mes, [*mes[:2], ("Psiquiatra", "200"), *mes[3:]])

    recorrentes, _ = planejar_grupo(
        meses,
        ultima_competencia=_mes(3),
        nomes_repetidos={"mae": ("Mãe saúde", "Mãe")},
        sinonimos={"psiquiatria": "psiquiatra"},
    )

    assert [(r.nome, r.vigencias[0].valor) for r in recorrentes] == [
        ("Aluguel", D("1")),
        ("Mãe saúde", D("75")),
        ("Psiquiatra", D("200")),
        ("Mãe", D("300")),
        ("Mãe 3", D("9")),
    ]
