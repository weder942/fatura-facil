from decimal import Decimal

from rest_framework import serializers

from fatura_facil.models import Compra, Fonte, Lancamento
from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.services.compra_service import CompraService

__all__ = ["CompraSerializer", "ParcelaSerializer"]


class ParcelaSerializer(serializers.ModelSerializer):
    competencia = CompetenciaField(read_only=True)

    class Meta:
        model = Lancamento
        fields = ["id", "parcela", "competencia", "valor", "status"]
        read_only_fields = fields


class CompraSerializer(serializers.ModelSerializer):
    fonte = serializers.PrimaryKeyRelatedField(queryset=Fonte.objects.all())
    valor_total = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=Decimal("0.01"))
    n_parcelas = serializers.IntegerField(min_value=1, max_value=120, default=1)
    competencia_inicial = CompetenciaField(required=False)
    valor_primeira_parcela = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        min_value=Decimal("0.01"),
        required=False,
        write_only=True,
        help_text="Opcional: valor da 1ª parcela; o restante é dividido entre as demais.",
    )
    parcelas = serializers.SerializerMethodField()

    class Meta:
        model = Compra
        fields = [
            "id",
            "fonte",
            "data",
            "descricao",
            "descricao_original",
            "valor_total",
            "n_parcelas",
            "competencia_inicial",
            "valor_primeira_parcela",
            "origem",
            "parcelas",
        ]
        read_only_fields = ["descricao_original", "origem"]

    def get_parcelas(self, compra):
        # .all() aproveita o prefetch_related da view (sem uma consulta por compra).
        normais = sorted(
            (lancamento for lancamento in compra.lancamentos.all() if lancamento.tipo == Lancamento.Tipo.NORMAL),
            key=lambda lancamento: lancamento.parcela,
        )
        return ParcelaSerializer(normais, many=True).data

    def create(self, validated_data):
        return CompraService().criar(**validated_data)

    def update(self, instance, validated_data):
        return CompraService().atualizar(instance, **validated_data)
