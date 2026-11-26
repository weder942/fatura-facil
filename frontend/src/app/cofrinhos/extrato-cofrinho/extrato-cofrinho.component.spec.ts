import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { CofrinhoService } from '../../core/services/cofrinho.service';
import { RESERVA, movimento, textoDe } from '../cofrinhos.testing';
import { ExtratoCofrinhoComponent } from './extrato-cofrinho.component';

registerLocaleData(localePt);

const GUARDADO = movimento({
  id: 7,
  tipo: 'guardado',
  informado: '10.00',
  valor: '10.00',
  liquido: '10.00',
});

describe('ExtratoCofrinhoComponent', () => {
  let fixture: ComponentFixture<ExtratoCofrinhoComponent>;
  const service = { obter: vi.fn(), extrato: vi.fn(), excluirMovimento: vi.fn() };
  const dialog = { open: vi.fn() };
  const snackBar = { open: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    service.obter.mockReturnValue(of(RESERVA));
    service.extrato.mockReturnValue(of([movimento({ id: 8 }), GUARDADO]));
    TestBed.configureTestingModule({
      imports: [ExtratoCofrinhoComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '3' }) } },
        },
        { provide: CofrinhoService, useValue: service },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(ExtratoCofrinhoComponent);
    fixture.detectChanges();
  });

  const texto = () => {
    fixture.detectChanges();
    return textoDe(fixture.nativeElement);
  };
  const chip = (rotulo: string) =>
    [...fixture.nativeElement.querySelectorAll('.chips__chip')].find(
      (b: HTMLButtonElement) => b.textContent!.trim() === rotulo,
    ) as HTMLButtonElement;
  const fecharDialogCom = (resultado: unknown) =>
    dialog.open.mockReturnValue({ afterClosed: () => of(resultado) });

  it('mostra o saldo e o extrato completo', () => {
    expect(service.extrato).toHaveBeenCalledWith(3, { tipo: undefined });
    const conteudo = texto();
    expect(conteudo).toContain('Saldo guardado R$ 10.017,48');
    expect(conteudo).toContain('Já rendeu R$ 17,48');
    expect(chip('Tudo').getAttribute('aria-pressed')).toBe('true');
  });

  it('filtra por tipo', () => {
    chip('Rendimentos').click();
    fixture.detectChanges();

    expect(service.extrato).toHaveBeenLastCalledWith(3, { tipo: 'rendimento' });
    expect(chip('Rendimentos').getAttribute('aria-pressed')).toBe('true');
    expect(chip('Tudo').getAttribute('aria-pressed')).toBe('false');
  });

  it('exclui um movimento depois de confirmar, mantendo o filtro', () => {
    chip('Guardado').click();
    fecharDialogCom(true);
    service.excluirMovimento.mockReturnValue(of(undefined));
    fixture.detectChanges();

    fixture.nativeElement.querySelector('app-movimentos button').click();

    expect(service.excluirMovimento).toHaveBeenCalledWith(3, 7);
    expect(service.extrato).toHaveBeenLastCalledWith(3, { tipo: 'guardado' });
  });

  it('não exclui sem confirmar e mostra erros', () => {
    fecharDialogCom(false);
    fixture.nativeElement.querySelector('app-movimentos button').click();
    expect(service.excluirMovimento).not.toHaveBeenCalled();

    fecharDialogCom(true);
    service.excluirMovimento.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { detail: 'Não deu.' } })),
    );
    fixture.nativeElement.querySelector('app-movimentos button').click();
    expect(snackBar.open).toHaveBeenCalledWith('Não deu.', 'Fechar');
  });

  it('erro ao carregar', () => {
    service.obter.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 404, error: { detail: 'Não encontrado.' } }),
      ),
    );
    fixture = TestBed.createComponent(ExtratoCofrinhoComponent);
    fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith('Não encontrado.', 'Fechar');
    expect(texto()).toContain('Cofrinho');
  });
});
