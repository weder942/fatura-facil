"""Leitura das abas de mês de uma planilha "Contas AAAA.xlsx"."""

import re
from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal, InvalidOperation
from pathlib import Path

from openpyxl import load_workbook

__all__ = ["ColunaDaPlanilha", "ItemDaPlanilha", "LeituraDaPlanilha", "MesDaPlanilha", "ler_planilha"]

_MESES = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "septmber": 9,  # assim na planilha de 2023 e 2024
    "october": 10,
    "november": 11,
    "december": 12,
}
_CENTAVO = Decimal("0.01")


@dataclass(frozen=True)
class ItemDaPlanilha:
    descricao: str
    valor: Decimal
    celula: str  # "November 2026!L23", para o relatório


@dataclass
class ColunaDaPlanilha:
    """Um bloco da aba: o cabeçalho (linha 1) com a descrição embaixo e o valor à direita."""

    cabecalho: str
    itens: list[ItemDaPlanilha] = field(default_factory=list)
    problemas: list[str] = field(default_factory=list)


@dataclass
class MesDaPlanilha:
    competencia: date
    colunas: list[ColunaDaPlanilha]


@dataclass
class LeituraDaPlanilha:
    meses: list[MesDaPlanilha]


def ler_planilha(caminho: Path) -> LeituraDaPlanilha:
    """Lê as abas com nome de mês; o ano vem do nome do arquivo ("Contas 2025.xlsx")."""
    ano = re.search(r"(20\d\d)", Path(caminho).name)
    if not ano:
        raise ValueError(f"O nome do arquivo precisa ter o ano (ex.: Contas 2025.xlsx): {caminho}")

    livro = load_workbook(caminho, data_only=True, read_only=True)
    meses = []
    for aba in livro.worksheets:
        numero = _MESES.get(aba.title.strip().lower())
        if numero is None:
            continue
        linhas = list(aba.iter_rows(values_only=True))
        rotulo = f"{aba.title.strip()} {ano[1]}"
        meses.append(MesDaPlanilha(date(int(ano[1]), numero, 1), _ler_colunas(rotulo, linhas)))
    livro.close()
    meses.sort(key=lambda mes: mes.competencia)
    return LeituraDaPlanilha(meses=meses)


def _ler_colunas(aba: str, linhas: list[tuple]) -> list[ColunaDaPlanilha]:
    if not linhas:
        return []
    colunas = []
    for indice, cabecalho in enumerate(linhas[0]):
        if not isinstance(cabecalho, str) or not cabecalho.strip():
            continue
        coluna = ColunaDaPlanilha(cabecalho.strip())
        for numero, linha in enumerate(linhas[1:], start=2):
            descricao = linha[indice] if indice < len(linha) else None
            valor = linha[indice + 1] if indice + 1 < len(linha) else None
            celula = f"{aba}!{_letra(indice + 1)}{numero}"
            item = _item(descricao, valor, celula, coluna.problemas)
            if item is not None:
                coluna.itens.append(item)
        colunas.append(coluna)
    return colunas


def _item(descricao, valor, celula: str, problemas: list[str]) -> ItemDaPlanilha | None:
    texto = "" if descricao is None else str(descricao).strip()
    if valor is None or (isinstance(valor, str) and not valor.strip()):
        if texto:
            problemas.append(f"{celula}: texto sem valor ignorado ({texto!r}).")
        return None
    if isinstance(valor, bool) or not isinstance(valor, int | float | Decimal):
        problemas.append(f"{celula}: valor não numérico ignorado ({valor!r}).")
        return None
    try:
        quantia = Decimal(str(valor)).quantize(_CENTAVO)
    except InvalidOperation:  # pragma: no cover - NaN/infinito não vêm do Sheets
        problemas.append(f"{celula}: valor inválido ignorado ({valor!r}).")
        return None
    if not texto:
        problemas.append(f"{celula}: valor {quantia} sem descrição.")
    return ItemDaPlanilha(descricao=texto, valor=quantia, celula=celula)


def _letra(coluna: int) -> str:
    """1 → A, 27 → AA (índice da planilha começa em 1)."""
    letras = ""
    while coluna:
        coluna, resto = divmod(coluna - 1, 26)
        letras = chr(65 + resto) + letras
    return letras
