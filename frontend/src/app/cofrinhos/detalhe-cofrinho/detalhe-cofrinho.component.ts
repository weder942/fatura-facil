import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { Cofrinho, MovimentoDoCofrinho, TipoInformado } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { FormCofrinhoComponent } from '../form-cofrinho/form-cofrinho.component';
import { FormMovimentoComponent } from '../form-movimento/form-movimento.component';
import { MovimentosComponent } from '../movimentos/movimentos.component';

export const ULTIMOS_MOVIMENTOS = 5;

/** Um cofrinho: saldo, ações (guardar, resgatar, ajustar) e os últimos movimentos. */
@Component({
  selector: 'app-detalhe-cofrinho',
  imports: [
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MovimentosComponent,
  ],
  templateUrl: './detalhe-cofrinho.component.html',
  styleUrl: './detalhe-cofrinho.component.scss',
})
export class DetalheCofrinhoComponent {
  private readonly service = inject(CofrinhoService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  protected readonly id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  protected readonly cofrinho = signal<Cofrinho | null>(null);
  protected readonly movimentos = signal<MovimentoDoCofrinho[]>([]);

  constructor() {
    this.carregar();
  }

  protected movimentar(cofrinho: Cofrinho, tipo: TipoInformado): void {
    this.dialog
      .open(FormMovimentoComponent, { data: { cofrinho, tipo } })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.carregar());
  }

  protected editar(cofrinho: Cofrinho): void {
    this.dialog
      .open(FormCofrinhoComponent, { data: cofrinho })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.carregar());
  }

  protected excluir(cofrinho: Cofrinho): void {
    this.confirmar(`Excluir ${cofrinho.nome}?`, 'O extrato inteiro é apagado.')
      .pipe(switchMap(() => this.service.excluir(cofrinho.id)))
      .subscribe({
        next: () => this.router.navigateByUrl('/cofrinhos'),
        error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
      });
  }

  protected excluirMovimento(movimento: MovimentoDoCofrinho): void {
    this.confirmar('Excluir o movimento?', 'Os rendimentos dali em diante são refeitos.')
      .pipe(switchMap(() => this.service.excluirMovimento(this.id, movimento.id)))
      .subscribe({
        next: () => this.carregar(),
        error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
      });
  }

  private confirmar(titulo: string, mensagem: string) {
    return this.dialog
      .open(ConfirmacaoDialogComponent, { data: { titulo, mensagem, confirmar: 'Excluir' } })
      .afterClosed()
      .pipe(filter(Boolean));
  }

  private carregar(): void {
    this.service.obter(this.id).subscribe({
      next: (cofrinho) => this.cofrinho.set(cofrinho),
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
    this.service
      .extrato(this.id, { limite: ULTIMOS_MOVIMENTOS })
      .subscribe((movimentos) => this.movimentos.set(movimentos));
  }
}
