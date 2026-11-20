from rest_framework import serializers

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.services.competencia_service import formatar_competencia, interpretar_competencia

__all__ = ["CompetenciaField"]


class CompetenciaField(serializers.Field):
    """Competência como "AAAA-MM" na API e como date (dia 1) no Python."""

    def to_representation(self, value):
        return formatar_competencia(value)

    def to_internal_value(self, data):
        try:
            return interpretar_competencia(data if isinstance(data, str) else "")
        except RegraDeNegocioError as erro:
            raise serializers.ValidationError(str(erro.detail)) from erro
