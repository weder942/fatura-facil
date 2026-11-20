import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { filter, switchMap } from 'rxjs';

import { GRUPOS, Grupo, Recorrente } from '../core/models/recorrente.model';
import { RecorrenteService } from '../core/services/recorrente.service';
import { ConfirmacaoDialogComponent } from '../shared/confirmacao-dialog/confirmacao-dialog.component';
import { CompetenciaPipe } from '../shared/pipes/competencia.pipe';
import { mensagemDeErro } from '../shared/utils/erro-da-api';
import {
  DadosDoFormRecorrente,
  FormRecorrenteComponent,
} from './form-recorrente/form-recorrente.component';

/** Rendimentos e fixas que se repetem todo mês, com seus valores e reajustes. */
@Component({
  selector: 'app-recorrentes',
  imports: [CurrencyPipe, CompetenciaPipe, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './recorrentes.component.html',
  styleUrl: './recorrentes.component.scss',
})
export class RecorrentesComponent {
  private readonly service = inject(RecorrenteService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly recorrentes = signal<Recorrente[]>([]);
  protected readonly grupos = computed(() =>
    GRUPOS.map((grupo) => ({
      ...grupo,
      itens: this.recorrentes().filter((recorrente) => recorrente.grupo === grupo.valor),
    })),
  );
  protected readonly colunas = ['nome', 'valor', 'desde', 'acoes'];

  constructor() {
    this.carregar();
  }

  /** Início da vigência que vale hoje (a mais recente). */
  protected desde(recorrente: Recorrente): string | null {
    return recorrente.valores.at(-1)?.a_partir_de ?? null;
  }

  protected abrir(recorrente: Recorrente | null, grupo: Grupo = 'fixa'): void {
    this.dialog
      .open<FormRecorrenteComponent, DadosDoFormRecorrente, boolean>(FormRecorrenteComponent, {
        data: { recorrente, grupo },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.carregar());
  }

  protected excluir(recorrente: Recorrente): void {
    this.dialog
      .open(ConfirmacaoDialogComponent, {
        data: {
          titulo: `Excluir ${recorrente.nome}?`,
          mensagem:
            'Some de todos os meses, inclusive dos passados. Para parar de cobrar daqui em diante, ' +
            'edite e informe o último mês.',
          confirmar: 'Excluir',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.excluir(recorrente.id)),
      )
      .subscribe({
        next: () => this.carregar(),
        error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
      });
  }

  private carregar(): void {
    this.service.listar().subscribe({
      next: (recorrentes) => this.recorrentes.set(recorrentes),
      error: (erro) => this.snackBar.open(mensagemDeErro(erro), 'Fechar'),
    });
  }
}
