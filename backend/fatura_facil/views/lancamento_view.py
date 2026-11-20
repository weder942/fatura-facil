from rest_framework import mixins, viewsets

from fatura_facil.models import Lancamento
from fatura_facil.serializers import LancamentoSerializer

__all__ = ["LancamentoViewSet"]


class LancamentoViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """Só leitura e ajuste do valor de uma parcela (PATCH)."""

    queryset = Lancamento.objects.select_related("compra", "fonte")
    serializer_class = LancamentoSerializer
    http_method_names = ["get", "patch", "head", "options"]
