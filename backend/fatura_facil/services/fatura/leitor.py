"""Escolhe o leitor de acordo com o conteúdo do arquivo."""

from io import BytesIO

import pdfplumber
from pdfminer.pdfparser import PDFSyntaxError

from fatura_facil.services.fatura.bradesco import e_fatura_bradesco, ler_fatura_bradesco
from fatura_facil.services.fatura.leitura import FaturaLida, FormatoDeFaturaDesconhecidoError, PaginaDoPdf

__all__ = ["ler_fatura"]

# (reconhece, lê) — um par por formato de fatura.
_LEITORES = [(e_fatura_bradesco, ler_fatura_bradesco)]


def ler_fatura(conteudo: bytes) -> FaturaLida:
    paginas = _paginas(conteudo)
    for reconhece, le in _LEITORES:
        if reconhece(paginas):
            return le(paginas)
    raise FormatoDeFaturaDesconhecidoError(
        "Ainda não sei ler este PDF. Por enquanto, só o extrato do app Bradesco Cartões."
    )


def _paginas(conteudo: bytes) -> list[PaginaDoPdf]:
    if not conteudo.startswith(b"%PDF"):
        raise FormatoDeFaturaDesconhecidoError("O arquivo não é um PDF.")
    try:
        with pdfplumber.open(BytesIO(conteudo)) as pdf:
            return [PaginaDoPdf(pagina.extract_text() or "", pagina.extract_words()) for pagina in pdf.pages]
    except PDFSyntaxError as erro:
        raise FormatoDeFaturaDesconhecidoError("Não consegui abrir o PDF.") from erro
