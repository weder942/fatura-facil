from decimal import Decimal

from rest_framework import serializers

from fatura_facil.models import Familia, Fonte, MembroDaFamilia
from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.services.familia_service import FamiliaService, NovoMembro

__all__ = [
    "AlteracaoDeFamiliaSerializer",
    "EncerramentoDeFamiliaSerializer",
    "FamiliaSerializer",
    "NovaFamiliaSerializer",
]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}


class _MembroSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(max_length=60)

    class Meta:
        model = MembroDaFamilia
        fields = ["nome", "administrador"]


class FamiliaSerializer(serializers.ModelSerializer):
    """Leitura: os membros na ordem do rodízio, que conta a partir de `inicio`."""

    inicio = CompetenciaField()
    ate = CompetenciaField(allow_null=True)
    membros = _MembroSerializer(many=True)
    primeira_editavel = serializers.SerializerMethodField()

    class Meta:
        model = Familia
        fields = ["id", "nome", "fonte", "valor", "inicio", "ate", "membros", "primeira_editavel"]
        read_only_fields = fields

    def get_primeira_editavel(self, familia) -> str:
        return CompetenciaField().to_representation(FamiliaService.primeira_editavel(familia))


class _ConfiguracaoSerializer(serializers.Serializer):
    fonte = serializers.PrimaryKeyRelatedField(queryset=Fonte.objects.all())
    nome = serializers.CharField(max_length=80)
    valor = serializers.DecimalField(**_DINHEIRO, min_value=Decimal("0.01"))
    membros = _MembroSerializer(many=True, allow_empty=False)

    def validate_membros(self, membros):
        return [NovoMembro(**membro) for membro in membros]


class NovaFamiliaSerializer(_ConfiguracaoSerializer):
    inicio = CompetenciaField(help_text="Competência do 1º mês: nela paga o 1º membro.")


class AlteracaoDeFamiliaSerializer(_ConfiguracaoSerializer):
    a_partir_de = CompetenciaField(help_text="Mês em que a mudança começa; nele paga o 1º membro da lista.")


class EncerramentoDeFamiliaSerializer(serializers.Serializer):
    a_partir_de = CompetenciaField(help_text="Primeiro mês sem a mensalidade.")
