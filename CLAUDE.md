# fatura-facil

Sistema web pessoal (um único usuário) para controlar gastos mensais e faturas de cartão de crédito. Substitui uma planilha no Google Sheets com uma aba por mês e uma coluna por fonte de gasto (Fixas, Dinheiro, Nubank, Bradesco, Amazon), que é trabalhosa de manter principalmente por causa dos parcelamentos.

Os requisitos do MVP estão em `MVP.md`. Leia antes de implementar qualquer funcionalidade.

## Stack

- **Backend:** Python, Django + Django REST Framework, SQLite.
- **Frontend:** Angular (SPA), consumindo a API do Django.
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
- **Regras de negócio ficam no backend**, em uma camada de serviços (`services.py`) testável, não em views nem em serializers. O Angular só exibe e envia.
- **Testes:** `pytest` + `pytest-django`. Regras de parcelamento, arredondamento, estorno, vigência, consolidação, horizonte e deduplicação da importação precisam de testes unitários antes de ir para a interface.
- **Privacidade:** nunca armazenar número de cartão. Uma fonte tem só um apelido ("Bradesco 9241").

## Estrutura sugerida

```
fatura-facil/
├── backend/            # projeto Django
│   ├── config/         # settings, urls
│   ├── lancamentos/    # Fonte, Compra, Lancamento, estorno, visão mensal
│   ├── recorrentes/    # Recorrente, RecorrenteValor, MesConsolidado
│   └── importacao/     # LoteImportacao, LinhaImportada, parsers por banco
└── frontend/           # app Angular
```

## Referência: a planilha original

- Abas `January` a `December`; colunas por bloco: Despesas (resumo/fórmulas), Rendimentos, Fixas, Dinheiro, Nubank, Bradesco, Amazon. Cada bloco tem descrição + valor.
- Rendimentos mistura salário e descontos (Salário Calc., INSS Calc., IRRF Calc., Unimed, Plano odonto, Plano vet, Aux. Home Office) com reembolsos de terceiros.
- Parcelas eram escritas à mão no formato "Nome total/atual" (ex.: `Passagem 04/02`). O banco usa "atual/total" (`2/4`).
- Na importação do histórico, essa planilha (.xlsx) é a fonte.
