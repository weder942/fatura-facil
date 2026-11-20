from django.db import models

__all__ = ["Grupo", "Origem"]


class Origem(models.TextChoices):
    MANUAL = "manual", "Manual"
    IMPORTACAO = "importacao", "Importação"
    PLANILHA = "planilha", "Planilha"


class Grupo(models.TextChoices):
    """Onde um recorrente ou avulso entra na visão mensal."""

    RENDIMENTO = "rendimento", "Rendimento"
    FIXA = "fixa", "Fixa"
