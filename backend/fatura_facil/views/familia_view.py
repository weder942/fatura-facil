from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from fatura_facil.models import Familia
from fatura_facil.serializers import (
    AlteracaoDeFamiliaSerializer,
    EncerramentoDeFamiliaSerializer,
    FamiliaSerializer,
    NovaFamiliaSerializer,
)
from fatura_facil.services.familia_service import FamiliaService

__all__ = ["FamiliaViewSet"]


class FamiliaViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Famílias em rodízio. Criar gera os meses; alterar e encerrar valem do mês dado em diante."""

    queryset = Familia.objects.prefetch_related("membros")
    serializer_class = FamiliaSerializer

    def _resposta(self, familia, status_code=status.HTTP_200_OK):
        return Response(FamiliaSerializer(self.get_queryset().get(pk=familia.pk)).data, status=status_code)

    def create(self, request):
        entrada = NovaFamiliaSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        familia = FamiliaService().criar(**entrada.validated_data)
        return self._resposta(familia, status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def alterar(self, request, pk=None):
        familia = self.get_object()
        entrada = AlteracaoDeFamiliaSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        FamiliaService().alterar(familia, **entrada.validated_data)
        return self._resposta(familia)

    @action(detail=True, methods=["post"])
    def encerrar(self, request, pk=None):
        entrada = EncerramentoDeFamiliaSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        familia = FamiliaService().encerrar(self.get_object(), **entrada.validated_data)
        if familia is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return self._resposta(familia)
