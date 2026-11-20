import { deCentavos, dividirEmParcelas, emCentavos, paraCampo, paraValorDaApi } from './dinheiro';

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

describe('parcelas em centavos', () => {
  it('converte de e para centavos', () => {
    expect(emCentavos('1234.5')).toBe(123450);
    expect(emCentavos('7')).toBe(700);
    expect(deCentavos(123405)).toBe('1234.05');
  });

  it('divide com a sobra na primeira', () => {
    expect(dividirEmParcelas('416.00', 3)).toEqual(['138.68', '138.66', '138.66']);
    expect(dividirEmParcelas('474.05', 5)).toEqual(Array(5).fill('94.81'));
  });

  it('recusa divisão impossível', () => {
    expect(dividirEmParcelas('0.02', 3)).toBeNull();
    expect(dividirEmParcelas('10.00', 0)).toBeNull();
  });
});
