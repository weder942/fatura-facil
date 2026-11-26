import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Banco, Cofrinho } from '../../core/models/cofrinho.model';
import { BancoService } from '../../core/services/banco.service';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { RESERVA } from '../cofrinhos.testing';
import { FormCofrinhoComponent } from './form-cofrinho.component';

const BANCOS: Banco[] = [
  { id: 1, nome: 'PicPay', ativo: true },
  { id: 2, nome: 'Nubank', ativo: true },
  { id: 9, nome: 'Antigo', ativo: false },
];

describe('FormCofrinhoComponent', () => {
  const service = { criar: vi.fn(), atualizar: vi.fn(), definirPercentual: vi.fn() };
  const dialogRef = { close: vi.fn() };

  function criar(cofrinho: Cofrinho | null) {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [FormCofrinhoComponent],
      providers: [
        { provide: CofrinhoService, useValue: service },
        { provide: BancoService, useValue: { listar: () => of(BANCOS) } },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: cofrinho },
      ],
    });
    const fixture = TestBed.createComponent(FormCofrinhoComponent);
    fixture.detectChanges();
    return fixture;
  }

  const componente = (fixture: ReturnType<typeof criar>) =>
    fixture.componentInstance as unknown as {
      form: FormCofrinhoComponent['form'];
      bancos: () => Banco[];
      mudouPercentual: () => boolean;
    };
  const enviar = (el: HTMLElement) => el.querySelector('form')!.dispatchEvent(new Event('submit'));

  it('cria com o saldo atual e o percentual', () => {
    const fixture = criar(null);
    service.criar.mockReturnValue(of(RESERVA));

    expect(
      componente(fixture)
        .bancos()
        .map((banco) => banco.nome),
    ).toEqual(['PicPay', 'Nubank']);
    componente(fixture).form.patchValue({
      nome: ' Reserva ',
      banco: 1,
      inicio: '2026-11-02',
      saldo: '10.000,00',
      percentual: '102',
    });
    enviar(fixture.nativeElement);

    expect(service.criar).toHaveBeenCalledWith({
      nome: 'Reserva',
      banco: 1,
      inicio: '2026-11-02',
      saldo: '10000.00',
      percentual: '102',
    });
    expect(dialogRef.close).toHaveBeenCalledWith(RESERVA);
  });

  it('não envia incompleto e mostra o erro da API', () => {
    const fixture = criar(null);
    enviar(fixture.nativeElement);
    expect(service.criar).not.toHaveBeenCalled();

    service.criar.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Cadastre a Selic.' } }),
      ),
    );
    componente(fixture).form.patchValue({ nome: 'X', banco: 1, saldo: '1', percentual: '100' });
    enviar(fixture.nativeElement);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cadastre a Selic.');
  });

  it('edita nome e banco sem mexer no percentual', () => {
    const fixture = criar({ ...RESERVA, banco: 9 });
    service.atualizar.mockReturnValue(of(RESERVA));

    expect(
      componente(fixture)
        .bancos()
        .map((banco) => banco.id),
    ).toEqual([1, 2, 9]);
    expect(fixture.nativeElement.textContent).not.toContain('Data de criação');
    componente(fixture).form.patchValue({ nome: 'Viagem', banco: 2 });
    enviar(fixture.nativeElement);

    expect(service.atualizar).toHaveBeenCalledWith(3, { nome: 'Viagem', banco: 2 });
    expect(service.definirPercentual).not.toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalledWith(RESERVA);
  });

  it('mudar o percentual pede a data e grava depois', () => {
    const fixture = criar(RESERVA);
    const novo = { ...RESERVA, percentual: '105.00' };
    service.atualizar.mockReturnValue(of(RESERVA));
    service.definirPercentual.mockReturnValue(of(novo));

    expect(componente(fixture).mudouPercentual()).toBe(false);
    componente(fixture).form.patchValue({ percentual: '105', a_partir_de: '2026-11-20' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Novo percentual a partir de');
    enviar(fixture.nativeElement);

    expect(service.definirPercentual).toHaveBeenCalledWith(3, '105', '2026-11-20');
    expect(dialogRef.close).toHaveBeenCalledWith(novo);
  });
});
