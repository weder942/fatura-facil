from rest_framework import serializers

from fatura_facil.models import Fonte
from fatura_facil.serializers.competencia_field import CompetenciaField
from fatura_facil.services.importacao_service import DECISAO_PADRAO, DECISOES_PERMITIDAS

__all__ = [
    "ConfirmacaoDeImportacaoSerializer",
    "EnvioDeFaturaSerializer",
    "PreviaDaImportacaoSerializer",
    "ResultadoDaImportacaoSerializer",
]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}


class EnvioDeFaturaSerializer(serializers.Serializer):
    """Upload (multipart) da fatura para a prévia."""

    fonte = serializers.PrimaryKeyRelatedField(queryset=Fonte.objects.all())
    arquivo = serializers.FileField()
    competencia = CompetenciaField(required=False)


class ConfirmacaoDeImportacaoSerializer(EnvioDeFaturaSerializer):
    """O mesmo envio da prévia, com a competência escolhida e as decisões por linha."""

    competencia = CompetenciaField()
    # JSON {"<índice da linha>": "vincular" | "inserir" | "ignorar"}; o que faltar usa o padrão.
    decisoes = serializers.JSONField(binary=True, required=False, default=dict)

    def validate_decisoes(self, valor):
        if not isinstance(valor, dict):
            raise serializers.ValidationError("Envie um objeto {índice: decisão}.")
        try:
            return {int(indice): decisao for indice, decisao in valor.items()}
        except ValueError as erro:
            raise serializers.ValidationError("Os índices das linhas devem ser números.") from erro


class _VinculoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    descricao = serializers.CharField()
    competencia = CompetenciaField()
    parcela = serializers.CharField(source="parcela_formatada")
    valor = serializers.DecimalField(**_DINHEIRO)


class _LinhaDaPreviaSerializer(serializers.Serializer):
    indice = serializers.IntegerField()
    data = serializers.DateField(source="linha.data")
    descricao = serializers.CharField(source="linha.descricao")
    cartao = serializers.CharField(source="linha.cartao")
    parcela = serializers.SerializerMethodField()
    valor = serializers.DecimalField(source="linha.valor", **_DINHEIRO)
    classificacao = serializers.CharField()
    motivo = serializers.CharField()
    vinculo = _VinculoSerializer(allow_null=True)
    decisao = serializers.SerializerMethodField()
    decisoes = serializers.SerializerMethodField()

    def get_parcela(self, item) -> str:
        return f"{item.linha.parcela}/{item.linha.n_parcelas}" if item.linha.parcelada else ""

    def get_decisao(self, item) -> str:
        return DECISAO_PADRAO[item.classificacao]

    def get_decisoes(self, item) -> list[str]:
        return sorted(DECISOES_PERMITIDAS[item.classificacao])


class PreviaDaImportacaoSerializer(serializers.Serializer):
    banco = serializers.CharField(source="fatura.banco")
    emitida_em = serializers.DateField(source="fatura.emitida_em")
    competencia = CompetenciaField()
    competencia_sugerida = CompetenciaField()
    total_da_fatura = serializers.DecimalField(source="fatura.total", allow_null=True, **_DINHEIRO)
    total_lido = serializers.DecimalField(**_DINHEIRO)
    linhas = _LinhaDaPreviaSerializer(many=True)
    faltas = _VinculoSerializer(many=True)


class ResultadoDaImportacaoSerializer(serializers.Serializer):
    lote = serializers.IntegerField(source="lote.pk")
    competencia = CompetenciaField(source="lote.competencia")
    criados = serializers.IntegerField()
    confirmados = serializers.IntegerField()
    ignorados = serializers.IntegerField()
