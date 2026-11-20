from rest_framework import serializers

from fatura_facil.models import Fonte

__all__ = ["CompetenciaSugeridaSerializer", "FonteSerializer"]


class FonteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fonte
        fields = ["id", "nome", "tipo", "dia_fechamento", "dia_vencimento", "ativa", "ordem"]

    def validate(self, attrs):
        tipo = attrs.get("tipo", getattr(self.instance, "tipo", None))

        if self.instance and tipo != self.instance.tipo and self.instance.compras.exists():
            raise serializers.ValidationError({"tipo": "O tipo não pode mudar: a fonte já tem compras."})

        if tipo == Fonte.Tipo.CARTAO:
            erros = {}
            for campo in ("dia_fechamento", "dia_vencimento"):
                if attrs.get(campo, getattr(self.instance, campo, None)) is None:
                    erros[campo] = "Obrigatório para cartão."
            if erros:
                raise serializers.ValidationError(erros)
        else:
            # Dinheiro e conta não têm fatura.
            attrs["dia_fechamento"] = None
            attrs["dia_vencimento"] = None
        return attrs


class CompetenciaSugeridaSerializer(serializers.Serializer):
    data = serializers.DateField()
