import pytest
from django.core.cache import cache
from rest_framework.test import APIClient

from fatura_facil.tests.factories import UsuarioFactory


@pytest.fixture(autouse=True)
def limpar_cache():
    # O throttle do login guarda as tentativas no cache.
    cache.clear()
    yield
    cache.clear()


@pytest.fixture
def usuario(db):
    return UsuarioFactory()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def api_client_csrf():
    """Cliente que exige CSRF, como o navegador."""
    return APIClient(enforce_csrf_checks=True)


@pytest.fixture
def api_client_logado(usuario):
    client = APIClient()
    client.force_authenticate(user=usuario)
    return client
