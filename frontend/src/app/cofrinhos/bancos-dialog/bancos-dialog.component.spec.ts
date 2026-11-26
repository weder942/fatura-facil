import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Banco } from '../../core/models/cofrinho.model';
import { BancoService } from '../../core/services/banco.service';
import { BancosDialogComponent } from './bancos-dialog.component';

const PICPAY: Banco = { id: 1, nome: 'PicPay', ativo: true };

describe('BancosDialogComponent', () => {
  let fixture: ComponentFixture<BancosDialogComponent>;
  const service = { listar: vi.fn(), criar: vi.fn(), atualizar: vi.fn(), excluir: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    service.listar.mockReturnValue(of([PICPAY]));
    TestBed.configureTestingModule({
      imports: [BancosDialogComponent],
      providers: [
        { provide: BancoService, useValue: service },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    });
    fixture = TestBed.createComponent(BancosDialogComponent);
    fixture.detectChanges();
  });

  const componente = () =>
    fixture.componentInstance as unknown as {
      nome: BancosDialogComponent['nome'];
      mudou: () => boolean;
      adicionar(): void;
      alternar(banco: Banco): void;
      excluir(banco: Banco): void;
    };

  it('lista e adiciona', () => {
    service.criar.mockReturnValue(of({ id: 2, nome: 'Nubank', ativo: true }));

    expect(fixture.nativeElement.textContent).toContain('PicPay');
    componente().adicionar();
    expect(service.criar).not.toHaveBeenCalled();

    componente().nome.setValue(' Nubank ');
    componente().adicionar();

    expect(service.criar).toHaveBeenCalledWith('Nubank');
    expect(componente().nome.value).toBe('');
    expect(componente().mudou()).toBe(true);
    expect(service.listar).toHaveBeenCalledTimes(2);
  });

  it('ativa e desativa', () => {
    service.atualizar.mockReturnValue(of({}));

    componente().alternar(PICPAY);

    expect(service.atualizar).toHaveBeenCalledWith(1, { ativo: false });
  });

  it('mostra o erro ao excluir banco com cofrinho', () => {
    service.excluir.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { detail: 'Tem cofrinhos.' } })),
    );

    fixture.nativeElement.querySelector('[aria-label="Excluir PicPay"]').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Tem cofrinhos.');
    expect(componente().mudou()).toBe(false);
  });

  it('sem bancos', () => {
    service.listar.mockReturnValue(of([]));
    fixture = TestBed.createComponent(BancosDialogComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nenhum banco cadastrado.');
  });
});
