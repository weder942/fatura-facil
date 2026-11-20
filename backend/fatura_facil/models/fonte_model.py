from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import Q

__all__ = ["Fonte"]

_DIA_DO_MES = [MinValueValidator(1), MaxValueValidator(31)]


class Fonte(models.Model):
    """De onde sai o dinheiro: um cartão, dinheiro/PIX ou uma conta.

    Nunca guarda número de cartão: o nome é só um apelido ("Bradesco 9241").
    """

    class Tipo(models.TextChoices):
        CARTAO = "cartao", "Cartão"
        DINHEIRO = "dinheiro", "Dinheiro"
        CONTA = "conta", "Conta"

    nome = models.CharField(max_length=60, unique=True)
    tipo = models.CharField(max_length=10, choices=Tipo.choices)
    dia_fechamento = models.PositiveSmallIntegerField(null=True, blank=True, validators=_DIA_DO_MES)
    dia_vencimento = models.PositiveSmallIntegerField(null=True, blank=True, validators=_DIA_DO_MES)
    ativa = models.BooleanField(default=True)
    ordem = models.PositiveSmallIntegerField(default=0, help_text="Posição do bloco na visão mensal.")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["ordem", "nome"]
        constraints = [
            models.CheckConstraint(
                condition=(
                    Q(tipo="cartao", dia_fechamento__isnull=False, dia_vencimento__isnull=False)
                    | (~Q(tipo="cartao") & Q(dia_fechamento__isnull=True, dia_vencimento__isnull=True))
                ),
                name="fonte_dias_so_e_sempre_em_cartao",
            ),
            models.CheckConstraint(
                condition=Q(dia_fechamento__isnull=True) | Q(dia_fechamento__gte=1, dia_fechamento__lte=31),
                name="fonte_dia_fechamento_valido",
            ),
            models.CheckConstraint(
                condition=Q(dia_vencimento__isnull=True) | Q(dia_vencimento__gte=1, dia_vencimento__lte=31),
                name="fonte_dia_vencimento_valido",
            ),
        ]

    def __str__(self):
        return self.nome

    @property
    def e_cartao(self) -> bool:
        return self.tipo == self.Tipo.CARTAO
