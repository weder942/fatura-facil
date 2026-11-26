from django.db.models import ProtectedError
from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.models import Banco, Cofrinho, TaxaSelic
from fatura_facil.serializers import (
    AlteracaoDeCofrinhoSerializer,
    BancoSerializer,
    CofrinhoSerializer,
    ExtratoQuerySerializer,
    MesDoCofrinhoSerializer,
    MovimentoDoCofrinhoSerializer,
    NovaTaxaSelicSerializer,
    NovoCofrinhoSerializer,
    NovoMovimentoSerializer,
    NovoPercentualSerializer,
    TaxaSelicSerializer,
)
from fatura_facil.services.cofrinho_service import CofrinhoService, TaxaSelicService

__all__ = ["BancoViewSet", "CofrinhoViewSet", "TaxaSelicViewSet"]


class BancoViewSet(viewsets.ModelViewSet):
    queryset = Banco.objects.all()
    serializer_class = BancoSerializer

    def perform_destroy(self, instance):
        try:
            instance.delete()
        except ProtectedError as erro:
            raise RegraDeNegocioError("Este banco tem cofrinhos. Desative-o em vez de excluir.") from erro


class TaxaSelicViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet
):
    """Histórico da Selic. Cadastrar numa data que já tem taxa corrige aquela taxa."""

    queryset = TaxaSelic.objects.all()
    serializer_class = TaxaSelicSerializer

    def create(self, request):
        entrada = NovaTaxaSelicSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        taxa = TaxaSelicService().salvar(**entrada.validated_data)
        return Response(TaxaSelicSerializer(taxa).data, status=status.HTTP_201_CREATED)

    def perform_destroy(self, instance):
        TaxaSelicService().excluir(instance)


class CofrinhoViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """Cofrinhos. Ler gera os rendimentos que faltam até hoje."""

    queryset = Cofrinho.objects.select_related("banco").prefetch_related("percentuais")
    serializer_class = CofrinhoSerializer

    def _representar(self, cofrinhos, many=False):
        lista = cofrinhos if many else [cofrinhos]
        resultados = {cofrinho.pk: CofrinhoService.simular(cofrinho) for cofrinho in lista}
        return CofrinhoSerializer(cofrinhos, many=many, context={"resultados": resultados}).data

    def _resposta(self, cofrinho, status_code=status.HTTP_200_OK):
        return Response(self._representar(self.get_queryset().get(pk=cofrinho.pk)), status=status_code)

    def list(self, request):
        CofrinhoService().atualizar()
        return Response(self._representar(list(self.get_queryset()), many=True))

    def retrieve(self, request, pk=None):
        CofrinhoService().atualizar()
        return self._resposta(self.get_object())

    def create(self, request):
        entrada = NovoCofrinhoSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        cofrinho = CofrinhoService().criar(**entrada.validated_data)
        return self._resposta(cofrinho, status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        cofrinho = self.get_object()
        entrada = AlteracaoDeCofrinhoSerializer(cofrinho, data=request.data, partial=True)
        entrada.is_valid(raise_exception=True)
        entrada.save()
        return self._resposta(cofrinho)

    @action(detail=True, methods=["post"])
    def percentual(self, request, pk=None):
        cofrinho = self.get_object()
        entrada = NovoPercentualSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        CofrinhoService().definir_percentual(cofrinho, **entrada.validated_data)
        return self._resposta(cofrinho)

    @action(detail=True, methods=["post"])
    def movimentos(self, request, pk=None):
        entrada = NovoMovimentoSerializer(data=request.data)
        entrada.is_valid(raise_exception=True)
        movimento = CofrinhoService().movimentar(self.get_object(), **entrada.validated_data)
        return Response(MovimentoDoCofrinhoSerializer(movimento).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["delete"], url_path=r"movimentos/(?P<movimento_id>\d+)")
    def excluir_movimento(self, request, pk=None, movimento_id=None):
        movimento = get_object_or_404(self.get_object().movimentos, pk=movimento_id)
        CofrinhoService().excluir_movimento(movimento)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def extrato(self, request, pk=None):
        """Movimentos do mais recente ao mais antigo. `?tipo=` filtra; `?limite=` corta."""
        CofrinhoService().atualizar()
        filtro = ExtratoQuerySerializer(data=request.query_params)
        filtro.is_valid(raise_exception=True)
        movimentos = self.get_object().movimentos.order_by("-data", "-id")
        if tipo := filtro.validated_data.get("tipo"):
            movimentos = movimentos.filter(tipo=tipo)
        if limite := filtro.validated_data.get("limite"):
            movimentos = movimentos[:limite]
        return Response(MovimentoDoCofrinhoSerializer(movimentos, many=True).data)

    @action(detail=True, methods=["get"])
    def rendimentos(self, request, pk=None):
        """Resumo de cada mês desde o início: bruto, ajustes, IR, IOF e líquido."""
        CofrinhoService().atualizar()
        resultado = CofrinhoService.simular(self.get_object())
        return Response(MesDoCofrinhoSerializer(resultado.meses, many=True).data)
