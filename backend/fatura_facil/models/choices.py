from django.db import models

__all__ = ["Origem"]


class Origem(models.TextChoices):
    MANUAL = "manual", "Manual"
    IMPORTACAO = "importacao", "Importação"
