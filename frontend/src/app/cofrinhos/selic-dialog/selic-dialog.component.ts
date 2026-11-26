import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { TaxaSelic } from '../../core/models/cofrinho.model';
import { TaxaSelicService } from '../../core/services/taxa-selic.service';
import { dataNaApi } from '../../shared/utils/data';
import { paraTaxaDaApi } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { taxaValida } from '../../shared/utils/validadores';

/**
 * Histórico da Selic. Cada taxa vale a partir de uma data; o CDI é a Selic
 * menos 0,10 ponto, a menos que seja informado. Mudar refaz os rendimentos.
 * Fecha com `true` se algo mudou.
 */
@Component({
  selector: 'app-selic-dialog',
  imports: [
    DecimalPipe,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './selic-dialog.component.html',
  styleUrl: './selic-dialog.component.scss',
})
export class SelicDialogComponent {
  private readonly service = inject(TaxaSelicService);

  protected readonly taxas = signal<TaxaSelic[]>([]);
  protected readonly mudou = signal(false);
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group({
    vigente_desde: [dataNaApi(), Validators.required],
    selic: ['', [Validators.required, taxaValida]],
    cdi: [''],
  });

  constructor() {
    this.carregar();
  }

  protected adicionar(): void {
    const cdi = this.form.controls.cdi.value.trim();
    if (this.form.invalid || (cdi && paraTaxaDaApi(cdi) === null)) {
      this.form.markAllAsTouched();
      this.erro.set(cdi && paraTaxaDaApi(cdi) === null ? 'CDI inválido, ex.: 13,65.' : null);
      return;
    }
    this.executar(
      this.service.salvar({
        vigente_desde: this.form.controls.vigente_desde.value,
        selic: paraTaxaDaApi(this.form.controls.selic.value)!,
        cdi: cdi ? paraTaxaDaApi(cdi) : null,
      }),
      () => this.form.patchValue({ selic: '', cdi: '' }),
    );
  }

  protected excluir(taxa: TaxaSelic): void {
    this.executar(this.service.excluir(taxa.id));
  }

  private executar(requisicao: Observable<unknown>, depois?: () => void): void {
    this.salvando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: () => {
        this.salvando.set(false);
        this.mudou.set(true);
        depois?.();
        this.carregar();
      },
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }

  private carregar(): void {
    this.service.listar().subscribe((taxas) => this.taxas.set(taxas));
  }
}
