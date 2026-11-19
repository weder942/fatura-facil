from .base import *
from .base import env

DEBUG = False
SECRET_KEY = env("DJANGO_SECRET_KEY")
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["weder.pythonanywhere.com"])
CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=["https://weder.pythonanywhere.com"])

# O PythonAnywhere termina o HTTPS no proxy; o redirecionamento de HTTP para
# HTTPS é feito pela opção "Force HTTPS" do painel Web, não pelo Django.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
SECURE_CONTENT_TYPE_NOSNIFF = True

SILENCED_SYSTEM_CHECKS = [
    # Os outros subdomínios de pythonanywhere.com são de outros usuários: o
    # HSTS não pode valer para eles, e o domínio não é nosso para o preload.
    "security.W005",
    "security.W021",
    # O redirecionamento para HTTPS é o "Force HTTPS" do painel Web.
    "security.W008",
]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "WARNING"},
}
