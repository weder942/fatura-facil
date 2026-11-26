import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { Cofrinho, MovimentoDoCofrinho, TipoDeMovimento } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { MovimentosComponent } from '../movimentos/movimentos.component';

export const FILTROS: { rotulo: string; tipo: TipoDeMovimento | null }[] = [
  { rotulo: 'Tudo', tipo: null },
  { rotulo: 'Guardado', tipo: 'guardado' },
  { rotulo: 'Resgatado', tipo: 'resgatado' },
  { rotulo: 'Rendimentos', tipo: 'rendimento' },
  { rotulo: 'Ajustes', tipo: 'ajuste' },
];

/** Extrato completo do cofrinho, filtrável por tipo de movimento. */
@Component({
  selector: 'app-extrato-cofrinho',
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule, MovimentosComponent],
  templateUrl: './extrato-cofrinho.component.html',
  styleUrl: './extrato-cofrinho.component.scss',
})
export class ExtratoCofrinhoComponent {
  private readonly service = inject(CofrinhoService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  protected readonly filtros = FILTROS;
  protected readonly filtro = signal<TipoDeMovimento | null>(null);
  protected readonly cofrinho = signal<Cofrinho | null>(null);
  protected readonly movimentos = signal<MovimentoDoCofrinho[]>([]);

  constructor() {
    this.carregar();
  }

  protected filtrar(tipo: TipoDeMovimento | null): void {
    this.filtro.set(tipo);
    this.carregarMovimentos();
  }

  protected excluir(movimento: MovimentoDoCofrinho): void {
    this.dialog
      .open(ConfirmacaoDialogComponent, {
        data: {
          titulo: 'Excluir o movimento?',
          mensagem: 'Os rendimentos dali em diante são refeitos.',
          confirmar: 'Excluir',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.excluirMovimento(this.id, movimento.id)),
      )
      .subscribe({
        next: () => this.carregar(),
        error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
      });
  }

  private carregar(): void {
    this.service.obter(this.id).subscribe({
      next: (cofrinho) => this.cofrinho.set(cofrinho),
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
    this.carregarMovimentos();
  }

  private carregarMovimentos(): void {
    this.service
      .extrato(this.id, { tipo: this.filtro() ?? undefined })
      .subscribe((movimentos) => this.movimentos.set(movimentos));
  }
}
