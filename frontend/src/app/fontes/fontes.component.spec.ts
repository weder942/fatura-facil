import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { Fonte } from '../core/models/fonte.model';
import { FonteService } from '../core/services/fonte.service';
import { FormFonteComponent } from './form-fonte/form-fonte.component';
import { FontesComponent } from './fontes.component';

const NUBANK: Fonte = {
  id: 1,
  nome: 'Nubank',
  tipo: 'cartao',
  dia_fechamento: 3,
  dia_vencimento: 10,
  ativa: true,
  ordem: 0,
};
const ANTIGA: Fonte = {
  id: 2,
  nome: 'Antiga',
  tipo: 'dinheiro',
  dia_fechamento: null,
  dia_vencimento: null,
  ativa: false,
  ordem: 1,
};

describe('FontesComponent', () => {
  let fixture: ComponentFixture<FontesComponent>;
  const service = { listar: vi.fn(), excluir: vi.fn() };
  const dialog = { open: vi.fn() };
  const snackBar = { open: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    service.listar.mockReturnValue(of([NUBANK, ANTIGA]));
    TestBed.configureTestingModule({
      imports: [FontesComponent],
      providers: [
        { provide: FonteService, useValue: service },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(FontesComponent);
    fixture.detectChanges();
  });

  const fecharDialogCom = (resultado: unknown) =>
    dialog.open.mockReturnValue({ afterClosed: () => of(resultado) });
  const clicar = (rotulo: string) =>
    fixture.nativeElement.querySelector(`[aria-label="${rotulo}"]`).click();

  it('lista as fontes com tipo e dias', () => {
    const texto = fixture.nativeElement.textContent;

    expect(texto).toContain('Nubank');
    expect(texto).toContain('Cartão');
    expect(texto).toContain('Inativa');
  });

  it('editar abre o formulário com a fonte e recarrega ao salvar', () => {
    fecharDialogCom(NUBANK);

    clicar('Editar Nubank');

    expect(dialog.open).toHaveBeenCalledWith(FormFonteComponent, { data: NUBANK });
    expect(service.listar).toHaveBeenCalledTimes(2);
  });

  it('excluir pede confirmação', () => {
    fecharDialogCom(false);

    clicar('Excluir Nubank');

    expect(service.excluir).not.toHaveBeenCalled();
  });

  it('excluir confirmado chama a API e mostra o erro de regra', () => {
    fecharDialogCom(true);
    service.excluir.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Esta fonte tem compras.' } }),
      ),
    );

    clicar('Excluir Nubank');

    expect(service.excluir).toHaveBeenCalledWith(1);
    expect(snackBar.open).toHaveBeenCalledWith('Esta fonte tem compras.', 'Fechar');
  });

  it('nova fonte abre o formulário vazio', () => {
    fecharDialogCom(undefined);

    fixture.nativeElement.querySelector('header button').click();

    expect(dialog.open).toHaveBeenCalledWith(FormFonteComponent, { data: null });
    expect(service.listar).toHaveBeenCalledTimes(1);
  });
});
