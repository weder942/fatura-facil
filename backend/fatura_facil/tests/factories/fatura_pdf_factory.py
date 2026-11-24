"""PDFs sintéticos no layout do extrato do app Bradesco Cartões.

Os PDFs reais têm nome e número de cartão, então os testes montam os seus: um
PDF mínimo com Helvetica, cada texto posicionado como no extrato (colunas
Data, Histórico, Moeda de origem e R$, valores alinhados à direita).
"""

from dataclasses import dataclass

from pdfminer.fontmetrics import FONT_METRICS

__all__ = ["Cabecalho", "Cartao", "Lancamento", "Texto", "criar_pdf", "criar_pdf_bradesco"]

ALTURA = 842
_TAMANHO = 9
_LARGURAS = FONT_METRICS["Helvetica"][1]
_ESPACO = 34  # entre um lançamento e o próximo
_QUEBRA = 6.7  # distância das linhas quebradas de uma descrição

_X_DATA = 60
_X_HISTORICO = 110
_X_MOEDA = 333.5
_X_ORIGEM = 352
_X1_VALOR = 567


@dataclass
class Cabecalho:
    """Os títulos das colunas, repetidos em cada bloco de cartão."""


@dataclass
class Cartao:
    final: str


@dataclass
class Lancamento:
    data: str  # "dd/mm"
    historico: str
    valor: str  # "1.234,56"
    acima: str = ""  # parte da descrição que quebra para cima
    abaixo: str = ""  # parte que quebra para baixo (ex.: "2/5")
    origem: str = ""  # valor na moeda de origem, na coluna Moeda (é ignorado)


@dataclass
class Texto:
    texto: str
    x: float = _X_HISTORICO


def criar_pdf_bradesco(*paginas: list, emitida_em: str = "24/11/2026 - 10:37", total: str | None = None) -> bytes:
    """Cada página é uma lista de Cabecalho, Cartao, Lancamento e Texto, de cima para baixo."""
    desenhos = []
    for numero, itens in enumerate(paginas):
        textos = []
        topo = 60.0
        if numero == 0:
            textos += [(131, 64, "Aplicativo Bradesco Cartões"), (131, 95, f"Data: {emitida_em}")]
            topo = 170.0
        for item in itens:
            textos += _desenhar(item, topo)
            topo += _ESPACO
        if numero == len(paginas) - 1 and total is not None:
            textos.append((_X_HISTORICO, topo, f". Total da Fatura em Real . . . R$ {total}"))
        desenhos.append(textos)
    return criar_pdf(desenhos)


def _desenhar(item, topo: float) -> list[tuple[float, float, str]]:
    if isinstance(item, Cartao):
        return [(60.8, topo, f"FULANO DE TAL - VISA XXXX.XXXX.XXXX.{item.final}")]
    if isinstance(item, Cabecalho):
        return [
            (_X_MOEDA, topo - 13, "Moeda"),
            (60.8, topo, "Data"),
            (111, topo, "Histórico"),
            (_direita(566.3, "R$"), topo, "R$"),
        ]
    if isinstance(item, Texto):
        return [(item.x, topo, item.texto)]
    textos = [(_X_DATA, topo, item.data), (_direita(_X1_VALOR, item.valor), topo, item.valor)]
    if item.historico:
        textos.append((_X_HISTORICO, topo, item.historico))
    if item.acima:
        textos.append((_X_HISTORICO, topo - _QUEBRA, item.acima))
    if item.abaixo:
        textos.append((_X_HISTORICO, topo + _QUEBRA, item.abaixo))
    if item.origem:
        textos.append((_X_ORIGEM, topo + _QUEBRA, item.origem))
    return textos


def _direita(x1: float, texto: str) -> float:
    return x1 - sum(_LARGURAS.get(caractere, 500) for caractere in texto) * _TAMANHO / 1000


def criar_pdf(paginas: list[list[tuple[float, float, str]]]) -> bytes:
    """PDF mínimo: cada página é uma lista de (x, topo, texto) em Helvetica 9."""
    fonte = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    objetos = [b"<< /Type /Catalog /Pages 2 0 R >>", b"", fonte]  # o 2 (Pages) é preenchido no fim
    filhos = []
    for textos in paginas:
        conteudo = b"".join(
            b"BT /F1 %d Tf 1 0 0 1 %.2f %.2f Tm (%s) Tj ET\n" % (_TAMANHO, x, ALTURA - topo - _TAMANHO, _escapar(texto))
            for x, topo, texto in textos
        )
        objetos.append(b"<< /Length %d >>\nstream\n%s\nendstream" % (len(conteudo), conteudo))
        objetos.append(
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 %d] /Resources << /Font << /F1 3 0 R >> >>"
            b" /Contents %d 0 R >>" % (ALTURA, len(objetos))
        )
        filhos.append(len(objetos))
    objetos[1] = b"<< /Type /Pages /Kids [%s] /Count %d >>" % (
        b" ".join(b"%d 0 R" % filho for filho in filhos),
        len(filhos),
    )

    saida = bytearray(b"%PDF-1.4\n")
    posicoes = []
    for numero, objeto in enumerate(objetos, start=1):
        posicoes.append(len(saida))
        saida += b"%d 0 obj\n%s\nendobj\n" % (numero, objeto)
    inicio_xref = len(saida)
    saida += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objetos) + 1)
    saida += b"".join(b"%010d 00000 n \n" % posicao for posicao in posicoes)
    saida += b"trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(objetos) + 1, inicio_xref)
    return bytes(saida)


def _escapar(texto: str) -> bytes:
    return texto.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)").encode("cp1252")
