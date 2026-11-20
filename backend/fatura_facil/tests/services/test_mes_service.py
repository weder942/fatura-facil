from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.services.compra_service import CompraService
from fatura_facil.services.mes_service import MesService
from fatura_facil.tests.factories import FonteFactory, criar_compra

pytestmark = pytest.mark.django_db
D = Decimal
NOVEMBRO = date(2026, 11, 1)


def test_um_bloco_por_fonte_ativa_com_totais():
    dinheiro = FonteFactory(nome="Dinheiro", ordem=1)
    nubank = FonteFactory(nome="Nubank", ordem=2, cartao=True, dia_fechamento=3, dia_vencimento=10)
    FonteFactory(nome="Sem gastos", ordem=3)
    criar_compra(fonte=dinheiro, data=date(2026, 11, 10), valor_total=D("50.00"))
    criar_compra(fonte=dinheiro, data=date(2026, 11, 2), valor_total=D("20.00"))
    criar_compra(fonte=nubank, data=date(2026, 11, 1), valor_total=D("300.00"), n_parcelas=3)

    visao = MesService().visao(NOVEMBRO)

    assert [b.fonte.nome for b in visao.fontes] == ["Dinheiro", "Nubank", "Sem gastos"]
    assert [lanc.valor for lanc in visao.fontes[0].lancamentos] == [D("20.00"), D("50.00")]
    assert [b.total for b in visao.fontes] == [D("70.00"), D("100.00"), D("0.00")]
    assert visao.resumo.total_dinheiro_e_contas == D("70.00")
    assert visao.resumo.total_cartoes == D("100.00")
    assert visao.resumo.saldo == D("-170.00")
    assert visao.rendimentos == []
    assert visao.fixas == []


def test_so_entra_o_que_e_da_competencia():
    fonte = FonteFactory()
    criar_compra(fonte=fonte, data=date(2026, 10, 10), valor_total=D("200.00"), n_parcelas=2)

    visao = MesService().visao(NOVEMBRO)

    assert [lanc.parcela_formatada for lanc in visao.fontes[0].lancamentos] == ["2/2"]


def test_fonte_inativa_aparece_so_se_tiver_lancamento_no_mes():
    antiga = FonteFactory(nome="Antiga")
    criar_compra(fonte=antiga, data=date(2026, 11, 10))
    antiga.ativa = False
    antiga.save()
    FonteFactory(nome="Inativa vazia", ativa=False)

    visao = MesService().visao(NOVEMBRO)

    assert [b.fonte.nome for b in visao.fontes] == ["Antiga"]


def test_conta_soma_com_dinheiro_no_saldo():
    conta = FonteFactory(tipo="conta")
    criar_compra(fonte=conta, data=date(2026, 11, 10), valor_total=D("10.00"))

    assert MesService().visao(NOVEMBRO).resumo.total_dinheiro_e_contas == D("10.00")


def test_mes_sem_nada():
    visao = MesService().visao(NOVEMBRO)

    assert visao.fontes == []
    assert visao.resumo.saldo == D("0.00")


def test_parcela_ajustada_reflete_no_total():
    fonte = FonteFactory()
    compra = criar_compra(fonte=fonte, data=date(2026, 11, 10), valor_total=D("100.00"))
    CompraService().ajustar_parcela(compra.lancamentos.get(), D("99.90"))

    assert MesService().visao(NOVEMBRO).fontes[0].total == D("99.90")
