from rest_framework import serializers

from fatura_facil.models import Avulso
from fatura_facil.serializers.competencia_field import CompetenciaField

__all__ = ["AvulsoSerializer"]


class AvulsoSerializer(serializers.ModelSerializer):
    competencia = CompetenciaField()

    class Meta:
        model = Avulso
        fields = ["id", "grupo", "competencia", "descricao", "valor", "familia"]
        read_only_fields = ["familia"]
