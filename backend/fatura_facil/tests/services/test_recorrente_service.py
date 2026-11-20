from datetime import date
from decimal import Decimal

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Avulso, Grupo, ValorRecorrente
from fatura_facil.services.recorrente_service import ItemDoMes, RecorrenteService, valor_vigente
from fatura_facil.tests.factories import criar_recorrente

pytestmark = pytest.mark.django_db
D = Decimal
JAN, MAR, JUN, NOV, DEZ = (date(2026, m, 1) for m in (1, 3, 6, 11, 12))


def _valores(grupo, competencia):
    return [(i.descricao, i.valor) for i in RecorrenteService().itens_do_mes(grupo, competencia)]


class TestValorVigente:
    def _vigencias(self, *dados):
        return [ValorRecorrente(valor=D(v), a_partir_de=inicio, ate=fim) for v, inicio, fim in dados]

    def test_usa_a_vigencia_mais_recente_que_ja_comecou(self):
        vigencias = self._vigencias(("1201.99", JAN, None), ("1277.99", JUN, None))

        assert valor_vigente(vigencias, MAR) == D("1201.99")
        assert valor_vigente(vigencias, JUN) == D("1277.99")
        assert valor_vigente(vigencias, DEZ) == D("1277.99")

    def test_antes_da_primeira_vigencia_nao_tem_valor(self):
        assert valor_vigente(self._vigencias(("10", MAR, None)), JAN) is None

    def test_depois_do_fim_nao_tem_valor(self):
        vigencias = self._vigencias(("10", JAN, MAR))

        assert valor_vigente(vigencias, MAR) == D("10")
        assert valor_vigente(vigencias, JUN) is None

    def test_a_ordem_da_lista_nao_importa(self):
        vigencias = self._vigencias(("2", JUN, None), ("1", JAN, None))

        assert valor_vigente(vigencias, NOV) == D("2")


class TestReajuste:
    def test_reajuste_vale_dali_em_diante_sem_mexer_no_passado(self):
        aluguel = criar_recorrente(nome="Aluguel", valor=D("1201.99"), a_partir_de=JAN)

        RecorrenteService().reajustar(aluguel, valor=D("1277.99"), a_partir_de=JUN)

        assert _valores(Grupo.FIXA, MAR) == [("Aluguel", D("1201.99"))]
        assert _valores(Grupo.FIXA, JUN) == [("Aluguel", D("1277.99"))]
        assert _valores(Grupo.FIXA, DEZ) == [("Aluguel", D("1277.99"))]

    def test_reajuste_na_mesma_competencia_troca_o_valor(self):
        aluguel = criar_recorrente(valor=D("100.00"), a_partir_de=JAN)

        RecorrenteService().reajustar(aluguel, valor=D("150.00"), a_partir_de=JAN)

        assert aluguel.valores.count() == 1
        assert _valores(Grupo.FIXA, JAN) == [("Aluguel", D("150.00"))]

    def test_reajuste_depois_do_fim_volta_a_valer(self):
        moto = criar_recorrente(nome="Moto", valor=D("75.00"), a_partir_de=JAN)
        RecorrenteService().encerrar(moto, ate=MAR)

        RecorrenteService().reajustar(moto, valor=D("50.00"), a_partir_de=NOV)

        assert _valores(Grupo.FIXA, JUN) == []
        assert _valores(Grupo.FIXA, NOV) == [("Moto", D("50.00"))]


class TestEncerrar:
    def test_some_dos_meses_seguintes_e_apaga_vigencias_futuras(self):
        terapia = criar_recorrente(nome="Terapia", valor=D("200.00"), a_partir_de=JAN)
        RecorrenteService().reajustar(terapia, valor=D("280.00"), a_partir_de=NOV)

        RecorrenteService().encerrar(terapia, ate=JUN)

        assert list(terapia.valores.values_list("a_partir_de", "ate")) == [(JAN, JUN)]
        assert _valores(Grupo.FIXA, JUN) == [("Terapia", D("200.00"))]
        assert _valores(Grupo.FIXA, NOV) == []

    def test_fim_antes_do_inicio_e_recusado(self):
        terapia = criar_recorrente(a_partir_de=JUN)

        with pytest.raises(RegraDeNegocioError, match="antes do primeiro valor"):
            RecorrenteService().encerrar(terapia, ate=JAN)


class TestRemoverVigencia:
    def test_remove_e_volta_ao_valor_anterior(self):
        aluguel = criar_recorrente(valor=D("100.00"), a_partir_de=JAN)
        reajuste = RecorrenteService().reajustar(aluguel, valor=D("150.00"), a_partir_de=JUN)

        RecorrenteService().remover_vigencia(reajuste)

        assert _valores(Grupo.FIXA, NOV) == [("Aluguel", D("100.00"))]

    def test_nao_remove_a_unica_vigencia(self):
        aluguel = criar_recorrente()

        with pytest.raises(RegraDeNegocioError, match="pelo menos um valor"):
            RecorrenteService().remover_vigencia(aluguel.valores.get())


class TestItensDoMes:
    def test_fixo_ajustado_so_naquele_mes(self):
        mae = criar_recorrente(nome="Mãe", valor=D("200.00"))

        RecorrenteService().definir_no_mes(mae, competencia=MAR, valor=D("300.00"))

        assert RecorrenteService().itens_do_mes(Grupo.FIXA, MAR) == [
            ItemDoMes(tipo="recorrente", id=mae.pk, descricao="Mãe", valor=D("300.00"), ajustado=True)
        ]
        assert _valores(Grupo.FIXA, JUN) == [("Mãe", D("200.00"))]

    def test_limpar_o_mes_volta_ao_valor_da_vigencia(self):
        mae = criar_recorrente(nome="Mãe", valor=D("200.00"))
        RecorrenteService().definir_no_mes(mae, competencia=MAR, valor=D("300.00"))

        RecorrenteService().limpar_no_mes(mae, competencia=MAR)

        assert _valores(Grupo.FIXA, MAR) == [("Mãe", D("200.00"))]

    def test_variavel_estima_pelo_ultimo_valor_informado_e_fica_pendente(self):
        energia = criar_recorrente(nome="Energia", valor=D("300.00"), variavel=True)
        servico = RecorrenteService()

        [sem_informar] = servico.itens_do_mes(Grupo.FIXA, JAN)
        servico.definir_no_mes(energia, competencia=MAR, valor=D("432.80"))
        [informado] = servico.itens_do_mes(Grupo.FIXA, MAR)
        [estimado] = servico.itens_do_mes(Grupo.FIXA, NOV)

        assert (sem_informar.valor, sem_informar.pendente) == (D("300.00"), True)
        assert (informado.valor, informado.pendente, informado.ajustado) == (D("432.80"), False, False)
        assert (estimado.valor, estimado.pendente) == (D("432.80"), True)

    def test_variavel_nao_usa_valor_informado_em_mes_futuro(self):
        energia = criar_recorrente(nome="Energia", valor=D("300.00"), variavel=True)
        RecorrenteService().definir_no_mes(energia, competencia=NOV, valor=D("500.00"))

        assert _valores(Grupo.FIXA, JUN) == [("Energia", D("300.00"))]

    def test_valor_do_mes_aparece_mesmo_fora_da_vigencia(self):
        ferias = criar_recorrente(nome="Férias", grupo=Grupo.RENDIMENTO, a_partir_de=JUN)

        RecorrenteService().definir_no_mes(ferias, competencia=JAN, valor=D("1339.61"))

        assert _valores(Grupo.RENDIMENTO, JAN) == [("Férias", D("1339.61"))]
        assert _valores(Grupo.RENDIMENTO, MAR) == []

    def test_separa_por_grupo_aceita_negativo_e_inclui_avulsos_do_mes(self):
        criar_recorrente(nome="Salário", grupo=Grupo.RENDIMENTO, valor=D("8883.32"), ordem=1)
        criar_recorrente(nome="INSS", grupo=Grupo.RENDIMENTO, valor=D("-951.52"), ordem=2)
        criar_recorrente(nome="Aluguel", grupo=Grupo.FIXA)
        Avulso.objects.create(grupo=Grupo.RENDIMENTO, competencia=NOV, descricao="Icloud (Natalia)", valor=D("66.90"))
        Avulso.objects.create(grupo=Grupo.RENDIMENTO, competencia=DEZ, descricao="Outro mês", valor=D("1.00"))

        assert _valores(Grupo.RENDIMENTO, NOV) == [
            ("Salário", D("8883.32")),
            ("INSS", D("-951.52")),
            ("Icloud (Natalia)", D("66.90")),
        ]
