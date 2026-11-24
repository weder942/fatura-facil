import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Recorrente } from '../../core/models/recorrente.model';
import { RecorrenteService } from '../../core/services/recorrente.service';
import { competenciaEmAberto } from '../../shared/utils/competencia';
import { FormRecorrenteComponent } from './form-recorrente.component';

registerLocaleData(localePt);

const ALUGUEL: Recorrente = {
  id: 1,
  nome: 'Aluguel',
  grupo: 'fixa',
  variavel: false,
  ordem: 0,
  valor_atual: '1277.99',
  valores: [
    { id: 10, valor: '1201.99', a_partir_de: '2024-01', ate: null },
    { id: 11, valor: '1277.99', a_partir_de: '2025-01', ate: null },
  ],
};

describe('FormRecorrenteComponent', () => {
  let fixture: ComponentFixture<FormRecorrenteComponent>;
  const service = {
    criar: vi.fn(),
    atualizar: vi.fn(),
    reajustar: vi.fn(),
    encerrar: vi.fn(),
    removerVigencia: vi.fn(),
  };
  const dialogRef = { close: vi.fn() };

  function criar(recorrente: Recorrente | null, grupo = 'fixa') {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [FormRecorrenteComponent],
      providers: [
        { provide: RecorrenteService, useValue: service },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { recorrente, grupo } },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    fixture = TestBed.createComponent(FormRecorrenteComponent);
    fixture.detectChanges();
  }

  const componente = () =>
    fixture.componentInstance as unknown as {
      form: FormRecorrenteComponent['form'];
      reajuste: FormRecorrenteComponent['reajuste'];
      fim: FormRecorrenteComponent['fim'];
    };
  const el = () => fixture.nativeElement as HTMLElement;
  const enviar = () => {
    el().querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };
  const botao = (texto: string) =>
    [...el().querySelectorAll('button')].find((b) => b.textContent!.includes(texto))!;

  it('cria com a primeira vigência, aceitando valor negativo', () => {
    criar(null, 'rendimento');
    service.criar.mockReturnValue(of(ALUGUEL));
    componente().form.patchValue({ nome: 'INSS', valor: '-951,52', a_partir_de: '2026-01' });

    enviar();

    expect(service.criar).toHaveBeenCalledWith({
      nome: 'INSS',
      grupo: 'rendimento',
      variavel: false,
      ordem: 0,
      valor: '-951.52',
      a_partir_de: '2026-01',
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('criar exige o valor; o início começa no mês atual', () => {
    criar(null);
    componente().form.patchValue({ nome: 'Aluguel' });

    enviar();

    expect(componente().form.controls.a_partir_de.value).toBe(competenciaEmAberto());
    expect(service.criar).not.toHaveBeenCalled();
  });

  it('editar envia só o cadastro e lista as vigências', () => {
    criar(ALUGUEL);
    service.atualizar.mockReturnValue(of(ALUGUEL));
    componente().form.patchValue({ nome: 'Aluguel casa', variavel: true });

    expect(el().textContent).toContain('desde janeiro de 2025');
    enviar();

    expect(service.atualizar).toHaveBeenCalledWith(1, {
      nome: 'Aluguel casa',
      grupo: 'fixa',
      variavel: true,
      ordem: 0,
    });
  });

  it('reajusta, remove valor e encerra na hora; cancelar avisa que mudou', () => {
    criar(ALUGUEL);
    const reajustado = {
      ...ALUGUEL,
      valores: [
        ...ALUGUEL.valores,
        { id: 12, valor: '1300.00', a_partir_de: '2026-06', ate: null },
      ],
    };
    service.reajustar.mockReturnValue(of(reajustado));
    service.removerVigencia.mockReturnValue(of(ALUGUEL));
    service.encerrar.mockReturnValue(of(ALUGUEL));

    componente().reajuste.patchValue({ valor: '1.300,00', a_partir_de: '2026-06' });
    botao('Reajustar').click();
    fixture.detectChanges();
    expect(service.reajustar).toHaveBeenCalledWith(1, '1300.00', '2026-06');
    expect(el().textContent).toContain('desde junho de 2026');
    expect(componente().reajuste.controls.valor.value).toBe('');

    (el().querySelector('[aria-label="Remover valor desde junho de 2026"]') as HTMLElement).click();
    expect(service.removerVigencia).toHaveBeenCalledWith(1, 12);

    componente().fim.setValue('2026-12');
    botao('Encerrar').click();
    expect(service.encerrar).toHaveBeenCalledWith(1, '2026-12');

    fixture.detectChanges();
    botao('Cancelar').click();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('não reajusta sem valor', () => {
    criar(ALUGUEL);

    botao('Reajustar').click();

    expect(service.reajustar).not.toHaveBeenCalled();
  });

  it('mostra o erro da API', () => {
    criar(ALUGUEL);
    service.encerrar.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Antes do primeiro valor.' } }),
      ),
    );

    botao('Encerrar').click();
    fixture.detectChanges();

    expect(el().querySelector('[role=alert]')!.textContent).toContain('Antes do primeiro valor.');
  });
});
