"""Encadeia as parcelas de uma coluna de fonte ao longo dos meses e separa à vista e créditos.

"Ipad 10/08" em novembro e "Ipad 10/09" em dezembro são a mesma compra. Casa com a
cadeia aberta de mesmo total, parcela anterior no mês anterior e:
- mesmo nome e valor parecido (até R$ 1,00 ou 2% de diferença), ou
- nome diferente ("Livelo"/"Live"), valor até R$ 0,05 e um só candidato.
"""

from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

from fatura_facil.services.competencia_service import somar_meses
from fatura_facil.services.planilha.leitura import ItemDaPlanilha
from fatura_facil.services.planilha.texto import chave, separar_parcela

__all__ = ["CadeiaDeParcelas", "LancamentoSolto", "ParcelaDaPlanilha", "encadear"]

_TOLERANCIA_MESMO_NOME = Decimal("1.00")
_TOLERANCIA_RELATIVA = Decimal("0.02")
_TOLERANCIA_OUTRO_NOME = Decimal("0.05")


@dataclass(frozen=True)
class ParcelaDaPlanilha:
    numero: int
    competencia: date
    valor: Decimal
    projetada: bool = False  # depois do último mês da planilha


@dataclass
class CadeiaDeParcelas:
    nome: str
    descricao_original: str
    total: int
    parcelas: list[ParcelaDaPlanilha] = field(default_factory=list)

    @property
    def ultima(self) -> ParcelaDaPlanilha:
        return self.parcelas[-1]

    @property
    def competencia_inicial(self) -> date:
        """Competência da 1ª parcela, mesmo que ela seja anterior à planilha."""
        primeira = self.parcelas[0]
        return somar_meses(primeira.competencia, -(primeira.numero - 1))


@dataclass(frozen=True)
class LancamentoSolto:
    """À vista (valor positivo) ou crédito (estorno, desconto, ajuste: valor negativo)."""

    competencia: date
    descricao: str
    valor: Decimal


def encadear(
    meses: list[tuple[date, list[ItemDaPlanilha]]], *, ultima_competencia: date
) -> tuple[list[CadeiaDeParcelas], list[LancamentoSolto]]:
    cadeias: list[CadeiaDeParcelas] = []
    soltos: list[LancamentoSolto] = []
    for competencia, itens in meses:
        for item in itens:
            parcela = separar_parcela(item.descricao) if item.valor > 0 else None
            if parcela is None:
                soltos.append(LancamentoSolto(competencia, item.descricao or "(sem descrição)", item.valor))
                continue
            nome, numero, total = parcela
            nova = ParcelaDaPlanilha(numero, competencia, item.valor)
            cadeia = _continuacao(cadeias, nome, numero, total, competencia, item.valor)
            if cadeia is None:
                cadeias.append(CadeiaDeParcelas(nome, item.descricao, total, [nova]))
            else:
                cadeia.parcelas.append(nova)

    for cadeia in cadeias:
        _projetar(cadeia, ultima_competencia)
    return cadeias, soltos


def _continuacao(cadeias, nome, numero, total, competencia, valor) -> CadeiaDeParcelas | None:
    anterior = somar_meses(competencia, -1)
    abertas = [
        cadeia
        for cadeia in cadeias
        if cadeia.total == total and cadeia.ultima.numero == numero - 1 and cadeia.ultima.competencia == anterior
    ]
    for cadeia in abertas:
        diferenca = abs(cadeia.ultima.valor - valor)
        if chave(cadeia.nome) == chave(nome) and (
            diferenca <= _TOLERANCIA_MESMO_NOME or diferenca <= cadeia.ultima.valor * _TOLERANCIA_RELATIVA
        ):
            return cadeia
    parecidas = [c for c in abertas if abs(c.ultima.valor - valor) <= _TOLERANCIA_OUTRO_NOME]
    return parecidas[0] if len(parecidas) == 1 else None


def _projetar(cadeia: CadeiaDeParcelas, ultima_competencia: date) -> None:
    """Parcelas que faltam depois do último mês da planilha, com o valor da última conhecida."""
    ultima = cadeia.ultima
    if ultima.competencia != ultima_competencia:
        return
    for numero in range(ultima.numero + 1, cadeia.total + 1):
        competencia = somar_meses(ultima.competencia, numero - ultima.numero)
        cadeia.parcelas.append(ParcelaDaPlanilha(numero, competencia, ultima.valor, projetada=True))
