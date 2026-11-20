import pytest

from fatura_facil.services.planilha.texto import chave, nome_de_exibicao, separar_parcela


@pytest.mark.parametrize(
    ("texto", "esperado"),
    [
        ("Ipad 10/08", ("Ipad", 8, 10)),
        ("Imo (09/06)", ("Imo", 6, 9)),
        ("Pc 15/15", ("Pc", 15, 15)),
        ("Taxa passagem 03/01 ", ("Taxa passagem", 1, 3)),
        ("12/01", ("12/01", 1, 12)),
    ],
)
def test_separa_parcela_total_atual(texto, esperado):
    assert separar_parcela(texto) == esperado


@pytest.mark.parametrize("texto", ["Mercado", "1,99", "Algo 03/05", "Algo 01/01", "Algo 03/00", ""])
def test_nao_e_parcela(texto):
    assert separar_parcela(texto) is None


def test_chave_ignora_acento_caixa_pontuacao_e_calc():
    assert chave("Salário Calc.") == chave("salario") == "salario"
    assert chave("Aux. Home Office") == chave("Aux.Home Office")
    assert chave("Mãe") == "mae"


def test_nome_de_exibicao_tira_calc():
    assert nome_de_exibicao("INSS  Calc.") == "INSS"
    assert nome_de_exibicao(" Aluguel ") == "Aluguel"
