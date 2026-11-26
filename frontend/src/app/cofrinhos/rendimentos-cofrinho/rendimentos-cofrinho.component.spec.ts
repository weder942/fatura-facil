import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { MesDoCofrinho } from '../../core/models/cofrinho.model';
import { CofrinhoService } from '../../core/services/cofrinho.service';
import { RESERVA, textoDe } from '../cofrinhos.testing';
import { RendimentosCofrinhoComponent } from './rendimentos-cofrinho.component';

registerLocaleData(localePt);

const MESES: MesDoCofrinho[] = [
  { mes: '2026-09', bruto: '20.00', ajustes: '0.00', ir: '3.00', iof: '5.00', liquido: '12.00' },
  { mes: '2026-10', bruto: '40.00', ajustes: '0.00', ir: '8.00', iof: '-5.00', liquido: '37.00' },
  { mes: '2026-11', bruto: '32.00', ajustes: '-1.50', ir: '-0.50', iof: '0.00', liquido: '31.00' },
];

describe('RendimentosCofrinhoComponent', () => {
  let fixture: ComponentFixture<RendimentosCofrinhoComponent>;
  const service = { obter: vi.fn(), rendimentos: vi.fn() };
  const snackBar = { open: vi.fn() };

  function criar(meses: MesDoCofrinho[] = MESES) {
    vi.clearAllMocks();
    service.obter.mockReturnValue(of(RESERVA));
    service.rendimentos.mockReturnValue(of(meses));
    TestBed.configureTestingModule({
      imports: [RendimentosCofrinhoComponent],
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
    fixture = TestBed.createComponent(RendimentosCofrinhoComponent);
    fixture.detectChanges();
  }

  const texto = () => {
    fixture.detectChanges();
    return textoDe(fixture.nativeElement);
  };
  const chips = () =>
    [...fixture.nativeElement.querySelectorAll('.chips__chip')] as HTMLButtonElement[];
  const chip = (rotulo: string) => chips().find((b) => b.textContent!.trim() === rotulo)!;

  it('abre no mês atual, com os meses anteriores e a visão geral', () => {
    criar();

    expect(chips().map((b) => b.textContent!.trim())).toEqual([
      'Setembro de 2026',
      'Outubro de 2026',
      'Este mês',
      'Visão geral',
    ]);
    const conteudo = texto();
    expect(conteudo).toContain('102% do CDI · desde 02/11/2026');
    expect(conteudo).toContain('Rendeu em novembro R$ 31,00');
    expect(conteudo).toContain('Rendimento bruto R$ 32,00');
    expect(conteudo).toContain('Ajuste de saldo -R$ 1,50');
    expect(conteudo).toContain('Restituição de IR R$ 0,50');
    expect(conteudo).toContain('Desconto IOF R$ 0,00');
    expect(conteudo).toContain('Rendimento líquido R$ 31,00');
  });

  it('mês com restituição de IOF', () => {
    criar();
    chip('Outubro de 2026').click();

    const conteudo = texto();
    expect(conteudo).toContain('Rendeu em outubro R$ 37,00');
    expect(conteudo).toContain('Desconto IR -R$ 8,00');
    expect(conteudo).toContain('Restituição de IOF R$ 5,00');
    expect(conteudo).not.toContain('Ajuste de saldo');
  });

  it('visão geral soma todos os meses', () => {
    criar();
    chip('Visão geral').click();

    const conteudo = texto();
    expect(conteudo).toContain('Rendeu desde o início R$ 80,00');
    expect(conteudo).toContain('Rendimento bruto R$ 92,00');
    expect(conteudo).toContain('Desconto IR -R$ 10,50');
    expect(conteudo).toContain('Desconto IOF R$ 0,00');
  });

  it('sem meses fica na visão geral', () => {
    criar([]);

    expect(chips().map((b) => b.textContent!.trim())).toEqual(['Visão geral']);
    expect(texto()).toContain('Rendeu desde o início R$ 0,00');
  });

  it('mês que não existe não mostra nada', () => {
    criar();
    (
      fixture.componentInstance as unknown as { selecionado: { set(v: string): void } }
    ).selecionado.set('2020-01');

    expect(texto()).not.toContain('Rendimento líquido');
  });

  it('erro ao carregar', () => {
    vi.clearAllMocks();
    service.obter.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 404, error: { detail: 'Não encontrado.' } }),
      ),
    );
    service.rendimentos.mockReturnValue(of([]));
    TestBed.configureTestingModule({
      imports: [RendimentosCofrinhoComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '3' }) } },
        },
        { provide: CofrinhoService, useValue: service },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
    fixture = TestBed.createComponent(RendimentosCofrinhoComponent);
    fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith('Não encontrado.', 'Fechar');
  });
});
