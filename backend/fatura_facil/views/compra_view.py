from rest_framework import viewsets

from fatura_facil.models import Compra
from fatura_facil.serializers import CompraSerializer

__all__ = ["CompraViewSet"]


class CompraViewSet(viewsets.ModelViewSet):
    """CRUD de compras. Excluir uma compra exclui as parcelas (o front pede confirmação)."""

    queryset = Compra.objects.select_related("fonte").prefetch_related("lancamentos")
    serializer_class = CompraSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        fonte = self.request.query_params.get("fonte")
        return queryset.filter(fonte_id=fonte) if fonte and fonte.isdigit() else queryset
