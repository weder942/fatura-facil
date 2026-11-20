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

/*
 * Para PRÉ-VISUALIZAR parcelas no formulário: conta em centavos inteiros
 * (nunca em reais com casas decimais), espelhando a regra do backend — a
 * sobra dos centavos vai para a 1ª. Quem decide os valores gravados é a API.
 */

export function emCentavos(valorDaApi: string): number {
  const [inteiro, decimais = ''] = valorDaApi.split('.');
  return Number(inteiro) * 100 + Number(decimais.padEnd(2, '0'));
}

export function deCentavos(centavos: number): string {
  return `${Math.floor(centavos / 100)}.${String(centavos % 100).padStart(2, '0')}`;
}

/** Divide como o banco: "416.00" em 3 → ["138.68", "138.66", "138.66"]. Null se não der 1 centavo por parcela. */
export function dividirEmParcelas(totalDaApi: string, n: number): string[] | null {
  const total = emCentavos(totalDaApi);
  if (!Number.isInteger(n) || n < 1 || total < n) {
    return null;
  }
  const base = Math.floor(total / n);
  const sobra = total - base * n;
  return [deCentavos(base + sobra), ...Array.from({ length: n - 1 }, () => deCentavos(base))];
}
