from datetime import date
from decimal import Decimal as D

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Compra, Lancamento, Origem
from fatura_facil.services import importacao_service
from fatura_facil.services.fatura.classificacao import Classificacao
from fatura_facil.services.importacao_service import ImportacaoService
from fatura_facil.tests.factories import (
    Cabecalho,
    Cartao,
    FonteFactory,
    criar_compra,
    criar_pdf_bradesco,
)
from fatura_facil.tests.factories import (
    Lancamento as Linha,
)

pytestmark = pytest.mark.django_db

DEZEMBRO = date(2026, 12, 1)
NOVEMBRO = date(2026, 11, 1)


@pytest.fixture
def cartao():
    return FonteFactory(nome="Bradesco", cartao=True, dia_fechamento=25, dia_vencimento=5)


def _pdf(*linhas, total=None):
    return criar_pdf_bradesco([Cartao("1234"), Cabecalho(), *linhas], total=total)


def _previa(fonte, *linhas, competencia=DEZEMBRO):
    return ImportacaoService().previa(fonte=fonte, conteudo=_pdf(*linhas), competencia=competencia)


def _importar(fonte, *linhas, decisoes=None):
    return ImportacaoService().importar(
        fonte=fonte, conteudo=_pdf(*linhas), nome_arquivo="fatura.pdf", competencia=DEZEMBRO, decisoes=decisoes
    )


def _classes(previa):
    return [(item.linha.descricao, item.classificacao) for item in previa.linhas]


def _compra(fonte, descricao="Compra", valor="100.00", n=1, competencia=DEZEMBRO, data=date(2026, 11, 10), **kw):
    return criar_compra(
        fonte=fonte,
        descricao=descricao,
        valor_total=D(valor),
        n_parcelas=n,
        competencia_inicial=competencia,
        data=data,
        **kw,
    )


def _no_mes(fonte, competencia):
    return sorted(
        (lancamento.descricao, lancamento.parcela_formatada, lancamento.valor)
        for lancamento in Lancamento.objects.filter(fonte=fonte, competencia=competencia)
    )


class TestCompetenciaSugerida:
    def test_cartao_usa_a_compra_mais_recente_sem_contar_pagamentos(self, cartao):
        previa = ImportacaoService().previa(
            fonte=cartao,
            conteudo=_pdf(Linha("21/11", "RESTAURANTE", "10,00"), Linha("23/11", "PAGTO. POR DEB EM C/C", "-5,00")),
        )

        assert previa.competencia_sugerida == DEZEMBRO
        assert previa.competencia == DEZEMBRO

    def test_fora_do_cartao_e_o_mes_seguinte_ao_da_compra(self):
        previa = ImportacaoService().previa(fonte=FonteFactory(), conteudo=_pdf(Linha("21/10", "PADARIA", "10,00")))

        assert previa.competencia_sugerida == NOVEMBRO

    def test_sem_lancamentos_usa_a_emissao(self):
        previa = ImportacaoService().previa(fonte=FonteFactory(), conteudo=_pdf())

        assert previa.competencia_sugerida == DEZEMBRO
        assert previa.linhas == []

    def test_competencia_escolhida_prevalece(self, cartao):
        previa = _previa(cartao, Linha("21/11", "RESTAURANTE", "10,00"), competencia=date(2027, 1, 1))

        assert previa.competencia == date(2027, 1, 1)
        assert previa.competencia_sugerida == DEZEMBRO


class TestValidacoes:
    def test_fonte_inativa(self):
        with pytest.raises(RegraDeNegocioError, match="inativa"):
            _previa(FonteFactory(nome="Velha", ativa=False))

    def test_arquivo_grande(self, cartao, mocker):
        mocker.patch.object(importacao_service, "TAMANHO_MAXIMO", 10)

        with pytest.raises(RegraDeNegocioError, match="5 MB"):
            _previa(cartao)

    def test_formato_desconhecido(self, cartao):
        with pytest.raises(RegraDeNegocioError, match="não é um PDF"):
            ImportacaoService().previa(fonte=cartao, conteudo=b"texto")


class TestClassificacao:
    def test_pagamento_saldo_e_valor_zero_sao_ignorados(self, cartao):
        previa = _previa(
            cartao,
            Linha("10/11", "SALDO ANTERIOR", "5.750,46"),
            Linha("10/11", "PAGTO. POR DEB EM C/C", "-5.750,46"),
            Linha("10/11", "", "-1.365,34", acima="PAGAMENTO RECEBIDO -", abaixo="OBRI"),
            Linha("11/11", "TARIFA", "0,00"),
            Linha("12/11", "UBER", "14,39"),
        )

        assert [classe for _, classe in _classes(previa)] == ["ignorada"] * 4 + ["nova"]
        assert previa.total_lido == D("14.39")

    def test_parcela_casa_pelo_numero_com_centavos_de_diferenca(self, cartao):
        oculos = _compra(cartao, "Óculos", "416.01", n=3, competencia=NOVEMBRO)  # 3 × 138,67

        previa = _previa(cartao, Linha("03/10", "ELIANE PEREIRA 2/3", "138,66"))

        item = previa.linhas[0]
        assert item.classificacao == Classificacao.EXISTENTE
        assert item.vinculo == oculos.lancamentos.get(parcela=2)
        assert item.motivo == ""

    def test_parcela_antecipada_de_outra_competencia(self, cartao):
        compra = _compra(cartao, "Mercado Livre", "474.05", n=5, competencia=NOVEMBRO)

        item = _previa(cartao, Linha("27/10", "MERCADOLIVRE 4/5", "94,81")).linhas[0]

        assert item.classificacao == Classificacao.EXISTENTE
        assert item.vinculo == compra.lancamentos.get(parcela=4)
        assert "antecipada" in item.motivo

    def test_parcela_prefere_a_mesma_descricao_original(self, cartao):
        _compra(cartao, "Outra", "195.20", n=2, competencia=NOVEMBRO)
        drogasil = _compra(cartao, "Farmácia", "195.20", n=2, competencia=NOVEMBRO, descricao_original="DROGASIL 3565")

        item = _previa(cartao, Linha("02/10", "DROGASIL 3565 2/2", "97,60")).linhas[0]

        assert item.vinculo.compra == drogasil

    def test_parcela_com_outro_valor_e_suspeita(self, cartao):
        _compra(cartao, "Mouse", "300.00", n=3, competencia=NOVEMBRO)

        assert _classes(_previa(cartao, Linha("17/06", "AMAZON BR 2/3", "97,13"))) == [("AMAZON BR", "suspeita")]

    def test_a_vista_casa_por_data_e_valor_uma_vez_so(self, cartao):
        uber = _compra(cartao, "Uber", "12.00", data=date(2026, 11, 12))

        previa = _previa(cartao, Linha("12/11", "UBER", "12,00"), Linha("12/11", "UBER", "12,00"))

        assert _classes(previa) == [("UBER", "existente"), ("UBER", "nova")]
        assert previa.linhas[0].vinculo == uber.lancamentos.get()

    def test_credito_casa_com_estorno_de_mesmo_valor(self, cartao):
        estorno = Lancamento.objects.create(
            fonte=cartao, competencia=DEZEMBRO, valor=D("-54.90"), tipo=Lancamento.Tipo.ESTORNO, texto="Estorno"
        )

        item = _previa(cartao, Linha("06/11", "MERCADOLIVRE", "-54,90")).linhas[0]

        assert (item.classificacao, item.vinculo) == (Classificacao.EXISTENTE, estorno)

    def test_suspeitas_preferem_a_descricao_mais_parecida(self, cartao):
        farmacia = _compra(cartao, "Farmácia manipulação", "110.00", data=DEZEMBRO)
        souza = _compra(cartao, "Souza Car", "110.00", data=DEZEMBRO)

        previa = _previa(
            cartao, Linha("29/10", "FARMACIA ARTESANAL", "110,00"), Linha("04/11", "JIM.COM SOUZA CAR", "110,00")
        )

        assert [(item.classificacao, item.vinculo.compra) for item in previa.linhas] == [
            ("suspeita", farmacia),
            ("suspeita", souza),
        ]
        assert "parecido" in previa.linhas[0].motivo

    def test_suspeita_por_valor_proximo_nao_cruza_sinal(self, cartao):
        _compra(cartao, "Clarisse", "12.00", data=DEZEMBRO)

        previa = _previa(cartao, Linha("03/11", "CLARISSE B", "11,99"), Linha("03/11", "CREDITO", "-12,00"))

        assert _classes(previa) == [("CLARISSE B", "suspeita"), ("CREDITO", "nova")]

    def test_parcelas_de_compra_que_ainda_nao_existe(self, cartao):
        previa = _previa(
            cartao,
            Linha("27/10", "MERCADOLIVRE 3/5", "94,81"),
            Linha("27/10", "MERCADOLIVRE 2/5", "94,81"),
            Linha("27/10", "MERCADOLIVRE 4/5", "94,81"),
        )

        assert _classes(previa) == [
            ("MERCADOLIVRE", "existente"),
            ("MERCADOLIVRE", "nova"),
            ("MERCADOLIVRE", "existente"),
        ]
        assert [item.parcela_de for item in previa.linhas] == [1, None, 1]

    def test_faltas_sao_as_previstas_da_competencia_que_nao_vieram(self, cartao):
        ar = _compra(cartao, "Ar", "200.00", n=2, competencia=NOVEMBRO)
        Lancamento.objects.create(fonte=cartao, competencia=DEZEMBRO, valor=D("-5.00"), tipo=Lancamento.Tipo.ESTORNO)
        confirmada = _compra(cartao, "Confirmada", "50.00").lancamentos.get()
        confirmada.status = Lancamento.Status.CONFIRMADO
        confirmada.save()

        previa = _previa(cartao, Linha("21/11", "RESTAURANTE", "33,69"))

        assert previa.faltas == [ar.lancamentos.get(parcela=2)]


class TestImportar:
    def test_cria_novas_e_confirma_existentes(self, cartao):
        oculos = _compra(cartao, "Óculos", "416.01", n=3, competencia=NOVEMBRO)  # 3 × 138,67

        resultado = _importar(
            cartao,
            Linha("03/10", "ELIANE PEREIRA 2/3", "138,66"),
            Linha("21/11", "RESTAURANTE", "33,69"),
            Linha("10/11", "PAGTO. POR DEB EM C/C", "-100,00"),
        )

        assert (resultado.criados, resultado.confirmados, resultado.ignorados) == (1, 1, 0)
        lote = resultado.lote
        assert (lote.fonte, lote.competencia, lote.nome_arquivo, len(lote.arquivo_hash)) == (
            cartao,
            DEZEMBRO,
            "fatura.pdf",
            64,
        )

        parcela = oculos.lancamentos.get(parcela=2)
        assert (parcela.valor, parcela.status, parcela.origem, parcela.lote, parcela.texto) == (
            D("138.66"),
            Lancamento.Status.CONFIRMADO,
            Origem.IMPORTACAO,
            lote,
            "ELIANE PEREIRA",
        )
        oculos.refresh_from_db()
        assert oculos.valor_total == D("416.00")
        assert oculos.descricao_original == "ELIANE PEREIRA"

        restaurante = Compra.objects.get(descricao="RESTAURANTE")
        assert (restaurante.data, restaurante.n_parcelas, restaurante.competencia_inicial, restaurante.origem) == (
            date(2026, 11, 21),
            1,
            DEZEMBRO,
            Origem.IMPORTACAO,
        )
        assert restaurante.lancamentos.get().status == Lancamento.Status.CONFIRMADO

    def test_vincular_suspeita_a_vista_traz_a_data_da_fatura(self, cartao):
        da_planilha = _compra(cartao, "Mercado", "31.92", data=DEZEMBRO, descricao_original="Mercado")

        _importar(cartao, Linha("08/11", "MendocaSuper", "31,92"))

        da_planilha.refresh_from_db()
        assert da_planilha.data == date(2026, 11, 8)
        assert da_planilha.descricao_original == "Mercado"
        assert da_planilha.lancamentos.get().texto == "MendocaSuper"

    def test_caso_do_mercado_livre_estornado_com_parcelas_antecipadas(self, cartao):
        # MVP: 474,05 em 5x, 1/5 em novembro; a fatura de dezembro traz 2/5 a 5/5 e o estorno.
        _compra(cartao, "Mercado Livre", "474.05", n=5, competencia=NOVEMBRO)

        _importar(
            cartao,
            Linha("06/11", "MERCADOLIVRE*MERCADOLIVRE", "-474,05"),
            *(Linha("27/10", "", "94,81", acima="MERCADOLIVRE*MERCADOLIVRE", abaixo=f"{k}/5") for k in range(2, 6)),
        )

        assert _no_mes(cartao, DEZEMBRO) == [
            ("MERCADOLIVRE*MERCADOLIVRE", "", D("-474.05")),
            *(("Mercado Livre", f"{k}/5", D("94.81")) for k in range(2, 6)),
        ]
        assert not Lancamento.objects.filter(fonte=cartao, competencia__gt=DEZEMBRO).exists()

    def test_parcela_sem_compra_cria_as_parcelas_dali_em_diante(self, cartao):
        _importar(cartao, Linha("14/10", "LITE *Vivo Anual 2/12", "30,00"))

        compra = Compra.objects.get()
        assert (compra.n_parcelas, compra.competencia_inicial, compra.valor_total, compra.data) == (
            12,
            NOVEMBRO,
            D("330.00"),
            date(2026, 10, 14),
        )
        parcelas = list(compra.lancamentos.order_by("parcela"))
        assert [(p.parcela, p.competencia, p.status) for p in parcelas[:2]] == [
            (2, DEZEMBRO, Lancamento.Status.CONFIRMADO),
            (3, date(2027, 1, 1), Lancamento.Status.PREVISTO),
        ]
        assert (parcelas[-1].parcela, parcelas[-1].competencia) == (12, date(2027, 10, 1))

    def test_parcelas_da_mesma_compra_nova_viram_uma_compra_so(self, cartao):
        _importar(cartao, *(Linha("27/10", f"MERCADOLIVRE {k}/5", "94,81") for k in range(2, 6)))

        compra = Compra.objects.get()
        assert _no_mes(cartao, DEZEMBRO) == [("MERCADOLIVRE", f"{k}/5", D("94.81")) for k in range(2, 6)]
        assert compra.lancamentos.filter(status=Lancamento.Status.CONFIRMADO).count() == 4

    def test_parcela_cuja_compra_nova_foi_ignorada_cria_a_propria(self, cartao):
        resultado = _importar(
            cartao,
            Linha("27/10", "MERCADOLIVRE 2/5", "94,81"),
            Linha("27/10", "MERCADOLIVRE 3/5", "94,81"),
            decisoes={0: "ignorar"},
        )

        assert (resultado.criados, resultado.ignorados) == (1, 1)
        assert Compra.objects.get().competencia_inicial == date(2026, 10, 1)

    def test_credito_novo_vira_estorno(self, cartao):
        _importar(cartao, Linha("24/10", "APPLE.COM/BILL", "-20,24"))

        estorno = Lancamento.objects.get()
        assert (estorno.tipo, estorno.texto, estorno.valor, estorno.compra) == (
            Lancamento.Tipo.ESTORNO,
            "APPLE.COM/BILL",
            D("-20.24"),
            None,
        )

    def test_decisoes_do_usuario(self, cartao):
        _compra(cartao, "Clarisse", "12.00", data=DEZEMBRO)
        _compra(cartao, "Souza", "110.00", data=DEZEMBRO)

        resultado = _importar(
            cartao,
            Linha("03/11", "CLARISSE B", "11,99"),  # suspeita: é outra compra
            Linha("04/11", "SOUZA CAR", "110,00"),  # suspeita: ignorar
            Linha("05/11", "UBER", "9,00"),  # nova: ignorar
            decisoes={0: "inserir", 1: "ignorar", 2: "ignorar"},
        )

        assert (resultado.criados, resultado.confirmados, resultado.ignorados) == (1, 0, 2)
        assert Compra.objects.filter(descricao="CLARISSE B").exists()
        assert not Compra.objects.filter(descricao="UBER").exists()

    def test_decisao_nao_permitida(self, cartao):
        with pytest.raises(RegraDeNegocioError, match="é nova e não aceita a decisão 'vincular'"):
            _importar(cartao, Linha("05/11", "UBER", "9,00"), decisoes={0: "vincular"})

    def test_decisao_para_linha_que_nao_existe(self, cartao):
        with pytest.raises(RegraDeNegocioError, match=r"Linhas inexistentes na fatura: \[5\]"):
            _importar(cartao, Linha("05/11", "UBER", "9,00"), decisoes={5: "ignorar"})

    def test_importar_de_novo_nao_cria_nada(self, cartao):
        _compra(cartao, "Mercado", "31.92", data=DEZEMBRO)
        _compra(cartao, "Mouse", "291.42", n=3, competencia=NOVEMBRO)
        linhas = (
            Linha("08/11", "MendocaSuper", "31,92"),
            Linha("17/06", "AMAZON BR 2/3", "97,13"),
            Linha("21/11", "RESTAURANTE", "33,69"),
            Linha("14/10", "LITE 2/12", "30,00"),
            Linha("24/10", "APPLE.COM/BILL", "-20,24"),
            Linha("10/11", "PAGTO. POR DEB EM C/C", "-100,00"),
        )
        _importar(cartao, *linhas)
        antes = Lancamento.objects.count()

        assert {classe for _, classe in _classes(_previa(cartao, *linhas))} == {"existente", "ignorada"}
        resultado = _importar(cartao, *linhas)

        assert (resultado.criados, resultado.confirmados) == (0, 5)
        assert Lancamento.objects.count() == antes
