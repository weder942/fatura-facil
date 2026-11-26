from rest_framework import serializers

from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.serializers.lancamento_serializer import LancamentoSerializer

__all__ = ["CompetenciaDoHorizonteSerializer", "VisaoDoMesSerializer"]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}


class _FonteDoBlocoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nome = serializers.CharField()
    tipo = serializers.CharField()
    ativa = serializers.BooleanField()


class _BlocoDaFonteSerializer(serializers.Serializer):
    fonte = _FonteDoBlocoSerializer()
    lancamentos = LancamentoSerializer(many=True)
    total = serializers.DecimalField(**_DINHEIRO)


class _ItemDoMesSerializer(serializers.Serializer):
    tipo = serializers.CharField()
    id = serializers.IntegerField()
    descricao = serializers.CharField()
    valor = serializers.DecimalField(**_DINHEIRO)
    variavel = serializers.BooleanField()
    pendente = serializers.BooleanField()
    ajustado = serializers.BooleanField()
    familia = serializers.IntegerField(allow_null=True)


class _ResumoDoMesSerializer(serializers.Serializer):
    total_rendimentos = serializers.DecimalField(**_DINHEIRO)
    total_fixas = serializers.DecimalField(**_DINHEIRO)
    total_dinheiro_e_contas = serializers.DecimalField(**_DINHEIRO)
    total_cartoes = serializers.DecimalField(**_DINHEIRO)
    saldo = serializers.DecimalField(**_DINHEIRO)


class VisaoDoMesSerializer(serializers.Serializer):
    competencia = CompetenciaField()
    rendimentos = _ItemDoMesSerializer(many=True)
    fixas = _ItemDoMesSerializer(many=True)
    fontes = _BlocoDaFonteSerializer(many=True)
    resumo = _ResumoDoMesSerializer()


class CompetenciaDoHorizonteSerializer(serializers.Serializer):
    competencia = CompetenciaField()
    atual = serializers.BooleanField()
