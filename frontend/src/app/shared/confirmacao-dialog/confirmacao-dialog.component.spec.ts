import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmacaoDialogComponent } from './confirmacao-dialog.component';

describe('ConfirmacaoDialogComponent', () => {
  it('mostra título, mensagem e o texto do botão', () => {
    TestBed.configureTestingModule({
      imports: [ConfirmacaoDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { titulo: 'Excluir?', mensagem: 'Não dá para desfazer.', confirmar: 'Excluir' },
        },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    });
    const fixture = TestBed.createComponent(ConfirmacaoDialogComponent);
    fixture.detectChanges();
    const texto = fixture.nativeElement.textContent;

    expect(texto).toContain('Excluir?');
    expect(texto).toContain('Não dá para desfazer.');
    expect(texto).toContain('Excluir');
  });
});
