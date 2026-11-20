from rest_framework import viewsets

from fatura_facil.models import Avulso
from fatura_facil.serializers import AvulsoSerializer
from fatura_facil.services.competencia_service import interpretar_competencia

__all__ = ["AvulsoViewSet"]


class AvulsoViewSet(viewsets.ModelViewSet):
    """Rendimentos e fixas de um mês só. Filtra por `?competencia=AAAA-MM`."""

    queryset = Avulso.objects.all()
    serializer_class = AvulsoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        competencia = self.request.query_params.get("competencia")
        return queryset.filter(competencia=interpretar_competencia(competencia)) if competencia else queryset
