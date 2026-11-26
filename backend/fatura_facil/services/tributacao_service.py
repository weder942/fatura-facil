"""Renda fixa: IOF e IR regressivos sobre o rendimento, pelo prazo de cada aporte
(dias corridos), e a taxa diária de um percentual do CDI (252 dias úteis)."""

from decimal import Decimal, localcontext

__all__ = ["aliquota_iof", "aliquota_ir", "taxa_diaria"]

# Anexo do Decreto 6.306/2007: % do rendimento por dia corrido de aplicação; zera no 30º.
_IOF = [
    96,
    93,
    90,
    86,
    83,
    80,
    76,
    73,
    70,
    66,
    63,
    60,
    56,
    53,
    50,
    46,
    43,
    40,
    36,
    33,
    30,
    26,
    23,
    20,
    16,
    13,
    10,
    6,
    3,
]
_CEM = Decimal(100)


def aliquota_iof(dias: int) -> Decimal:
    if dias >= 30:
        return Decimal(0)
    return Decimal(_IOF[max(dias, 1) - 1]) / _CEM


def aliquota_ir(dias: int) -> Decimal:
    if dias <= 180:
        return Decimal("0.225")
    if dias <= 360:
        return Decimal("0.20")
    if dias <= 720:
        return Decimal("0.175")
    return Decimal("0.15")


def taxa_diaria(cdi_ao_ano: Decimal, percentual: Decimal) -> Decimal:
    """Rendimento de um dia útil por real guardado.

    Como a B3: o CDI anual vira a taxa de um dia útil, (1 + CDI)^(1/252) − 1,
    arredondada em 8 casas, e o percentual do CDI incide sobre essa taxa
    diária (não sobre a anual).
    """
    with localcontext() as contexto:
        contexto.prec = 34
        diaria = (1 + cdi_ao_ano / _CEM) ** (Decimal(1) / Decimal(252)) - 1
        return diaria.quantize(Decimal("0.00000001")) * percentual / _CEM
