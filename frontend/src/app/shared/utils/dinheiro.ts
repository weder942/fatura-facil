/**
 * Dinheiro no front é sempre string. Nada de aritmética com number: os totais
 * vêm calculados da API.
 */

const BRASILEIRO = /^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+(,\d{1,2})?$/;
const API = /^\d+(\.\d{1,2})?$/;

/**
 * Converte o que o usuário digitou ("1.234,5", "416,00", "416.00", "416") para
 * o formato da API ("1234.50"). Devolve null se não for um valor válido.
 */
export function paraValorDaApi(digitado: string): string | null {
  const texto = digitado.trim().replace(/^R\$\s*/, '');
  let inteiro: string;
  let centavos: string;

  if (API.test(texto) && !texto.includes(',')) {
    [inteiro, centavos = ''] = texto.split('.');
  } else if (BRASILEIRO.test(texto)) {
    [inteiro, centavos = ''] = texto.replace(/\./g, '').split(',');
  } else {
    return null;
  }
  return `${String(Number(inteiro))}.${centavos.padEnd(2, '0')}`;
}

/** "1234.50" (API) → "1234,50" (para preencher um campo de edição). */
export function paraCampo(valorDaApi: string): string {
  return valorDaApi.replace('.', ',');
}
