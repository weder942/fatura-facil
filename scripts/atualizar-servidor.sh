#!/usr/bin/env bash
# Roda num console Bash do PythonAnywhere. Atualiza backend e frontend,
# aplica migrations, coleta estáticos e recarrega a aplicação.
set -euo pipefail

USUARIO=${USUARIO:-weder}
REPO=/home/$USUARIO/fatura-facil
FRONT=/home/$USUARIO/fatura-facil-frontend
VENV=/home/$USUARIO/.virtualenvs/fatura-facil
WSGI=/var/www/${USUARIO}_pythonanywhere_com_wsgi.py

export DJANGO_SETTINGS_MODULE=config.settings.production

git -C "$REPO" fetch -q
git -C "$FRONT" fetch -q
# Antes de mexer em qualquer coisa: o build do frontend acompanha o código?
if [ -z "${SEM_CONFERIR_FRONT:-}" ]; then
  "$REPO/scripts/verificar-build-do-frontend.sh" "$REPO" "$FRONT"
fi

git -C "$REPO" pull --ff-only
git -C "$FRONT" pull --ff-only

"$VENV/bin/pip" install -q -r "$REPO/backend/requirements/production.txt"
cd "$REPO/backend"
"$VENV/bin/python" manage.py migrate --noinput
"$VENV/bin/python" manage.py collectstatic --noinput -v0
"$VENV/bin/python" manage.py check --deploy --fail-level ERROR

# No PythonAnywhere, alterar o arquivo WSGI recarrega a aplicação.
touch "$WSGI"
echo "Atualizado e recarregado: https://$USUARIO.pythonanywhere.com"
