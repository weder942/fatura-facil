import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoDoCofrinho } from '../../core/models/cofrinho.model';
import { rotuloDoDia } from '../../shared/utils/data';
import { movimento, textoDe } from '../cofrinhos.testing';
import { MovimentosComponent } from './movimentos.component';

registerLocaleData(localePt);

const MOVIMENTOS: MovimentoDoCofrinho[] = [
  movimento({
    id: 5,
    data: '2026-11-26',
    tipo: 'resgatado',
    informado: '100.00',
    valor: '-100.17',
    liquido: '100.00',
    ir: '0.07',
    iof: '0.10',
  }),
  movimento({
    id: 4,
    data: '2026-11-25',
    tipo: 'ajuste',
    informado: '3500.00',
    valor: '-2.00',
    liquido: '-1.98',
  }),
  movimento({ id: 3, data: '2026-11-24' }),
  movimento({
    id: 2,
    data: '2026-11-24',
    tipo: 'guardado',
    informado: '100.57',
    valor: '100.57',
    liquido: '100.57',
  }),
  movimento({
    id: 1,
    data: '2026-11-02',
    tipo: 'guardado',
    informado: '1000.00',
    inicial: true,
    valor: '1000.00',
    liquido: '1000.00',
  }),
];

describe('MovimentosComponent', () => {
  let fixture: ComponentFixture<MovimentosComponent>;

  function criar(movimentos: MovimentoDoCofrinho[], excluivel = false) {
    TestBed.configureTestingModule({
      imports: [MovimentosComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    fixture = TestBed.createComponent(MovimentosComponent);
    fixture.componentRef.setInput('movimentos', movimentos);
    fixture.componentRef.setInput('excluivel', excluivel);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }
  const texto = textoDe;

  it('agrupa por dia e mostra o líquido de cada movimento', () => {
    const el = criar(MOVIMENTOS);

    const rotulos = [...el.querySelectorAll('h3')].map((h) => h.textContent!.trim());
    expect(rotulos).toEqual(
      ['2026-11-26', '2026-11-25', '2026-11-24', '2026-11-02'].map((data) => rotuloDoDia(data)),
    );
    const conteudo = texto(el);
    expect(conteudo).toContain('Resgatado Saiu R$ 100,17 · IR R$ 0,07 · IOF R$ 0,10 -R$ 100,00');
    expect(conteudo).toContain('Ajuste de saldo Saldo no banco: R$ 3.500,00 -R$ 1,98');
    expect(conteudo).toContain('Rendimentos Bruto R$ 1,84 R$ 1,43');
    expect(conteudo).toContain('Saldo inicial');
    expect(el.querySelectorAll('.movimentos__valor--entrada').length).toBe(3);
    expect(el.querySelector('button')).toBeNull();
  });

  it('exclui só o que foi informado, e não o saldo inicial', () => {
    const el = criar(MOVIMENTOS, true);
    const excluidos: MovimentoDoCofrinho[] = [];
    fixture.componentInstance.excluir.subscribe((m) => excluidos.push(m));

    const botoes = el.querySelectorAll('button');
    expect(botoes.length).toBe(3);
    botoes[0].click();

    expect(excluidos).toEqual([MOVIMENTOS[0]]);
  });

  it('sem movimentos', () => {
    expect(texto(criar([]))).toContain('Nenhum movimento.');
  });
});
