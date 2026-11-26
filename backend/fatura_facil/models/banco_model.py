from django.db import models

__all__ = ["Banco"]


class Banco(models.Model):
    """Onde o dinheiro de um cofrinho está guardado (PicPay, Nubank...)."""

    nome = models.CharField(max_length=60, unique=True)
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["nome"]

    def __str__(self):
        return self.nome
