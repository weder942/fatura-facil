import pytest


@pytest.fixture
def build_do_front(tmp_path, settings):
    (tmp_path / "index.html").write_text("<html><body><app-root></app-root></body></html>", encoding="utf-8")
    settings.FRONTEND_DIST_DIR = tmp_path
    return tmp_path


class TestSpaView:
    @pytest.mark.parametrize("rota", ["/", "/login", "/meses/2026-12"])
    def test_rotas_do_angular_devolvem_index(self, client, build_do_front, rota):
        response = client.get(rota)

        assert response.status_code == 200
        assert "<app-root>" in response.content.decode()
        assert response["Cache-Control"] == "no-cache"

    def test_sem_build_retorna_404(self, client, tmp_path, settings):
        settings.FRONTEND_DIST_DIR = tmp_path

        response = client.get("/")

        assert response.status_code == 404

    def test_rota_inexistente_da_api_nao_cai_no_angular(self, client, build_do_front):
        response = client.get("/api/nao-existe/")

        assert response.status_code == 404
        assert "<app-root>" not in response.content.decode()
