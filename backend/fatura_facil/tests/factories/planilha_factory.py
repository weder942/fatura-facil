from pathlib import Path

from openpyxl import Workbook

__all__ = ["criar_planilha"]


def criar_planilha(pasta: Path, nome: str, abas: dict[str, dict[str, list[tuple]]]) -> Path:
    """Cria um .xlsx com uma aba por mês: {"January": {"Nubank": [("Ipad 10/08", 199.99)], ...}}.

    Cada cabeçalho ocupa duas colunas (descrição e valor), lado a lado, como na planilha real.
    """
    livro = Workbook()
    livro.remove(livro.active)
    for titulo, colunas in abas.items():
        aba = livro.create_sheet(titulo)
        for indice, (cabecalho, linhas) in enumerate(colunas.items()):
            coluna = indice * 2 + 1
            aba.cell(row=1, column=coluna, value=cabecalho)
            for numero, (descricao, valor) in enumerate(linhas, start=2):
                aba.cell(row=numero, column=coluna, value=descricao)
                aba.cell(row=numero, column=coluna + 1, value=valor)
    caminho = pasta / nome
    livro.save(caminho)
    return caminho
