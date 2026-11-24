import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import {
  competenciaAtual,
  competenciaEmAberto,
  nomeDaCompetencia,
  somarMeses,
} from './competencia';

registerLocaleData(localePt);

describe('competência', () => {
  it('o mês em aberto é o seguinte ao do calendário', () => {
    expect(competenciaEmAberto(new Date(2026, 10, 24))).toBe('2026-12');
    expect(competenciaEmAberto(new Date(2026, 11, 31))).toBe('2027-01');
  });

  it('competenciaAtual usa o mês da data local', () => {
    expect(competenciaAtual(new Date(2026, 0, 31))).toBe('2026-01');
  });

  it.each([
    ['2026-11', 1, '2026-12'],
    ['2026-12', 1, '2027-01'],
    ['2027-01', -1, '2026-12'],
    ['2026-12', 25, '2029-01'],
  ])('somarMeses(%s, %i) = %s', (competencia, meses, esperado) => {
    expect(somarMeses(competencia, meses)).toBe(esperado);
  });

  it('nomeDaCompetencia em português', () => {
    expect(nomeDaCompetencia('2026-11')).toBe('novembro de 2026');
  });

  it('recusa formato inválido', () => {
    expect(() => somarMeses('2026/11', 1)).toThrow();
  });
});
