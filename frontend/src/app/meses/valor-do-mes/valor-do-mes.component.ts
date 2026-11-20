import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { ItemDoMes } from '../../core/models/mes.model';
import { RecorrenteService } from '../../core/services/recorrente.service';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { paraCampo, paraValorComSinal } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { valorComSinal } from '../../shared/utils/validadores';

export interface DadosDoValorDoMes {
  item: ItemDoMes;
  competencia: string;
}

/**
 * Valor de um recorrente num mês: o real de um variável (água, energia) ou um
 * ajuste só neste mês de um fixo. Fecha com `true` se gravou algo.
 */
@Component({
  selector: 'app-valor-do-mes',
  imports: [
    CompetenciaPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './valor-do-mes.component.html',
  styleUrl: './valor-do-mes.component.scss',
})
export class ValorDoMesComponent {
  private readonly service = inject(RecorrenteService);
  private readonly dialogRef = inject<MatDialogRef<ValorDoMesComponent, boolean>>(MatDialogRef);
  protected readonly dados = inject<DadosDoValorDoMes>(MAT_DIALOG_DATA);

  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group({
    valor: [paraCampo(this.dados.item.valor), [Validators.required, valorComSinal]],
  });

  /** Há um valor só deste mês que pode ser desfeito. */
  protected readonly temValorDoMes =
    this.dados.item.ajustado || (this.dados.item.variavel && !this.dados.item.pendente);

  protected salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { item, competencia } = this.dados;
    this.executar(
      this.service.definirNoMes(
        item.id,
        competencia,
        paraValorComSinal(this.form.controls.valor.value)!,
      ),
    );
  }

  protected desfazer(): void {
    const { item, competencia } = this.dados;
    this.executar(this.service.limparNoMes(item.id, competencia));
  }

  private executar(requisicao: Observable<unknown>): void {
    this.salvando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }
}
