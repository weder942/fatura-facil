import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { ItemDoMes } from '../../core/models/mes.model';
import { RecorrenteService } from '../../core/services/recorrente.service';
import { ValorDoMesComponent } from './valor-do-mes.component';

registerLocaleData(localePt);

describe('ValorDoMesComponent', () => {
  const service = { definirNoMes: vi.fn(), limparNoMes: vi.fn() };
  const dialogRef = { close: vi.fn() };
  const ENERGIA: ItemDoMes = {
    tipo: 'recorrente',
    id: 7,
    descricao: 'Energia',
    valor: '300.00',
    variavel: true,
    pendente: true,
    ajustado: false,
  };

  function criar(item: Partial<ItemDoMes> = {}) {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ValorDoMesComponent],
      providers: [
        { provide: RecorrenteService, useValue: service },
        { provide: MatDialogRef, useValue: dialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { item: { ...ENERGIA, ...item }, competencia: '2026-11' },
        },
      ],
    });
    const fixture = TestBed.createComponent(ValorDoMesComponent);
    fixture.detectChanges();
    return fixture;
  }

  const digitar = (el: HTMLElement, valor: string) => {
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = valor;
    input.dispatchEvent(new Event('input'));
  };
  const enviar = (el: HTMLElement) => el.querySelector('form')!.dispatchEvent(new Event('submit'));
  const botao = (el: HTMLElement, texto: string) =>
    [...el.querySelectorAll('button')].find((b) => b.textContent!.includes(texto));

  it('variável pendente: pede o valor real, já preenchido com a estimativa', () => {
    const fixture = criar();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Informe o valor real');
    expect((el.querySelector('input') as HTMLInputElement).value).toBe('300,00');
    expect(botao(el, 'Voltar')).toBeUndefined();
  });

  it('grava o valor do mês e fecha', () => {
    const fixture = criar();
    service.definirNoMes.mockReturnValue(of({ valor: '432.80' }));

    digitar(fixture.nativeElement, '432,80');
    enviar(fixture.nativeElement);

    expect(service.definirNoMes).toHaveBeenCalledWith(7, '2026-11', '432.80');
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('não envia valor inválido', () => {
    const fixture = criar();

    digitar(fixture.nativeElement, 'abc');
    enviar(fixture.nativeElement);

    expect(service.definirNoMes).not.toHaveBeenCalled();
  });

  it('fixo ajustado pode voltar ao valor previsto', () => {
    const fixture = criar({ variavel: false, pendente: false, ajustado: true });
    service.limparNoMes.mockReturnValue(of(undefined));
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('só neste mês');
    botao(el, 'Voltar ao valor previsto')!.click();

    expect(service.limparNoMes).toHaveBeenCalledWith(7, '2026-11');
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('variável já informado pode voltar à estimativa e mostra erro da API', () => {
    const fixture = criar({ pendente: false });
    service.limparNoMes.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Mês consolidado.' } }),
      ),
    );
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Valor real informado');
    botao(el, 'Voltar à estimativa')!.click();
    fixture.detectChanges();

    expect(el.querySelector('[role=alert]')!.textContent).toContain('Mês consolidado.');
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
