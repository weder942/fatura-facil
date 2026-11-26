# MVP — fatura-facil

Requisitos do MVP. Os conceitos (competência, fonte, compra, lançamento, vigência, consolidação, suspeito) estão definidos no `CLAUDE.md`.

## Decisões já tomadas

- Um único usuário, com login (sessão do Django).
- Backend Django + DRF + SQLite; frontend Angular desde o início; deploy no PythonAnywhere gratuito, numa única aplicação.
- Tolerância para lançamentos suspeitos: **R$ 0,05** (configurável).
- Sem painel/dashboard nem categorias no MVP: **só a visão mensal**.
- Sem tarefas agendadas: qualquer automação acontece quando o sistema é acessado.
- **Competência do cartão = mês do vencimento da fatura.** Compra com dia ≥ dia de fechamento vai para a fatura seguinte (o dia do fechamento já é o "melhor dia de compra").
- **Consolidação preguiçosa com carência de 1 mês:** só são consolidados automaticamente os meses com pelo menos 2 meses de idade (em dezembro, consolida até outubro). Assim, contas variáveis e estornos que chegam no mês seguinte ainda encontram o mês aberto.
- **Editar compra com parcelas confirmadas:** o restante (total − soma das confirmadas) é dividido entre as parcelas não confirmadas, com a sobra dos centavos na primeira delas.
- **Fontes do tipo `conta`** entram no saldo junto com dinheiro.
- **Deploy cedo:** uma versão mínima (login + uma tela) vai para o PythonAnywhere no fim do esqueleto da Fase 1, para descobrir cedo os problemas de estáticos, CSRF e limites do plano gratuito.

## Fora do MVP (próximas versões)

Categorias e painel de gastos, rateio e reembolso de terceiros, regras de apelido aprendidas, exportação no layout da planilha, parsers de outros bancos além de Bradesco/Amazon.

---

## Ordem de implementação

1. Esqueleto (1.0) e autenticação (1.1), com deploy mínimo.
2. Serviços de competência e parcelamento com testes primeiro (os critérios de aceite do 1.3 viram testes).
3. Fontes (1.2), compras (1.3), visão mensal (1.4) e horizonte (1.5).
4. Recorrentes (2.1) e importação do histórico (2.2) — a partir daqui dá para usar com dados reais.
5. Consolidação (2.3) e estorno (2.4).
6. Importação de faturas (Fase 3) e ajustes (Fase 4).

---

## Fase 1 — Base

### 1.0 Esqueleto e deploy mínimo
- Projeto Django (`backend/`) com DRF, `pytest` + `pytest-django`, e app Angular (`frontend/`).
- Django serve a API em `/api/` e o build do Angular como estáticos, na mesma origem.
- Deploy no PythonAnywhere de uma versão com login e uma tela vazia. Anotar o passo a passo desde já em `docs/deploy.md`.

### 1.1 Autenticação
- Login e logout com usuário do Django. Todas as rotas da API exigem autenticação.
- Usuário criado via `createsuperuser`; não há cadastro público.

### 1.2 Fontes
- CRUD de fontes: nome, tipo (`cartao`, `dinheiro`, `conta`), dia de fechamento e dia de vencimento (obrigatórios para cartão), ativo/inativo.
- Fontes iniciais: Fixas não é fonte (são recorrentes). Fontes: Dinheiro, Nubank, Bradesco, Amazon.

### 1.3 Compras e parcelamento
- Lançamento manual de compra: fonte, data, descrição, valor total, nº de parcelas (padrão 1).
- Para fonte do tipo cartão, a competência da 1ª parcela é calculada pela data e pelo dia de fechamento: se o dia da compra for menor que o dia de fechamento, a compra entra na fatura que fecha naquele mês; senão, na que fecha no mês seguinte. A competência é o mês do **vencimento** dessa fatura (mesmo mês do fechamento se `dia_vencimento > dia_fechamento`, senão o mês seguinte). O usuário pode alterar a competência da 1ª parcela manualmente.
- Para outras fontes, a competência é o mês seguinte ao da data (decisão de 2026-11-24: as contas são acompanhadas junto com a fatura, então o mês do calendário já está fechado e o app abre no mês seguinte).
- O sistema gera os lançamentos (parcela k/n) em competências consecutivas.
- Arredondamento: `valor_parcela = floor(total / n)` em centavos; a sobra vai para a 1ª parcela. A soma das parcelas é sempre igual ao total.
- Editar uma compra (valor total, nº de parcelas, competência inicial) regera as parcelas que ainda não foram confirmadas por importação. Parcelas confirmadas não mudam. O valor a distribuir é `total − soma das confirmadas`, dividido entre as não confirmadas com a mesma regra de arredondamento.
- Excluir uma compra exclui seus lançamentos (pedir confirmação).
- Também é possível editar o valor de uma parcela individual (para ajustar centavos).

**Critérios de aceite**
- R$ 416,00 em 3x → 138,68 / 138,66 / 138,66.
- Compra em 10x a partir de 2026-12 gera competências de 2026-12 a 2027-09.
- Cartão com fechamento dia 25 e vencimento dia 5: compra em 24/11 → competência 2026-12; compra em 25/11 → 2027-01.
- R$ 300,00 em 3x com a 1/3 confirmada em 100,00; total editado para R$ 330,00 → 2/3 e 3/3 passam a 115,00.

### 1.4 Visão mensal
- Tela principal: um mês por vez, com navegação para o mês anterior e o seguinte.
- Blocos lado a lado, como na planilha: Rendimentos, Fixas, e um bloco por fonte, cada um com descrição, valor e indicação de parcela (`2/5`).
- Resumo do mês: total de rendimentos, total de fixas, total por fonte, total de cartões, saldo (`rendimentos − fixas − (dinheiro + contas) − cartões`).
- Lançamentos importados aparecem destacados (cor de fundo na descrição), com um filtro "só do último lote".
- Lançamentos suspeitos aparecem com outra marcação e uma ação para resolver.
- Mês consolidado aparece como somente leitura, com a ação "Reabrir".

### 1.5 Horizonte de projeção
- Lista de meses navegáveis: do primeiro mês com dados até `max(dezembro do ano corrente, última competência com parcela)`.
- Exemplo: última parcela em 2027-02 → horizonte até 2027-12. Última parcela em 2028-10 → horizonte até 2028-10.

---

## Fase 2 — Recorrentes, histórico, consolidação e estorno

### 2.1 Recorrentes com vigência
- CRUD de recorrentes: nome, grupo (`rendimento` ou `fixa`), sinal (crédito/débito), valor fixo ou variável, ativo.
- Cada recorrente tem uma lista de valores com vigência (`valor`, `a_partir_de` competência, `ate` opcional).
- O valor de um recorrente em uma competência aberta é o valor da vigência mais recente com `a_partir_de ≤ competência`.
- Reajuste: cadastrar um novo valor com `a_partir_de = X`. Todos os meses abertos ≥ X passam a mostrar o novo valor, sem editar mês a mês.
- Recorrente **variável** (água, energia): usa o último valor informado como estimativa e mostra "valor real pendente" até o usuário informar o valor do mês.
- Na visão mensal, é possível sobrescrever o valor de um recorrente só naquele mês.
- **Decisões da implementação (2026-11-20):**
  - Não há campo de sinal: descontos dentro dos rendimentos (INSS, IRRF, Unimed) são recorrentes de rendimento com valor negativo, como na planilha.
  - Não há flag `ativo`: um recorrente que acaba é **encerrado** (último mês = `ate` da vigência) e some dos meses seguintes; um reajuste depois disso volta a valer.
  - **Avulsos:** rendimento ou fixa de um mês só (férias, "Outros", reembolsos de terceiros como "Icloud (Natalia)"). Reembolsos ficam como rendimento avulso, igual à planilha, sem ligação com a compra no cartão.
  - Na visão mensal, clicar num recorrente abre o valor daquele mês (o real de um variável ou um ajuste de um fixo), com opção de voltar ao previsto; o "+" de cada bloco cria um avulso.

### 2.2 Importação do histórico
- Depende dos recorrentes (2.1): a planilha traz rendimentos e fixas, que viram recorrentes.
- Comando de gerenciamento (`manage.py importar_planilha <arquivo.xlsx> --ano 2026`) que lê a planilha original e cria fontes, recorrentes e lançamentos.
- Itens no formato "Nome NN/MM" (total/atual) viram parcela de uma compra; parcelas da mesma compra em meses diferentes são agrupadas pelo nome sem o sufixo e pelo valor (±R$ 0,05).
- Ao final, imprime um relatório: quantos lançamentos por mês e fonte, e o que não conseguiu interpretar (ex.: linhas sem descrição).
- Critério de aceite: o total por fonte e por mês após a importação bate com a planilha.
- **Decisões da implementação (2026-11-20):**
  - Escopo: planilhas de 2025 e 2026 (`importar_planilha "Contas 2025.xlsx" "contas 2026.xlsx"`); o ano vem do nome do arquivo.
  - As colunas são achadas pelo **cabeçalho** (linha 1), não pela posição: o layout mudou ao longo dos anos. Os blocos de totais ("Despesas", "Totais Despesas") são ignorados; "Em dinheiro" vai para a fonte "Dinheiro"; outros nomes com `--fonte "Coluna=Fonte"`. As fontes precisam estar cadastradas antes (cartões com fechamento e vencimento).
  - Rendimentos e fixas: vira recorrente o nome que aparece em 3+ meses seguidos; mudanças que se mantêm viram vigências, mudanças que voltam no mês seguinte viram ajuste do mês; meses isolados viram valor do mês. O resto (reembolsos esporádicos, férias) vira avulso. As duas "Mãe" do mês são "Mãe saúde" (a 1ª) e "Mãe" (a 2ª); "Psiquiatria" e "Psiquiatra" são o mesmo recorrente.
  - Parcelas: casam pela mesma compra quando têm o mesmo total, parcela anterior no mês anterior e mesmo nome com valor parecido (até R$ 1,00 ou 2%), ou nome diferente com valor até R$ 0,05. Compras já em andamento ficam só com as parcelas da planilha (não é possível regerar as parcelas delas pelo formulário); as que continuam depois do último mês da planilha são projetadas com o valor da última parcela.
  - Valores negativos (estornos, descontos, "balanco") viram lançamento de crédito sem compra, com a descrição da planilha.
  - O relatório lista os totais que não batem e os pontos de atenção (valor sem descrição, texto sem valor, parcelas sem continuação). `--simular` mostra o relatório sem gravar; `--substituir` apaga só o que veio da planilha e importa de novo.

### 2.3 Consolidação de mês
- Ação "Consolidar mês": grava os valores dos recorrentes daquele mês como lançamentos concretos e marca o mês como consolidado.
- Mês consolidado não aceita criação, edição nem exclusão de lançamentos (a API retorna erro). "Reabrir" desfaz o bloqueio.
- Consolidação preguiçosa: no primeiro acesso, meses com pelo menos 2 meses de idade (anteriores ao mês passado) que ainda estejam abertos são consolidados automaticamente. O mês passado continua aberto (carência para contas variáveis e estornos atrasados). O usuário vê um aviso de quais meses foram consolidados.
- Critérios de aceite: reajustar o salário a partir de um mês não altera meses já consolidados. Primeiro acesso em 2026-12-10 consolida até 2026-10; 2026-11 continua aberto.

### 2.4 Estorno
- A partir de uma compra, ação "Estornar": total ou parcial, com a data do estorno.
- **Total:** na competência do estorno, as parcelas restantes (dessa competência em diante) são movidas para ela e entra um lançamento de crédito com o valor total da compra. Não sobra parcela nos meses seguintes.
- **Parcial:** entra um lançamento de crédito com o valor informado, ligado à compra. Parcelas não mudam.
- Estorno não pode ser feito em competência consolidada.

**Critério de aceite (caso real do Mercado Livre):** compra de R$ 474,05 em 5x de 94,81, 1/5 cobrada em novembro, estorno total com competência dezembro → dezembro tem 2/5, 3/5, 4/5, 5/5 (4 × 94,81) e um crédito de −474,05, efeito líquido −94,81; janeiro em diante não tem parcelas dessa compra.

---

## Fase 3 — Importação de faturas

### 3.1 Fluxo
1. Usuário envia um arquivo (PDF ou .xlsx/.csv), escolhe a **fonte** e confirma a **competência** sugerida.
2. O sistema lê as linhas e mostra uma **prévia** classificando cada linha: `nova`, `existente`, `suspeita`, `ignorada`.
3. O usuário revisa (pode mudar a classificação de suspeitas e editar descrições) e confirma.
4. Só então os lançamentos são gravados, todos ligados ao lote de importação.

### 3.2 Parsers
- Um parser por formato/banco, com interface comum (`parse(arquivo) -> list[LinhaFatura]`), onde `LinhaFatura` tem data, descrição original, valor, parcela atual e total (se houver).
- MVP: PDF do app Bradesco Cartões (cartão Bradesco Visa e cartão Amazon Mastercard; o PDF pode trazer mais de um cartão, cada um em seu bloco) e um importador genérico de .xlsx/.csv com mapeamento de colunas.
- Linhas ignoradas: pagamentos e saldos (`PAGTO`, `SALDO ANTERIOR`, `PAGAMENTO RECEBIDO`) e totais.
- Guardar o texto bruto de cada linha e o hash do arquivo.

### 3.3 Deduplicação
- **Parcela (k/n):** casar com a parcela k da compra existente na mesma fonte (pela descrição original ou por valor ±R$ 0,05 e mesmo n). Se casar, a linha é `existente` e o valor do banco substitui o previsto (parcela passa a `confirmada`). Se não existir compra, criar a compra com n parcelas a partir da competência de (k), gerando k..n; parcelas anteriores não são criadas.
- **À vista:** comparar por multiconjunto na mesma fonte e competência: (data, valor). Duas linhas iguais na fatura só são `existente` se houver dois lançamentos iguais no sistema. Isso evita perder duas corridas de R$ 12,00 no mesmo dia.
- **Suspeita:** sem casamento exato, mas existe lançamento na mesma fonte e competência com valor a até R$ 0,05 e ainda não casado. Usuário escolhe: vincular (é o mesmo), inserir (é outro) ou ignorar.
- **Reimportação:** importar de novo a mesma fatura (ou uma versão mais nova da fatura em aberto) só gera como `nova` o que ainda não existe. Importar o mesmo arquivo duas vezes não cria nada.
- **Créditos (valores negativos):** sugerir vínculo como estorno de uma compra existente (mesma fonte, descrição parecida); o usuário confirma.

### 3.4 Relatório de faltas
- Após a importação, listar parcelas previstas daquela fonte e competência que **não** vieram na fatura (ex.: parcela antecipada ou lançada em outro cartão). Não apagar nada automaticamente.

### 3.5 Destaque
- Lançamentos criados ou atualizados por importação ficam marcados com a origem e o lote; a visão mensal os destaca e permite filtrar por lote.

### Decisões da implementação (2026-11-24, primeira versão)
- Só PDF do app Bradesco Cartões nesta versão (`services/fatura/bradesco.py`); o leitor usa a posição das palavras na página (pdfplumber), porque as descrições quebram em linhas acima e abaixo da data e o "k/n" às vezes cai na linha de baixo. Novos formatos entram como um par (reconhece, lê) em `services/fatura/leitor.py`.
- O usuário escolhe a fonte; um PDF com mais de um cartão (titular e adicional) vai todo para ela. O final do cartão aparece na prévia.
- Competência sugerida: a da compra mais recente da fatura pelas regras da fonte (pagamentos e saldo não contam); o usuário pode trocar, e a prévia é refeita.
- Prévia e importação são sem estado: a importação reenvia o arquivo e refaz a classificação, aplicando só as decisões que o usuário mudou. O arquivo não fica no servidor; o lote guarda nome e SHA-256.
- Parcela k/n casa também com a parcela k de competências seguintes (antecipada) e a traz para a competência da fatura. Várias parcelas de uma compra que ainda não existe (ex.: 2/5 a 5/5) viram uma compra só.
- Suspeitas: casamento global, valor mais próximo primeiro e, no empate, descrição mais parecida. Padrão "é a mesma" (vincular).
- Ao confirmar, o lançamento guarda o texto da fatura (`Lancamento.texto`) e a compra à vista passa a ter a data da fatura; assim reimportar a mesma fatura não cria nada e não traz suspeitas.
- Conferência: a soma das linhas, sem pagamentos e saldo anterior, é comparada com o "Total da Fatura" impresso.
- Crédito novo vira lançamento de estorno sem vínculo com a compra (o vínculo fica para a 2.4).
- Fora desta versão: .xlsx/.csv, filtro por lote na visão mensal (3.5) e edição de descrições na prévia.

**Critérios de aceite**
- Importar o PDF de dezembro do Bradesco com as parcelas previstas já cadastradas: parcelas 2/3, 3/3 etc. saem como `existente`; Óculos 138,66 vs previsto 138,67 sai como `existente` (casou pela parcela) e o valor é atualizado.
- Importar o mesmo PDF duas vezes: a segunda importação não cria nenhum lançamento.

---

## Fase 4 — Ajustes do MVP
- Edição em massa de descrições dos lançamentos de um lote (para trocar nomes do banco por nomes memoráveis).
- Botão "Baixar backup" que entrega o arquivo SQLite (ou um `dumpdata` em JSON).
- Deploy no PythonAnywhere completo e documentado em `docs/deploy.md` (build do Angular, `collectstatic`, mapeamento de estáticos, variáveis de ambiente, onde fica o SQLite).

### 4.1 Famílias (2026-11-26)
Assinatura dividida em rodízio, como o Apple iCloud da família: todo mês um membro paga a mensalidade.
- Na "Nova compra", o botão "Família" troca o parcelamento por: identificação da família (a descrição), mensalidade (o valor), quantidade de membros e um campo por membro, rotulados "1º mês", "2º mês"... O 1º membro paga na competência do 1º mês, o 2º no mês seguinte, e assim por diante.
- Todo mês entra na fonte o lançamento "Apple icloud Natalia (Natalia - Weder - Gustavo - Edson)" (quem paga e a sequência, como na planilha) e, nos rendimentos, o avulso "Apple icloud (Natalia)" com o mesmo valor. No mês de quem administra a família (marcado com "Eu") não há rendimento.
- Os lançamentos e rendimentos são gerados até 11 meses depois do mês em aberto e estendidos quando o app é acessado (sem tarefa agendada).
- Clicar no lançamento ou no rendimento de uma família abre a família: mudar fonte, nome, mensalidade, membros (mais, menos, outra ordem) ou encerrar. Tudo vale **a partir de um mês**, que nunca é anterior ao mês em aberto (os anteriores estão fechados; quando a consolidação 2.3 existir, o limite passa a ser o mês seguinte ao último consolidado). A lista de membros na edição já começa por quem paga no mês escolhido.
- Mês com a mensalidade confirmada pela fatura não muda. Na importação, a mensalidade casa pelo valor e mantém a identificação de quem paga.
- Encerrar no primeiro mês da família apaga a família (ela nunca chegou a ter um mês).

## API (rascunho)

```
POST   /api/auth/login/            POST /api/auth/logout/
GET    /api/fontes/                 POST/PUT/DELETE
GET    /api/compras/                POST/PUT/DELETE
POST   /api/compras/{id}/estornar/
PATCH  /api/lancamentos/{id}/
GET    /api/meses/                  # horizonte: lista de competências e status
GET    /api/meses/{YYYY-MM}/        # visão mensal completa com totais
POST   /api/meses/{YYYY-MM}/consolidar/   POST .../reabrir/
GET    /api/recorrentes/            POST/PUT/DELETE
POST   /api/recorrentes/{id}/valores/
POST   /api/importacoes/            # upload + prévia
POST   /api/importacoes/{id}/confirmar/
GET    /api/importacoes/{id}/faltas/
GET    /api/backup/
```

## Modelo de dados (rascunho)

| Model | Campos principais |
|---|---|
| `Fonte` | nome, tipo, dia_fechamento, dia_vencimento, ativa |
| `Compra` | fonte, data, descricao_original, descricao, valor_total, n_parcelas, origem, lote |
| `Lancamento` | compra, fonte, competencia, parcela, valor, tipo (`normal`, `estorno`, `recorrente`), status (`previsto`, `confirmado`), origem, lote, suspeito_de (FK opcional) |
| `Recorrente` | nome, grupo, sinal, variavel, ativo |
| `RecorrenteValor` | recorrente, valor, a_partir_de, ate |
| `MesConsolidado` | competencia, consolidado_em |
| `LoteImportacao` | fonte, competencia, arquivo_hash, nome_arquivo, criado_em |
| `LinhaImportada` | lote, texto_bruto, data, descricao, valor, parcela, n_parcelas, classificacao, lancamento (FK opcional) |
