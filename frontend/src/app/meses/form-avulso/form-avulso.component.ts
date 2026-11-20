import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { Grupo } from '../../core/models/recorrente.model';
import { AvulsoService } from '../../core/services/avulso.service';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { paraCampo, paraValorComSinal } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { valorComSinal } from '../../shared/utils/validadores';

export interface DadosDoFormAvulso {
  grupo: Grupo;
  competencia: string;
  /** Para editar: o avulso existente. */
  avulso: { id: number; descricao: string; valor: string } | null;
}

/** Rendimento ou fixa só deste mês (férias, reembolso de alguém). Fecha com `true` se mudou. */
@Component({
  selector: 'app-form-avulso',
  imports: [
    CompetenciaPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './form-avulso.component.html',
  styleUrl: './form-avulso.component.scss',
})
export class FormAvulsoComponent {
  private readonly service = inject(AvulsoService);
  private readonly dialogRef = inject<MatDialogRef<FormAvulsoComponent, boolean>>(MatDialogRef);
  protected readonly dados = inject<DadosDoFormAvulso>(MAT_DIALOG_DATA);

  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group({
    descricao: [
      this.dados.avulso?.descricao ?? '',
      [Validators.required, Validators.maxLength(200)],
    ],
    valor: [
      this.dados.avulso ? paraCampo(this.dados.avulso.valor) : '',
      [Validators.required, valorComSinal],
    ],
  });

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    const descricao = this.form.controls.descricao.value.trim();
    const valor = paraValorComSinal(this.form.controls.valor.value)!;
    const { avulso, grupo, competencia } = this.dados;
    this.executar(
      avulso
        ? this.service.atualizar(avulso.id, { descricao, valor })
        : this.service.criar({ grupo, competencia, descricao, valor }),
    );
  }

  protected excluir(): void {
    if (this.dados.avulso) {
      this.executar(this.service.excluir(this.dados.avulso.id));
    }
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
