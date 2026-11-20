import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, combineLatest, filter, of, startWith, switchMap } from 'rxjs';

import { Compra, CompraEntrada, Parcela } from '../../core/models/compra.model';
import { Fonte } from '../../core/models/fonte.model';
import { CompraService } from '../../core/services/compra.service';
import { FonteService } from '../../core/services/fonte.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { paraCampo, paraValorDaApi } from '../../shared/utils/dinheiro';

export interface DadosDoFormCompra {
  compraId: number | null;
}

function valorEmReais(controle: AbstractControl<string>): ValidationErrors | null {
  const valor = paraValorDaApi(controle.value ?? '');
  return valor === null || Number(valor) === 0 ? { valor: true } : null;
}

/** Cria ou edita uma compra (e ajusta parcelas). Fecha com `true` se algo mudou. */
@Component({
  selector: 'app-form-compra',
  imports: [
    ReactiveFormsModule,
    CompetenciaPipe,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-compra.component.html',
  styleUrl: './form-compra.component.scss',
})
export class FormCompraComponent {
  private readonly compras = inject(CompraService);
  private readonly fonteService = inject(FonteService);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject<MatDialogRef<FormCompraComponent, boolean>>(MatDialogRef);
  protected readonly compraId = inject<DadosDoFormCompra>(MAT_DIALOG_DATA).compraId;

  protected readonly fontes = signal<Fonte[]>([]);
  protected readonly compra = signal<Compra | null>(null);
  protected readonly sugerida = signal<string | null>(null);
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);
  /** Houve mudança salva (ex.: ajuste de parcela) mesmo se o usuário cancelar depois. */
  protected readonly alterado = signal(false);

  protected readonly fontesDisponiveis = computed(() =>
    this.fontes().filter((fonte) => fonte.ativa || fonte.id === this.compra()?.fonte),
  );

  protected readonly form = inject(NonNullableFormBuilder).group({
    fonte: [null as number | null, Validators.required],
    data: ['', Validators.required],
    descricao: ['', [Validators.required, Validators.maxLength(200)]],
    valor_total: ['', [Validators.required, valorEmReais]],
    n_parcelas: [1, [Validators.required, Validators.min(1), Validators.max(120)]],
    competencia_inicial: [''],
  });

  constructor() {
    this.fonteService.listar().subscribe((fontes) => this.fontes.set(fontes));
    if (this.compraId !== null) {
      this.carregarCompra(this.compraId);
    }

    const { fonte, data } = this.form.controls;
    combineLatest([
      fonte.valueChanges.pipe(startWith(fonte.value)),
      data.valueChanges.pipe(startWith(data.value)),
    ])
      .pipe(
        filter(
          ([idFonte, dataDaCompra]) => idFonte !== null && /^\d{4}-\d{2}-\d{2}$/.test(dataDaCompra),
        ),
        switchMap(([idFonte, dataDaCompra]) =>
          this.fonteService
            .competenciaSugerida(idFonte!, dataDaCompra)
            .pipe(catchError(() => of(null))),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((competencia) => this.sugerida.set(competencia));
  }

  protected salvar(): void {
    if (this.form.invalid || this.salvando()) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erro.set(null);

    const valores = this.form.getRawValue();
    const entrada: CompraEntrada = {
      fonte: valores.fonte!,
      data: valores.data,
      descricao: valores.descricao.trim(),
      valor_total: paraValorDaApi(valores.valor_total)!,
      n_parcelas: valores.n_parcelas,
    };
    // Sem competência escolhida à mão, o backend usa a sugerida (e a recalcula
    // se a data ou a fonte mudarem na edição).
    if (this.form.controls.competencia_inicial.dirty && valores.competencia_inicial) {
      entrada.competencia_inicial = valores.competencia_inicial;
    }

    const requisicao =
      this.compraId === null
        ? this.compras.criar(entrada)
        : this.compras.atualizar(this.compraId, entrada);
    requisicao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }

  protected excluir(): void {
    const compra = this.compra();
    if (!compra) {
      return;
    }
    this.dialog
      .open(ConfirmacaoDialogComponent, {
        data: {
          titulo: `Excluir "${compra.descricao}"?`,
          mensagem: `As ${compra.n_parcelas} parcela(s) desta compra também serão excluídas.`,
          confirmar: 'Excluir',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.compras.excluir(compra.id)),
      )
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (erro) => this.erro.set(mensagemDeErro(erro)),
      });
  }

  protected ajustarParcela(parcela: Parcela, digitado: string): void {
    const valor = paraValorDaApi(digitado);
    if (valor === null || valor === parcela.valor) {
      return;
    }
    this.compras.ajustarParcela(parcela.id, valor).subscribe({
      next: () => {
        this.alterado.set(true);
        this.carregarCompra(this.compraId!);
      },
      error: (erro) => this.erro.set(mensagemDeErro(erro)),
    });
  }

  protected paraCampo(valor: string): string {
    return paraCampo(valor);
  }

  private carregarCompra(id: number): void {
    this.compras.obter(id).subscribe({
      next: (compra) => {
        this.compra.set(compra);
        this.form.patchValue(
          {
            fonte: compra.fonte,
            data: compra.data,
            descricao: compra.descricao,
            valor_total: paraCampo(compra.valor_total),
            n_parcelas: compra.n_parcelas,
            competencia_inicial: compra.competencia_inicial,
          },
          { emitEvent: true },
        );
        this.form.markAsPristine();
      },
      error: (erro) => this.erro.set(mensagemDeErro(erro)),
    });
  }
}
