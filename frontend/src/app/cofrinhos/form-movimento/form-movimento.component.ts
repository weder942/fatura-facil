import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Cofrinho, TipoInformado } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { dataNaApi } from '../../shared/utils/data';
import { paraValorDaApi } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { valorPositivo } from '../../shared/utils/validadores';

export interface DadosDoFormMovimento {
  cofrinho: Cofrinho;
  tipo: TipoInformado;
}

const TEXTOS: Record<TipoInformado, { titulo: string; valor: string; dica: string }> = {
  guardado: {
    titulo: 'Guardar',
    valor: 'Valor guardado (R$)',
    dica: 'Começa a render no dia útil seguinte.',
  },
  resgatado: {
    titulo: 'Resgatar',
    valor: 'Valor que caiu na conta (R$)',
    dica: 'O IR e o IOF retidos são calculados e somados ao que sai do cofrinho.',
  },
  ajuste: {
    titulo: 'Ajustar saldo',
    valor: 'Saldo que o banco mostra (R$)',
    dica: 'A diferença para o saldo calculado entra no extrato como ajuste.',
  },
};

/** Guardar, resgatar ou ajustar o saldo numa data. Fecha com `true` se gravou. */
@Component({
  selector: 'app-form-movimento',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './form-movimento.component.html',
  styleUrl: './form-movimento.component.scss',
})
export class FormMovimentoComponent {
  private readonly service = inject(CofrinhoService);
  private readonly dialogRef = inject<MatDialogRef<FormMovimentoComponent, boolean>>(MatDialogRef);
  protected readonly dados = inject<DadosDoFormMovimento>(MAT_DIALOG_DATA);

  protected readonly textos = TEXTOS[this.dados.tipo];
  protected readonly hoje = dataNaApi();
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    data: [this.hoje, Validators.required],
    valor: ['', [Validators.required, valorPositivo]],
  });

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erro.set(null);
    this.service
      .movimentar(this.dados.cofrinho.id, {
        tipo: this.dados.tipo,
        data: this.form.controls.data.value,
        informado: paraValorDaApi(this.form.controls.valor.value)!,
      })
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (erro) => {
          this.salvando.set(false);
          this.erro.set(mensagemDeErro(erro));
        },
      });
  }
}
