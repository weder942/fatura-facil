import { ComponentType } from '@angular/cdk/portal';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { Banco, Cofrinho, TaxaSelic } from '../core/models/cofrinho.model';
import { BancoService } from '../core/services/banco.service';
import { CofrinhoService } from '../core/services/cofrinho.service';
import { TaxaSelicService } from '../core/services/taxa-selic.service';
import { deCentavos, emCentavos } from '../shared/utils/dinheiro';
import { mensagemDeErro } from '../shared/utils/erro-da-api';
import { BancosDialogComponent } from './bancos-dialog/bancos-dialog.component';
import { FormCofrinhoComponent } from './form-cofrinho/form-cofrinho.component';
import { SelicDialogComponent } from './selic-dialog/selic-dialog.component';

/** A aba Cofrinhos: um card por cofrinho, com o saldo e quanto rendeu. */
@Component({
  selector: 'app-cofrinhos',
  imports: [DecimalPipe, CurrencyPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './cofrinhos.component.html',
  styleUrl: './cofrinhos.component.scss',
})
export class CofrinhosComponent {
  private readonly cofrinhosApi = inject(CofrinhoService);
  private readonly bancosApi = inject(BancoService);
  private readonly taxasApi = inject(TaxaSelicService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  protected readonly cofrinhos = signal<Cofrinho[]>([]);
  protected readonly bancos = signal<Banco[]>([]);
  protected readonly taxas = signal<TaxaSelic[]>([]);
  protected readonly carregado = signal(false);

  protected readonly selicAtual = computed(() => this.taxas()[0] ?? null);
  /** Soma em centavos inteiros: o saldo de cada cofrinho vem da API. */
  protected readonly total = computed(() =>
    deCentavos(
      this.cofrinhos().reduce((soma, cofrinho) => soma + emCentavos(cofrinho.saldo_liquido), 0),
    ),
  );
  protected readonly podeCriar = computed(
    () => this.bancos().some((banco) => banco.ativo) && this.selicAtual() !== null,
  );

  constructor() {
    this.carregar();
  }

  protected novo(): void {
    this.dialog
      .open(FormCofrinhoComponent, { data: null })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((cofrinho) => this.router.navigate(['/cofrinhos', cofrinho.id]));
  }

  protected abrirBancos(): void {
    this.abrirCadastro(BancosDialogComponent);
  }

  protected abrirSelic(): void {
    this.abrirCadastro(SelicDialogComponent);
  }

  private abrirCadastro(componente: ComponentType<unknown>): void {
    this.dialog
      .open(componente)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.carregar());
  }

  private carregar(): void {
    this.bancosApi.listar().subscribe((bancos) => this.bancos.set(bancos));
    this.taxasApi.listar().subscribe((taxas) => this.taxas.set(taxas));
    this.cofrinhosApi.listar().subscribe({
      next: (cofrinhos) => {
        this.cofrinhos.set(cofrinhos);
        this.carregado.set(true);
      },
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
  }
}
