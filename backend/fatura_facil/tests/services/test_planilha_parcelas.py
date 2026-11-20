from datetime import date
from decimal import Decimal

from fatura_facil.services.planilha.leitura import ItemDaPlanilha
from fatura_facil.services.planilha.parcelas import LancamentoSolto, ParcelaDaPlanilha, encadear

D = Decimal
NOV, DEZ, JAN, FEV = date(2025, 11, 1), date(2025, 12, 1), date(2026, 1, 1), date(2026, 2, 1)


def _meses(*meses):
    return [
        (competencia, [ItemDaPlanilha(descricao, D(valor), "x") for descricao, valor in itens])
        for competencia, itens in meses
    ]


def test_encadeia_parcelas_do_mesmo_nome_com_centavos_diferentes():
    meses = _meses(
        (NOV, [("Oculos 03/01", "138.68")]), (DEZ, [("Oculos 03/02", "138.67")]), (JAN, [("Oculos 03/03", "138.67")])
    )

    [cadeia], soltos = encadear(meses, ultima_competencia=FEV)

    assert soltos == []
    assert (cadeia.nome, cadeia.total, cadeia.competencia_inicial) == ("Oculos", 3, NOV)
    assert [p.numero for p in cadeia.parcelas] == [1, 2, 3]


def test_compra_ja_em_andamento_e_projetada_depois_do_fim():
    meses = _meses((DEZ, [("Ipad 10/08", "199.99")]), (JAN, [("Ipad 10/09", "199.99")]))

    [cadeia], _ = encadear(meses, ultima_competencia=JAN)

    assert cadeia.competencia_inicial == date(2025, 5, 1)
    assert cadeia.parcelas[-1] == ParcelaDaPlanilha(10, FEV, D("199.99"), projetada=True)


def test_nome_diferente_casa_so_pelo_valor_quase_igual_e_unico():
    meses = _meses(
        (NOV, [("Livelo 12/10", "42.65"), ("Ar 12/07", "180.67")]),
        (DEZ, [("Live 12/11", "42.65"), ("Arcondicionado 12/08", "180.74")]),
    )

    cadeias, _ = encadear(meses, ultima_competencia=FEV)

    assert [(c.nome, [p.numero for p in c.parcelas]) for c in cadeias] == [
        ("Livelo", [10, 11]),
        ("Ar", [7]),
        ("Arcondicionado", [8]),
    ]


def test_duas_compras_iguais_no_mesmo_mes_seguem_separadas():
    meses = _meses(
        (NOV, [("Ingles 12/04", "166.50"), ("Ingles 12/04", "12.42")]),
        (DEZ, [("Ingles 12/05", "12.42"), ("Ingles 12/05", "166.50")]),
    )

    cadeias, _ = encadear(meses, ultima_competencia=FEV)

    assert [[p.valor for p in c.parcelas] for c in cadeias] == [[D("166.50")] * 2, [D("12.42")] * 2]


def test_valor_muito_diferente_com_mesmo_nome_nao_encadeia():
    meses = _meses((NOV, [("Pneus 03/01", "100.00")]), (DEZ, [("Pneus 03/02", "200.00")]))

    assert len(encadear(meses, ultima_competencia=FEV)[0]) == 2


def test_a_vista_creditos_e_parcela_negativa_ficam_soltos():
    meses = _meses(
        (NOV, [("Mercado", "10.00"), ("Estorno seguro", "-290.09"), ("Desconto 03/01", "-1.00"), ("", "5.00")])
    )

    cadeias, soltos = encadear(meses, ultima_competencia=FEV)

    assert cadeias == []
    assert soltos == [
        LancamentoSolto(NOV, "Mercado", D("10.00")),
        LancamentoSolto(NOV, "Estorno seguro", D("-290.09")),
        LancamentoSolto(NOV, "Desconto 03/01", D("-1.00")),
        LancamentoSolto(NOV, "(sem descrição)", D("5.00")),
    ]
