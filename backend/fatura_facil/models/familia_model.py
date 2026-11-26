from django.db import models
from django.db.models import Q

from fatura_facil.models.fonte_model import Fonte

__all__ = ["Familia", "MembroDaFamilia"]


class Familia(models.Model):
    """Assinatura dividida em rodízio (ex.: Apple iCloud): cada mês um membro paga.

    A mensalidade cai todo mês na fonte, e o membro do mês devolve o valor,
    que entra como rendimento avulso (menos no mês de quem administra). Os
    lançamentos e avulsos são gerados pelo FamiliaService até alguns meses à
    frente e estendidos quando o app é acessado.
    """

    nome = models.CharField(max_length=80, help_text='Identificação da família, ex.: "Apple icloud".')
    fonte = models.ForeignKey(Fonte, on_delete=models.PROTECT, related_name="familias")
    valor = models.DecimalField(max_digits=12, decimal_places=2, help_text="Mensalidade.")
    inicio = models.DateField(help_text="Competência (dia 1) em que o 1º membro paga; o rodízio conta daqui.")
    ate = models.DateField(null=True, blank=True, help_text="Última competência (dia 1); vazio = sem fim.")
    gerado_ate = models.DateField(help_text="Última competência com lançamento gerado.")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["nome", "id"]
        constraints = [
            models.CheckConstraint(condition=Q(valor__gt=0), name="familia_valor_positivo"),
        ]

    def __str__(self):
        return self.nome


class MembroDaFamilia(models.Model):
    familia = models.ForeignKey(Familia, on_delete=models.CASCADE, related_name="membros")
    nome = models.CharField(max_length=60)
    ordem = models.PositiveSmallIntegerField(help_text="Posição no rodízio, a partir de 0.")
    administrador = models.BooleanField(
        default=False, help_text="Quem administra a família: no mês dele não há rendimento a receber."
    )

    class Meta:
        ordering = ["familia", "ordem"]
        constraints = [
            models.UniqueConstraint(fields=["familia", "ordem"], name="membro_ordem_unica_na_familia"),
        ]

    def __str__(self):
        return self.nome
