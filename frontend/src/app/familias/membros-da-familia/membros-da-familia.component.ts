import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { somarMeses } from '../../shared/utils/competencia';
import { campoDeMembro, FormDeMembros, MAXIMO_DE_MEMBROS } from './membros-da-familia';

/**
 * Quantidade de membros e um campo por membro, na ordem do rodízio ("1º mês",
 * "2º mês"...). Marca quem administra e permite mudar a ordem.
 */
@Component({
  selector: 'app-membros-da-familia',
  imports: [
    CompetenciaPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './membros-da-familia.component.html',
  styleUrl: './membros-da-familia.component.scss',
})
export class MembrosDaFamiliaComponent {
  readonly form = input.required<FormDeMembros>();
  /** Competência do 1º mês, para mostrar o mês de cada um. */
  readonly inicio = input<string | null>(null);

  protected readonly maximo = MAXIMO_DE_MEMBROS;

  protected mesDe(posicao: number): string | null {
    const inicio = this.inicio();
    return inicio && /^\d{4}-\d{2}$/.test(inicio) ? somarMeses(inicio, posicao) : null;
  }

  /** Aumenta ou diminui a lista pelo fim, mantendo os nomes já digitados. */
  protected definirQuantidade(digitado: string): void {
    const { nomes, administrador } = this.form();
    const quantidade = Math.trunc(Number(digitado));
    if (!Number.isFinite(quantidade) || quantidade < 1 || quantidade > MAXIMO_DE_MEMBROS) {
      return;
    }
    while (nomes.length < quantidade) {
      nomes.push(campoDeMembro());
    }
    while (nomes.length > quantidade) {
      nomes.removeAt(nomes.length - 1);
    }
    if ((administrador.value ?? -1) >= quantidade) {
      administrador.setValue(null);
    }
    nomes.markAsDirty();
  }

  /** Troca o membro de posição com o vizinho (-1 sobe, 1 desce). */
  protected mover(posicao: number, direcao: -1 | 1): void {
    const { nomes, administrador } = this.form();
    const destino = posicao + direcao;
    if (destino < 0 || destino >= nomes.length) {
      return;
    }
    const campo = nomes.at(posicao);
    nomes.removeAt(posicao);
    nomes.insert(destino, campo);
    if (administrador.value === posicao) {
      administrador.setValue(destino);
    } else if (administrador.value === destino) {
      administrador.setValue(posicao);
    }
    nomes.markAsDirty();
  }
}
