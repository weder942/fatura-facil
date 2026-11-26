import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of, switchMap } from 'rxjs';

import { Banco, Cofrinho } from '../../core/models/cofrinho.model';
import { BancoService } from '../../core/services/banco.service';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { dataNaApi } from '../../shared/utils/data';
import { paraTaxaDaApi, paraValorDaApi } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { taxaValida, valorPositivo } from '../../shared/utils/validadores';

/**
 * Cria um cofrinho (com o saldo atual e a data de criação) ou edita nome,
 * banco e % do CDI. Mudar o percentual vale a partir da data informada.
 * Fecha com o cofrinho salvo.
 */
@Component({
  selector: 'app-form-cofrinho',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-cofrinho.component.html',
  styleUrl: './form-cofrinho.component.scss',
})
export class FormCofrinhoComponent {
  private readonly service = inject(CofrinhoService);
  private readonly dialogRef = inject<MatDialogRef<FormCofrinhoComponent, Cofrinho>>(MatDialogRef);
  protected readonly cofrinho = inject<Cofrinho | null>(MAT_DIALOG_DATA);

  protected readonly hoje = dataNaApi();
  protected readonly bancos = signal<Banco[]>([]);
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nome: [this.cofrinho?.nome ?? '', [Validators.required, Validators.maxLength(80)]],
    banco: [this.cofrinho?.banco ?? (null as number | null), Validators.required],
    inicio: [this.hoje, Validators.required],
    saldo: ['', this.cofrinho ? [] : [Validators.required, valorPositivo]],
    percentual: [
      this.cofrinho?.percentual.replace('.', ',') ?? '',
      [Validators.required, taxaValida],
    ],
    a_partir_de: [this.hoje, Validators.required],
  });

  private readonly percentualDigitado = toSignal(this.form.controls.percentual.valueChanges, {
    initialValue: this.form.controls.percentual.value,
  });
  /** Na edição: o percentual mudou? Então pede a partir de quando. */
  protected readonly mudouPercentual = computed(
    () =>
      this.cofrinho !== null &&
      paraTaxaDaApi(this.percentualDigitado()) !== null &&
      Number(paraTaxaDaApi(this.percentualDigitado())) !== Number(this.cofrinho.percentual),
  );

  constructor() {
    inject(BancoService)
      .listar()
      .subscribe((bancos) =>
        this.bancos.set(bancos.filter((banco) => banco.ativo || banco.id === this.cofrinho?.banco)),
      );
  }

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const percentual = paraTaxaDaApi(valores.percentual)!;
    const requisicao: Observable<Cofrinho> = this.cofrinho
      ? this.editar(
          this.cofrinho,
          valores.nome.trim(),
          valores.banco!,
          percentual,
          valores.a_partir_de,
        )
      : this.service.criar({
          nome: valores.nome.trim(),
          banco: valores.banco!,
          inicio: valores.inicio,
          saldo: paraValorDaApi(valores.saldo)!,
          percentual,
        });

    this.salvando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: (cofrinho) => this.dialogRef.close(cofrinho),
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }

  private editar(
    cofrinho: Cofrinho,
    nome: string,
    banco: number,
    percentual: string,
    aPartirDe: string,
  ): Observable<Cofrinho> {
    return this.service
      .atualizar(cofrinho.id, { nome, banco })
      .pipe(
        switchMap((atualizado) =>
          this.mudouPercentual()
            ? this.service.definirPercentual(cofrinho.id, percentual, aPartirDe)
            : of(atualizado),
        ),
      );
  }
}
