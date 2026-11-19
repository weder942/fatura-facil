import pytest
from django.urls import reverse

from fatura_facil.tests.factories import SENHA_PADRAO

pytestmark = pytest.mark.django_db

CSRF_URL = reverse("fatura_facil:auth-csrf")
LOGIN_URL = reverse("fatura_facil:auth-login")
LOGOUT_URL = reverse("fatura_facil:auth-logout")
ME_URL = reverse("fatura_facil:auth-me")


def _obter_csrf(client):
    response = client.get(CSRF_URL)
    return response.cookies["csrftoken"].value


class TestCsrfView:
    def test_define_cookie_csrf_sem_login(self, api_client):
        response = api_client.get(CSRF_URL)

        assert response.status_code == 204
        assert "csrftoken" in response.cookies
        assert response.cookies["csrftoken"]["httponly"] == ""


class TestLoginView:
    def test_login_com_credenciais_validas_abre_sessao(self, api_client_csrf, usuario):
        token = _obter_csrf(api_client_csrf)

        response = api_client_csrf.post(
            LOGIN_URL, {"username": usuario.username, "password": SENHA_PADRAO}, format="json", HTTP_X_CSRFTOKEN=token
        )

        assert response.status_code == 200
        assert response.json() == {"username": usuario.username}
        assert "sessionid" in response.cookies
        assert api_client_csrf.get(ME_URL).status_code == 200

    def test_login_sem_token_csrf_e_recusado(self, api_client_csrf, usuario):
        response = api_client_csrf.post(
            LOGIN_URL, {"username": usuario.username, "password": SENHA_PADRAO}, format="json"
        )

        assert response.status_code == 403

    def test_senha_errada_retorna_400_com_detail(self, api_client, usuario):
        response = api_client.post(LOGIN_URL, {"username": usuario.username, "password": "errada"}, format="json")

        assert response.status_code == 400
        assert response.json() == {"detail": "Usuário ou senha inválidos."}

    def test_usuario_inativo_nao_entra(self, api_client, usuario):
        usuario.is_active = False
        usuario.save()

        response = api_client.post(LOGIN_URL, {"username": usuario.username, "password": SENHA_PADRAO}, format="json")

        assert response.status_code == 400

    def test_campos_obrigatorios(self, api_client):
        response = api_client.post(LOGIN_URL, {}, format="json")

        assert response.status_code == 400
        assert set(response.json()) == {"username", "password"}

    def test_limita_tentativas_de_login(self, api_client, usuario):
        for _ in range(5):
            api_client.post(LOGIN_URL, {"username": usuario.username, "password": "errada"}, format="json")

        response = api_client.post(LOGIN_URL, {"username": usuario.username, "password": SENHA_PADRAO}, format="json")

        assert response.status_code == 429


class TestMeView:
    def test_sem_login_retorna_401(self, api_client):
        response = api_client.get(ME_URL)

        assert response.status_code == 401

    def test_com_login_retorna_usuario(self, api_client_logado, usuario):
        response = api_client_logado.get(ME_URL)

        assert response.status_code == 200
        assert response.json() == {"username": usuario.username}


class TestLogoutView:
    def test_encerra_a_sessao(self, api_client, usuario):
        api_client.post(LOGIN_URL, {"username": usuario.username, "password": SENHA_PADRAO}, format="json")

        response = api_client.post(LOGOUT_URL)

        assert response.status_code == 204
        assert api_client.get(ME_URL).status_code == 401

    def test_sem_login_retorna_401(self, api_client):
        response = api_client.post(LOGOUT_URL)

        assert response.status_code == 401
