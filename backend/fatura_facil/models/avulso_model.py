from django.db import models

from fatura_facil.models.choices import Grupo, Origem
from fatura_facil.models.familia_model import Familia

__all__ = ["Avulso"]


class Avulso(models.Model):
    """Rendimento ou fixa de um mês só (férias, reembolso de alguém, presente)."""

    grupo = models.CharField(max_length=10, choices=Grupo.choices)
    competencia = models.DateField(db_index=True, help_text="Primeiro dia do mês.")
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    origem = models.CharField(max_length=12, choices=Origem.choices, default=Origem.MANUAL)
    familia = models.ForeignKey(
        Familia,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="avulsos",
        help_text="Família cujo membro do mês devolve a mensalidade.",
    )
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["competencia", "grupo", "id"]

    def __str__(self):
        return f"{self.descricao} {self.competencia:%Y-%m}: {self.valor}"
