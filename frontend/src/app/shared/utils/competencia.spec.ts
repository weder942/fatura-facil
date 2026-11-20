import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { competenciaAtual, nomeDaCompetencia, somarMeses } from './competencia';

registerLocaleData(localePt);

describe('competência', () => {
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
