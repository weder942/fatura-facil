import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { TipoInformado } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { dataNaApi } from '../../shared/utils/data';
import { RESERVA, textoDe } from '../cofrinhos.testing';
import { FormMovimentoComponent } from './form-movimento.component';

registerLocaleData(localePt);

describe('FormMovimentoComponent', () => {
  const service = { movimentar: vi.fn() };
  const dialogRef = { close: vi.fn() };

  function criar(tipo: TipoInformado) {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [FormMovimentoComponent],
      providers: [
        { provide: CofrinhoService, useValue: service },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { cofrinho: RESERVA, tipo } },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    const fixture = TestBed.createComponent(FormMovimentoComponent);
    fixture.detectChanges();
    return fixture;
  }

  const preencher = (el: HTMLElement, valor: string) => {
    const campo = el.querySelectorAll('input')[1];
    campo.value = valor;
    campo.dispatchEvent(new Event('input'));
  };
  const enviar = (el: HTMLElement) => el.querySelector('form')!.dispatchEvent(new Event('submit'));

  it('guarda na data de hoje', () => {
    const fixture = criar('guardado');
    service.movimentar.mockReturnValue(of({}));

    expect(fixture.nativeElement.textContent).toContain('Guardar · Reserva');
    expect(fixture.nativeElement.textContent).not.toContain('Saldo líquido hoje');
    preencher(fixture.nativeElement, '1.000,50');
    enviar(fixture.nativeElement);

    expect(service.movimentar).toHaveBeenCalledWith(3, {
      tipo: 'guardado',
      data: dataNaApi(),
      informado: '1000.50',
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('resgate mostra o saldo e o erro da API', () => {
    const fixture = criar('resgatado');
    service.movimentar.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Saldo insuficiente.' } }),
      ),
    );

    preencher(fixture.nativeElement, '99999');
    enviar(fixture.nativeElement);
    fixture.detectChanges();

    const texto = textoDe(fixture.nativeElement);
    expect(texto).toContain('Valor que caiu na conta');
    expect(texto).toContain('Saldo líquido hoje: R$ 10.017,48');
    expect(texto).toContain('Saldo insuficiente.');
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('ajuste pede o saldo do banco e valida o valor', () => {
    const fixture = criar('ajuste');

    expect(fixture.nativeElement.textContent).toContain('Saldo que o banco mostra');
    preencher(fixture.nativeElement, 'abc');
    enviar(fixture.nativeElement);

    expect(service.movimentar).not.toHaveBeenCalled();
  });
});
