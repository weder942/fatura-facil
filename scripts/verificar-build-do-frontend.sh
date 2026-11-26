#!/usr/bin/env bash
# Confere se o build publicado em `frontend-build` corresponde ao frontend do
# código que vai ser implantado. Sem isso, o backend sobe novo e a tela fica
# velha (aconteceu no deploy das famílias).
#
# Uso: verificar-build-do-frontend.sh <clone do repositório> <clone do frontend-build>
# Compara o que está no remoto (@{u}) dos dois clones; rode depois de `git fetch`.
# Sai com erro se a pasta frontend/ mudou depois do commit de onde o build saiu.
set -euo pipefail

REPO=$1
FRONT=$2

ALVO=$(git -C "$REPO" rev-parse --short '@{u}')
ORIGEM=$(git -C "$FRONT" log -1 --format=%s '@{u}' | sed -n 's/^Build do frontend a partir de \([0-9a-f]\{7,\}\)$/\1/p')

if [ -z "$ORIGEM" ] || ! git -C "$REPO" cat-file -e "$ORIGEM^{commit}" 2>/dev/null; then
  echo "Aviso: não deu para saber de qual commit saiu o build do frontend. Confira se a tela está atualizada." >&2
  exit 0
fi

if git -C "$REPO" diff --quiet "$ORIGEM" '@{u}' -- frontend; then
  echo "Build do frontend em dia (de $ORIGEM; implantando $ALVO)."
  exit 0
fi

cat >&2 <<MENSAGEM
O frontend mudou depois do último build publicado.
  Build publicado: $ORIGEM
  Código a implantar: $ALVO
Na sua máquina, no main atualizado, rode:  scripts/publicar-frontend.sh
Depois rode este script de novo. (Para implantar mesmo assim: SEM_CONFERIR_FRONT=1)
MENSAGEM
exit 1
