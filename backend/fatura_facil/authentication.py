from rest_framework import authentication


class SessionAuthentication(authentication.SessionAuthentication):
    """Sessão do Django, mas respondendo 401 (e não 403) quando não há login.

    O DRF só devolve 401 se a autenticação informar um cabeçalho
    WWW-Authenticate. Com isso o front distingue "sessão expirou, vá para
    o login" (401) de "não pode fazer isso" (403).
    """

    def authenticate_header(self, request):
        return "Session"
