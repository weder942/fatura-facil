"""Famílias: assinaturas divididas em rodízio (ex.: Apple iCloud).

Todo mês a mensalidade cai na fonte com a identificação de quem paga,
"Apple icloud Natalia (Weder - Gustavo - Edson - Natalia)", e o membro do mês
devolve o valor como rendimento avulso, "Apple icloud (Natalia)". No mês de
quem administra a família não há rendimento.

Os lançamentos são gerados até `MESES_A_FRENTE` meses depois do mês em aberto
e estendidos quando o app é acessado (não há tarefas agendadas). Mudanças e o
encerramento só valem do mês em aberto em diante: os meses anteriores estão
fechados.
"""

from dataclasses import dataclass
from datetime import date
from decimal import Decimal

from django.db import transaction
from django.utils import timezone

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Avulso, Familia, Fonte, Grupo, Lancamento, MembroDaFamilia
from fatura_facil.services.competencia_service import competencia_em_aberto, somar_meses

__all__ = ["FamiliaService", "NovoMembro", "descricao_do_lancamento", "descricao_do_rendimento"]

MESES_A_FRENTE = 11  # além do mês em aberto: um ano de projeção


@dataclass(frozen=True)
class NovoMembro:
    nome: str
    administrador: bool = False


def descricao_do_lancamento(familia: Familia, membros: list[MembroDaFamilia], pagador: MembroDaFamilia) -> str:
    """Como na planilha: "Apple icloud Natalia (Weder - Gustavo - Edson - Natalia)"."""
    sequencia = " - ".join(membro.nome for membro in membros)
    return f"{familia.nome} {pagador.nome} ({sequencia})"[:200]


def descricao_do_rendimento(familia: Familia, pagador: MembroDaFamilia) -> str:
    return f"{familia.nome} ({pagador.nome})"[:200]


def _meses_entre(de: date, ate: date) -> int:
    return (ate.year - de.year) * 12 + ate.month - de.month


class FamiliaService:
    @staticmethod
    def pagador(familia: Familia, membros: list[MembroDaFamilia], competencia: date) -> MembroDaFamilia:
        """O membro da vez: o 1º paga no início, o 2º no mês seguinte, e assim por diante."""
        return membros[_meses_entre(familia.inicio, competencia) % len(membros)]

    @staticmethod
    def primeira_editavel(familia: Familia, hoje: date | None = None) -> date:
        """Primeiro mês que uma mudança pode alcançar: o mês em aberto, ou o início
        da família se ela ainda não começou."""
        return max(competencia_em_aberto(hoje or timezone.localdate()), familia.inicio)

    @transaction.atomic
    def criar(
        self,
        *,
        fonte: Fonte,
        nome: str,
        valor: Decimal,
        inicio: date,
        membros: list[NovoMembro],
        hoje: date | None = None,
    ) -> Familia:
        self._validar(fonte, valor, membros)
        familia = Familia.objects.create(
            fonte=fonte, nome=nome, valor=valor, inicio=inicio, gerado_ate=somar_meses(inicio, -1)
        )
        self._criar_membros(familia, membros)
        self._gerar(familia, self._alvo(hoje))
        return familia

    @transaction.atomic
    def alterar(
        self,
        familia: Familia,
        *,
        a_partir_de: date,
        fonte: Fonte,
        nome: str,
        valor: Decimal,
        membros: list[NovoMembro],
        hoje: date | None = None,
    ) -> Familia:
        """Nova configuração a partir de um mês, em que o 1º membro da lista paga.

        Os meses anteriores ficam como estavam; os seguintes são gerados de novo.
        """
        if familia.ate is not None:
            raise RegraDeNegocioError("Esta família foi encerrada e não pode mais mudar.")
        self._validar(fonte, valor, membros, mudou_de_fonte=fonte.pk != familia.fonte_id)
        self._exigir_editavel(familia, a_partir_de, hoje)
        # Os meses antes da mudança seguem a configuração antiga, mesmo que ainda não gerados.
        self._gerar(familia, somar_meses(a_partir_de, -1))
        self._apagar_desde(familia, a_partir_de)

        familia.fonte = fonte
        familia.nome = nome
        familia.valor = valor
        familia.inicio = a_partir_de
        familia.gerado_ate = somar_meses(a_partir_de, -1)
        familia.save()
        familia.membros.all().delete()
        self._criar_membros(familia, membros)
        self._gerar(familia, self._alvo(hoje))
        return familia

    @transaction.atomic
    def encerrar(self, familia: Familia, *, a_partir_de: date, hoje: date | None = None) -> Familia | None:
        """Sem lançamentos a partir do mês dado. Encerrar no início apaga a família
        (devolve None): ela nunca chegou a ter um mês."""
        if familia.ate is not None and familia.ate < a_partir_de:
            return familia
        self._exigir_editavel(familia, a_partir_de, hoje)
        self._gerar(familia, somar_meses(a_partir_de, -1))
        self._apagar_desde(familia, a_partir_de)
        if a_partir_de <= familia.inicio and not familia.lancamentos.exists():
            familia.delete()
            return None
        familia.ate = somar_meses(a_partir_de, -1)
        familia.gerado_ate = familia.ate
        familia.save(update_fields=["ate", "gerado_ate", "atualizado_em"])
        return familia

    def estender(self, hoje: date | None = None) -> None:
        """Gera os meses que faltam até o fim da projeção. Barato quando já está em dia."""
        alvo = self._alvo(hoje)
        # Encerrada já tem tudo gerado (gerado_ate == ate).
        for familia in Familia.objects.filter(gerado_ate__lt=alvo, ate__isnull=True):
            with transaction.atomic():
                self._gerar(familia, alvo)

    @staticmethod
    def _alvo(hoje: date | None) -> date:
        return somar_meses(competencia_em_aberto(hoje or timezone.localdate()), MESES_A_FRENTE)

    def _exigir_editavel(self, familia: Familia, a_partir_de: date, hoje: date | None) -> None:
        primeira = self.primeira_editavel(familia, hoje)
        if a_partir_de < primeira:
            raise RegraDeNegocioError(
                f"Só dá para mudar a partir de {primeira:%m/%Y}: os meses anteriores já estão fechados."
            )
        confirmado = (
            familia.lancamentos.filter(competencia__gte=a_partir_de, status=Lancamento.Status.CONFIRMADO)
            .order_by("-competencia")
            .first()
        )
        if confirmado is not None:
            raise RegraDeNegocioError(
                f"A mensalidade de {confirmado.competencia:%m/%Y} já foi confirmada pela fatura."
                f" Escolha um mês depois dela."
            )

    @staticmethod
    def _apagar_desde(familia: Familia, competencia: date) -> None:
        familia.lancamentos.filter(competencia__gte=competencia).delete()
        familia.avulsos.filter(competencia__gte=competencia).delete()

    @staticmethod
    def _validar(fonte: Fonte, valor: Decimal, membros: list[NovoMembro], *, mudou_de_fonte: bool = True) -> None:
        if mudou_de_fonte and not fonte.ativa:
            raise RegraDeNegocioError(f"A fonte {fonte.nome} está inativa.")
        if valor <= 0:
            raise RegraDeNegocioError("A mensalidade deve ser maior que zero.")
        if not membros:
            raise RegraDeNegocioError("A família precisa de pelo menos um membro.")
        if any(not membro.nome.strip() for membro in membros):
            raise RegraDeNegocioError("Informe o nome de todos os membros.")
        if sum(membro.administrador for membro in membros) > 1:
            raise RegraDeNegocioError("Só um membro pode ser quem administra a família.")

    @staticmethod
    def _criar_membros(familia: Familia, membros: list[NovoMembro]) -> None:
        MembroDaFamilia.objects.bulk_create(
            MembroDaFamilia(familia=familia, nome=membro.nome.strip(), ordem=ordem, administrador=membro.administrador)
            for ordem, membro in enumerate(membros)
        )

    def _gerar(self, familia: Familia, ate: date) -> None:
        """Lançamentos (e rendimentos) dos meses depois de `gerado_ate` até `ate`.

        Família encerrada nunca chega aqui com `ate` depois do fim: o encerramento
        deixa `gerado_ate == ate` e ela não muda nem é estendida depois.
        """
        if ate <= familia.gerado_ate:
            return
        membros = list(familia.membros.order_by("ordem"))
        lancamentos, avulsos = [], []
        competencia = somar_meses(familia.gerado_ate, 1)
        while competencia <= ate:
            pagador = self.pagador(familia, membros, competencia)
            lancamentos.append(
                Lancamento(
                    fonte=familia.fonte,
                    competencia=competencia,
                    valor=familia.valor,
                    texto=descricao_do_lancamento(familia, membros, pagador),
                    familia=familia,
                )
            )
            if not pagador.administrador:
                avulsos.append(
                    Avulso(
                        grupo=Grupo.RENDIMENTO,
                        competencia=competencia,
                        descricao=descricao_do_rendimento(familia, pagador),
                        valor=familia.valor,
                        familia=familia,
                    )
                )
            competencia = somar_meses(competencia, 1)
        Lancamento.objects.bulk_create(lancamentos)
        Avulso.objects.bulk_create(avulsos)
        familia.gerado_ate = ate
        familia.save(update_fields=["gerado_ate", "atualizado_em"])
