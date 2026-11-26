from django.db import models
from django.db.models import Q

__all__ = ["TaxaSelic"]


class TaxaSelic(models.Model):
    """Selic meta definida pelo Copom, vigente a partir de uma data.

    O CDI usado nos rendimentos fica guardado junto: por padrão, a Selic menos
    0,10 ponto (a diferença histórica entre a meta e a taxa DI), mas pode ser
    informado quando a diferença for outra.
    """

    vigente_desde = models.DateField(unique=True)
    selic = models.DecimalField(max_digits=6, decimal_places=2, help_text="% ao ano, ex.: 13.75.")
    cdi = models.DecimalField(max_digits=6, decimal_places=2, help_text="% ao ano, ex.: 13.65.")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-vigente_desde"]
        constraints = [
            models.CheckConstraint(condition=Q(selic__gt=0), name="taxa_selic_positiva"),
            models.CheckConstraint(condition=Q(cdi__gt=0), name="taxa_cdi_positiva"),
        ]

    def __str__(self):
        return f"{self.selic}% desde {self.vigente_desde:%d/%m/%Y}"
