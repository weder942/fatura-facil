from rest_framework import serializers

from fatura_facil.models import Lancamento
from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.services.compra_service import CompraService

__all__ = ["LancamentoSerializer"]


class LancamentoSerializer(serializers.ModelSerializer):
    """Um lançamento como aparece na visão mensal; só o valor é editável."""

    competencia = CompetenciaField(read_only=True)
    descricao = serializers.CharField(read_only=True)
    parcela = serializers.CharField(source="parcela_formatada", read_only=True)
    valor = serializers.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        model = Lancamento
        fields = ["id", "compra", "fonte", "competencia", "descricao", "parcela", "valor", "tipo", "status", "origem"]
        read_only_fields = ["compra", "fonte", "tipo", "status", "origem"]

    def update(self, instance, validated_data):
        return CompraService().ajustar_parcela(instance, validated_data["valor"])
