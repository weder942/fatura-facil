"""O que um leitor de fatura devolve, qualquer que seja o banco."""

from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

__all__ = ["FaturaLida", "FormatoDeFaturaDesconhecidoError", "LinhaDaFatura", "PaginaDoPdf"]


class FormatoDeFaturaDesconhecidoError(Exception):
    """O arquivo não é de nenhum formato que o sistema sabe ler."""


@dataclass(frozen=True)
class LinhaDaFatura:
    data: date
    descricao: str  # como veio da fatura, sem o "k/n" da parcela
    valor: Decimal  # negativo para créditos e pagamentos
    texto: str  # a linha inteira, para conferência
    parcela: int | None = None
    n_parcelas: int | None = None
    cartao: str = ""  # final do cartão, quando a fatura traz mais de um

    @property
    def parcelada(self) -> bool:
        return self.n_parcelas is not None and self.n_parcelas > 1


@dataclass
class FaturaLida:
    banco: str
    emitida_em: date
    linhas: list[LinhaDaFatura] = field(default_factory=list)
    total: Decimal | None = None  # "Total da Fatura", quando o arquivo traz


@dataclass(frozen=True)
class PaginaDoPdf:
    texto: str
    palavras: list[dict]  # extract_words do pdfplumber: text, x0, x1, top
