from datetime import date

import pytest

from fatura_facil.services.dias_uteis_service import e_dia_util, feriados, pascoa


@pytest.mark.parametrize(
    ("ano", "esperado"),
    [(2024, date(2024, 3, 31)), (2025, date(2025, 4, 20)), (2026, date(2026, 4, 5)), (2027, date(2027, 3, 28))],
)
def test_pascoa(ano, esperado):
    assert pascoa(ano) == esperado


def test_feriados_de_2026():
    assert sorted(feriados(2026)) == [
        date(2026, 1, 1),
        date(2026, 2, 16),  # Carnaval
        date(2026, 2, 17),
        date(2026, 4, 3),  # Sexta-feira Santa
        date(2026, 4, 21),
        date(2026, 5, 1),
        date(2026, 6, 4),  # Corpus Christi
        date(2026, 9, 7),
        date(2026, 10, 12),
        date(2026, 11, 2),
        date(2026, 11, 15),
        date(2026, 11, 20),
        date(2026, 12, 25),
    ]


def test_consciencia_negra_so_a_partir_de_2024():
    assert date(2023, 11, 20) not in feriados(2023)
    assert date(2024, 11, 20) in feriados(2024)


@pytest.mark.parametrize(
    ("dia", "util"),
    [
        (date(2026, 11, 26), True),  # quinta
        (date(2026, 11, 28), False),  # sábado
        (date(2026, 11, 29), False),  # domingo
        (date(2026, 11, 20), False),  # feriado numa sexta
    ],
)
def test_e_dia_util(dia, util):
    assert e_dia_util(dia) is util
