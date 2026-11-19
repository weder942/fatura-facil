from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path

from fatura_facil.views import SpaView

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/", include("fatura_facil.urls")),
    # Qualquer outra rota (exceto /api/ e /static/) é do Angular.
    re_path(r"^(?!api/|static/).*$", SpaView.as_view(), name="spa"),
]
