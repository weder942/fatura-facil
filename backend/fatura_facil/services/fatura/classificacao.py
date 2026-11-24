"""Compara as linhas de uma fatura com o que já está no sistema (MVP, 3.3).

- `existente`: a linha já tem um lançamento correspondente (será confirmado).
- `suspeita`: não casou, mas há um lançamento parecido; o usuário decide.
- `nova`: não há nada parecido (será criada).
- `ignorada`: pagamento, saldo anterior ou valor zero.

Regras de casamento, na fonte escolhida:

- Parcela k/n: a parcela k de uma compra de n parcelas, nesta competência ou
  numa seguinte (parcela antecipada), com a mesma descrição original ou valor a
  até R$ 0,05. Se a fatura traz várias parcelas de uma compra que ainda não
  existe (ex.: 2/5 a 5/5 antecipadas), a primeira cria a compra e as outras
  casam com as parcelas dela.
- À vista: mesma data e mesmo valor, nesta competência. Cada lançamento casa
  com uma linha só, então duas corridas iguais no mesmo dia precisam de dois
  lançamentos.
- Crédito: um estorno de mesmo valor nesta competência.
- Suspeita: parcela k/n com outro valor, ou lançamento nesta competência com
  valor a até R$ 0,05. Quando há mais de um candidato, ganha o par de valor
  mais próximo e, no empate, o de descrição mais parecida (ex.: "JIM.COM SOUZA
  CAR" fica com "Souza Car", não com outro lançamento de mesmo valor).
"""

import re
import unicodedata
from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal
from difflib import SequenceMatcher

from django.db.models import Q

from fatura_facil.models import Fonte, Lancamento
from fatura_facil.services.fatura.leitura import LinhaDaFatura

__all__ = ["Classificacao", "LinhaClassificada", "classificar", "e_ignorada", "total_considerado"]

_TOLERANCIA = Decimal("0.05")
_IGNORADAS = re.compile(r"^(PAGTO\b|PAGAMENTO RECEBIDO|SALDO ANTERIOR)", re.IGNORECASE)


class Classificacao:
    NOVA = "nova"
    EXISTENTE = "existente"
    SUSPEITA = "suspeita"
    IGNORADA = "ignorada"


@dataclass
class LinhaClassificada:
    indice: int
    linha: LinhaDaFatura
    classificacao: str = Classificacao.NOVA
    vinculo: Lancamento | None = None  # existente ou suspeita: o lançamento do sistema
    parcela_de: int | None = None  # casou com uma compra que outra linha desta fatura vai criar
    motivo: str = ""


@dataclass
class _Estado:
    competencia: date
    livres: list[Lancamento]
    # compras que linhas novas vão criar: (descrição, n, data) → {parcela: índice da linha que cria}
    novas: dict[tuple, dict] = field(default_factory=dict)
    usadas: set[int] = field(default_factory=set)  # parcelas das compras novas já casadas, por (índice, k)


def e_ignorada(linha: LinhaDaFatura) -> bool:
    """Pagamento, saldo anterior ou valor zero: não é gasto."""
    return bool(_IGNORADAS.match(linha.descricao)) or linha.valor == 0


def total_considerado(linhas: list[LinhaClassificada]) -> Decimal:
    """Soma das linhas que não são pagamento nem saldo: deve bater com o total da fatura."""
    return sum((item.linha.valor for item in linhas if item.classificacao != Classificacao.IGNORADA), Decimal(0))


def classificar(
    linhas: list[LinhaDaFatura], fonte: Fonte, competencia: date
) -> tuple[list[LinhaClassificada], list[Lancamento]]:
    """Classifica as linhas e devolve também as faltas: parcelas previstas da
    competência que a fatura não trouxe."""
    lancamentos = (
        Lancamento.objects.filter(fonte=fonte)
        .filter(
            Q(competencia=competencia)
            | Q(competencia__gt=competencia, tipo=Lancamento.Tipo.NORMAL, compra__n_parcelas__gt=1)
        )
        .select_related("compra")
        .order_by("competencia", "id")
    )
    estado = _Estado(competencia=competencia, livres=list(lancamentos))
    itens = [LinhaClassificada(indice, linha) for indice, linha in enumerate(linhas)]
    # Parcelas menores primeiro: a 2/5 cria a compra antes de a 3/5 procurar por ela.
    em_ordem = sorted(itens, key=lambda item: (item.linha.parcela or 0, item.indice))

    pendentes = []
    for item in em_ordem:
        if e_ignorada(item.linha):
            item.classificacao = Classificacao.IGNORADA
            item.motivo = "Pagamento, saldo ou valor zero."
        elif (vinculo := _casamento_exato(item.linha, estado)) is not None:
            _vincular(item, vinculo, estado, Classificacao.EXISTENTE)
        else:
            pendentes.append(item)

    for item, vinculo in _suspeitas(pendentes, estado):
        _vincular(item, vinculo, estado, Classificacao.SUSPEITA)

    for item in pendentes:
        if item.vinculo is not None:
            continue
        if (criadora := _parcela_de_compra_nova(item.linha, estado)) is not None:
            item.classificacao = Classificacao.EXISTENTE
            item.parcela_de = criadora
            item.motivo = "Parcela da compra criada por outra linha desta fatura."
        else:
            item.classificacao = Classificacao.NOVA
            if item.linha.parcelada:
                chave = _chave_da_compra(item.linha)
                estado.novas.setdefault(chave, {})[item.linha.parcela] = item.indice

    faltas = [
        lancamento
        for lancamento in estado.livres
        if lancamento.competencia == competencia
        and lancamento.tipo == Lancamento.Tipo.NORMAL
        and lancamento.status == Lancamento.Status.PREVISTO
    ]
    return itens, faltas


def _vincular(item: LinhaClassificada, vinculo: Lancamento, estado: _Estado, classificacao: str) -> None:
    estado.livres.remove(vinculo)
    item.classificacao = classificacao
    item.vinculo = vinculo
    if classificacao == Classificacao.SUSPEITA:
        item.motivo = "Valor parecido com um lançamento que não casou exatamente."
    elif vinculo.competencia != estado.competencia:
        item.motivo = "Parcela antecipada: vem de outra competência."


def _casamento_exato(linha: LinhaDaFatura, estado: _Estado) -> Lancamento | None:
    # Já confirmado por uma importação anterior desta fatura: mesmo texto e valor.
    ja_importado = next(
        (
            lancamento
            for lancamento in _da_competencia(estado)
            if lancamento.status == Lancamento.Status.CONFIRMADO
            and lancamento.valor == linha.valor
            and _normalizar(lancamento.texto) == _normalizar(linha.descricao)
        ),
        None,
    )
    if ja_importado is not None:
        return ja_importado

    if linha.parcelada:
        candidatas = [
            lancamento
            for lancamento in _parcelas(linha, estado)
            if _mesma_descricao(lancamento, linha) or abs(lancamento.valor - linha.valor) <= _TOLERANCIA
        ]
        # Prefere a desta competência, depois a de mesma descrição, depois o valor mais próximo.
        candidatas.sort(
            key=lambda lancamento: (
                lancamento.competencia != estado.competencia,
                not _mesma_descricao(lancamento, linha),
                abs(lancamento.valor - linha.valor),
            )
        )
        return candidatas[0] if candidatas else None

    if linha.valor < 0:
        return next(
            (
                lancamento
                for lancamento in _da_competencia(estado)
                if lancamento.tipo == Lancamento.Tipo.ESTORNO and lancamento.valor == linha.valor
            ),
            None,
        )

    return next(
        (
            lancamento
            for lancamento in _da_competencia(estado)
            if lancamento.compra is not None
            and lancamento.compra.n_parcelas == 1
            and lancamento.compra.data == linha.data
            and lancamento.valor == linha.valor
        ),
        None,
    )


def _parcela_de_compra_nova(linha: LinhaDaFatura, estado: _Estado) -> int | None:
    if not linha.parcelada:
        return None
    criadas = estado.novas.get(_chave_da_compra(linha), {})
    for parcela, indice in criadas.items():
        if parcela < linha.parcela and (indice, linha.parcela) not in estado.usadas:
            estado.usadas.add((indice, linha.parcela))
            return indice
    return None


def _suspeitas(pendentes: list[LinhaClassificada], estado: _Estado) -> list[tuple]:
    """Pares (linha, lançamento) parecidos, escolhidos do melhor para o pior,
    cada linha e cada lançamento usados uma vez só."""
    pares = []
    for item in pendentes:
        for lancamento in _candidatos_parecidos(item.linha, estado):
            diferenca = abs(lancamento.valor - item.linha.valor)
            pares.append(
                (diferenca, -_semelhanca(lancamento, item.linha), item.indice, lancamento.pk, item, lancamento)
            )
    pares.sort(key=lambda par: par[:4])

    escolhidos, linhas_usadas, lancamentos_usados = [], set(), set()
    for *_, item, lancamento in pares:
        if item.indice not in linhas_usadas and lancamento.pk not in lancamentos_usados:
            escolhidos.append((item, lancamento))
            linhas_usadas.add(item.indice)
            lancamentos_usados.add(lancamento.pk)
    return escolhidos


def _candidatos_parecidos(linha: LinhaDaFatura, estado: _Estado) -> list[Lancamento]:
    candidatos = _parcelas(linha, estado) if linha.parcelada else []
    candidatos += [
        lancamento
        for lancamento in _da_competencia(estado)
        if lancamento not in candidatos
        and (lancamento.valor < 0) == (linha.valor < 0)
        and abs(lancamento.valor - linha.valor) <= _TOLERANCIA
    ]
    return candidatos


def _semelhanca(lancamento: Lancamento, linha: LinhaDaFatura) -> float:
    return SequenceMatcher(None, _normalizar(lancamento.descricao), _normalizar(linha.descricao)).ratio()


def _parcelas(linha: LinhaDaFatura, estado: _Estado) -> list[Lancamento]:
    return [
        lancamento
        for lancamento in estado.livres
        if lancamento.tipo == Lancamento.Tipo.NORMAL
        and lancamento.compra is not None
        and lancamento.compra.n_parcelas == linha.n_parcelas
        and lancamento.parcela == linha.parcela
    ]


def _da_competencia(estado: _Estado) -> list[Lancamento]:
    return [lancamento for lancamento in estado.livres if lancamento.competencia == estado.competencia]


def _mesma_descricao(lancamento: Lancamento, linha: LinhaDaFatura) -> bool:
    textos = [lancamento.texto, lancamento.compra.descricao_original if lancamento.compra else ""]
    return any(texto and _normalizar(texto) == _normalizar(linha.descricao) for texto in textos)


def _chave_da_compra(linha: LinhaDaFatura) -> tuple:
    return _normalizar(linha.descricao), linha.n_parcelas, linha.data


def _normalizar(texto: str) -> str:
    sem_acento = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", sem_acento.lower())
