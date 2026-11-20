import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { Recorrente } from '../core/models/recorrente.model';
import { RecorrenteService } from '../core/services/recorrente.service';
import { FormRecorrenteComponent } from './form-recorrente/form-recorrente.component';
import { RecorrentesComponent } from './recorrentes.component';

registerLocaleData(localePt);

const SALARIO: Recorrente = {
  id: 1,
  nome: 'Salário',
  grupo: 'rendimento',
  variavel: false,
  ordem: 0,
  valor_atual: '8883.32',
  valores: [{ id: 1, valor: '8883.32', a_partir_de: '2025-01', ate: null }],
};
const MOTO: Recorrente = {
  id: 2,
  nome: 'Moto',
  grupo: 'fixa',
  variavel: true,
  ordem: 0,
  valor_atual: null,
  valores: [{ id: 2, valor: '75.00', a_partir_de: '2024-01', ate: '2025-06' }],
};

describe('RecorrentesComponent', () => {
  let fixture: ComponentFixture<RecorrentesComponent>;
  const service = { listar: vi.fn(), excluir: vi.fn() };
  const dialog = { open: vi.fn() };
  const snackBar = { open: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    service.listar.mockReturnValue(of([SALARIO, MOTO]));
    TestBed.configureTestingModule({
      imports: [RecorrentesComponent],
      providers: [
        { provide: RecorrenteService, useValue: service },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(RecorrentesComponent);
    fixture.detectChanges();
  });

  const el = () => fixture.nativeElement as HTMLElement;
  const texto = () => el().textContent!.replace(/\s+/g, ' ');

  it('separa rendimentos e fixas, com valor de hoje e situação', () => {
    const [rendimentos, fixas] = el().querySelectorAll('section');

    expect(rendimentos.textContent).toContain('Salário');
    expect(rendimentos.textContent).toMatch(/R\$\s8\.883,32/);
    expect(fixas.textContent).toContain('Moto');
    expect(fixas.textContent).toContain('variável');
    expect(fixas.textContent).toContain('fora de vigência');
    expect(texto()).toContain('janeiro de 2025');
    expect(el().querySelector('.recorrentes__encerrado')).not.toBeNull();
  });

  it('novo no grupo da seção e recarrega ao salvar', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });

    (el().querySelectorAll('section header button')[0] as HTMLElement).click();

    expect(dialog.open).toHaveBeenCalledWith(FormRecorrenteComponent, {
      data: { recorrente: null, grupo: 'rendimento' },
    });
    expect(service.listar).toHaveBeenCalledTimes(2);
  });

  it('editar abre com o recorrente', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(false) });

    (el().querySelector('[aria-label="Editar Moto"]') as HTMLElement).click();

    expect(dialog.open).toHaveBeenCalledWith(FormRecorrenteComponent, {
      data: { recorrente: MOTO, grupo: 'fixa' },
    });
    expect(service.listar).toHaveBeenCalledTimes(1);
  });

  it('exclui depois de confirmar e mostra erro da API', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });
    service.excluir.mockReturnValueOnce(of(undefined));

    (el().querySelector('[aria-label="Excluir Moto"]') as HTMLElement).click();
    expect(service.excluir).toHaveBeenCalledWith(2);
    expect(service.listar).toHaveBeenCalledTimes(2);

    service.excluir.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 500 })));
    (el().querySelector('[aria-label="Excluir Moto"]') as HTMLElement).click();
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('sem cadastros, avisa', () => {
    service.listar.mockReturnValue(of([]));
    fixture = TestBed.createComponent(RecorrentesComponent);
    fixture.detectChanges();

    expect(el().textContent).toContain('Nenhum cadastrado.');
  });

  it('erro ao carregar vai para o snackbar', () => {
    service.listar.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    TestBed.createComponent(RecorrentesComponent);

    expect(snackBar.open).toHaveBeenCalled();
  });
});
