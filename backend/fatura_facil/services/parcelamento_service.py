"""Divisão de compras em parcelas, com a regra de arredondamento do banco.

A parcela base é `floor(total / n)` em centavos e a sobra dos centavos vai
para a 1ª parcela: R$ 416,00 em 3x = 138,68 + 138,66 + 138,66. A soma das
parcelas é sempre igual ao total.
"""

from collections.abc import Mapping
from dataclasses import dataclass
from datetime import date
from decimal import Decimal

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.services.competencia_service import somar_meses

__all__ = ["Parcela", "dividir_valor", "gerar_parcelas", "redistribuir_parcelas"]

CENTAVO = Decimal("0.01")


@dataclass(frozen=True)
class Parcela:
    numero: int
    competencia: date
    valor: Decimal


def dividir_valor(total: Decimal, n: int) -> list[Decimal]:
    """Divide `total` em `n` valores; a sobra dos centavos fica no primeiro."""
    _validar_total(total)
    if n < 1:
        raise RegraDeNegocioError("O número de parcelas deve ser pelo menos 1.")

    centavos = int(total / CENTAVO)
    base, sobra = divmod(centavos, n)
    if base == 0:
        raise RegraDeNegocioError(f"Valor de R$ {total} não pode ser dividido em {n} parcelas de pelo menos 1 centavo.")

    valores = [base + sobra] + [base] * (n - 1)
    return [Decimal(v) * CENTAVO for v in valores]


def gerar_parcelas(total: Decimal, n: int, competencia_inicial: date) -> list[Parcela]:
    """Parcelas 1..n em competências consecutivas a partir de `competencia_inicial`."""
    return [
        Parcela(numero=numero, competencia=somar_meses(competencia_inicial, numero - 1), valor=valor)
        for numero, valor in enumerate(dividir_valor(total, n), start=1)
    ]


def redistribuir_parcelas(
    total: Decimal, n: int, competencia_inicial: date, *, confirmadas: Mapping[int, Decimal]
) -> list[Parcela]:
    """Regera as parcelas NÃO confirmadas de uma compra editada.

    As confirmadas (por importação de fatura) não mudam e não são devolvidas.
    O restante (`total − soma das confirmadas`) é dividido entre as demais,
    com a sobra dos centavos na primeira delas.
    """
    _validar_total(total)
    fora_do_intervalo = sorted(numero for numero in confirmadas if not 1 <= numero <= n)
    if fora_do_intervalo:
        raise RegraDeNegocioError(
            f"A compra não pode ter {n} parcela(s): a(s) parcela(s) {fora_do_intervalo} já foi(ram) confirmada(s)."
        )

    restante = total - sum(confirmadas.values(), Decimal(0))
    pendentes = [numero for numero in range(1, n + 1) if numero not in confirmadas]

    if not pendentes:
        if restante != 0:
            raise RegraDeNegocioError(
                f"Todas as parcelas estão confirmadas e somam R$ {total - restante}; o total não pode ser R$ {total}."
            )
        return []
    if restante <= 0:
        raise RegraDeNegocioError(
            f"O total (R$ {total}) precisa ser maior que a soma das parcelas confirmadas (R$ {total - restante})."
        )

    valores = dividir_valor(restante, len(pendentes))
    return [
        Parcela(numero=numero, competencia=somar_meses(competencia_inicial, numero - 1), valor=valor)
        for numero, valor in zip(pendentes, valores, strict=True)
    ]


def _validar_total(total: Decimal) -> None:
    if not isinstance(total, Decimal):
        raise TypeError(f"Valores monetários devem ser Decimal, recebido {type(total).__name__}.")
    if total <= 0:
        raise RegraDeNegocioError("O valor deve ser maior que zero.")
    if total != total.quantize(CENTAVO):
        raise RegraDeNegocioError(f"Valor com mais de duas casas decimais: {total}.")
