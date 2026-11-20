import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { filter, switchMap } from 'rxjs';

import { Fonte, TIPOS_DE_FONTE } from '../core/models/fonte.model';
import { FonteService } from '../core/services/fonte.service';
import { ConfirmacaoDialogComponent } from '../shared/confirmacao-dialog/confirmacao-dialog.component';
import { mensagemDeErro } from '../shared/utils/erro-da-api';
import { FormFonteComponent } from './form-fonte/form-fonte.component';

@Component({
  selector: 'app-fontes',
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './fontes.component.html',
  styleUrl: './fontes.component.scss',
})
export class FontesComponent {
  private readonly service = inject(FonteService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly fontes = signal<Fonte[]>([]);
  protected readonly colunas = ['nome', 'tipo', 'fechamento', 'vencimento', 'situacao', 'acoes'];

  constructor() {
    this.carregar();
  }

  protected rotuloDoTipo(fonte: Fonte): string {
    return TIPOS_DE_FONTE.find((tipo) => tipo.valor === fonte.tipo)?.rotulo ?? fonte.tipo;
  }

  protected abrir(fonte: Fonte | null = null): void {
    this.dialog
      .open(FormFonteComponent, { data: fonte })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.carregar());
  }

  protected excluir(fonte: Fonte): void {
    this.dialog
      .open(ConfirmacaoDialogComponent, {
        data: {
          titulo: `Excluir ${fonte.nome}?`,
          mensagem: 'Esta ação não pode ser desfeita.',
          confirmar: 'Excluir',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.excluir(fonte.id)),
      )
      .subscribe({
        next: () => this.carregar(),
        error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
      });
  }

  private carregar(): void {
    this.service.listar().subscribe({
      next: (fontes) => this.fontes.set(fontes),
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
  }
}
