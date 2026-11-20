import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface DadosDaConfirmacao {
  titulo: string;
  mensagem: string;
  confirmar?: string;
}

/** Diálogo "tem certeza?". Fecha com `true` ao confirmar. */
@Component({
  selector: 'app-confirmacao-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmacao-dialog.component.html',
})
export class ConfirmacaoDialogComponent {
  protected readonly dados = inject<DadosDaConfirmacao>(MAT_DIALOG_DATA);
}
