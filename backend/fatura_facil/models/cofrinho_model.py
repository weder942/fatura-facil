from django.db import models
from django.db.models import Q

from fatura_facil.models.banco_model import Banco

__all__ = ["Cofrinho", "MovimentoDoCofrinho", "PercentualDoCofrinho"]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}


class Cofrinho(models.Model):
    """Dinheiro guardado num banco rendendo um percentual do CDI, com liquidez diária.

    Os rendimentos não são digitados: o CofrinhoService os gera dia útil a dia
    útil a partir dos movimentos informados (guardado, resgatado, ajuste), da
    Selic e do percentual vigentes, e os atualiza quando o app é acessado.
    """

    nome = models.CharField(max_length=80)
    banco = models.ForeignKey(Banco, on_delete=models.PROTECT, related_name="cofrinhos")
    inicio = models.DateField(help_text="Data em que o cofrinho passou a ser acompanhado.")
    rendimento_ate = models.DateField(help_text="Último dia com os rendimentos calculados.")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["nome", "id"]

    def __str__(self):
        return self.nome


class PercentualDoCofrinho(models.Model):
    """Quanto do CDI o cofrinho rende, a partir de uma data (o banco pode mudar)."""

    cofrinho = models.ForeignKey(Cofrinho, on_delete=models.CASCADE, related_name="percentuais")
    vigente_desde = models.DateField()
    percentual = models.DecimalField(max_digits=6, decimal_places=2, help_text="% do CDI, ex.: 102.00.")

    class Meta:
        ordering = ["cofrinho", "-vigente_desde"]
        constraints = [
            models.UniqueConstraint(fields=["cofrinho", "vigente_desde"], name="percentual_unico_por_data"),
            models.CheckConstraint(condition=Q(percentual__gt=0), name="percentual_do_cdi_positivo"),
        ]

    def __str__(self):
        return f"{self.percentual}% do CDI desde {self.vigente_desde:%d/%m/%Y}"


class MovimentoDoCofrinho(models.Model):
    """Uma linha do extrato.

    Guardado, resgatado e ajuste são informados (`informado`); rendimento é
    gerado. Os demais valores são calculados pelo CofrinhoService:

    - `valor`: efeito no saldo bruto (positivo entra, negativo sai);
    - `liquido`: o que o extrato mostra — no rendimento, o valor sem o IR
      estimado; no resgate, o que caiu na conta;
    - `ir` e `iof`: retidos num resgate.
    """

    class Tipo(models.TextChoices):
        GUARDADO = "guardado", "Guardado"
        RESGATADO = "resgatado", "Resgatado"
        RENDIMENTO = "rendimento", "Rendimento"
        AJUSTE = "ajuste", "Ajuste de saldo"

    cofrinho = models.ForeignKey(Cofrinho, on_delete=models.CASCADE, related_name="movimentos")
    data = models.DateField()
    tipo = models.CharField(max_length=10, choices=Tipo.choices)
    informado = models.DecimalField(
        **_DINHEIRO,
        null=True,
        blank=True,
        help_text="Guardado: o valor guardado. Resgatado: o que caiu na conta. Ajuste: o saldo que o banco mostra.",
    )
    inicial = models.BooleanField(default=False, help_text="O saldo que o cofrinho tinha quando foi cadastrado.")
    valor = models.DecimalField(**_DINHEIRO, default=0)
    liquido = models.DecimalField(**_DINHEIRO, default=0)
    ir = models.DecimalField(**_DINHEIRO, default=0)
    iof = models.DecimalField(**_DINHEIRO, default=0)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["cofrinho", "-data", "-id"]
        indexes = [models.Index(fields=["cofrinho", "data"])]
        constraints = [
            models.CheckConstraint(
                condition=Q(tipo="rendimento", informado__isnull=True) | (~Q(tipo="rendimento") & Q(informado__gte=0)),
                name="movimento_informado_so_e_sempre_fora_do_rendimento",
            ),
        ]

    def __str__(self):
        return f"{self.get_tipo_display()} {self.valor} em {self.data:%d/%m/%Y}"
