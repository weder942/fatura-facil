from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.services.planilha.leitura import ler_planilha
from fatura_facil.tests.factories import criar_planilha

D = Decimal


def test_le_as_abas_de_mes_em_ordem_com_o_ano_do_arquivo(tmp_path):
    caminho = criar_planilha(
        tmp_path,
        "Contas 2025.xlsx",
        {
            "February": {"Nubank": [("Mercado", 10.5)]},
            "January": {"Fixas": [("Aluguel", 1277.99)], "Nubank": [("Ipad 10/08", 199.99)]},
            "Gastos viagem": {"Weder": [("Uber", 23.33)]},
        },
    )

    leitura = ler_planilha(caminho)

    assert [mes.competencia for mes in leitura.meses] == [date(2025, 1, 1), date(2025, 2, 1)]
    janeiro = leitura.meses[0]
    assert [coluna.cabecalho for coluna in janeiro.colunas] == ["Fixas", "Nubank"]
    item = janeiro.colunas[1].itens[0]
    assert (item.descricao, item.valor, item.celula) == ("Ipad 10/08", D("199.99"), "January 2025!C2")


def test_aceita_o_septmber_da_planilha(tmp_path):
    caminho = criar_planilha(tmp_path, "contas 2024.xlsx", {"Septmber": {"Nubank": [("x", 1)]}})

    assert ler_planilha(caminho).meses[0].competencia == date(2024, 9, 1)


def test_registra_problemas_por_coluna(tmp_path):
    caminho = criar_planilha(
        tmp_path,
        "Contas 2026.xlsx",
        {
            "March": {
                "Bradesco": [
                    ("Anotação", None),
                    (None, 40),
                    ("Texto", "R$ 48.22"),
                    ("Verdadeiro", True),
                    ("Ok", 0.1 + 0.2),
                    (None, None),
                ]
            }
        },
    )

    coluna = ler_planilha(caminho).meses[0].colunas[0]

    assert [(item.descricao, item.valor) for item in coluna.itens] == [("", D("40.00")), ("Ok", D("0.30"))]
    assert coluna.problemas == [
        "March 2026!A2: texto sem valor ignorado ('Anotação').",
        "March 2026!A3: valor 40.00 sem descrição.",
        "March 2026!A4: valor não numérico ignorado ('R$ 48.22').",
        "March 2026!A5: valor não numérico ignorado (True).",
    ]


def test_aba_vazia_e_cabecalho_em_branco(tmp_path):
    caminho = criar_planilha(tmp_path, "Contas 2026.xlsx", {"April": {}, "May": {" ": [("x", 1)]}})

    assert [mes.colunas for mes in ler_planilha(caminho).meses] == [[], []]


def test_coluna_alem_da_vigesima_sexta(tmp_path):
    colunas = {f"Coluna {n}": [] for n in range(13)}
    colunas["Nubank"] = [("x", 1)]
    caminho = criar_planilha(tmp_path, "Contas 2026.xlsx", {"June": colunas})

    assert ler_planilha(caminho).meses[0].colunas[-1].itens[0].celula == "June 2026!AA2"


def test_arquivo_sem_ano_no_nome(tmp_path):
    caminho = criar_planilha(tmp_path, "contas.xlsx", {"June": {}})

    with pytest.raises(ValueError, match="ano"):
        ler_planilha(caminho)
