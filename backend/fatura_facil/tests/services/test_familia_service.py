from datetime import date
from decimal import Decimal as D

import pytest

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Avulso, Familia, Grupo, Lancamento
from fatura_facil.services.familia_service import FamiliaService, NovoMembro
from fatura_facil.services.importacao_service import ImportacaoService
from fatura_facil.services.mes_service import MesService
from fatura_facil.tests.factories import Cabecalho, Cartao, FonteFactory, criar_pdf_bradesco
from fatura_facil.tests.factories import Lancamento as Linha

pytestmark = pytest.mark.django_db

HOJE = date(2026, 11, 26)  # mês em aberto: dezembro; projeção até novembro de 2027
DEZEMBRO = date(2026, 12, 1)
SEQUENCIA = "(Weder - Gustavo - Edson - Natalia)"


def _membros(*nomes, administrador="Weder"):
    return [NovoMembro(nome, administrador=nome == administrador) for nome in nomes]


ICLOUD = _membros("Weder", "Gustavo", "Edson", "Natalia")


@pytest.fixture
def amazon():
    return FonteFactory(nome="Amazon", cartao=True)


def _criar(fonte, inicio=DEZEMBRO, membros=ICLOUD, valor="66.90", hoje=HOJE):
    return FamiliaService().criar(
        fonte=fonte, nome="Apple icloud", valor=D(valor), inicio=inicio, membros=membros, hoje=hoje
    )


def _lancamentos(familia):
    return [(lanc.competencia, lanc.texto, lanc.valor) for lanc in Lancamento.objects.filter(familia=familia)]


def _rendimentos(familia):
    return [(a.competencia, a.descricao) for a in Avulso.objects.filter(familia=familia)]


def _mes(ano, mes):
    return date(ano, mes, 1)


class TestCriar:
    def test_exemplo_do_icloud(self, amazon):
        familia = _criar(amazon)

        lancamentos = _lancamentos(familia)
        assert len(lancamentos) == 12  # dezembro de 2026 a novembro de 2027
        assert lancamentos[:5] == [
            (_mes(2026, 12), f"Apple icloud Weder {SEQUENCIA}", D("66.90")),
            (_mes(2027, 1), f"Apple icloud Gustavo {SEQUENCIA}", D("66.90")),
            (_mes(2027, 2), f"Apple icloud Edson {SEQUENCIA}", D("66.90")),
            (_mes(2027, 3), f"Apple icloud Natalia {SEQUENCIA}", D("66.90")),
            (_mes(2027, 4), f"Apple icloud Weder {SEQUENCIA}", D("66.90")),
        ]
        assert {lanc.fonte_id for lanc in Lancamento.objects.filter(familia=familia)} == {amazon.pk}
        # No mês de quem administra não há rendimento.
        assert _rendimentos(familia)[:4] == [
            (_mes(2027, 1), "Apple icloud (Gustavo)"),
            (_mes(2027, 2), "Apple icloud (Edson)"),
            (_mes(2027, 3), "Apple icloud (Natalia)"),
            (_mes(2027, 5), "Apple icloud (Gustavo)"),
        ]
        avulso = Avulso.objects.filter(familia=familia).first()
        assert (avulso.grupo, avulso.valor) == (Grupo.RENDIMENTO, D("66.90"))
        assert familia.gerado_ate == _mes(2027, 11)

    def test_aparece_na_visao_do_mes(self, amazon):
        familia = _criar(amazon)

        visao = MesService().visao(_mes(2027, 1))

        bloco = next(b for b in visao.fontes if b.fonte == amazon)
        assert [(lanc.descricao, lanc.familia_id) for lanc in bloco.lancamentos] == [
            (f"Apple icloud Gustavo {SEQUENCIA}", familia.pk)
        ]
        assert [(i.descricao, i.familia) for i in visao.rendimentos] == [("Apple icloud (Gustavo)", familia.pk)]

    def test_sem_administrador_todos_devolvem(self, amazon):
        familia = _criar(amazon, membros=_membros("Ana", "Bia", administrador=None))

        assert _rendimentos(familia)[:2] == [(DEZEMBRO, "Apple icloud (Ana)"), (_mes(2027, 1), "Apple icloud (Bia)")]

    @pytest.mark.parametrize(
        ("membros", "valor", "mensagem"),
        [
            ([], "66.90", "pelo menos um membro"),
            (_membros("Weder", "  "), "66.90", "nome de todos"),
            ([NovoMembro("A", True), NovoMembro("B", True)], "66.90", "Só um membro"),
            (ICLOUD, "0", "maior que zero"),
        ],
    )
    def test_validacoes(self, amazon, membros, valor, mensagem):
        with pytest.raises(RegraDeNegocioError, match=mensagem):
            _criar(amazon, membros=membros, valor=valor)
        assert not Familia.objects.exists()

    def test_fonte_inativa(self):
        with pytest.raises(RegraDeNegocioError, match="inativa"):
            _criar(FonteFactory(ativa=False))

    def test_nomes_sem_espacos_nas_pontas(self, amazon):
        familia = _criar(amazon, membros=_membros(" Ana ", administrador=None))

        assert familia.membros.get().nome == "Ana"


class TestEstender:
    def test_gera_os_meses_que_faltam_quando_o_tempo_passa(self, amazon):
        familia = _criar(amazon)

        FamiliaService().estender(date(2027, 1, 5))  # em aberto: fevereiro; até janeiro de 2028
        FamiliaService().estender(date(2027, 1, 5))  # de novo: não duplica

        familia.refresh_from_db()
        assert familia.gerado_ate == _mes(2028, 1)
        assert _lancamentos(familia)[-2:] == [
            (_mes(2027, 12), f"Apple icloud Weder {SEQUENCIA}", D("66.90")),
            (_mes(2028, 1), f"Apple icloud Gustavo {SEQUENCIA}", D("66.90")),
        ]
        assert Lancamento.objects.filter(familia=familia).count() == 14

    def test_familia_encerrada_nao_cresce(self, amazon):
        familia = FamiliaService().encerrar(_criar(amazon), a_partir_de=_mes(2027, 3), hoje=HOJE)

        FamiliaService().estender(date(2027, 6, 1))

        assert _lancamentos(familia)[-1][0] == _mes(2027, 2)


class TestAlterar:
    def _alterar(self, familia, a_partir_de, membros, *, fonte=None, valor="66.90", nome="Apple icloud", hoje=HOJE):
        return FamiliaService().alterar(
            familia,
            a_partir_de=a_partir_de,
            fonte=fonte or familia.fonte,
            nome=nome,
            valor=D(valor),
            membros=membros,
            hoje=hoje,
        )

    def test_mais_membros_em_outra_ordem_a_partir_de_um_mes(self, amazon):
        familia = _criar(amazon)

        self._alterar(familia, _mes(2027, 3), _membros("Natalia", "Weder", "Ana", "Gustavo", "Edson"), valor="79.90")

        lancamentos = _lancamentos(familia)
        assert lancamentos[2] == (_mes(2027, 2), f"Apple icloud Edson {SEQUENCIA}", D("66.90"))  # antes: igual
        nova = "(Natalia - Weder - Ana - Gustavo - Edson)"
        assert lancamentos[3:6] == [
            (_mes(2027, 3), f"Apple icloud Natalia {nova}", D("79.90")),
            (_mes(2027, 4), f"Apple icloud Weder {nova}", D("79.90")),
            (_mes(2027, 5), f"Apple icloud Ana {nova}", D("79.90")),
        ]
        assert len(lancamentos) == 12
        assert (_mes(2027, 4), "Apple icloud (Weder)") not in _rendimentos(familia)
        assert (_mes(2027, 5), "Apple icloud (Ana)") in _rendimentos(familia)
        familia.refresh_from_db()
        assert familia.inicio == _mes(2027, 3)

    def test_menos_membros_e_outra_fonte(self, amazon):
        familia = _criar(amazon)
        nubank = FonteFactory(nome="Nubank", cartao=True)

        self._alterar(familia, DEZEMBRO, _membros("Weder", "Gustavo"), fonte=nubank)

        assert {lanc.fonte_id for lanc in Lancamento.objects.filter(familia=familia)} == {nubank.pk}
        assert [texto for _, texto, _ in _lancamentos(familia)[:3]] == [
            "Apple icloud Weder (Weder - Gustavo)",
            "Apple icloud Gustavo (Weder - Gustavo)",
            "Apple icloud Weder (Weder - Gustavo)",
        ]

    def test_meses_fechados_nao_mudam(self, amazon):
        familia = _criar(amazon, inicio=_mes(2026, 10))

        with pytest.raises(RegraDeNegocioError, match="a partir de 12/2026"):
            self._alterar(familia, _mes(2026, 11), ICLOUD)

    def test_familia_que_ainda_nao_comecou_so_muda_do_inicio_em_diante(self, amazon):
        familia = _criar(amazon, inicio=_mes(2027, 2))

        with pytest.raises(RegraDeNegocioError, match="a partir de 02/2027"):
            self._alterar(familia, DEZEMBRO, ICLOUD)

    def test_mes_confirmado_pela_fatura_nao_muda(self, amazon):
        familia = _criar(amazon)
        Lancamento.objects.filter(familia=familia, competencia=DEZEMBRO).update(status=Lancamento.Status.CONFIRMADO)

        with pytest.raises(RegraDeNegocioError, match="12/2026 já foi confirmada"):
            self._alterar(familia, DEZEMBRO, ICLOUD)

    def test_mudanca_alem_do_gerado_mantem_a_configuracao_antiga_ate_ela(self, amazon):
        familia = _criar(amazon)

        self._alterar(familia, _mes(2028, 3), _membros("Ana"))
        FamiliaService().estender(date(2028, 2, 10))  # a projeção chega na mudança

        lancamentos = _lancamentos(familia)
        assert lancamentos[14] == (_mes(2028, 2), f"Apple icloud Edson {SEQUENCIA}", D("66.90"))
        assert lancamentos[15] == (_mes(2028, 3), "Apple icloud Ana (Ana)", D("66.90"))

    def test_encerrada_nao_muda(self, amazon):
        familia = FamiliaService().encerrar(_criar(amazon), a_partir_de=_mes(2027, 3), hoje=HOJE)

        with pytest.raises(RegraDeNegocioError, match="encerrada"):
            self._alterar(familia, _mes(2027, 3), ICLOUD)

    def test_nao_troca_para_fonte_inativa(self, amazon):
        familia = _criar(amazon)

        with pytest.raises(RegraDeNegocioError, match="inativa"):
            self._alterar(familia, DEZEMBRO, ICLOUD, fonte=FonteFactory(ativa=False))


class TestEncerrar:
    def test_sem_lancamentos_a_partir_do_mes(self, amazon):
        familia = FamiliaService().encerrar(_criar(amazon), a_partir_de=_mes(2027, 3), hoje=HOJE)

        assert familia.ate == _mes(2027, 2)
        assert [c for c, _, _ in _lancamentos(familia)] == [DEZEMBRO, _mes(2027, 1), _mes(2027, 2)]
        assert [c for c, _ in _rendimentos(familia)] == [_mes(2027, 1), _mes(2027, 2)]

    def test_encerrar_de_novo_depois_do_fim_nao_muda_nada(self, amazon):
        familia = FamiliaService().encerrar(_criar(amazon), a_partir_de=_mes(2027, 3), hoje=HOJE)

        FamiliaService().encerrar(familia, a_partir_de=_mes(2027, 6), hoje=HOJE)

        assert familia.ate == _mes(2027, 2)

    def test_encerrar_no_inicio_apaga_a_familia(self, amazon):
        resultado = FamiliaService().encerrar(_criar(amazon), a_partir_de=DEZEMBRO, hoje=HOJE)

        assert resultado is None
        assert not Familia.objects.exists()
        assert not Lancamento.objects.exists()
        assert not Avulso.objects.exists()

    def test_meses_fechados_continuam(self, amazon):
        familia = _criar(amazon, inicio=_mes(2026, 10))

        with pytest.raises(RegraDeNegocioError, match="fechados"):
            FamiliaService().encerrar(familia, a_partir_de=_mes(2026, 11), hoje=HOJE)


class TestImportacao:
    def _pdf(self, *linhas):
        return criar_pdf_bradesco([Cartao("1234"), Cabecalho(), *linhas])

    def test_mensalidade_casa_pelo_valor_e_guarda_quem_paga(self, amazon):
        familia = _criar(amazon)
        pdf = self._pdf(Linha("20/11", "APPLE.COM/BILL", "66,90"))

        previa = ImportacaoService().previa(fonte=amazon, conteudo=pdf, competencia=DEZEMBRO)
        assert [item.classificacao for item in previa.linhas] == ["existente"]

        ImportacaoService().importar(
            fonte=amazon, conteudo=pdf, nome_arquivo="f.pdf", competencia=DEZEMBRO, decisoes={}
        )

        lancamento = Lancamento.objects.get(familia=familia, competencia=DEZEMBRO)
        assert lancamento.status == Lancamento.Status.CONFIRMADO
        assert lancamento.texto == f"Apple icloud Weder {SEQUENCIA}"
        # Reimportar a mesma fatura continua casando.
        previa = ImportacaoService().previa(fonte=amazon, conteudo=pdf, competencia=DEZEMBRO)
        assert [item.classificacao for item in previa.linhas] == ["existente"]
