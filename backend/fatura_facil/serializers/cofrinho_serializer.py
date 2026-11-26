from decimal import Decimal

from django.utils import timezone
from rest_framework import serializers

from fatura_facil.models import Banco, Cofrinho, MovimentoDoCofrinho, PercentualDoCofrinho, TaxaSelic
from fatura_facil.serializers.competencia_field import CompetenciaField

__all__ = [
    "AlteracaoDeCofrinhoSerializer",
    "BancoSerializer",
    "CofrinhoSerializer",
    "ExtratoQuerySerializer",
    "MesDoCofrinhoSerializer",
    "MovimentoDoCofrinhoSerializer",
    "NovaTaxaSelicSerializer",
    "NovoCofrinhoSerializer",
    "NovoMovimentoSerializer",
    "NovoPercentualSerializer",
    "TaxaSelicSerializer",
]

_DINHEIRO = {"max_digits": 12, "decimal_places": 2}
_TAXA = {"max_digits": 6, "decimal_places": 2, "min_value": Decimal("0.01")}
Tipo = MovimentoDoCofrinho.Tipo


class BancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banco
        fields = ["id", "nome", "ativo"]


class TaxaSelicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxaSelic
        fields = ["id", "vigente_desde", "selic", "cdi"]
        read_only_fields = fields


class NovaTaxaSelicSerializer(serializers.Serializer):
    vigente_desde = serializers.DateField()
    selic = serializers.DecimalField(**_TAXA)
    cdi = serializers.DecimalField(
        **_TAXA, required=False, allow_null=True, help_text="Vazio: a Selic menos 0,10 ponto."
    )


class _PercentualSerializer(serializers.ModelSerializer):
    class Meta:
        model = PercentualDoCofrinho
        fields = ["vigente_desde", "percentual"]


class CofrinhoSerializer(serializers.ModelSerializer):
    """Leitura. Saldos e rendimentos vêm da simulação, passada no contexto
    como `resultados` ({id do cofrinho: Resultado})."""

    banco_nome = serializers.CharField(source="banco.nome")
    percentual = serializers.SerializerMethodField()
    percentuais = _PercentualSerializer(many=True)
    saldo_bruto = serializers.SerializerMethodField()
    saldo_liquido = serializers.SerializerMethodField()
    ir_estimado = serializers.SerializerMethodField()
    iof_estimado = serializers.SerializerMethodField()
    ja_rendeu = serializers.SerializerMethodField()
    rendeu_no_mes = serializers.SerializerMethodField()

    class Meta:
        model = Cofrinho
        fields = [
            "id",
            "nome",
            "banco",
            "banco_nome",
            "inicio",
            "percentual",
            "percentuais",
            "saldo_bruto",
            "saldo_liquido",
            "ir_estimado",
            "iof_estimado",
            "ja_rendeu",
            "rendeu_no_mes",
        ]
        read_only_fields = fields

    def _resultado(self, cofrinho):
        return self.context["resultados"][cofrinho.pk]

    @staticmethod
    def _dinheiro(valor: Decimal) -> str:
        return f"{valor:.2f}"

    def get_percentual(self, cofrinho) -> str:
        """O vigente hoje (os percentuais vêm do mais recente ao mais antigo)."""
        hoje = timezone.localdate()
        percentuais = list(cofrinho.percentuais.all())
        atual = next((p for p in percentuais if p.vigente_desde <= hoje), percentuais[-1])
        return self._dinheiro(atual.percentual)

    def get_saldo_bruto(self, cofrinho) -> str:
        return self._dinheiro(self._resultado(cofrinho).saldo_bruto)

    def get_saldo_liquido(self, cofrinho) -> str:
        return self._dinheiro(self._resultado(cofrinho).saldo_liquido)

    def get_ir_estimado(self, cofrinho) -> str:
        return self._dinheiro(self._resultado(cofrinho).ir_estimado)

    def get_iof_estimado(self, cofrinho) -> str:
        return self._dinheiro(self._resultado(cofrinho).iof_estimado)

    def get_ja_rendeu(self, cofrinho) -> str:
        return self._dinheiro(self._resultado(cofrinho).ja_rendeu)

    def get_rendeu_no_mes(self, cofrinho) -> str:
        meses = self._resultado(cofrinho).meses
        return self._dinheiro(meses[-1].liquido if meses else Decimal(0))


class NovoCofrinhoSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=80)
    banco = serializers.PrimaryKeyRelatedField(queryset=Banco.objects.all())
    inicio = serializers.DateField(help_text="Data de criação: a partir dela o cofrinho é acompanhado.")
    saldo = serializers.DecimalField(**_DINHEIRO, min_value=Decimal(0), help_text="Valor total atual.")
    percentual = serializers.DecimalField(**_TAXA, help_text="% do CDI, ex.: 102.")


class AlteracaoDeCofrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cofrinho
        fields = ["nome", "banco"]


class NovoPercentualSerializer(serializers.Serializer):
    percentual = serializers.DecimalField(**_TAXA)
    a_partir_de = serializers.DateField()


class NovoMovimentoSerializer(serializers.Serializer):
    tipo = serializers.ChoiceField(choices=[Tipo.GUARDADO, Tipo.RESGATADO, Tipo.AJUSTE])
    data = serializers.DateField()
    informado = serializers.DecimalField(**_DINHEIRO, min_value=Decimal(0))


class MovimentoDoCofrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimentoDoCofrinho
        fields = ["id", "data", "tipo", "informado", "inicial", "valor", "liquido", "ir", "iof"]
        read_only_fields = fields


class ExtratoQuerySerializer(serializers.Serializer):
    tipo = serializers.ChoiceField(choices=Tipo.choices, required=False)
    limite = serializers.IntegerField(min_value=1, required=False)


class MesDoCofrinhoSerializer(serializers.Serializer):
    mes = CompetenciaField(source="inicio")
    bruto = serializers.DecimalField(**_DINHEIRO)
    ajustes = serializers.DecimalField(**_DINHEIRO)
    ir = serializers.DecimalField(**_DINHEIRO)
    iof = serializers.DecimalField(**_DINHEIRO)
    liquido = serializers.DecimalField(**_DINHEIRO)
