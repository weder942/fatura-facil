from django.db import models
from django.db.models import Q

from fatura_facil.models.choices import Origem
from fatura_facil.models.compra_model import Compra
from fatura_facil.models.familia_model import Familia
from fatura_facil.models.fonte_model import Fonte
from fatura_facil.models.lote_importacao_model import LoteImportacao

__all__ = ["Lancamento"]


class Lancamento(models.Model):
    """O valor que cai numa competência (ex.: a parcela 2/5 de uma compra)."""

    class Tipo(models.TextChoices):
        NORMAL = "normal", "Normal"
        ESTORNO = "estorno", "Estorno"
        RECORRENTE = "recorrente", "Recorrente"

    class Status(models.TextChoices):
        PREVISTO = "previsto", "Previsto"
        CONFIRMADO = "confirmado", "Confirmado por importação"

    compra = models.ForeignKey(Compra, on_delete=models.CASCADE, null=True, blank=True, related_name="lancamentos")
    fonte = models.ForeignKey(Fonte, on_delete=models.PROTECT, related_name="lancamentos")
    competencia = models.DateField(db_index=True, help_text="Primeiro dia do mês.")
    parcela = models.PositiveSmallIntegerField(null=True, blank=True)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    texto = models.CharField(
        max_length=200,
        blank=True,
        help_text="Descrição de lançamento sem compra (estorno, família), ou o texto da fatura que o confirmou.",
    )
    tipo = models.CharField(max_length=10, choices=Tipo.choices, default=Tipo.NORMAL)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PREVISTO)
    origem = models.CharField(max_length=12, choices=Origem.choices, default=Origem.MANUAL)
    lote = models.ForeignKey(
        LoteImportacao,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="lancamentos",
        help_text="Fatura importada que criou ou confirmou este lançamento.",
    )
    familia = models.ForeignKey(
        Familia,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="lancamentos",
        help_text="Mensalidade da família que gerou este lançamento.",
    )
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["competencia", "id"]
        indexes = [models.Index(fields=["fonte", "competencia"], name="lancamento_fonte_comp_idx")]
        constraints = [
            models.UniqueConstraint(
                fields=["compra", "parcela"],
                condition=Q(tipo="normal"),
                name="lancamento_parcela_unica_por_compra",
            ),
        ]

    def __str__(self):
        return f"{self.descricao} {self.parcela_formatada} — {self.valor}"

    @property
    def descricao(self) -> str:
        return self.compra.descricao if self.compra_id else self.texto

    @property
    def parcela_formatada(self) -> str:
        """No formato do banco, "atual/total" (2/5); vazio para compra à vista."""
        if not self.compra_id or self.parcela is None or self.compra.n_parcelas == 1:
            return ""
        return f"{self.parcela}/{self.compra.n_parcelas}"
