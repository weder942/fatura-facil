import { AbstractControl, FormControl } from '@angular/forms';

import { competenciaValida, valorComSinal } from './validadores';

describe('validadores', () => {
  it('valorComSinal aceita negativo e recusa texto', () => {
    expect(valorComSinal(new FormControl('-951,52', { nonNullable: true }))).toBeNull();
    expect(valorComSinal(new FormControl('abc', { nonNullable: true }))).toEqual({ valor: true });
    expect(valorComSinal({ value: null } as unknown as AbstractControl<string>)).toEqual({
      valor: true,
    });
  });

  it('competenciaValida exige AAAA-MM', () => {
    expect(competenciaValida(new FormControl('2026-11', { nonNullable: true }))).toBeNull();
    expect(competenciaValida(new FormControl('', { nonNullable: true }))).toEqual({
      competencia: true,
    });
    expect(competenciaValida({ value: null } as unknown as AbstractControl<string>)).toEqual({
      competencia: true,
    });
  });
});
