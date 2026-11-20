from django.db import models
from django.db.models import Q

from fatura_facil.models.choices import Origem
from fatura_facil.models.fonte_model import Fonte

__all__ = ["Compra"]


class Compra(models.Model):
    """O fato original (data, descrição, valor total, nº de parcelas).

    Gera um lançamento por parcela. Crie e altere sempre pelo CompraService,
    nunca direto pelo ORM, para as parcelas acompanharem a compra.
    """

    fonte = models.ForeignKey(Fonte, on_delete=models.PROTECT, related_name="compras")
    data = models.DateField()
    descricao = models.CharField(max_length=200)
    descricao_original = models.CharField(max_length=200, blank=True, help_text="Texto como veio da fatura.")
    valor_total = models.DecimalField(max_digits=12, decimal_places=2)
    n_parcelas = models.PositiveSmallIntegerField(default=1)
    competencia_inicial = models.DateField(help_text="Competência da 1ª parcela (primeiro dia do mês).")
    origem = models.CharField(max_length=12, choices=Origem.choices, default=Origem.MANUAL)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-data", "-id"]
        constraints = [
            models.CheckConstraint(condition=Q(valor_total__gt=0), name="compra_valor_total_positivo"),
            models.CheckConstraint(condition=Q(n_parcelas__gte=1), name="compra_ao_menos_uma_parcela"),
        ]

    def __str__(self):
        return f"{self.descricao} ({self.data:%d/%m/%Y})"
