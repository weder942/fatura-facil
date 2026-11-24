"""Leitor do PDF de extrato do app Bradesco Cartões.

O PDF é uma tabela (Data, Histórico, Moeda de origem, US$, Cotação, R$), com um
bloco por cartão. As descrições longas quebram em linhas acima e abaixo da
data, e o "k/n" da parcela às vezes cai na linha de baixo; por isso a leitura
usa a posição das palavras na página, não o texto corrido:

- cada lançamento começa por uma data "dd/mm" na coluna Data;
- o valor é a palavra alinhada à direita na coluna R$, na mesma linha da data;
- a descrição são as palavras da coluna Histórico mais próximas daquela data.
"""

import re
from collections.abc import Iterable
from dataclasses import dataclass
from datetime import date
from decimal import Decimal

from fatura_facil.services.fatura.leitura import (
    FaturaLida,
    FormatoDeFaturaDesconhecidoError,
    LinhaDaFatura,
    PaginaDoPdf,
)

__all__ = ["e_fatura_bradesco", "ler_fatura_bradesco"]

_ASSINATURA = "Aplicativo Bradesco Cartões"
_EMISSAO = re.compile(r"Data:\s*(\d{2})/(\d{2})/(\d{4})")
_DIA_MES = re.compile(r"^(\d{2})/(\d{2})$")
_DINHEIRO = re.compile(r"^-?\d{1,3}(?:\.\d{3})*,\d{2}$")
_CARTAO = re.compile(r"^X{4}\.X{4}\.X{4}\.(\d{4})$")
_PARCELA = re.compile(r"\s(\d{1,2})\s*/\s*(\d{1,2})$")
_TOTAL_DA_FATURA = re.compile(r"Total da Fatura em Real.*?(-?\d{1,3}(?:\.\d{3})*,\d{2})")

# Palavras da coluna Histórico a mais de tanto da data pertencem a outro lançamento.
_DISTANCIA_MAXIMA = 14.0
# Tolerância de alinhamento (pontos do PDF).
_ALINHAMENTO = 3.0


@dataclass
class _Colunas:
    historico: float  # x0 da coluna Histórico
    moeda: float  # x0 da coluna Moeda de origem (fim do Histórico)
    valor: float  # x1 da coluna R$ (valores alinhados à direita)


def e_fatura_bradesco(paginas: list[PaginaDoPdf]) -> bool:
    return bool(paginas) and _ASSINATURA in paginas[0].texto


def ler_fatura_bradesco(paginas: list[PaginaDoPdf]) -> FaturaLida:
    texto = "\n".join(pagina.texto for pagina in paginas)
    emissao = _EMISSAO.search(texto)
    if emissao is None:
        raise FormatoDeFaturaDesconhecidoError("O extrato do Bradesco Cartões não tem a data de emissão.")

    emitida_em = date(int(emissao.group(3)), int(emissao.group(2)), int(emissao.group(1)))
    fatura = FaturaLida(banco="Bradesco Cartões", emitida_em=emitida_em)

    colunas: _Colunas | None = None
    cartao = ""
    for pagina in paginas:
        colunas, cartao = _ler_pagina(pagina.palavras, colunas, cartao, fatura)

    total = _TOTAL_DA_FATURA.search(texto)
    fatura.total = _valor(total.group(1)) if total else None
    return fatura


def _ler_pagina(palavras: list[dict], colunas: _Colunas | None, cartao: str, fatura: FaturaLida):
    """Lê os lançamentos de uma página; devolve as colunas e o cartão em vigor no fim dela."""
    # A página pode trocar de cartão e repetir o cabeçalho; cada data usa os
    # que estão acima dela.
    marcos = sorted(_marcos(palavras), key=lambda marco: marco[0])
    datas = [p for p in palavras if _DIA_MES.match(p["text"])]

    for data in sorted(datas, key=lambda p: p["top"]):
        for topo, tipo, valor in marcos:
            if topo > data["top"]:
                break
            if tipo == "colunas":
                colunas = valor
            else:
                cartao = valor
        if colunas is None or data["x1"] > colunas.historico:
            continue
        linha = _lancamento(data, palavras, datas, colunas, cartao, fatura.emitida_em)
        if linha is not None:
            fatura.linhas.append(linha)

    for _, tipo, valor in marcos:
        if tipo == "colunas":
            colunas = valor
        else:
            cartao = valor
    return colunas, cartao


def _marcos(palavras: list[dict]) -> Iterable[tuple[float, str, object]]:
    """Cabeçalhos de coluna e números de cartão, com a altura em que aparecem."""
    for palavra in palavras:
        if cartao := _CARTAO.match(palavra["text"]):
            yield palavra["top"], "cartao", cartao.group(1)
        if palavra["text"] == "Histórico":
            mesma_linha = [p for p in palavras if abs(p["top"] - palavra["top"]) < _ALINHAMENTO]
            valor = next((p for p in mesma_linha if p["text"] == "R$"), None)
            moeda = [p for p in palavras if p["text"] == "Moeda" and 0 <= palavra["top"] - p["top"] < 30]
            if valor and moeda:
                yield palavra["top"], "colunas", _Colunas(palavra["x0"] - 2, moeda[-1]["x0"] - 2, valor["x1"])


def _lancamento(data, palavras, datas, colunas: _Colunas, cartao: str, emitida_em: date) -> LinhaDaFatura | None:
    mesma_linha = [p for p in palavras if abs(p["top"] - data["top"]) < _ALINHAMENTO]
    valor = next(
        (p for p in mesma_linha if _DINHEIRO.match(p["text"]) and abs(p["x1"] - colunas.valor) < _ALINHAMENTO),
        None,
    )
    if valor is None:
        return None

    historico = [
        p
        for p in palavras
        if p["x0"] >= colunas.historico
        and p["x1"] <= colunas.moeda
        and abs(p["top"] - data["top"]) <= _DISTANCIA_MAXIMA
        and _data_mais_proxima(p, datas) is data
    ]
    historico.sort(key=lambda p: (round(p["top"]), p["x0"]))
    texto = " ".join(p["text"] for p in historico)

    descricao, parcela, n_parcelas = texto, None, None
    if encontrada := _PARCELA.search(texto):
        parcela, n_parcelas = int(encontrada.group(1)), int(encontrada.group(2))
        descricao = texto[: encontrada.start()].strip()

    return LinhaDaFatura(
        data=_data_completa(data["text"], emitida_em),
        descricao=descricao,
        valor=_valor(valor["text"]),
        texto=f"{data['text']} {texto} {valor['text']}",
        parcela=parcela,
        n_parcelas=n_parcelas,
        cartao=cartao,
    )


def _data_mais_proxima(palavra: dict, datas: list[dict]) -> dict:
    return min(datas, key=lambda d: abs(d["top"] - palavra["top"]))


def _data_completa(dia_mes: str, emitida_em: date) -> date:
    """O extrato não traz o ano: é o da emissão, ou o anterior se a data cair depois dela."""
    dia, mes = (int(parte) for parte in dia_mes.split("/"))
    candidata = date(emitida_em.year, mes, dia)
    return candidata if candidata <= emitida_em else date(emitida_em.year - 1, mes, dia)


def _valor(texto: str) -> Decimal:
    return Decimal(texto.replace(".", "").replace(",", "."))
