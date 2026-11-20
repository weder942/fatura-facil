from django.utils import timezone
from rest_framework import viewsets
from rest_framework.response import Response

from fatura_facil.serializers import CompetenciaDoHorizonteSerializer, VisaoDoMesSerializer
from fatura_facil.services.competencia_service import competencia_da_data, interpretar_competencia
from fatura_facil.services.horizonte_service import HorizonteService
from fatura_facil.services.mes_service import MesService

__all__ = ["MesViewSet"]


class MesViewSet(viewsets.ViewSet):
    lookup_field = "competencia"
    lookup_value_regex = r"[^/]+"

    def list(self, request):
        """Horizonte de projeção: as competências navegáveis."""
        hoje = timezone.localdate()
        atual = competencia_da_data(hoje)
        competencias = [
            {"competencia": competencia, "atual": competencia == atual}
            for competencia in HorizonteService().competencias(hoje)
        ]
        return Response(CompetenciaDoHorizonteSerializer(competencias, many=True).data)

    def retrieve(self, request, competencia=None):
        visao = MesService().visao(interpretar_competencia(competencia))
        return Response(VisaoDoMesSerializer(visao).data)
