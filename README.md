# fatura-facil

Sistema web pessoal (um único usuário) para controlar gastos mensais e faturas de cartão de crédito. Substitui uma planilha do Google Sheets (uma aba por mês, uma coluna por fonte de gasto), que é trabalhosa de manter principalmente por causa dos parcelamentos.

## O que ele faz (MVP)

- **Visão mensal por competência** — cada lançamento cai no mês da fatura, não no mês da compra.
- **Parcelamento automático** — uma compra em N vezes gera N lançamentos, com a sobra dos centavos na 1ª parcela, como o banco faz.
- **Recorrentes com vigência** — salário, aluguel, plano de saúde etc., com reajustes a partir de um mês.
- **Consolidação de meses** — congela os valores do mês e bloqueia a edição (pode ser reaberto).
- **Estorno total e parcial** — espelhando o comportamento do banco.
- **Importação de faturas** (PDF e .xlsx/.csv) com prévia, deduplicação e marcação de lançamentos suspeitos.
- **Importação do histórico** a partir da planilha original.

Os requisitos completos estão em [`MVP.md`](MVP.md); os conceitos do domínio e as convenções do código estão em [`CLAUDE.md`](CLAUDE.md).

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Python, Django + Django REST Framework |
| Banco de dados | SQLite |
| Frontend | Angular (SPA) |
| Leitura de faturas | `pdfplumber` (PDF), `openpyxl` (Excel) |
| Testes | `pytest` + `pytest-django` |
| Deploy | PythonAnywhere (plano gratuito), uma única aplicação na mesma origem |

## Estrutura

Monorepo com `backend/` (Django) e `frontend/` (Angular), que conversam só pela API em `/api/`. A estrutura detalhada e as convenções de código estão em [`CLAUDE.md`](CLAUDE.md#estrutura).

## Status

Em planejamento. Instruções de instalação, execução e deploy serão adicionadas conforme o código for escrito.

## Licença

[MIT](LICENSE)
