"""Transforma as colunas Rendimentos e Fixas de vários meses em recorrentes e avulsos.

Regras:
- Um nome que aparece em pelo menos `MINIMO_DE_MESES` meses seguidos vira recorrente; o resto,
  avulso. Num recorrente, os meses isolados (fora de uma sequência dessas) viram valor do mês.
- Fixo: uma vigência nova a cada mudança que se mantém; uma mudança que volta ao valor
  anterior no mês seguinte é só um ajuste daquele mês (ex.: salário com 13º em novembro).
- Variável (o valor muda na maioria dos meses, como energia): uma vigência e o valor real
  de cada mês.
- Meses sem o nome no meio do período encerram a vigência e uma nova começa na volta.
"""

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

from fatura_facil.services.competencia_service import somar_meses
from fatura_facil.services.planilha.leitura import ItemDaPlanilha
from fatura_facil.services.planilha.texto import chave, nome_de_exibicao

__all__ = ["MINIMO_DE_MESES", "PlanoDeAvulso", "PlanoDeRecorrente", "Vigencia", "planejar_grupo"]

MINIMO_DE_MESES = 3


@dataclass(frozen=True)
class Vigencia:
    valor: Decimal
    a_partir_de: date
    ate: date | None


@dataclass
class PlanoDeRecorrente:
    nome: str
    variavel: bool
    ordem: int
    vigencias: list[Vigencia] = field(default_factory=list)
    valores_do_mes: dict[date, Decimal] = field(default_factory=dict)


@dataclass(frozen=True)
class PlanoDeAvulso:
    competencia: date
    descricao: str
    valor: Decimal


@dataclass
class _Ocorrencias:
    nome: str = ""
    ordem: int = 0
    valores: dict[date, Decimal] = field(default_factory=dict)
    originais: dict[date, str] = field(default_factory=dict)  # texto como estava, para os avulsos


def planejar_grupo(
    meses: list[tuple[date, list[ItemDaPlanilha]]],
    *,
    ultima_competencia: date,
    nomes_repetidos: dict[str, tuple[str, ...]] | None = None,
    sinonimos: dict[str, str] | None = None,
) -> tuple[list[PlanoDeRecorrente], list[PlanoDeAvulso]]:
    """`meses`: (competência, itens da coluna) em ordem.

    `nomes_repetidos`: chave → nomes por ordem de aparição no mês (ex.: {"mae": ("Mãe saúde", "Mãe")}).
    `sinonimos`: chave → chave de outro nome do mesmo recorrente (ex.: {"psiquiatria": "psiquiatra"}).
    """
    por_chave = _agrupar(meses, nomes_repetidos or {}, sinonimos or {})
    recorrentes, avulsos = [], []
    for ocorrencias in por_chave.values():
        if any(len(trecho) >= MINIMO_DE_MESES for trecho in _trechos(sorted(ocorrencias.valores))):
            recorrentes.append(_planejar_recorrente(ocorrencias, ultima_competencia))
        else:
            avulsos.extend(
                PlanoDeAvulso(competencia, ocorrencias.originais[competencia], valor)
                for competencia, valor in ocorrencias.valores.items()
            )
    recorrentes.sort(key=lambda plano: plano.ordem)
    avulsos.sort(key=lambda plano: plano.competencia)
    return recorrentes, avulsos


def _agrupar(meses, nomes_repetidos, sinonimos) -> dict[str, _Ocorrencias]:
    por_chave: dict[str, _Ocorrencias] = defaultdict(_Ocorrencias)
    for competencia, itens in meses:
        vistos: dict[str, int] = defaultdict(int)
        for posicao, item in enumerate(itens):
            base = chave(item.descricao)
            base = sinonimos.get(base, base)
            vistos[base] += 1
            nome = nome_de_exibicao(item.descricao) or "(sem descrição)"
            identificador = base
            nomes = nomes_repetidos.get(base)
            if nomes and vistos[base] <= len(nomes):
                nome = nomes[vistos[base] - 1]
                identificador = chave(nome)
            elif vistos[base] > 1:
                nome = f"{nome} {vistos[base]}"
                identificador = f"{base}#{vistos[base]}"
            if not base:
                # Sem descrição nunca é recorrente: cada um é um avulso.
                identificador = f"#{competencia}#{posicao}"
            ocorrencias = por_chave[identificador]
            if not ocorrencias.valores:
                ocorrencias.ordem = posicao
            ocorrencias.nome = nome  # o mais recente vale
            ocorrencias.valores[competencia] = item.valor
            ocorrencias.originais[competencia] = item.descricao or "(sem descrição)"
    return por_chave


def _planejar_recorrente(ocorrencias: _Ocorrencias, ultima: date) -> PlanoDeRecorrente:
    valores = dict(sorted(ocorrencias.valores.items()))
    variavel = len(set(valores.values())) > len(valores) / 2
    plano = PlanoDeRecorrente(nome=ocorrencias.nome, variavel=variavel, ordem=ocorrencias.ordem)

    for trecho in _trechos(list(valores)):
        if len(trecho) < MINIMO_DE_MESES:
            plano.valores_do_mes.update({competencia: valores[competencia] for competencia in trecho})
            continue
        fim = None if trecho[-1] == ultima else trecho[-1]
        if variavel:
            plano.vigencias.append(Vigencia(valores[trecho[0]], trecho[0], fim))
            plano.valores_do_mes.update({competencia: valores[competencia] for competencia in trecho})
            continue

        inicio, atual = trecho[0], valores[trecho[0]]
        for indice, competencia in enumerate(trecho[1:], start=1):
            valor = valores[competencia]
            if valor == atual:
                continue
            seguinte = trecho[indice + 1] if indice + 1 < len(trecho) else None
            if seguinte is not None and valores[seguinte] == atual:
                plano.valores_do_mes[competencia] = valor  # ajuste só deste mês
                continue
            plano.vigencias.append(Vigencia(atual, inicio, None))
            inicio, atual = competencia, valor
        plano.vigencias.append(Vigencia(atual, inicio, fim))
    return plano


def _trechos(competencias: list[date]) -> list[list[date]]:
    """Meses consecutivos: [jan, fev, abr] → [[jan, fev], [abr]]."""
    trechos: list[list[date]] = []
    for competencia in competencias:
        if trechos and somar_meses(trechos[-1][-1], 1) == competencia:
            trechos[-1].append(competencia)
        else:
            trechos.append([competencia])
    return trechos
