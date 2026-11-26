import { AbstractControl, ValidationErrors } from '@angular/forms';

import { paraTaxaDaApi, paraValorComSinal, paraValorDaApi } from './dinheiro';

/** Valor em reais, podendo ser negativo (descontos nos rendimentos). */
export function valorComSinal(controle: AbstractControl<string>): ValidationErrors | null {
  return paraValorComSinal(controle.value ?? '') === null ? { valor: true } : null;
}

/** Competência "AAAA-MM", como o `<input type="month">` entrega. */
export function competenciaValida(controle: AbstractControl<string>): ValidationErrors | null {
  return /^\d{4}-\d{2}$/.test(controle.value ?? '') ? null : { competencia: true };
}

/** Valor em reais, zero ou positivo ("1.234,56", "0"). */
export function valorPositivo(controle: AbstractControl<string>): ValidationErrors | null {
  return paraValorDaApi(controle.value ?? '') === null ? { valor: true } : null;
}

/** Taxa em % ("13,75", "102"), maior que zero. */
export function taxaValida(controle: AbstractControl<string>): ValidationErrors | null {
  const valor = paraTaxaDaApi(controle.value ?? '');
  return valor === null || Number(valor) <= 0 ? { taxa: true } : null;
}
