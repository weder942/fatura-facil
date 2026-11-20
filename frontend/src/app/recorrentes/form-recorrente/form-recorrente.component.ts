import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

import { GRUPOS, Grupo, Recorrente, Vigencia } from '../../core/models/recorrente.model';
import { RecorrenteService } from '../../core/services/recorrente.service';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { competenciaAtual } from '../../shared/utils/competencia';
import { paraValorComSinal } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { competenciaValida, valorComSinal } from '../../shared/utils/validadores';

export interface DadosDoFormRecorrente {
  recorrente: Recorrente | null;
  /** Grupo já escolhido ao criar. */
  grupo: Grupo;
}

/**
 * Cria ou edita um recorrente. Na edição, reajustes, remoção de valores e o
 * fim são gravados na hora; o diálogo fecha com `true` se algo mudou.
 */
@Component({
  selector: 'app-form-recorrente',
  imports: [
    CurrencyPipe,
    CompetenciaPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-recorrente.component.html',
  styleUrl: './form-recorrente.component.scss',
})
export class FormRecorrenteComponent {
  private readonly service = inject(RecorrenteService);
  private readonly dialogRef = inject<MatDialogRef<FormRecorrenteComponent, boolean>>(MatDialogRef);
  private readonly dados = inject<DadosDoFormRecorrente>(MAT_DIALOG_DATA);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly grupos = GRUPOS;
  protected readonly recorrente = signal<Recorrente | null>(this.dados.recorrente);
  protected readonly alterado = signal(false);
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly form = this.fb.group({
    nome: [this.dados.recorrente?.nome ?? '', [Validators.required, Validators.maxLength(80)]],
    grupo: [this.dados.recorrente?.grupo ?? this.dados.grupo],
    variavel: [this.dados.recorrente?.variavel ?? false],
    ordem: [this.dados.recorrente?.ordem ?? 0, [Validators.min(0)]],
    valor: ['', this.dados.recorrente ? [] : [Validators.required, valorComSinal]],
    a_partir_de: [competenciaAtual(), this.dados.recorrente ? [] : [competenciaValida]],
  });

  protected readonly reajuste = this.fb.group({
    valor: ['', [Validators.required, valorComSinal]],
    a_partir_de: [competenciaAtual(), [competenciaValida]],
  });

  protected readonly fim = this.fb.control(competenciaAtual(), [competenciaValida]);

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    const { nome, grupo, variavel, ordem, valor, a_partir_de } = this.form.getRawValue();
    const atual = this.recorrente();
    const requisicao = atual
      ? this.service.atualizar(atual.id, { nome, grupo, variavel, ordem })
      : this.service.criar({
          nome,
          grupo,
          variavel,
          ordem,
          valor: paraValorComSinal(valor)!,
          a_partir_de,
        });
    this.executar(requisicao, () => this.dialogRef.close(true));
  }

  protected reajustar(): void {
    const atual = this.recorrente();
    if (!atual || this.reajuste.invalid) {
      this.reajuste.markAllAsTouched();
      return;
    }
    const { valor, a_partir_de } = this.reajuste.getRawValue();
    this.executar(
      this.service.reajustar(atual.id, paraValorComSinal(valor)!, a_partir_de),
      (recorrente) => {
        this.atualizado(recorrente);
        this.reajuste.reset({ valor: '', a_partir_de: competenciaAtual() });
      },
    );
  }

  protected removerVigencia(vigencia: Vigencia): void {
    const atual = this.recorrente();
    if (atual) {
      this.executar(this.service.removerVigencia(atual.id, vigencia.id), (recorrente) =>
        this.atualizado(recorrente),
      );
    }
  }

  protected encerrar(): void {
    const atual = this.recorrente();
    if (atual && this.fim.valid) {
      this.executar(this.service.encerrar(atual.id, this.fim.value), (recorrente) =>
        this.atualizado(recorrente),
      );
    }
  }

  private atualizado(recorrente: Recorrente): void {
    this.recorrente.set(recorrente);
    this.alterado.set(true);
  }

  private executar<T>(requisicao: Observable<T>, depois: (resposta: T) => void): void {
    this.salvando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: (resposta) => {
        this.salvando.set(false);
        depois(resposta);
      },
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }
}
