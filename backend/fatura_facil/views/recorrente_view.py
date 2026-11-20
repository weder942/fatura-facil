from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from fatura_facil.models import Recorrente
from fatura_facil.serializers import (
    EncerramentoSerializer,
    ReajusteSerializer,
    RecorrenteSerializer,
    ValorDoMesSerializer,
)
from fatura_facil.services.competencia_service import interpretar_competencia
from fatura_facil.services.recorrente_service import RecorrenteService

__all__ = ["RecorrenteViewSet"]


class RecorrenteViewSet(viewsets.ModelViewSet):
    """CRUD de recorrentes, reajustes (vigências), fim e valor de um mês."""

    queryset = Recorrente.objects.prefetch_related("valores")
    serializer_class = RecorrenteSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        grupo = self.request.query_params.get("grupo")
        return queryset.filter(grupo=grupo) if grupo else queryset

    def _resposta(self, recorrente):
        recorrente = self.get_queryset().get(pk=recorrente.pk)
        return Response(RecorrenteSerializer(recorrente).data)

    @action(detail=True, methods=["post"])
    def reajustar(self, request, pk=None):
        recorrente = self.get_object()
        entrada = ReajusteSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        RecorrenteService().reajustar(recorrente, **entrada.validated_data)
        return self._resposta(recorrente)

    @action(detail=True, methods=["post"])
    def encerrar(self, request, pk=None):
        recorrente = self.get_object()
        entrada = EncerramentoSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        RecorrenteService().encerrar(recorrente, **entrada.validated_data)
        return self._resposta(recorrente)

    @action(detail=True, methods=["delete"], url_path=r"valores/(?P<vigencia_id>\d+)")
    def remover_vigencia(self, request, pk=None, vigencia_id=None):
        recorrente = self.get_object()
        RecorrenteService().remover_vigencia(get_object_or_404(recorrente.valores, pk=vigencia_id))
        return self._resposta(recorrente)

    @action(detail=True, methods=["put", "delete"], url_path=r"meses/(?P<competencia>\d{4}-\d{2})")
    def valor_do_mes(self, request, pk=None, competencia=None):
        """PUT informa o valor do mês (o real de um variável ou um ajuste); DELETE volta ao valor da vigência."""
        recorrente = self.get_object()
        mes = interpretar_competencia(competencia)
        if request.method == "DELETE":
            RecorrenteService().limpar_no_mes(recorrente, competencia=mes)
            return Response(status=status.HTTP_204_NO_CONTENT)
        entrada = ValorDoMesSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        RecorrenteService().definir_no_mes(recorrente, competencia=mes, **entrada.validated_data)
        return Response(entrada.data)
