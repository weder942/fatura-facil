# Deploy no PythonAnywhere (plano gratuito)

Uma única aplicação web em `https://weder.pythonanywhere.com`: o Django atende `/api/` e o admin, e serve o build do Angular (arquivos via WhiteNoise, rotas do Angular via `SpaView`).

## Como o deploy funciona

O build do Angular **não** roda no PythonAnywhere: só o `node_modules` passa de 290 MB, e o disco do plano gratuito é de 512 MB. O build é feito na sua máquina e publicado no branch órfão `frontend-build`, que contém só os arquivos finais (cerca de 0,5 MB). O servidor tem dois clones:

| Pasta no servidor | Conteúdo |
|---|---|
| `~/fatura-facil` | branch `main` (backend) |
| `~/fatura-facil-frontend` | branch `frontend-build` (build do Angular) |
| `~/fatura-facil-dados/` | `db.sqlite3` — fora dos clones, para nenhum `git` tocar nele |

## Primeira instalação

### 1. Console Bash do PythonAnywhere (aba *Consoles → Bash*)

```bash
git clone https://github.com/weder942/fatura-facil.git ~/fatura-facil
git clone -b frontend-build --single-branch https://github.com/weder942/fatura-facil.git ~/fatura-facil-frontend
mkdir -p ~/fatura-facil-dados

mkvirtualenv --python=python3.12 fatura-facil
pip install -r ~/fatura-facil/backend/requirements/production.txt
```

> O branch `frontend-build` precisa existir antes: rode `scripts/publicar-frontend.sh` na sua máquina uma vez.

### 2. Arquivo `~/fatura-facil/backend/.env`

Gere a chave com `python -c "import secrets; print(secrets.token_urlsafe(50))"` e crie o arquivo (ele não vai para o git):

```bash
DJANGO_SECRET_KEY=<a chave gerada>
DJANGO_ADMIN_URL=<um-caminho-dificil-de-adivinhar>/
DATABASE_PATH=/home/weder/fatura-facil-dados/db.sqlite3
FRONTEND_DIST_DIR=/home/weder/fatura-facil-frontend
```

`DJANGO_ALLOWED_HOSTS` e `DJANGO_CSRF_TRUSTED_ORIGINS` já têm `weder.pythonanywhere.com` como padrão em `config/settings/production.py`.

### 3. Banco, estáticos e usuário

```bash
cd ~/fatura-facil/backend
export DJANGO_SETTINGS_MODULE=config.settings.production
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

### 4. Aba *Web*

1. *Add a new web app* → **Manual configuration** (não "Django") → **Python 3.12**.
2. *Source code*: `/home/weder/fatura-facil/backend`
3. *Virtualenv*: `/home/weder/.virtualenvs/fatura-facil`
4. *WSGI configuration file* (link na própria aba): troque todo o conteúdo por:

   ```python
   import os
   import sys

   path = "/home/weder/fatura-facil/backend"
   if path not in sys.path:
       sys.path.insert(0, path)

   os.environ["DJANGO_SETTINGS_MODULE"] = "config.settings.production"

   from django.core.wsgi import get_wsgi_application  # noqa: E402

   application = get_wsgi_application()
   ```

5. *Static files* (opcional; o WhiteNoise já serve, mas assim o servidor do PythonAnywhere entrega direto): na tabela, clique em *Enter URL*, digite `/static/` e confirme com Enter; depois clique em *Enter path* na mesma linha, digite `/home/weder/fatura-facil/backend/staticfiles` e confirme. A pasta só existe depois do `collectstatic` do passo 3.
6. *Security* → **Force HTTPS**: ligado.
7. **Reload**.

### 5. Conferir

- `https://weder.pythonanywhere.com` abre o login; depois de entrar, a tela inicial mostra o usuário e continua logada após F5.
- O admin (`https://weder.pythonanywhere.com/<DJANGO_ADMIN_URL>`) abre com estilo. Sem estilo = problema nos estáticos.
- Se der erro: aba *Web* → *Error log*.

Primeira instalação feita e validada assim em 2026-11-19.

## Atualizações

1. Na sua máquina, com tudo commitado e enviado (`git push`):
   ```bash
   cd frontend && nvm use && cd ..
   scripts/publicar-frontend.sh      # só se o front mudou
   ```
2. No console Bash do PythonAnywhere:
   ```bash
   ~/fatura-facil/scripts/atualizar-servidor.sh
   ```
   Faz `git pull` dos dois clones, `pip install`, `migrate`, `collectstatic`, `check --deploy` e recarrega a aplicação.

   Atalho (configurado uma vez no console do PythonAnywhere):
   ```bash
   echo "alias atualizar-fatura='~/fatura-facil/scripts/atualizar-servidor.sh'" >> ~/.bashrc
   source ~/.bashrc
   ```
   Depois disso, basta rodar `atualizar-fatura`.

## Manutenção do plano gratuito

- **A aplicação expira a cada 3 meses** sem renovação: aba *Web* → *Run until 3 months from today*. O PythonAnywhere avisa por e-mail antes.
- **Backup**: baixe `~/fatura-facil-dados/db.sqlite3` pela aba *Files* (até o botão "Baixar backup" da Fase 4 existir).
- **Internet de saída** só para sites da lista permitida (GitHub e PyPI estão nela). Nada no sistema pode depender de API externa fora dela.
- **Sem tarefas agendadas**: nada pode depender de cron (ver `CLAUDE.md`).
- **Logs**: aba *Web* → *Error log* / *Server log*.
