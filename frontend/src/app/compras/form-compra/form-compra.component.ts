import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { catchError, filter, map, merge, of, switchMap } from 'rxjs';

import { Compra, CompraEntrada, Parcela } from '../../core/models/compra.model';
import { Fonte } from '../../core/models/fonte.model';
import { CompraService } from '../../core/services/compra.service';
import { FonteService } from '../../core/services/fonte.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import {
  deCentavos,
  dividirEmParcelas,
  emCentavos,
  paraCampo,
  paraValorDaApi,
} from '../../shared/utils/dinheiro';

export interface DadosDoFormCompra {
  compraId: number | null;
  /** Nova compra já com a fonte escolhida (o "+" do bloco da fonte). */
  fonteId?: number | null;
}

const DATA = /^\d{4}-\d{2}-\d{2}$/;

function valorEmReais(controle: AbstractControl<string>): ValidationErrors | null {
  const valor = paraValorDaApi(controle.value ?? '');
  return valor === null || emCentavos(valor) === 0 ? { valor: true } : null;
}

/** A 1ª parcela precisa deixar pelo menos 1 centavo para cada uma das demais. */
const primeiraParcelaValida: ValidatorFn = (grupo) => {
  const { parcelada, valor_total, n_parcelas, valor_primeira } = grupo.getRawValue();
  const total = paraValorDaApi(valor_total ?? '');
  const primeira = paraValorDaApi(valor_primeira ?? '');
  if (!parcelada || total === null || !n_parcelas || n_parcelas < 2) {
    return null;
  }
  if (primeira === null || emCentavos(primeira) === 0) {
    return { primeiraParcela: 'Valor inválido.' };
  }
  return emCentavos(total) - emCentavos(primeira) < n_parcelas - 1
    ? { primeiraParcela: 'Precisa ser menor que o total e sobrar para as demais.' }
    : null;
};

/** Cria ou edita uma compra (e ajusta parcelas). Fecha com `true` se algo mudou. */
@Component({
  selector: 'app-form-compra',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    CompetenciaPipe,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './form-compra.component.html',
  styleUrl: './form-compra.component.scss',
})
export class FormCompraComponent {
  private readonly compras = inject(CompraService);
  private readonly fonteService = inject(FonteService);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject<MatDialogRef<FormCompraComponent, boolean>>(MatDialogRef);
  private readonly dados = inject<DadosDoFormCompra>(MAT_DIALOG_DATA);
  protected readonly compraId = this.dados.compraId;

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

  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      fonte: [null as number | null, Validators.required],
      data: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      parcelada: [false],
      valor_total: ['', [Validators.required, valorEmReais]],
      n_parcelas: [1, [Validators.required, Validators.min(1), Validators.max(120)]],
      valor_primeira: [''],
      competencia: ['', Validators.required],
    },
    { validators: primeiraParcelaValida },
  );

  protected readonly parcelada = toSignal(this.form.controls.parcelada.valueChanges, {
    initialValue: false,
  });
  // getRawValue inclui a 1ª parcela mesmo desabilitada (quando já confirmada).
  private readonly valores = toSignal(
    this.form.valueChanges.pipe(map(() => this.form.getRawValue())),
    {
      initialValue: this.form.getRawValue(),
    },
  );

  /** Prévia das parcelas 2..n com a 1ª informada, ex.: "2 × R$ 138,67". */
  protected readonly demaisParcelas = computed(() => {
    const { valor_total, n_parcelas, valor_primeira } = this.valores();
    const total = paraValorDaApi(valor_total ?? '');
    const primeira = paraValorDaApi(valor_primeira ?? '');
    if (!this.parcelada() || total === null || primeira === null || !n_parcelas || n_parcelas < 2) {
      return null;
    }
    const resto = emCentavos(total) - emCentavos(primeira);
    const demais = resto > 0 ? dividirEmParcelas(deCentavos(resto), n_parcelas - 1) : null;
    if (!demais) {
      return null;
    }
    return demais[0] === demais[demais.length - 1]
      ? { quantidade: demais.length, valor: demais[0], segunda: null }
      : { quantidade: demais.length - 1, valor: demais[1], segunda: demais[0] };
  });

  constructor() {
    this.fonteService.listar().subscribe((fontes) => this.fontes.set(fontes));
    if (this.compraId !== null) {
      this.carregarCompra(this.compraId);
    }

    const { fonte, data, parcelada, valor_total, n_parcelas, valor_primeira, competencia } =
      this.form.controls;

    // Competência sugerida pela fonte e pela data. Preenche o campo enquanto o
    // usuário não escolher outra à mão.
    merge(fonte.valueChanges, data.valueChanges)
      .pipe(
        filter(() => fonte.value !== null && DATA.test(data.value)),
        switchMap(() =>
          this.fonteService
            .competenciaSugerida(fonte.value!, data.value)
            .pipe(catchError(() => of(null))),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((sugerida) => {
        this.sugerida.set(sugerida);
        if (sugerida && !competencia.dirty) {
          competencia.setValue(sugerida);
        }
      });

    if (this.compraId === null && this.dados.fonteId) {
      fonte.setValue(this.dados.fonteId);
    }

    parcelada.valueChanges.pipe(takeUntilDestroyed()).subscribe((sim) => {
      n_parcelas.setValidators([
        Validators.required,
        Validators.min(sim ? 2 : 1),
        Validators.max(120),
      ]);
      n_parcelas.setValue(sim ? Math.max(2, n_parcelas.value) : 1);
    });

    // A 1ª parcela acompanha o total e o nº de parcelas até o usuário editá-la.
    merge(valor_total.valueChanges, n_parcelas.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (valor_primeira.dirty || valor_primeira.disabled) {
          return;
        }
        const total = paraValorDaApi(valor_total.value);
        const parcelas = total ? dividirEmParcelas(total, n_parcelas.value) : null;
        valor_primeira.setValue(parcelas ? paraCampo(parcelas[0]) : '');
      });
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
      n_parcelas: valores.parcelada ? valores.n_parcelas : 1,
      competencia_inicial: valores.competencia,
    };
    if (valores.parcelada && this.form.controls.valor_primeira.dirty) {
      entrada.valor_primeira_parcela = paraValorDaApi(valores.valor_primeira)!;
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
        const primeira = compra.parcelas.find((parcela) => parcela.parcela === 1);
        const controles = this.form.controls;
        // emitEvent: false — carregar não conta como mudança do usuário (não
        // recalcula competência nem 1ª parcela).
        controles.parcelada.setValue(compra.n_parcelas > 1);
        controles.n_parcelas.setValidators([
          Validators.required,
          Validators.min(compra.n_parcelas > 1 ? 2 : 1),
        ]);
        this.form.patchValue(
          {
            fonte: compra.fonte,
            data: compra.data,
            descricao: compra.descricao,
            valor_total: paraCampo(compra.valor_total),
            n_parcelas: compra.n_parcelas,
            valor_primeira: primeira ? paraCampo(primeira.valor) : '',
            competencia: compra.competencia_inicial,
          },
          { emitEvent: false },
        );
        if (primeira?.status === 'confirmado') {
          controles.valor_primeira.disable({ emitEvent: false });
        }
        this.form.updateValueAndValidity();
        this.form.markAsPristine();
      },
      error: (erro) => this.erro.set(mensagemDeErro(erro)),
    });
  }
}
