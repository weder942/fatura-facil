import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MovimentoDoCofrinho,
  TIPOS_DE_MOVIMENTO,
  TipoDeMovimento,
} from '../../core/models/cofrinho.model';
import { rotuloDoDia } from '../../shared/utils/data';

const ICONES: Record<TipoDeMovimento, string> = {
  guardado: 'savings',
  resgatado: 'north_east',
  rendimento: 'trending_up',
  ajuste: 'tune',
};

interface DiaDoExtrato {
  data: string;
  rotulo: string;
  movimentos: MovimentoDoCofrinho[];
}

/** Movimentos agrupados por dia, como o extrato do banco. */
@Component({
  selector: 'app-movimentos',
  imports: [CurrencyPipe, MatButtonModule, MatIconModule],
  templateUrl: './movimentos.component.html',
  styleUrl: './movimentos.component.scss',
})
export class MovimentosComponent {
  /** Do mais recente ao mais antigo, como a API entrega. */
  readonly movimentos = input.required<MovimentoDoCofrinho[]>();
  /** Mostra o botão de excluir nos movimentos informados (não nos rendimentos nem no saldo inicial). */
  readonly excluivel = input(false);
  readonly excluir = output<MovimentoDoCofrinho>();

  protected readonly icones = ICONES;

  protected readonly dias = computed(() => {
    const dias: DiaDoExtrato[] = [];
    for (const movimento of this.movimentos()) {
      const ultimo = dias.at(-1);
      if (ultimo?.data === movimento.data) {
        ultimo.movimentos.push(movimento);
      } else {
        dias.push({
          data: movimento.data,
          rotulo: rotuloDoDia(movimento.data),
          movimentos: [movimento],
        });
      }
    }
    return dias;
  });

  protected titulo(movimento: MovimentoDoCofrinho): string {
    return movimento.inicial ? 'Saldo inicial' : TIPOS_DE_MOVIMENTO[movimento.tipo];
  }

  /** O que o extrato mostra: resgate como saída, o resto pelo líquido. */
  protected valor(movimento: MovimentoDoCofrinho): string {
    return movimento.tipo === 'resgatado' ? `-${movimento.liquido}` : movimento.liquido;
  }

  protected podeExcluir(movimento: MovimentoDoCofrinho): boolean {
    return this.excluivel() && movimento.tipo !== 'rendimento' && !movimento.inicial;
  }
}
