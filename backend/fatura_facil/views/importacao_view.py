from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from fatura_facil.serializers import (
    ConfirmacaoDeImportacaoSerializer,
    EnvioDeFaturaSerializer,
    PreviaDaImportacaoSerializer,
    ResultadoDaImportacaoSerializer,
)
from fatura_facil.services.importacao_service import ImportacaoService

__all__ = ["ImportacaoViewSet"]


class ImportacaoViewSet(viewsets.ViewSet):
    """Importação de fatura em dois passos: prévia (não grava) e importação."""

    parser_classes = [MultiPartParser]

    @action(detail=False, methods=["post"])
    def previa(self, request):
        entrada = EnvioDeFaturaSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        dados = entrada.validated_data
        previa = ImportacaoService().previa(
            fonte=dados["fonte"], conteudo=dados["arquivo"].read(), competencia=dados.get("competencia")
        )
        return Response(PreviaDaImportacaoSerializer(previa).data)

    def create(self, request):
        entrada = ConfirmacaoDeImportacaoSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        dados = entrada.validated_data
        resultado = ImportacaoService().importar(
            fonte=dados["fonte"],
            conteudo=dados["arquivo"].read(),
            nome_arquivo=dados["arquivo"].name,
            competencia=dados["competencia"],
            decisoes=dados["decisoes"],
        )
        return Response(ResultadoDaImportacaoSerializer(resultado).data, status=status.HTTP_201_CREATED)
