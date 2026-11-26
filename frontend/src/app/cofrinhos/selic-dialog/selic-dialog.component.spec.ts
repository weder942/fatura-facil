import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { TaxaSelic } from '../../core/models/cofrinho.model';
import { TaxaSelicService } from '../../core/services/taxa-selic.service';
import { SelicDialogComponent } from './selic-dialog.component';

const TAXAS: TaxaSelic[] = [
  { id: 2, vigente_desde: '2026-09-18', selic: '13.75', cdi: '13.65' },
  { id: 1, vigente_desde: '2026-07-31', selic: '14.00', cdi: '13.90' },
];
import { textoDe } from '../cofrinhos.testing';

registerLocaleData(localePt);

describe('SelicDialogComponent', () => {
  let fixture: ComponentFixture<SelicDialogComponent>;
  const service = { listar: vi.fn(), salvar: vi.fn(), excluir: vi.fn() };

  function criar(taxas: TaxaSelic[] = TAXAS) {
    vi.clearAllMocks();
    service.listar.mockReturnValue(of(taxas));
    TestBed.configureTestingModule({
      imports: [SelicDialogComponent],
      providers: [
        { provide: TaxaSelicService, useValue: service },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    });
    fixture = TestBed.createComponent(SelicDialogComponent);
    fixture.detectChanges();
  }

  const componente = () =>
    fixture.componentInstance as unknown as {
      form: SelicDialogComponent['form'];
      mudou: () => boolean;
      adicionar(): void;
    };
  const texto = () => {
    fixture.detectChanges();
    return textoDe(fixture.nativeElement);
  };

  it('lista o histórico com a atual em destaque', () => {
    criar();

    expect(texto()).toContain('18/09/2026 13,75% 13,65%');
    expect(fixture.nativeElement.querySelectorAll('.selic__atual').length).toBe(1);
  });

  it('salva com o CDI padrão (vazio) e recarrega', () => {
    criar();
    service.salvar.mockReturnValue(of({}));

    componente().form.patchValue({ vigente_desde: '2026-12-10', selic: '13,25' });
    componente().adicionar();

    expect(service.salvar).toHaveBeenCalledWith({
      vigente_desde: '2026-12-10',
      selic: '13.25',
      cdi: null,
    });
    expect(componente().form.controls.selic.value).toBe('');
    expect(componente().mudou()).toBe(true);
  });

  it('salva com o CDI informado', () => {
    criar();
    service.salvar.mockReturnValue(of({}));

    componente().form.patchValue({ selic: '13,25', cdi: '13,10' });
    componente().adicionar();

    expect(service.salvar).toHaveBeenCalledWith(expect.objectContaining({ cdi: '13.10' }));
  });

  it('valida a Selic e o CDI', () => {
    criar();

    componente().adicionar();
    componente().form.patchValue({ selic: '13,25', cdi: 'x' });
    componente().adicionar();

    expect(service.salvar).not.toHaveBeenCalled();
    expect(texto()).toContain('CDI inválido');
  });

  it('exclui e mostra o erro da API', () => {
    criar();
    service.excluir.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Ficaria sem Selic.' } }),
      ),
    );

    fixture.nativeElement.querySelector('[aria-label="Excluir a taxa de 18/09/2026"]').click();

    expect(service.excluir).toHaveBeenCalledWith(2);
    expect(texto()).toContain('Ficaria sem Selic.');
  });

  it('sem taxas', () => {
    criar([]);

    expect(texto()).toContain('Nenhuma taxa cadastrada.');
  });
});
