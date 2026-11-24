from datetime import date
from decimal import Decimal as D

import pytest

from fatura_facil.services.fatura.leitor import ler_fatura
from fatura_facil.services.fatura.leitura import FormatoDeFaturaDesconhecidoError, LinhaDaFatura
from fatura_facil.tests.factories import Cabecalho, Cartao, Lancamento, Texto, criar_pdf, criar_pdf_bradesco


def _ler(*paginas, **kwargs):
    return ler_fatura(criar_pdf_bradesco(*paginas, **kwargs))


def _resumo(linha: LinhaDaFatura):
    return linha.data, linha.descricao, linha.parcela, linha.n_parcelas, linha.valor


def test_le_emissao_total_e_lancamentos():
    fatura = _ler(
        [Cartao("1234"), Cabecalho(), Lancamento("21/11", "RESTAURANTE AGRIDOCE", "33,69")],
        total="33,69",
    )

    assert fatura.banco == "Bradesco Cartões"
    assert fatura.emitida_em == date(2026, 11, 24)
    assert fatura.total == D("33.69")
    assert [_resumo(linha) for linha in fatura.linhas] == [
        (date(2026, 11, 21), "RESTAURANTE AGRIDOCE", None, None, D("33.69"))
    ]
    assert fatura.linhas[0].cartao == "1234"
    assert fatura.linhas[0].texto == "21/11 RESTAURANTE AGRIDOCE 33,69"
    assert not fatura.linhas[0].parcelada


def test_parcela_no_fim_da_descricao():
    fatura = _ler([Cartao("1"), Cabecalho(), Lancamento("03/10", "ELIANE PEREIRA 2/3", "138,66")])

    assert _resumo(fatura.linhas[0]) == (date(2026, 10, 3), "ELIANE PEREIRA", 2, 3, D("138.66"))
    assert fatura.linhas[0].parcelada


def test_descricao_quebrada_acima_e_parcela_abaixo():
    fatura = _ler(
        [
            Cartao("1"),
            Cabecalho(),
            Lancamento("27/10", "", "94,81", acima="MERCADOLIVRE*MERCADOLIVRE", abaixo="2/5"),
            Lancamento("07/01", "", "42,65", acima="LIVELO*Clube Livelo SA 11", abaixo="/12"),
        ]
    )

    assert [_resumo(linha) for linha in fatura.linhas] == [
        (date(2026, 10, 27), "MERCADOLIVRE*MERCADOLIVRE", 2, 5, D("94.81")),
        (date(2026, 1, 7), "LIVELO*Clube Livelo SA", 11, 12, D("42.65")),
    ]


def test_ignora_o_valor_na_moeda_de_origem_e_le_negativos_e_milhares():
    fatura = _ler(
        [
            Cartao("1"),
            Cabecalho(),
            Lancamento("05/11", "TOME AUTO CENTER", "80,00", origem="80,00"),
            Lancamento("10/11", "PAGTO. POR DEB EM C/C", "-5.750,46"),
        ]
    )

    assert [(linha.descricao, linha.valor) for linha in fatura.linhas] == [
        ("TOME AUTO CENTER", D("80.00")),
        ("PAGTO. POR DEB EM C/C", D("-5750.46")),
    ]


def test_data_depois_da_emissao_e_do_ano_anterior():
    fatura = _ler([Cartao("1"), Cabecalho(), Lancamento("30/12", "ANTIGA 12/12", "10,00")])

    assert fatura.linhas[0].data == date(2025, 12, 30)


def test_varios_cartoes_e_paginas_sem_cabecalho():
    fatura = _ler(
        [Cartao("1111"), Cabecalho(), Lancamento("21/11", "PRIMEIRO", "1,00")],
        [
            Lancamento("20/11", "CONTINUA NA PAGINA 2", "2,00"),
            Texto(". Total para FULANO . . . R$ 3,00"),
            Cartao("2222"),
            Cabecalho(),
            Lancamento("19/11", "OUTRO CARTAO", "4,00"),
        ],
    )

    assert [(linha.cartao, linha.descricao) for linha in fatura.linhas] == [
        ("1111", "PRIMEIRO"),
        ("1111", "CONTINUA NA PAGINA 2"),
        ("2222", "OUTRO CARTAO"),
    ]
    assert fatura.total is None


def test_data_antes_do_primeiro_cabecalho_ou_sem_valor_nao_e_lancamento():
    fatura = _ler(
        [
            Texto("01/11", x=60),  # antes de saber onde ficam as colunas
            Cartao("1"),
            Cabecalho(),
            Texto("02/11", x=60),  # data sem valor na coluna R$
            Lancamento("03/11", "VALE", "1,00"),
        ]
    )

    assert [linha.descricao for linha in fatura.linhas] == ["VALE"]


def test_cabecalho_sem_coluna_moeda_e_ignorado():
    pdf = criar_pdf(
        [
            [
                (131, 64, "Aplicativo Bradesco Cartões"),
                (131, 95, "Data: 24/11/2026"),
                (111, 200, "Histórico"),
                (552, 200, "R$"),
                (60, 234, "21/11"),
                (110, 234, "SEM COLUNAS"),
                (540, 234, "1,00"),
            ]
        ]
    )

    assert ler_fatura(pdf).linhas == []


def test_extrato_bradesco_sem_data_de_emissao():
    pdf = criar_pdf([[(131, 64, "Aplicativo Bradesco Cartões")]])

    with pytest.raises(FormatoDeFaturaDesconhecidoError, match="data de emissão"):
        ler_fatura(pdf)


def test_pdf_de_outro_banco():
    pdf = criar_pdf([[(60, 60, "Fatura do Banco Qualquer")]])

    with pytest.raises(FormatoDeFaturaDesconhecidoError, match="só o extrato do app Bradesco"):
        ler_fatura(pdf)


def test_arquivo_que_nao_e_pdf():
    with pytest.raises(FormatoDeFaturaDesconhecidoError, match="não é um PDF"):
        ler_fatura(b"Data;Valor\n")


def test_pdf_corrompido():
    with pytest.raises(FormatoDeFaturaDesconhecidoError, match="Não consegui abrir"):
        ler_fatura(b"%PDF-1.4\nlixo")
