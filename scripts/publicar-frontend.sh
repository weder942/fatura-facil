#!/usr/bin/env bash
# Roda na SUA máquina. Faz o build de produção do Angular e publica o
# resultado no branch órfão `frontend-build`, que o PythonAnywhere baixa
# com git pull (o build não pode rodar lá: o node_modules não cabe nos
# 512 MB do plano gratuito).
set -euo pipefail

BRANCH=frontend-build
RAIZ=$(git rev-parse --show-toplevel)
cd "$RAIZ"

if [ -n "$(git status --porcelain)" ]; then
  echo "Há alterações não commitadas. Commite antes de publicar, para o build corresponder a um commit." >&2
  exit 1
fi

NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "Node $NODE_MAJOR encontrado; o Angular 22 precisa do 22+. Rode: cd frontend && nvm use" >&2
  exit 1
fi

COMMIT=$(git rev-parse --short HEAD)
(cd frontend && npm ci && npx ng build)

TMP=$(mktemp -d)
trap 'git -C "$RAIZ" worktree remove --force "$TMP" >/dev/null 2>&1 || true; rm -rf "$TMP"' EXIT

git fetch origin "$BRANCH" >/dev/null 2>&1 || true
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -q -B "$BRANCH" "$TMP" "origin/$BRANCH"
else
  git worktree add -q --detach "$TMP"
  git -C "$TMP" checkout -q --orphan "$BRANCH"
  git -C "$TMP" rm -rfq .
fi

rsync -a --delete --exclude .git frontend/dist/frontend/browser/ "$TMP"/
git -C "$TMP" add -A
if git -C "$TMP" diff --cached --quiet; then
  echo "O build não mudou; nada a publicar."
  exit 0
fi
git -C "$TMP" commit -qm "Build do frontend a partir de $COMMIT"
git -C "$TMP" push -q origin "$BRANCH"
echo "Build de $COMMIT publicado em $BRANCH. Agora rode scripts/atualizar-servidor.sh no PythonAnywhere."
