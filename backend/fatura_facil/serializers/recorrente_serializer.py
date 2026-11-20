from django.utils import timezone
from rest_framework import serializers

from fatura_facil.models import Recorrente, ValorRecorrente
from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.services.competencia_service import competencia_da_data
from fatura_facil.services.recorrente_service import RecorrenteService, valor_vigente

__all__ = [
    "EncerramentoSerializer",
    "ReajusteSerializer",
    "RecorrenteSerializer",
    "ValorDoMesSerializer",
    "VigenciaSerializer",
]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}


class VigenciaSerializer(serializers.ModelSerializer):
    a_partir_de = CompetenciaField()
    ate = CompetenciaField(allow_null=True, required=False)

    class Meta:
        model = ValorRecorrente
        fields = ["id", "valor", "a_partir_de", "ate"]
        read_only_fields = fields


class RecorrenteSerializer(serializers.ModelSerializer):
    """Na criação, `valor` e `a_partir_de` viram a primeira vigência. Reajustes têm endpoint próprio."""

    valor = serializers.DecimalField(**_DINHEIRO, write_only=True)
    a_partir_de = CompetenciaField(write_only=True)
    valores = VigenciaSerializer(many=True, read_only=True)
    valor_atual = serializers.SerializerMethodField()

    class Meta:
        model = Recorrente
        fields = ["id", "nome", "grupo", "variavel", "ordem", "valor", "a_partir_de", "valores", "valor_atual"]

    def get_fields(self):
        fields = super().get_fields()
        if self.instance is not None:
            # Na edição, o valor muda por reajuste, não pelo cadastro.
            fields.pop("valor")
            fields.pop("a_partir_de")
        return fields

    def get_valor_atual(self, recorrente) -> str | None:
        valor = valor_vigente(list(recorrente.valores.all()), competencia_da_data(timezone.localdate()))
        return None if valor is None else f"{valor:.2f}"

    def create(self, validated_data):
        return RecorrenteService().criar(**validated_data)


class ReajusteSerializer(serializers.Serializer):
    valor = serializers.DecimalField(**_DINHEIRO)
    a_partir_de = CompetenciaField()


class EncerramentoSerializer(serializers.Serializer):
    ate = CompetenciaField()


class ValorDoMesSerializer(serializers.Serializer):
    valor = serializers.DecimalField(**_DINHEIRO)
