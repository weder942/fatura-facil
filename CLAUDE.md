# fatura-facil

Sistema web pessoal (um único usuário) para controlar gastos mensais e faturas de cartão de crédito. Substitui uma planilha no Google Sheets com uma aba por mês e uma coluna por fonte de gasto (Fixas, Dinheiro, Nubank, Bradesco, Amazon), que é trabalhosa de manter principalmente por causa dos parcelamentos.

Os requisitos do MVP estão em `MVP.md`. Leia antes de implementar qualquer funcionalidade.

## Stack

- **Backend:** Python 3.12, Django 5.2 LTS + Django REST Framework, SQLite.
- **Frontend:** Angular (versão estável mais recente, SPA com componentes standalone) + Angular Material, consumindo a API do Django.
- **Leitura de faturas:** `pdfplumber` (PDF) e `openpyxl` (Excel).
- **Deploy:** PythonAnywhere (plano gratuito). Uma única aplicação web: o Django serve a API em `/api/` e o build do Angular como arquivos estáticos, na mesma origem.
  - Mesma origem = sem CORS e autenticação por sessão do Django com CSRF.
  - O plano gratuito tem sistema de arquivos persistente (o arquivo SQLite não se perde), 512 MB de disco, CPU limitada e **não tem tarefas agendadas**. Nada no sistema pode depender de cron.

## Conceitos do domínio (leia com atenção)

- **Competência:** o mês ao qual um lançamento pertence. Para cartão, é o mês da **fatura**, não o mês da compra. Uma compra feita em 30/10 pode cair na fatura de dezembro. Toda a visão mensal é por competência.
- **Fonte:** de onde sai o dinheiro: um cartão (com dia de fechamento e dia de vencimento), dinheiro/PIX ou conta. A competência de uma compra no cartão é calculada pela data da compra e pelo dia de fechamento do cartão.
- **Compra:** o fato original (data, descrição, valor total, nº de parcelas). Gera um ou mais **lançamentos**.
- **Lançamento:** o valor que cai numa competência. Uma compra à vista gera 1; uma compra em 5x gera 5 (parcelas 1/5 a 5/5).
- **Arredondamento das parcelas:** o banco põe a sobra dos centavos na **1ª parcela** (ex.: R$ 416,00 em 3x = 138,68 + 138,66 + 138,66). O sistema faz o mesmo. Quando a fatura é importada, o valor real cobrado substitui o previsto.
- **Estorno total:** espelha o banco. No mês do estorno, as parcelas restantes são antecipadas para aquele mês e entra um crédito do valor total da compra. Parcelas de meses seguintes deixam de existir. O efeito líquido no mês é −(soma das parcelas já cobradas em meses anteriores).
- **Estorno parcial:** só um lançamento de crédito ligado à compra; as parcelas continuam.
- **Recorrente:** item que se repete todo mês (salário, INSS, IRRF, Unimed, aluguel, internet, energia…). Os valores têm **vigência** (valem a partir de um mês). Um reajuste é um novo valor com vigência a partir do mês X, e vale para todos os meses abertos ≥ X.
- **Consolidação:** um mês consolidado tem os valores dos recorrentes congelados como lançamentos concretos e fica bloqueado para edição (pode ser reaberto). Como não há cron, meses passados ainda abertos são consolidados de forma preguiçosa, quando o sistema é acessado.
- **Horizonte de projeção:** o sistema mostra meses até o mais distante entre dezembro do ano corrente e a última competência que tem parcela.
- **Origem:** todo lançamento sabe se veio de digitação manual ou de importação (e de qual lote). Importados são destacados na interface.
- **Suspeito:** lançamento importado cujo valor fica a até R$ 0,05 de um lançamento existente na mesma fonte e competência. O usuário decide se é o mesmo, se é outro ou se ignora.

## Convenções

- **Dinheiro:** sempre `Decimal` no Python (`DecimalField(max_digits=12, decimal_places=2)`) e string/decimal na API. Nunca `float`. No Angular, não fazer aritmética de dinheiro com `number` sem cuidado: os totais vêm calculados da API.
- **Competência:** armazenada como data no primeiro dia do mês (`2026-12-01`). Na API e na interface, `YYYY-MM`.
- **Idioma:** código (nomes de models, campos, funções) em português sem acento, seguindo o domínio (`Compra`, `Lancamento`, `competencia`). Interface em português do Brasil, valores em `R$ 1.234,56`, datas em `dd/mm/aaaa`.
- **Regras de negócio ficam no backend**, na camada de serviços (`services/`), testável, não em views nem em serializers. O Angular só exibe e envia.
- **Fluxo no backend: view → serializer/service → model.** Views finas (validam entrada, chamam serializer/service, devolvem resposta). Serializers validam payload e formatam resposta, sem regra pesada. Models guardam estado e relações. Erro de validação geral no formato `{"detail": "..."}`.
- **Um arquivo por responsabilidade, nunca tudo num arquivo só:** `models/fonte_model.py`, `serializers/compra_serializer.py`, `views/mes_view.py`, `services/parcelamento_service.py`, com o `__init__.py` de cada pacote reexportando. Mesmo padrão do `what_is_the_price_api`.
- **Testes:** `pytest` + `pytest-django` + `pytest-cov` + `pytest-mock` + `factory_boy`, rodando com `config.settings.test`. Toda regra de negócio vem com teste — parcelamento, arredondamento, competência, estorno, vigência, consolidação, horizonte e deduplicação da importação têm testes unitários de service antes de ir para a interface. Cobertura mínima de 93% (`fail_under` no `setup.cfg`), como no `what_is_the_price_api`. Views também têm testes (autenticação, status HTTP, formato da resposta).
- **Qualidade:** `ruff format` + `ruff check` (linha de 120, imports ordenados) e `flake8`; `python manage.py makemigrations --check --dry-run` sem drift.
- **Frontend:** componentes standalone, uma pasta por funcionalidade (tela de lista + subpasta do formulário), services HTTP em `core/services/` (um por recurso da API), componentes reutilizáveis em `shared/`. Cada componente e service tem seu `.spec.ts`. Templates e estilos em arquivos próprios (`.html`, `.scss`), não inline.
- **Privacidade:** nunca armazenar número de cartão. Uma fonte tem só um apelido ("Bradesco 9241").

## Estrutura

```
fatura-facil/
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── settings/        # base.py, local.py, test.py, production.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── fatura_facil/        # app Django única, organizada por camada
│   │   ├── models/          # fonte_model.py, compra_model.py, lancamento_model.py,
│   │   │                    # recorrente_model.py, mes_consolidado_model.py, importacao_model.py
│   │   ├── serializers/     # um por recurso
│   │   ├── views/           # ViewSets/APIViews finas, um arquivo por recurso
│   │   ├── services/        # competencia_service.py, parcelamento_service.py,
│   │   │   │                # estorno_service.py, vigencia_service.py,
│   │   │   │                # consolidacao_service.py, horizonte_service.py, mes_service.py
│   │   │   └── importacao/  # parsers/ (bradesco_pdf_parser.py, planilha_parser.py…),
│   │   │                    # deduplicacao_service.py, importacao_service.py
│   │   ├── management/commands/   # importar_planilha.py
│   │   ├── migrations/
│   │   └── tests/
│   │       ├── conftest.py
│   │       ├── factories/   # um factory por model
│   │       ├── models/  services/  views/  management/
│   │       └── fixtures/    # faturas e planilhas ANONIMIZADAS
│   ├── requirements/        # base.txt, local.txt, production.txt
│   ├── pyproject.toml       # config do ruff
│   ├── pytest.ini  setup.cfg  Makefile
└── frontend/                # app Angular
    └── src/app/
        ├── core/            # services HTTP (um por recurso), interceptors, guard de autenticação, models (interfaces TS)
        ├── shared/          # componentes, pipes (moeda, competência) e utilitários reutilizáveis
        ├── login/
        ├── meses/           # visão mensal e navegação do horizonte
        ├── fontes/          # lista + form-fonte/
        ├── compras/         # form-compra/, estorno/
        ├── recorrentes/     # lista + form-recorrente/
        └── importacoes/     # upload, prévia, faltas
```

Uma app Django só (como o `what_is_the_price_api`) evita import circular entre apps — consolidação, estorno e importação mexem todos em `Lancamento`. Subdomínios maiores viram subpacote dentro da camada (`services/importacao/`), não app nova.

## Referência: a planilha original

- Abas `January` a `December`; colunas por bloco: Despesas (resumo/fórmulas), Rendimentos, Fixas, Dinheiro, Nubank, Bradesco, Amazon. Cada bloco tem descrição + valor.
- Rendimentos mistura salário e descontos (Salário Calc., INSS Calc., IRRF Calc., Unimed, Plano odonto, Plano vet, Aux. Home Office) com reembolsos de terceiros.
- Parcelas eram escritas à mão no formato "Nome total/atual" (ex.: `Passagem 04/02`). O banco usa "atual/total" (`2/4`).
- Na importação do histórico, essa planilha (.xlsx) é a fonte.
