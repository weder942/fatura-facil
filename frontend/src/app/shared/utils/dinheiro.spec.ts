import { paraCampo, paraValorDaApi } from './dinheiro';

describe('dinheiro', () => {
  it.each([
    ['416,00', '416.00'],
    ['416', '416.00'],
    ['416,5', '416.50'],
    ['1.234,56', '1234.56'],
    ['R$ 1.234,56', '1234.56'],
    ['416.00', '416.00'],
    ['0,01', '0.01'],
    [' 12,30 ', '12.30'],
  ])('%s → %s', (digitado, esperado) => {
    expect(paraValorDaApi(digitado)).toBe(esperado);
  });

  it.each(['', 'abc', '1,234', '12,345', '1.23.4', '-10,00', '10,'])('recusa "%s"', (digitado) => {
    expect(paraValorDaApi(digitado)).toBeNull();
  });

  it('paraCampo troca o ponto pela vírgula', () => {
    expect(paraCampo('1234.50')).toBe('1234,50');
  });
});
