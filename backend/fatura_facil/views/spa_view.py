from django.conf import settings
from django.http import Http404, HttpResponse
from django.views import View

__all__ = ["SpaView"]


class SpaView(View):
    """Devolve o index.html do build do Angular para as rotas do front.

    Os arquivos do build (.js, .css) são servidos pelo WhiteNoise; esta view
    só cobre as rotas do Angular (ex.: /meses/2026-12), para um F5 numa tela
    interna não dar 404.
    """

    def get(self, request, *args, **kwargs):
        index = settings.FRONTEND_DIST_DIR / "index.html"
        if not index.is_file():
            raise Http404("Build do frontend não encontrado. Rode o build do Angular.")
        response = HttpResponse(index.read_text(encoding="utf-8"), content_type="text/html; charset=utf-8")
        response["Cache-Control"] = "no-cache"
        return response
