"""Dias úteis pelo calendário nacional (o mesmo da ANBIMA): fins de semana e
feriados nacionais não rendem. Os feriados móveis saem da Páscoa."""

from datetime import date, timedelta
from functools import lru_cache

__all__ = ["e_dia_util", "feriados", "pascoa"]

_FIXOS = [(1, 1), (4, 21), (5, 1), (9, 7), (10, 12), (11, 2), (11, 15), (12, 25)]


def pascoa(ano: int) -> date:
    """Domingo de Páscoa (algoritmo de Meeus/Jones/Butcher, calendário gregoriano)."""
    a, b, c = ano % 19, ano // 100, ano % 100
    d, e = b // 4, b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = c // 4, c % 4
    lam = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * lam) // 451
    mes = (h + lam - 7 * m + 114) // 31
    dia = (h + lam - 7 * m + 114) % 31 + 1
    return date(ano, mes, dia)


@lru_cache(maxsize=64)
def feriados(ano: int) -> frozenset[date]:
    domingo = pascoa(ano)
    moveis = [
        domingo - timedelta(days=48),  # segunda de Carnaval
        domingo - timedelta(days=47),  # terça de Carnaval
        domingo - timedelta(days=2),  # Sexta-feira Santa
        domingo + timedelta(days=60),  # Corpus Christi
    ]
    fixos = [date(ano, mes, dia) for mes, dia in _FIXOS]
    if ano >= 2024:  # Consciência Negra virou feriado nacional (Lei 14.759/2023)
        fixos.append(date(ano, 11, 20))
    return frozenset(fixos + moveis)


def e_dia_util(dia: date) -> bool:
    return dia.weekday() < 5 and dia not in feriados(dia.year)
