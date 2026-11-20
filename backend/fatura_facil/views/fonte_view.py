from django.db.models import ProtectedError
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Fonte
from fatura_facil.serializers import CompetenciaField, CompetenciaSugeridaSerializer, FonteSerializer
from fatura_facil.services.compra_service import CompraService

__all__ = ["FonteViewSet"]


class FonteViewSet(viewsets.ModelViewSet):
    queryset = Fonte.objects.all()
    serializer_class = FonteSerializer

    def perform_destroy(self, instance):
        try:
            instance.delete()
        except ProtectedError as erro:
            raise RegraDeNegocioError("Esta fonte tem compras. Desative-a em vez de excluir.") from erro

    @action(detail=True, methods=["get"], url_path="competencia-sugerida")
    def competencia_sugerida(self, request, pk=None):
        """Competência da 1ª parcela de uma compra feita nesta fonte em `?data=AAAA-MM-DD`."""
        entrada = CompetenciaSugeridaSerializer(data=request.query_params)
        entrada.is_valid(raise_exception=True)
        competencia = CompraService.competencia_sugerida(self.get_object(), entrada.validated_data["data"])
        return Response({"competencia": CompetenciaField().to_representation(competencia)})
