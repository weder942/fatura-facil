import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Cofrinho, MesDoCofrinho } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { nomeDaCompetencia } from '../../shared/utils/competencia';
import { negarValor, somarValores } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';

/** "Visão geral": todos os meses somados. */
export const GERAL = 'geral';

interface Linha {
  rotulo: string;
  valor: string;
}

/**
 * Quanto o cofrinho rendeu por mês: bruto, IR, IOF e líquido. IR e IOF são a
 * provisão (o que seria retido resgatando tudo) mais o retido nos resgates,
 * então o IOF de um aporte recente volta como restituição depois de 30 dias.
 */
@Component({
  selector: 'app-rendimentos-cofrinho',
  imports: [DecimalPipe, CurrencyPipe, DatePipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './rendimentos-cofrinho.component.html',
  styleUrl: './rendimentos-cofrinho.component.scss',
})
export class RendimentosCofrinhoComponent {
  private readonly service = inject(CofrinhoService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  protected readonly geral = GERAL;
  protected readonly cofrinho = signal<Cofrinho | null>(null);
  protected readonly meses = signal<MesDoCofrinho[]>([]);
  /** O mês ("AAAA-MM") ou a visão geral. */
  protected readonly selecionado = signal<string>(GERAL);

  protected readonly resumo = computed<MesDoCofrinho | null>(() => {
    const meses = this.meses();
    if (this.selecionado() !== GERAL) {
      return meses.find((mes) => mes.mes === this.selecionado()) ?? null;
    }
    return {
      mes: GERAL,
      bruto: somarValores(meses.map((mes) => mes.bruto)),
      ajustes: somarValores(meses.map((mes) => mes.ajustes)),
      ir: somarValores(meses.map((mes) => mes.ir)),
      iof: somarValores(meses.map((mes) => mes.iof)),
      liquido: somarValores(meses.map((mes) => mes.liquido)),
    };
  });

  protected readonly linhas = computed<Linha[]>(() => {
    const resumo = this.resumo();
    if (!resumo) {
      return [];
    }
    const linhas: Linha[] = [{ rotulo: 'Rendimento bruto', valor: resumo.bruto }];
    if (!/^-?0+\.00$/.test(resumo.ajustes)) {
      linhas.push({ rotulo: 'Ajuste de saldo', valor: resumo.ajustes });
    }
    linhas.push(this.imposto('IR', resumo.ir), this.imposto('IOF', resumo.iof));
    return linhas;
  });

  constructor() {
    this.service.obter(this.id).subscribe({
      next: (cofrinho) => this.cofrinho.set(cofrinho),
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
    this.service.rendimentos(this.id).subscribe((meses) => {
      this.meses.set(meses);
      this.selecionado.set(meses.at(-1)?.mes ?? GERAL);
    });
  }

  /** O último mês é o atual. */
  protected rotuloDoMes(mes: string): string {
    if (mes === this.meses().at(-1)?.mes) {
      return 'Este mês';
    }
    const nome = nomeDaCompetencia(mes);
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  protected titulo(): string {
    const selecionado = this.selecionado();
    return selecionado === GERAL
      ? 'Rendeu desde o início'
      : `Rendeu em ${nomeDaCompetencia(selecionado).split(' ')[0]}`;
  }

  /** Imposto negativo é restituição (provisão que diminuiu). */
  private imposto(nome: string, valor: string): Linha {
    return valor.startsWith('-')
      ? { rotulo: `Restituição de ${nome}`, valor: negarValor(valor) }
      : { rotulo: `Desconto ${nome}`, valor: negarValor(valor) };
  }
}
