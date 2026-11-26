import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Banco, TaxaSelic } from '../core/models/cofrinho.model';
import { BancoService } from '../core/services/banco.service';
import { CofrinhoService } from '../core/services/cofrinho.service';
import { TaxaSelicService } from '../core/services/taxa-selic.service';
import { BancosDialogComponent } from './bancos-dialog/bancos-dialog.component';
import { CofrinhosComponent } from './cofrinhos.component';
import { RESERVA, textoDe } from './cofrinhos.testing';
import { FormCofrinhoComponent } from './form-cofrinho/form-cofrinho.component';
import { SelicDialogComponent } from './selic-dialog/selic-dialog.component';

registerLocaleData(localePt);

const PICPAY: Banco = { id: 1, nome: 'PicPay', ativo: true };
const SELIC: TaxaSelic = { id: 1, vigente_desde: '2026-09-18', selic: '13.75', cdi: '13.65' };

describe('CofrinhosComponent', () => {
  let fixture: ComponentFixture<CofrinhosComponent>;
  const cofrinhos = { listar: vi.fn() };
  const bancos = { listar: vi.fn() };
  const taxas = { listar: vi.fn() };
  const dialog = { open: vi.fn() };
  const snackBar = { open: vi.fn() };

  function criar() {
    TestBed.configureTestingModule({
      imports: [CofrinhosComponent],
      providers: [
        provideRouter([]),
        { provide: CofrinhoService, useValue: cofrinhos },
        { provide: BancoService, useValue: bancos },
        { provide: TaxaSelicService, useValue: taxas },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(CofrinhosComponent);
    fixture.detectChanges();
  }

  beforeEach(() => {
    vi.clearAllMocks();
    cofrinhos.listar.mockReturnValue(of([RESERVA, { ...RESERVA, id: 4, saldo_liquido: '0.52' }]));
    bancos.listar.mockReturnValue(of([PICPAY]));
    taxas.listar.mockReturnValue(of([SELIC]));
  });

  const texto = () => {
    fixture.detectChanges();
    return textoDe(fixture.nativeElement);
  };
  const fecharDialogCom = (resultado: unknown) =>
    dialog.open.mockReturnValue({ afterClosed: () => of(resultado) });
  const botao = (rotulo: string) =>
    [...fixture.nativeElement.querySelectorAll('button')].find((b: HTMLButtonElement) =>
      b.textContent!.includes(rotulo),
    ) as HTMLButtonElement;

  it('mostra a Selic, o total e um card por cofrinho', () => {
    criar();

    const conteudo = texto();
    expect(conteudo).toContain('Selic 13,75% · CDI 13,65% ao ano');
    expect(conteudo).toContain('Total guardado R$ 10.018,00');
    expect(conteudo).toContain('PicPay · 102% do CDI');
    expect(conteudo).toContain('Rendeu este mês R$ 17,48');
    expect(fixture.nativeElement.querySelectorAll('.cofrinhos__card').length).toBe(2);
  });

  it('novo cofrinho abre o formulário e vai para ele', () => {
    criar();
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fecharDialogCom(RESERVA);

    botao('Novo cofrinho').click();

    expect(dialog.open).toHaveBeenCalledWith(FormCofrinhoComponent, { data: null });
    expect(router.navigate).toHaveBeenCalledWith(['/cofrinhos', 3]);
  });

  it('bancos e Selic recarregam se algo mudou', () => {
    criar();
    fecharDialogCom(true);
    botao('Bancos').click();
    expect(dialog.open).toHaveBeenCalledWith(BancosDialogComponent);

    fecharDialogCom(false);
    botao('Selic').click();
    expect(dialog.open).toHaveBeenCalledWith(SelicDialogComponent);

    expect(cofrinhos.listar).toHaveBeenCalledTimes(2);
  });

  it('sem Selic nem banco, explica o que cadastrar', () => {
    cofrinhos.listar.mockReturnValue(of([]));
    bancos.listar.mockReturnValue(of([]));
    taxas.listar.mockReturnValue(of([]));
    criar();

    const conteudo = texto();
    expect(conteudo).toContain('cadastre antes a taxa Selic e um banco');
    expect(conteudo).toContain('Nenhum cofrinho ainda.');
    expect(botao('Novo cofrinho').disabled).toBe(true);
  });

  it('mostra o erro da API', () => {
    cofrinhos.listar.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { detail: 'Falhou.' } })),
    );
    criar();

    expect(snackBar.open).toHaveBeenCalledWith('Falhou.', 'Fechar');
  });
});
