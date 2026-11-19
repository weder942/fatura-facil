from .base import *

DEBUG = False
SECRET_KEY = "chave-apenas-para-testes"

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}

PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

# Os testes não dependem de existir um build do Angular.
WHITENOISE_ROOT = None
# Sem collectstatic nos testes: o WhiteNoise usa os finders em vez do STATIC_ROOT.
WHITENOISE_AUTOREFRESH = True
