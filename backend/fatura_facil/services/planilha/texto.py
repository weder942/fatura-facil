"""Interpretação dos textos da planilha: sufixo de parcela e chave de comparação de nomes."""

import re
import unicodedata

__all__ = ["chave", "nome_de_exibicao", "separar_parcela"]

# "Ipad 10/08", "Imo (09/06)": total/atual, como a planilha sempre usou.
_PARCELA = re.compile(r"^(?P<nome>.*?)[\s(]*(?P<total>\d{1,3})\s*/\s*(?P<atual>\d{1,3})\s*\)?\s*$")
_CALC = re.compile(r"\s*\bcalc\b\.?", re.IGNORECASE)


def separar_parcela(texto: str) -> tuple[str, int, int] | None:
    """ "Ipad 10/08" → ("Ipad", 8, 10): nome, parcela atual e total. None se não for parcela."""
    encontrado = _PARCELA.match(texto.strip())
    if not encontrado:
        return None
    total, atual = int(encontrado["total"]), int(encontrado["atual"])
    if total < 2 or not 1 <= atual <= total:
        return None
    return encontrado["nome"].strip() or texto.strip(), atual, total


def chave(texto: str) -> str:
    """Para comparar nomes: sem acento, sem caixa, sem "Calc." e só letras e números.

    "Salário Calc." e "Salário" têm a mesma chave; "Aux. Home Office" e "Aux.Home Office" também.
    """
    sem_acento = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", _CALC.sub("", sem_acento).lower())


def nome_de_exibicao(texto: str) -> str:
    """O nome como vai aparecer no sistema: "Salário Calc." → "Salário"."""
    return re.sub(r"\s+", " ", _CALC.sub("", texto)).strip()
