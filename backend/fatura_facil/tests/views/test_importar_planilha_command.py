from decimal import Decimal
from io import StringIO

import pytest
from django.core.management import CommandError, call_command

from fatura_facil.models import Compra
from fatura_facil.tests.factories import FonteFactory, criar_compra, criar_planilha

pytestmark = pytest.mark.django_db


@pytest.fixture
def arquivo(tmp_path):
    FonteFactory(nome="Nubank", cartao=True)
    return criar_planilha(tmp_path, "Contas 2026.xlsx", {"May": {"Nubank": [("Mercado", 10), (None, 2)]}})


def _rodar(*args):
    saida = StringIO()
    call_command("importar_planilha", *args, stdout=saida)
    return saida.getvalue()


def test_importa_e_relata(arquivo):
    saida = _rodar(str(arquivo))

    assert "Compras: 2 (2 parcelas, 0 projetadas" in saida
    assert "Todos os 1 totais batem" in saida
    assert "valor 2.00 sem descrição" in saida
    assert "Importação gravada." in saida
    assert Compra.objects.count() == 2


def test_simular_nao_grava(arquivo):
    saida = _rodar(str(arquivo), "--simular")

    assert "Simulação: nada foi gravado." in saida
    assert not Compra.objects.exists()


def test_mostra_divergencias(arquivo):
    from datetime import date

    from fatura_facil.models import Fonte

    criar_compra(fonte=Fonte.objects.get(), data=date(2026, 4, 1), valor_total=Decimal("1.00"))

    saida = _rodar(str(arquivo))

    assert "Totais que não batem (1)" in saida
    assert "2026-05 Nubank: planilha 12.00, sistema 13.00" in saida


def test_fonte_por_apelido(tmp_path):
    FonteFactory(nome="Carteira")
    arquivo = criar_planilha(tmp_path, "Contas 2026.xlsx", {"May": {"Dinheiro": [("Pão", 5)]}})

    assert "Importação gravada." in _rodar(str(arquivo), "--fonte", "Dinheiro=Carteira")


@pytest.mark.parametrize("apelido", ["Dinheiro", "=Carteira", "Dinheiro="])
def test_apelido_invalido(arquivo, apelido):
    with pytest.raises(CommandError, match="COLUNA=FONTE"):
        _rodar(str(arquivo), "--fonte", apelido)


def test_arquivo_inexistente(tmp_path):
    with pytest.raises(CommandError, match="não encontrado"):
        _rodar(str(tmp_path / "Contas 2026.xlsx"))


def test_erro_de_regra_vira_erro_do_comando(tmp_path):
    arquivo = criar_planilha(tmp_path, "Contas 2026.xlsx", {"May": {"Inter": [("x", 1)]}})

    with pytest.raises(CommandError, match="Inter"):
        _rodar(str(arquivo))


def test_arquivo_sem_ano(tmp_path):
    arquivo = criar_planilha(tmp_path, "contas.xlsx", {"May": {}})

    with pytest.raises(CommandError, match="ano"):
        _rodar(str(arquivo))
