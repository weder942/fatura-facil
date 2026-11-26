"""Simulação de um cofrinho dia a dia: rendimentos, IR/IOF e o resumo por mês.

Funções puras (sem banco de dados): recebem os movimentos informados e as taxas
e refazem o extrato inteiro desde o início do cofrinho. Refazer tudo é barato
(alguns anos são poucas centenas de dias úteis) e mantém o extrato coerente
quando algo com data passada muda: um movimento, a Selic ou o percentual.

Convenções:

- **Rendimento:** em cada dia útil D entra o saldo do fim do dia útil anterior
  (P) vezes a taxa diária do CDI vigente em P, no percentual vigente em P.
  Fins de semana e feriados não rendem.
- **Movimento em dia não útil** só é aplicado no dia útil seguinte (como o banco
  faz com o dinheiro): não rende o fim de semana.
- **Aportes:** cada valor guardado é um aporte com a própria data, controlado
  em cotas: todos rendem igual, mas cada um tem o seu prazo para IR e IOF. O
  resgate consome os aportes mais antigos primeiro.
- **Resgate:** o valor informado é o que caiu na conta (líquido); o valor que
  sai do cofrinho é esse mais o IR e o IOF retidos.
- **Rendimento líquido do dia:** o bruto menos o IR do prazo de cada aporte
  (sem o IOF, que vai sumindo com os dias e aparece no resumo do mês).
- **Ajuste de saldo:** o valor informado é o saldo líquido que o banco mostra;
  a diferença entra no saldo.
- **Resumo do mês:** IR e IOF são a variação da provisão (o que seria retido se
  tudo fosse resgatado) mais o que foi retido nos resgates. Por isso o IOF pode
  aparecer como restituição, quando um aporte passa dos 30 dias.
"""

from bisect import bisect_right
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, timedelta
from decimal import ROUND_HALF_UP, Decimal

from fatura_facil.services.dias_uteis_service import e_dia_util
from fatura_facil.services.tributacao_service import aliquota_iof, aliquota_ir, taxa_diaria

__all__ = [
    "CalculoDoCofrinhoError",
    "Efeito",
    "Entrada",
    "Mes",
    "RendimentoDoDia",
    "Resultado",
    "SaldoInsuficienteError",
    "SemTaxaError",
    "simular",
]

GUARDADO, RESGATADO, AJUSTE = "guardado", "resgatado", "ajuste"
_ZERO = Decimal(0)
_CENTAVO = Decimal("0.01")


def _centavos(valor: Decimal) -> Decimal:
    return valor.quantize(_CENTAVO, rounding=ROUND_HALF_UP)


class CalculoDoCofrinhoError(Exception):
    pass


class SaldoInsuficienteError(CalculoDoCofrinhoError):
    def __init__(self, data: date, disponivel: Decimal):
        self.data = data
        self.disponivel = disponivel
        super().__init__(f"Em {data:%d/%m/%Y} o cofrinho tinha só R$ {disponivel} líquidos para resgatar.")


class SemTaxaError(CalculoDoCofrinhoError):
    def __init__(self, data: date, qual: str):
        self.data = data
        super().__init__(f"Não há {qual} vigente em {data:%d/%m/%Y}.")


@dataclass(frozen=True)
class Entrada:
    """Movimento informado. `id` liga o efeito calculado de volta ao registro."""

    id: int
    data: date
    tipo: str
    informado: Decimal


@dataclass
class Efeito:
    valor: Decimal
    liquido: Decimal
    ir: Decimal = _ZERO
    iof: Decimal = _ZERO


@dataclass(frozen=True)
class RendimentoDoDia:
    data: date
    valor: Decimal
    liquido: Decimal


@dataclass
class Mes:
    inicio: date
    bruto: Decimal = _ZERO
    ajustes: Decimal = _ZERO
    ir: Decimal = _ZERO
    iof: Decimal = _ZERO

    @property
    def liquido(self) -> Decimal:
        return self.bruto + self.ajustes - self.ir - self.iof


@dataclass
class Resultado:
    rendimentos: list[RendimentoDoDia]
    efeitos: dict[int, Efeito]
    meses: list[Mes]
    saldo_bruto: Decimal
    ir_estimado: Decimal
    iof_estimado: Decimal

    @property
    def saldo_liquido(self) -> Decimal:
        return self.saldo_bruto - self.ir_estimado - self.iof_estimado

    @property
    def ja_rendeu(self) -> Decimal:
        return sum((mes.liquido for mes in self.meses), _ZERO)


@dataclass
class _Aporte:
    data: date
    cotas: Decimal
    cota_na_compra: Decimal


class _Vigencias:
    """Valor vigente numa data, a partir de pares (vigente desde, valor)."""

    def __init__(self, pares: list[tuple[date, Decimal]], qual: str):
        ordenados = sorted(pares)
        self._datas = [data for data, _ in ordenados]
        self._valores = [valor for _, valor in ordenados]
        self._qual = qual

    def em(self, dia: date) -> Decimal:
        posicao = bisect_right(self._datas, dia)
        if posicao == 0:
            raise SemTaxaError(dia, self._qual)
        return self._valores[posicao - 1]


@dataclass
class _Simulacao:
    cdi: _Vigencias
    percentual: _Vigencias
    saldo: Decimal = _ZERO
    aportes: list[_Aporte] = field(default_factory=list)
    rendimentos: list[RendimentoDoDia] = field(default_factory=list)
    efeitos: dict[int, Efeito] = field(default_factory=dict)
    meses: dict[date, Mes] = field(default_factory=dict)
    provisao_anterior: tuple[Decimal, Decimal] = (_ZERO, _ZERO)

    # --- estado ---

    def _cotas(self) -> Decimal:
        return sum((aporte.cotas for aporte in self.aportes), _ZERO)

    def _cota(self) -> Decimal:
        cotas = self._cotas()
        return self.saldo / cotas if cotas else Decimal(1)

    def _mes(self, dia: date) -> Mes:
        inicio = dia.replace(day=1)
        if inicio not in self.meses:
            self.meses[inicio] = Mes(inicio)
        return self.meses[inicio]

    def _zerar(self) -> None:
        self.saldo = _ZERO
        self.aportes = []

    def _aliquotas(self, aporte: _Aporte, dia: date) -> tuple[Decimal, Decimal]:
        dias = (dia - aporte.data).days
        return aliquota_iof(dias), aliquota_ir(dias)

    def provisao(self, dia: date) -> tuple[Decimal, Decimal]:
        """(IR, IOF) se tudo fosse resgatado no dia."""
        ir, iof = self._provisao_exata(dia, self.saldo)
        return _centavos(ir), _centavos(iof)

    def _provisao_exata(self, dia: date, saldo: Decimal) -> tuple[Decimal, Decimal]:
        cotas = self._cotas()
        cota = saldo / cotas if cotas else Decimal(1)
        ir = iof = _ZERO
        for aporte in self.aportes:
            ganho = aporte.cotas * max(_ZERO, cota - aporte.cota_na_compra)
            a_iof, a_ir = self._aliquotas(aporte, dia)
            iof_do_aporte = ganho * a_iof
            iof += iof_do_aporte
            ir += (ganho - iof_do_aporte) * a_ir
        return ir, iof

    def _saldo_bruto_para(self, liquido: Decimal, dia: date) -> Decimal:
        """O saldo bruto cujo líquido (menos IR e IOF provisionados) é `liquido`.

        O líquido cresce com o bruto, mas em trechos: um aporte só tem imposto
        enquanto tem ganho. Bisseção até menos de meio centavo.
        """

        def liquido_de(saldo: Decimal) -> Decimal:
            ir, iof = self._provisao_exata(dia, saldo)
            return saldo - ir - iof

        baixo, alto = _ZERO, max(self.saldo, liquido)
        while liquido_de(alto) < liquido:
            alto *= 2
        while alto - baixo > Decimal("0.001"):
            meio = (baixo + alto) / 2
            if liquido_de(meio) < liquido:
                baixo = meio
            else:
                alto = meio
        return _centavos(alto)

    # --- eventos ---

    def render(self, dia: date, dia_util_anterior: date) -> None:
        if self.saldo <= 0:
            return
        taxa = taxa_diaria(self.cdi.em(dia_util_anterior), self.percentual.em(dia_util_anterior))
        valor = _centavos(self.saldo * taxa)
        if valor <= 0:
            return
        por_cota = valor / self._cotas()
        liquido = sum(
            (aporte.cotas * por_cota * (1 - self._aliquotas(aporte, dia)[1]) for aporte in self.aportes),
            _ZERO,
        )
        self.saldo += valor
        self.rendimentos.append(RendimentoDoDia(dia, valor, _centavos(liquido)))
        self._mes(dia).bruto += valor

    def aplicar(self, entrada: Entrada, dia: date) -> None:
        if entrada.tipo == GUARDADO:
            self._guardar(entrada, dia)
        elif entrada.tipo == RESGATADO:
            self._resgatar(entrada, dia)
        else:
            self._ajustar(entrada, dia)

    def _guardar(self, entrada: Entrada, dia: date) -> None:
        if entrada.informado > 0:
            cota = self._cota()
            self.aportes.append(_Aporte(dia, entrada.informado / cota, cota))
            self.saldo += entrada.informado
        self.efeitos[entrada.id] = Efeito(entrada.informado, entrada.informado)

    def _resgatar(self, entrada: Entrada, dia: date) -> None:
        cota = self._cota()
        falta = entrada.informado
        restantes, bruto, ir, iof = [], _ZERO, _ZERO, _ZERO
        for aporte in self.aportes:
            if falta <= 0:
                restantes.append(aporte)
                continue
            valor = aporte.cotas * cota
            fracao_de_ganho = max(_ZERO, cota - aporte.cota_na_compra) / cota
            a_iof, a_ir = self._aliquotas(aporte, dia)
            imposto_por_real = fracao_de_ganho * (a_iof + a_ir * (1 - a_iof))
            liquido_do_aporte = valor * (1 - imposto_por_real)
            if liquido_do_aporte <= falta:
                sai = valor
                falta -= liquido_do_aporte
            else:
                sai = falta / (1 - imposto_por_real)
                falta = _ZERO
                restantes.append(_Aporte(aporte.data, aporte.cotas - sai / cota, aporte.cota_na_compra))
            ganho = sai * fracao_de_ganho
            iof_do_aporte = ganho * a_iof
            bruto += sai
            iof += iof_do_aporte
            ir += (ganho - iof_do_aporte) * a_ir
        if falta > _CENTAVO:
            ir_total, iof_total = self.provisao(dia)
            raise SaldoInsuficienteError(dia, self.saldo - ir_total - iof_total)

        ir, iof = _centavos(ir), _centavos(iof)
        if restantes:
            bruto = min(entrada.informado + ir + iof, self.saldo)
            self.saldo -= bruto
            self.aportes = restantes
        else:
            bruto = self.saldo
            self._zerar()
        mes = self._mes(dia)
        mes.ir += ir
        mes.iof += iof
        self.efeitos[entrada.id] = Efeito(-bruto, bruto - ir - iof, ir, iof)

    def _ajustar(self, entrada: Entrada, dia: date) -> None:
        if not self.aportes:
            self._guardar(entrada, dia)
            self._mes(dia).ajustes += entrada.informado
            return
        ir, iof = self.provisao(dia)
        diferenca_liquida = entrada.informado - (self.saldo - ir - iof)
        # O saldo bruto muda mais que o líquido: parte da diferença é imposto provisionado.
        diferenca = self._saldo_bruto_para(entrada.informado, dia) - self.saldo
        if self.saldo + diferenca <= 0:
            diferenca = -self.saldo
            self._zerar()
        else:
            self.saldo += diferenca
        self._mes(dia).ajustes += diferenca
        self.efeitos[entrada.id] = Efeito(diferenca, _centavos(diferenca_liquida))

    def fechar_mes(self, dia: date) -> None:
        ir, iof = self.provisao(dia)
        ir_antes, iof_antes = self.provisao_anterior
        mes = self._mes(dia)
        mes.ir += ir - ir_antes
        mes.iof += iof - iof_antes
        self.provisao_anterior = (ir, iof)


def simular(
    *,
    inicio: date,
    entradas: list[Entrada],
    cdi: list[tuple[date, Decimal]],
    percentuais: list[tuple[date, Decimal]],
    ate: date,
) -> Resultado:
    """Refaz o cofrinho de `inicio` até `ate` (inclusive)."""
    simulacao = _Simulacao(_Vigencias(cdi, "taxa Selic"), _Vigencias(percentuais, "percentual do CDI"))
    por_data: dict[date, list[Entrada]] = defaultdict(list)
    for entrada in sorted(entradas, key=lambda entrada: (entrada.data, entrada.id)):
        por_data[entrada.data].append(entrada)

    pendentes: list[Entrada] = []
    dia_util_anterior: date | None = None
    dia = inicio
    while dia <= ate:
        pendentes.extend(por_data.pop(dia, []))
        if e_dia_util(dia) or dia == ate:
            if e_dia_util(dia) and dia_util_anterior is not None:
                simulacao.render(dia, dia_util_anterior)
            for entrada in pendentes:
                simulacao.aplicar(entrada, dia)
            pendentes = []
            if e_dia_util(dia):
                dia_util_anterior = dia
        amanha = dia + timedelta(days=1)
        if dia == ate or amanha.month != dia.month:
            simulacao.fechar_mes(dia)
        dia = amanha

    ir, iof = simulacao.provisao_anterior
    return Resultado(
        rendimentos=simulacao.rendimentos,
        efeitos=simulacao.efeitos,
        meses=[simulacao.meses.get(inicio_do_mes) or Mes(inicio_do_mes) for inicio_do_mes in _meses(inicio, ate)],
        saldo_bruto=simulacao.saldo,
        ir_estimado=ir,
        iof_estimado=iof,
    )


def _meses(inicio: date, ate: date) -> list[date]:
    meses, mes = [], inicio.replace(day=1)
    while mes <= ate:
        meses.append(mes)
        mes = (mes + timedelta(days=32)).replace(day=1)
    return meses
