import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Fonte, FonteEntrada, TIPOS_DE_FONTE, TipoFonte } from '../../core/models/fonte.model';
import { FonteService } from '../../core/services/fonte.service';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';

const DIA = [Validators.min(1), Validators.max(31)];

/** Cria ou edita uma fonte. Fecha com a fonte salva. */
@Component({
  selector: 'app-form-fonte',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-fonte.component.html',
  styleUrl: './form-fonte.component.scss',
})
export class FormFonteComponent {
  private readonly fontes = inject(FonteService);
  private readonly dialogRef = inject<MatDialogRef<FormFonteComponent, Fonte>>(MatDialogRef);
  protected readonly fonte = inject<Fonte | null>(MAT_DIALOG_DATA);

  protected readonly tipos = TIPOS_DE_FONTE;
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nome: [this.fonte?.nome ?? '', [Validators.required, Validators.maxLength(60)]],
    tipo: [this.fonte?.tipo ?? ('cartao' as TipoFonte), Validators.required],
    dia_fechamento: [this.fonte?.dia_fechamento as number | null, DIA],
    dia_vencimento: [this.fonte?.dia_vencimento as number | null, DIA],
    ordem: [this.fonte?.ordem ?? 0, [Validators.min(0)]],
    ativa: [this.fonte?.ativa ?? true],
  });

  protected readonly eCartao = toSignal(this.form.controls.tipo.valueChanges, {
    initialValue: this.form.controls.tipo.value,
  });

  constructor() {
    this.ajustarDiasObrigatorios(this.form.controls.tipo.value);
    this.form.controls.tipo.valueChanges.subscribe((tipo) => this.ajustarDiasObrigatorios(tipo));
  }

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erro.set(null);

    const dados: FonteEntrada = this.form.getRawValue();
    const requisicao = this.fonte
      ? this.fontes.atualizar(this.fonte.id, dados)
      : this.fontes.criar(dados);
    requisicao.subscribe({
      next: (fonte) => this.dialogRef.close(fonte),
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }

  private ajustarDiasObrigatorios(tipo: TipoFonte): void {
    for (const controle of [this.form.controls.dia_fechamento, this.form.controls.dia_vencimento]) {
      controle.setValidators(tipo === 'cartao' ? [Validators.required, ...DIA] : DIA);
      if (tipo !== 'cartao') {
        controle.setValue(null);
      }
      controle.updateValueAndValidity({ emitEvent: false });
    }
  }
}
