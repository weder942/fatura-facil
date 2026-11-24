from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Avulso, Compra, Grupo, Lancamento, Recorrente
from fatura_facil.services.planilha.importador import ImportadorDePlanilha
from fatura_facil.services.planilha.leitura import ler_planilha
from fatura_facil.tests.factories import FonteFactory, criar_planilha, criar_recorrente

pytestmark = pytest.mark.django_db
D = Decimal


def _mes(itens_fixas, itens_bradesco, rendimentos=()):
    return {
        "Despesas": [("Saldo", 999)],
        "Rendimentos": list(rendimentos),
        "Fixas": list(itens_fixas),
        "Em dinheiro": [],
        "Bradesco": list(itens_bradesco),
    }


@pytest.fixture
def fontes():
    return FonteFactory(nome="Bradesco", cartao=True), FonteFactory(nome="Dinheiro")


@pytest.fixture
def planilha(tmp_path):
    fixas = [("Aluguel", 1277.99), ("Mãe", 75), ("Mãe", 200)]
    return ler_planilha(
        criar_planilha(
            tmp_path,
            "Contas 2026.xlsx",
            {
                "October": _mes(fixas, [("Oculos 03/01", 138.68), ("Mercado", 50)], [("Salário", 8883.32)]),
                "November": _mes(
                    fixas,
                    [("Oculos 03/02", 138.67), ("Estorno seguro", -290.09), ("Zerado", 0), (None, 3)],
                    [("Salário", 8883.32), ("Icloud (Natalia)", 66.9)],
                ),
                "December": _mes(fixas, [("Oculos 03/03", 138.67), ("Ipad 10/09", 199.99)], [("Salário", 8883.32)]),
            },
        )
    )


def test_importa_tudo_e_os_totais_batem(fontes, planilha):
    bradesco, _ = fontes

    resultado = ImportadorDePlanilha().importar([planilha])

    assert resultado.divergencias == []
    assert len(resultado.conferencias) == 3 * 4  # Rendimentos, Fixas, Em dinheiro e Bradesco
    assert (resultado.meses, resultado.recorrentes, resultado.avulsos) == (3, 4, 1)
    assert sorted(Recorrente.objects.values_list("nome", flat=True)) == ["Aluguel", "Mãe", "Mãe saúde", "Salário"]
    assert Avulso.objects.get().descricao == "Icloud (Natalia)"

    oculos = Compra.objects.get(descricao="Oculos")
    assert (oculos.n_parcelas, oculos.valor_total, oculos.competencia_inicial) == (3, D("416.02"), date(2026, 10, 1))
    ipad = Compra.objects.get(descricao="Ipad")
    assert ipad.lancamentos.count() == 2  # a 9ª da planilha e a 10ª projetada
    assert resultado.parcelas_projetadas == 1

    estorno = Lancamento.objects.get(compra__isnull=True)
    assert (estorno.descricao, estorno.valor, estorno.tipo) == ("Estorno seguro", D("-290.09"), "estorno")
    assert bradesco.lancamentos.filter(compra__descricao="(sem descrição)").exists()
    assert set(Lancamento.objects.values_list("origem", flat=True)) == {"planilha"}


def test_relata_pontos_de_atencao(fontes, planilha):
    problemas = ImportadorDePlanilha().importar([planilha]).problemas

    assert "November 2026!I5: valor 3.00 sem descrição." in problemas
    assert any("'Zerado' com valor zero ignorado" in problema for problema in problemas)


def test_coluna_sem_fonte_aborta_e_apelido_resolve(tmp_path):
    FonteFactory(nome="Carteira")
    leitura = ler_planilha(criar_planilha(tmp_path, "Contas 2026.xlsx", {"May": {"Em dinheiro": [("Pão", 5)]}}))

    with pytest.raises(RegraDeNegocioError, match="Em dinheiro"):
        ImportadorDePlanilha().importar([leitura])

    resultado = ImportadorDePlanilha({"Em dinheiro": "Carteira"}).importar([leitura])
    assert resultado.compras == 1


def test_nao_importa_duas_vezes_sem_substituir(fontes, planilha):
    ImportadorDePlanilha().importar([planilha])

    with pytest.raises(RegraDeNegocioError, match="--substituir"):
        ImportadorDePlanilha().importar([planilha])

    ImportadorDePlanilha().importar([planilha], substituir=True)
    assert Compra.objects.filter(descricao="Oculos").count() == 1
    assert Lancamento.objects.filter(compra__isnull=True).count() == 1


def test_substituir_preserva_o_que_foi_lancado_a_mao(fontes, planilha):
    criar_recorrente(nome="Academia")
    ImportadorDePlanilha().importar([planilha])

    ImportadorDePlanilha().importar([planilha], substituir=True)

    assert Recorrente.objects.filter(nome="Academia", origem="manual").exists()


def test_recorrente_manual_com_o_mesmo_nome_aborta(fontes, planilha):
    criar_recorrente(nome="Aluguel", grupo=Grupo.FIXA)

    with pytest.raises(RegraDeNegocioError, match="Aluguel"):
        ImportadorDePlanilha().importar([planilha])


def test_sem_abas_de_mes(tmp_path):
    leitura = ler_planilha(criar_planilha(tmp_path, "Contas 2026.xlsx", {"Sheet3": {}}))

    with pytest.raises(RegraDeNegocioError, match="Nenhuma aba"):
        ImportadorDePlanilha().importar([leitura])


def test_divergencia_aparece_quando_ja_havia_lancamento_manual(fontes, planilha):
    from fatura_facil.tests.factories import criar_compra

    criar_compra(fonte=fontes[1], data=date(2026, 9, 10), valor_total=D("1.00"))

    divergencias = ImportadorDePlanilha().importar([planilha]).divergencias

    assert [(d.competencia, d.coluna, d.na_planilha, d.no_sistema) for d in divergencias] == [
        (date(2026, 10, 1), "Em dinheiro", D("0.00"), D("1.00"))
    ]


def test_avisa_parcelas_sem_continuacao(fontes, tmp_path):
    leitura = ler_planilha(
        criar_planilha(
            tmp_path,
            "Contas 2026.xlsx",
            {
                "January": _mes([], [("Calca 02/01", 50)]),
                "February": _mes([], []),
                "March": _mes([], [("Calca 02/02", 50)]),
            },
        )
    )

    problemas = ImportadorDePlanilha().importar([leitura]).problemas

    assert problemas == [
        "2026-01 Bradesco: 'Calca 02/01' ficou com as parcelas 1 a 1 de 2 (sem continuação na planilha).",
        "2026-03 Bradesco: 'Calca 02/02' ficou com as parcelas 2 a 2 de 2 (sem continuação na planilha).",
    ]
