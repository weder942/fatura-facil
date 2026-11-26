from django.urls import include, path
from rest_framework.routers import DefaultRouter

from fatura_facil.views import (
    AvulsoViewSet,
    BancoViewSet,
    CofrinhoViewSet,
    CompraViewSet,
    CsrfView,
    FamiliaViewSet,
    FonteViewSet,
    ImportacaoViewSet,
    LancamentoViewSet,
    LoginView,
    LogoutView,
    MesViewSet,
    MeView,
    RecorrenteViewSet,
    TaxaSelicViewSet,
)

app_name = "fatura_facil"

router = DefaultRouter()
router.include_root_view = False
router.register("fontes", FonteViewSet, basename="fonte")
router.register("compras", CompraViewSet, basename="compra")
router.register("lancamentos", LancamentoViewSet, basename="lancamento")
router.register("meses", MesViewSet, basename="mes")
router.register("recorrentes", RecorrenteViewSet, basename="recorrente")
router.register("avulsos", AvulsoViewSet, basename="avulso")
router.register("familias", FamiliaViewSet, basename="familia")
router.register("bancos", BancoViewSet, basename="banco")
router.register("taxas-selic", TaxaSelicViewSet, basename="taxa-selic")
router.register("cofrinhos", CofrinhoViewSet, basename="cofrinho")
router.register("importacoes", ImportacaoViewSet, basename="importacao")

urlpatterns = [
    path("auth/csrf/", CsrfView.as_view(), name="auth-csrf"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutView.as_view(), name="auth-logout"),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("", include(router.urls)),
]
