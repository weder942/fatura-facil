from django.db import models
from django.db.models import F, Q

from fatura_facil.models.choices import Grupo, Origem

__all__ = ["Recorrente", "ValorDoMes", "ValorRecorrente"]


class Recorrente(models.Model):
    """Rendimento ou fixa que se repete todo mês (salário, aluguel, energia).

    O valor de cada mês vem das vigências (`ValorRecorrente`); `ValorDoMes`
    sobrescreve um mês específico. Descontos dentro dos rendimentos (INSS,
    IRRF) são recorrentes de rendimento com valor negativo.
    """

    nome = models.CharField(max_length=80)
    grupo = models.CharField(max_length=10, choices=Grupo.choices)
    variavel = models.BooleanField(
        default=False,
        help_text="Valor muda todo mês (água, energia): usa o último informado como estimativa.",
    )
    ordem = models.PositiveSmallIntegerField(default=0)
    origem = models.CharField(max_length=12, choices=Origem.choices, default=Origem.MANUAL)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["grupo", "ordem", "nome"]
        constraints = [
            models.UniqueConstraint(fields=["grupo", "nome"], name="recorrente_nome_unico_no_grupo"),
        ]

    def __str__(self):
        return self.nome


class ValorRecorrente(models.Model):
    """Vigência: o valor vale de `a_partir_de` até a próxima vigência (ou até `ate`)."""

    recorrente = models.ForeignKey(Recorrente, on_delete=models.CASCADE, related_name="valores")
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    a_partir_de = models.DateField(help_text="Competência (dia 1).")
    ate = models.DateField(null=True, blank=True, help_text="Última competência (dia 1); vazio = sem fim.")

    class Meta:
        ordering = ["recorrente", "a_partir_de"]
        constraints = [
            models.UniqueConstraint(fields=["recorrente", "a_partir_de"], name="vigencia_unica_por_inicio"),
            models.CheckConstraint(
                condition=Q(ate__isnull=True) | Q(ate__gte=F("a_partir_de")),
                name="vigencia_ate_depois_do_inicio",
            ),
        ]

    def __str__(self):
        return f"{self.recorrente} {self.valor} a partir de {self.a_partir_de:%Y-%m}"


class ValorDoMes(models.Model):
    """Valor de um recorrente num mês específico: o real de um variável ou um ajuste pontual."""

    recorrente = models.ForeignKey(Recorrente, on_delete=models.CASCADE, related_name="valores_do_mes")
    competencia = models.DateField(help_text="Primeiro dia do mês.")
    valor = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        ordering = ["recorrente", "competencia"]
        constraints = [
            models.UniqueConstraint(fields=["recorrente", "competencia"], name="valor_do_mes_unico"),
        ]

    def __str__(self):
        return f"{self.recorrente} {self.competencia:%Y-%m}: {self.valor}"
