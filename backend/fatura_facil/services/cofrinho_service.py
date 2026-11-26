"""Cofrinhos: o que é informado (guardado, resgatado, ajuste, Selic, percentual)
fica no banco; os rendimentos e os impostos são refeitos pela simulação em
`cofrinho_calculo` e gravados no extrato.

Não há tarefas agendadas: os rendimentos dos dias que passaram são gerados
quando os cofrinhos são abertos (`atualizar`). Quando algo com data passada
muda, o extrato é refeito daquela data em diante.
"""

from datetime import date, timedelta
from decimal import Decimal

from django.db import transaction
from django.utils import timezone

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Banco, Cofrinho, MovimentoDoCofrinho, PercentualDoCofrinho, TaxaSelic
from fatura_facil.services.cofrinho_calculo import CalculoDoCofrinhoError, Entrada, Resultado, simular

__all__ = ["DIFERENCA_SELIC_CDI", "CofrinhoService", "TaxaSelicService"]

DIFERENCA_SELIC_CDI = Decimal("0.10")  # a taxa DI fica, historicamente, 0,10 ponto abaixo da Selic meta

Tipo = MovimentoDoCofrinho.Tipo


def _hoje(hoje: date | None) -> date:
    return hoje or timezone.localdate()


class CofrinhoService:
    # --- leitura ---

    @staticmethod
    def simular(cofrinho: Cofrinho, hoje: date | None = None) -> Resultado:
        informados = cofrinho.movimentos.exclude(tipo=Tipo.RENDIMENTO)
        try:
            return simular(
                inicio=cofrinho.inicio,
                entradas=[Entrada(mov.pk, mov.data, mov.tipo, mov.informado) for mov in informados],
                cdi=list(TaxaSelic.objects.values_list("vigente_desde", "cdi")),
                percentuais=list(cofrinho.percentuais.values_list("vigente_desde", "percentual")),
                ate=_hoje(hoje),
            )
        except CalculoDoCofrinhoError as erro:
            raise RegraDeNegocioError(str(erro)) from erro

    def atualizar(self, hoje: date | None = None) -> None:
        """Gera os rendimentos dos dias que passaram desde a última vez."""
        hoje = _hoje(hoje)
        for cofrinho in Cofrinho.objects.filter(rendimento_ate__lt=hoje):
            with transaction.atomic():
                self.sincronizar(cofrinho, desde=cofrinho.rendimento_ate + timedelta(days=1), hoje=hoje)

    # --- escrita ---

    @transaction.atomic
    def criar(
        self,
        *,
        nome: str,
        banco: Banco,
        inicio: date,
        saldo: Decimal,
        percentual: Decimal,
        hoje: date | None = None,
    ) -> Cofrinho:
        hoje = _hoje(hoje)
        if not banco.ativo:
            raise RegraDeNegocioError(f"O banco {banco.nome} está inativo.")
        if inicio > hoje:
            raise RegraDeNegocioError("A data de criação não pode ser no futuro.")
        if not TaxaSelic.objects.filter(vigente_desde__lte=inicio).exists():
            raise RegraDeNegocioError(f"Cadastre a taxa Selic vigente em {inicio:%d/%m/%Y} antes de criar o cofrinho.")
        cofrinho = Cofrinho.objects.create(nome=nome, banco=banco, inicio=inicio, rendimento_ate=inicio)
        PercentualDoCofrinho.objects.create(cofrinho=cofrinho, vigente_desde=inicio, percentual=percentual)
        MovimentoDoCofrinho.objects.create(
            cofrinho=cofrinho, data=inicio, tipo=Tipo.GUARDADO, informado=saldo, inicial=True
        )
        self.sincronizar(cofrinho, desde=inicio, hoje=hoje)
        return cofrinho

    @transaction.atomic
    def definir_percentual(
        self, cofrinho: Cofrinho, *, percentual: Decimal, a_partir_de: date, hoje: date | None = None
    ) -> Cofrinho:
        if a_partir_de < cofrinho.inicio:
            raise RegraDeNegocioError(f"O cofrinho começa em {cofrinho.inicio:%d/%m/%Y}.")
        PercentualDoCofrinho.objects.update_or_create(
            cofrinho=cofrinho, vigente_desde=a_partir_de, defaults={"percentual": percentual}
        )
        self.sincronizar(cofrinho, desde=a_partir_de, hoje=hoje)
        return cofrinho

    @transaction.atomic
    def movimentar(
        self, cofrinho: Cofrinho, *, tipo: str, data: date, informado: Decimal, hoje: date | None = None
    ) -> MovimentoDoCofrinho:
        hoje = _hoje(hoje)
        if tipo == Tipo.RENDIMENTO:
            raise RegraDeNegocioError("Rendimentos são calculados, não informados.")
        if not cofrinho.inicio <= data <= hoje:
            raise RegraDeNegocioError(f"A data deve ficar entre {cofrinho.inicio:%d/%m/%Y} e hoje.")
        if tipo != Tipo.AJUSTE and informado <= 0:
            raise RegraDeNegocioError("O valor deve ser maior que zero.")
        movimento = MovimentoDoCofrinho.objects.create(cofrinho=cofrinho, data=data, tipo=tipo, informado=informado)
        self.sincronizar(cofrinho, desde=data, hoje=hoje)
        movimento.refresh_from_db()
        return movimento

    @transaction.atomic
    def excluir_movimento(self, movimento: MovimentoDoCofrinho, hoje: date | None = None) -> None:
        if movimento.tipo == Tipo.RENDIMENTO:
            raise RegraDeNegocioError("Rendimentos são calculados: não dá para excluir.")
        if movimento.inicial:
            raise RegraDeNegocioError("O saldo inicial não pode ser excluído. Use um ajuste de saldo.")
        cofrinho, data = movimento.cofrinho, movimento.data
        movimento.delete()
        self.sincronizar(cofrinho, desde=data, hoje=hoje)

    def sincronizar(self, cofrinho: Cofrinho, *, desde: date, hoje: date | None = None) -> Resultado:
        """Refaz o extrato a partir de `desde`. Se a simulação falhar (ex.: um resgate
        maior que o saldo), o erro sobe e a transação de quem chamou é desfeita."""
        hoje = _hoje(hoje)
        resultado = self.simular(cofrinho, hoje)
        cofrinho.movimentos.filter(tipo=Tipo.RENDIMENTO, data__gte=desde).delete()
        MovimentoDoCofrinho.objects.bulk_create(
            MovimentoDoCofrinho(
                cofrinho=cofrinho,
                data=rendimento.data,
                tipo=Tipo.RENDIMENTO,
                valor=rendimento.valor,
                liquido=rendimento.liquido,
            )
            for rendimento in resultado.rendimentos
            if rendimento.data >= desde
        )
        informados = list(cofrinho.movimentos.exclude(tipo=Tipo.RENDIMENTO).filter(data__gte=desde))
        for movimento in informados:
            efeito = resultado.efeitos[movimento.pk]
            movimento.valor, movimento.liquido, movimento.ir, movimento.iof = (
                efeito.valor,
                efeito.liquido,
                efeito.ir,
                efeito.iof,
            )
        MovimentoDoCofrinho.objects.bulk_update(informados, ["valor", "liquido", "ir", "iof"])
        cofrinho.rendimento_ate = hoje
        cofrinho.save(update_fields=["rendimento_ate", "atualizado_em"])
        return resultado

    def sincronizar_todos(self, *, desde: date, hoje: date | None = None) -> None:
        for cofrinho in Cofrinho.objects.all():
            self.sincronizar(cofrinho, desde=max(desde, cofrinho.inicio), hoje=hoje)


class TaxaSelicService:
    @transaction.atomic
    def salvar(
        self, *, vigente_desde: date, selic: Decimal, cdi: Decimal | None = None, hoje: date | None = None
    ) -> TaxaSelic:
        """Cadastra (ou corrige, se já houver uma na data) e refaz os cofrinhos daquela data em diante."""
        taxa, _ = TaxaSelic.objects.update_or_create(
            vigente_desde=vigente_desde,
            defaults={"selic": selic, "cdi": cdi if cdi is not None else selic - DIFERENCA_SELIC_CDI},
        )
        CofrinhoService().sincronizar_todos(desde=vigente_desde, hoje=hoje)
        return taxa

    @transaction.atomic
    def excluir(self, taxa: TaxaSelic, hoje: date | None = None) -> None:
        primeiro = Cofrinho.objects.order_by("inicio").values_list("inicio", flat=True).first()
        restantes = TaxaSelic.objects.exclude(pk=taxa.pk)
        if primeiro is not None and not restantes.filter(vigente_desde__lte=primeiro).exists():
            raise RegraDeNegocioError(
                f"Sem esta taxa, o cofrinho que começa em {primeiro:%d/%m/%Y} ficaria sem Selic vigente."
            )
        desde = taxa.vigente_desde
        taxa.delete()
        CofrinhoService().sincronizar_todos(desde=desde, hoje=hoje)
