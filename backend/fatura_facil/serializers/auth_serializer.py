from django.contrib.auth import authenticate
from rest_framework import serializers

from fatura_facil.exceptions import RegraDeNegocioError

__all__ = ["LoginSerializer", "UsuarioSerializer"]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(trim_whitespace=False, write_only=True)

    def validate(self, attrs):
        usuario = authenticate(self.context.get("request"), username=attrs["username"], password=attrs["password"])
        if usuario is None:
            raise RegraDeNegocioError("Usuário ou senha inválidos.")
        attrs["usuario"] = usuario
        return attrs


class UsuarioSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
