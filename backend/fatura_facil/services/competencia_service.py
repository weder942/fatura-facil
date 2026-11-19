"""Competência: o mês ao qual um lançamento pertence.

Representada como `date` no primeiro dia do mês (2026-12-01) e como
"YYYY-MM" na API. Para cartão, é o mês do VENCIMENTO da fatura, não o
mês da compra.
"""

import calendar
import re
from datetime import date

from fatura_facil.exceptions import RegraDeNegocioError

__all__ = [
    "competencia_da_compra_no_cartao",
    "competencia_da_data",
    "formatar_competencia",
    "interpretar_competencia",
    "somar_meses",
]

_FORMATO_COMPETENCIA = re.compile(r"^(\d{4})-(\d{2})$")


def competencia_da_data(data: date) -> date:
    """Competência de um lançamento fora do cartão: o mês da própria data."""
    return data.replace(day=1)


def somar_meses(competencia: date, meses: int) -> date:
    _exigir_primeiro_dia(competencia)
    indice = competencia.year * 12 + (competencia.month - 1) + meses
    return date(indice // 12, indice % 12 + 1, 1)


def competencia_da_compra_no_cartao(data: date, *, dia_fechamento: int, dia_vencimento: int) -> date:
    """Mês do vencimento da fatura em que a compra entra.

    - Compra com dia menor que o fechamento entra na fatura que fecha naquele
      mês; no dia do fechamento ou depois, na que fecha no mês seguinte.
    - Em mês mais curto que o dia de fechamento (ex.: dia 31 em fevereiro), a
      fatura fecha no último dia do mês.
    - A fatura vence no mesmo mês do fechamento se `dia_vencimento >
      dia_fechamento`; senão, no mês seguinte.
    """
    _validar_dia("fechamento", dia_fechamento)
    _validar_dia("vencimento", dia_vencimento)

    mes_da_compra = competencia_da_data(data)
    fechamento_no_mes = min(dia_fechamento, calendar.monthrange(data.year, data.month)[1])
    mes_do_fechamento = mes_da_compra if data.day < fechamento_no_mes else somar_meses(mes_da_compra, 1)

    return mes_do_fechamento if dia_vencimento > dia_fechamento else somar_meses(mes_do_fechamento, 1)


def formatar_competencia(competencia: date) -> str:
    return f"{competencia.year:04d}-{competencia.month:02d}"


def interpretar_competencia(valor: str) -> date:
    """Converte "YYYY-MM" (formato da API) em competência."""
    encontrado = _FORMATO_COMPETENCIA.match(valor or "")
    if not encontrado or not 1 <= int(encontrado.group(2)) <= 12:
        raise RegraDeNegocioError(f"Competência inválida: '{valor}'. Use o formato AAAA-MM.")
    return date(int(encontrado.group(1)), int(encontrado.group(2)), 1)


def _validar_dia(nome: str, dia: int) -> None:
    if not 1 <= dia <= 31:
        raise RegraDeNegocioError(f"Dia de {nome} inválido: {dia}. Deve estar entre 1 e 31.")


def _exigir_primeiro_dia(competencia: date) -> None:
    # Erro de programação, não do usuário: competência sempre é dia 1.
    if competencia.day != 1:
        raise ValueError(f"Competência deve ser o primeiro dia do mês, recebido {competencia.isoformat()}.")
