import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Fonte } from '../../core/models/fonte.model';
import { FonteService } from '../../core/services/fonte.service';
import { FormFonteComponent } from './form-fonte.component';

describe('FormFonteComponent', () => {
  let fixture: ComponentFixture<FormFonteComponent>;
  const fontes = { criar: vi.fn(), atualizar: vi.fn() };
  const dialogRef = { close: vi.fn() };

  function criar(fonte: Fonte | null = null) {
    TestBed.configureTestingModule({
      imports: [FormFonteComponent],
      providers: [
        { provide: FonteService, useValue: fontes },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: fonte },
      ],
    });
    fixture = TestBed.createComponent(FormFonteComponent);
    fixture.detectChanges();
  }

  const form = () =>
    (fixture.componentInstance as unknown as { form: FormFonteComponent['form'] }).form;
  const enviar = () => {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };

  beforeEach(() => {
    fontes.criar.mockReset();
    fontes.atualizar.mockReset();
    dialogRef.close.mockReset();
  });

  it('cartão exige os dias de fechamento e vencimento', () => {
    criar();
    form().patchValue({ nome: 'Nubank', tipo: 'cartao' });

    enviar();

    expect(fontes.criar).not.toHaveBeenCalled();
  });

  it('cria um cartão e fecha com a fonte salva', () => {
    criar();
    const salva = { id: 1 } as Fonte;
    fontes.criar.mockReturnValue(of(salva));
    form().patchValue({ nome: 'Nubank', tipo: 'cartao', dia_fechamento: 3, dia_vencimento: 10 });

    enviar();

    expect(fontes.criar).toHaveBeenCalledWith({
      nome: 'Nubank',
      tipo: 'cartao',
      dia_fechamento: 3,
      dia_vencimento: 10,
      ordem: 0,
      ativa: true,
    });
    expect(dialogRef.close).toHaveBeenCalledWith(salva);
  });

  it('dinheiro não tem dias e esconde os campos', () => {
    criar();
    fontes.criar.mockReturnValue(of({ id: 2 }));
    form().patchValue({ nome: 'Dinheiro', tipo: 'dinheiro' });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Dia de fechamento');
    enviar();
    expect(fontes.criar.mock.calls[0][0]).toMatchObject({
      dia_fechamento: null,
      dia_vencimento: null,
    });
  });

  it('edita a fonte existente', () => {
    const fonte: Fonte = {
      id: 5,
      nome: 'Bradesco',
      tipo: 'cartao',
      dia_fechamento: 25,
      dia_vencimento: 5,
      ativa: true,
      ordem: 2,
    };
    criar(fonte);
    fontes.atualizar.mockReturnValue(of(fonte));
    form().patchValue({ ativa: false });

    enviar();

    expect(fontes.atualizar).toHaveBeenCalledWith(
      5,
      expect.objectContaining({ nome: 'Bradesco', ativa: false }),
    );
  });

  it('mostra o erro da API', () => {
    criar();
    fontes.criar.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { nome: ['Já existe.'] } })),
    );
    form().patchValue({ nome: 'Dinheiro', tipo: 'dinheiro' });

    enviar();

    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain(
      'nome: Já existe.',
    );
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
