import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { AvulsoService } from '../../core/services/avulso.service';
import { DadosDoFormAvulso, FormAvulsoComponent } from './form-avulso.component';

registerLocaleData(localePt);

describe('FormAvulsoComponent', () => {
  const service = { criar: vi.fn(), atualizar: vi.fn(), excluir: vi.fn() };
  const dialogRef = { close: vi.fn() };

  function criar(dados: Partial<DadosDoFormAvulso> = {}) {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [FormAvulsoComponent],
      providers: [
        { provide: AvulsoService, useValue: service },
        { provide: MatDialogRef, useValue: dialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { grupo: 'rendimento', competencia: '2026-11', avulso: null, ...dados },
        },
      ],
    });
    const fixture = TestBed.createComponent(FormAvulsoComponent);
    fixture.detectChanges();
    return fixture;
  }

  const preencher = (el: HTMLElement, descricao: string, valor: string) => {
    const [campoDescricao, campoValor] = el.querySelectorAll('input');
    campoDescricao.value = descricao;
    campoDescricao.dispatchEvent(new Event('input'));
    campoValor.value = valor;
    campoValor.dispatchEvent(new Event('input'));
  };
  const enviar = (el: HTMLElement) => el.querySelector('form')!.dispatchEvent(new Event('submit'));

  it('cria um rendimento do mês, com a descrição sem espaços nas pontas', () => {
    const fixture = criar();
    service.criar.mockReturnValue(of({}));

    expect(fixture.nativeElement.textContent).toContain('Novo rendimento de novembro de 2026');
    preencher(fixture.nativeElement, ' Icloud (Natalia) ', '66,90');
    enviar(fixture.nativeElement);

    expect(service.criar).toHaveBeenCalledWith({
      grupo: 'rendimento',
      competencia: '2026-11',
      descricao: 'Icloud (Natalia)',
      valor: '66.90',
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('não envia sem descrição', () => {
    const fixture = criar();

    preencher(fixture.nativeElement, '', '10');
    enviar(fixture.nativeElement);

    expect(service.criar).not.toHaveBeenCalled();
  });

  it('edita e exclui um avulso existente', () => {
    const fixture = criar({
      grupo: 'fixa',
      avulso: { id: 3, descricao: 'Docs moto', valor: '80.00' },
    });
    service.atualizar.mockReturnValue(of({}));
    service.excluir.mockReturnValue(of(undefined));
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Editar gasto fixo');
    expect((el.querySelectorAll('input')[1] as HTMLInputElement).value).toBe('80,00');
    preencher(el, 'Docs moto', '90');
    enviar(el);
    (el.querySelector('.form-avulso__excluir') as HTMLButtonElement).click();

    expect(service.atualizar).toHaveBeenCalledWith(3, { descricao: 'Docs moto', valor: '90.00' });
    expect(service.excluir).toHaveBeenCalledWith(3);
  });

  it('mostra o erro da API', () => {
    const fixture = criar();
    service.criar.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { valor: ['Inválido.'] } })),
    );

    preencher(fixture.nativeElement, 'Férias', '100');
    enviar(fixture.nativeElement);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role=alert]')).not.toBeNull();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
