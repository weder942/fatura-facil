.DEFAULT_GOAL := help
.PHONY: help setup-dev test code-convention format check migrate migrations runserver superuser clean

help:
	@grep -E "^[a-z-]+:.*##" Makefile | sed "s/:.*##/ —/"

setup-dev: ## instala as dependências de desenvolvimento
	pip install --upgrade pip
	pip install -r requirements/local.txt

test: ## roda os testes com cobertura (mínimo 93%)
	pytest -n auto --cov --cov-report=term-missing --cov-report=html

code-convention: ## ruff + flake8
	ruff check .
	ruff format --check .
	flake8

format: ## formata e corrige imports
	ruff format .
	ruff check --fix .

check: ## system check e migrations sem drift
	python manage.py check
	python manage.py makemigrations --check --dry-run

migrate: ## aplica as migrations
	python manage.py migrate

migrations: ## cria migrations
	python manage.py makemigrations fatura_facil

runserver: ## sobe o Django em localhost:8000
	python manage.py runserver 8000

superuser: ## cria o usuário do sistema
	python manage.py createsuperuser

clean: ## remove artefatos de teste e cache
	find . -name "__pycache__" -exec rm -rf {} +
	rm -rf .pytest_cache htmlcov .coverage
