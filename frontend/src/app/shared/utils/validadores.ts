import { AbstractControl, ValidationErrors } from '@angular/forms';

import { paraValorComSinal } from './dinheiro';

/** Valor em reais, podendo ser negativo (descontos nos rendimentos). */
export function valorComSinal(controle: AbstractControl<string>): ValidationErrors | null {
  return paraValorComSinal(controle.value ?? '') === null ? { valor: true } : null;
}

/** Competência "AAAA-MM", como o `<input type="month">` entrega. */
export function competenciaValida(controle: AbstractControl<string>): ValidationErrors | null {
  return /^\d{4}-\d{2}$/.test(controle.value ?? '') ? null : { competencia: true };
}
