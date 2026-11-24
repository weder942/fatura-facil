from django.db import models

from fatura_facil.models.fonte_model import Fonte

__all__ = ["LoteImportacao"]


class LoteImportacao(models.Model):
    """Uma fatura importada: os lançamentos criados ou confirmados por ela apontam para cá."""

    fonte = models.ForeignKey(Fonte, on_delete=models.PROTECT, related_name="lotes")
    competencia = models.DateField(help_text="Primeiro dia do mês.")
    nome_arquivo = models.CharField(max_length=255)
    arquivo_hash = models.CharField(max_length=64, help_text="SHA-256 do arquivo.")
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em", "-id"]

    def __str__(self):
        return f"{self.fonte} {self.competencia:%Y-%m} ({self.nome_arquivo})"
