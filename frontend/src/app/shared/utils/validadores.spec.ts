import { AbstractControl, FormControl } from '@angular/forms';

import { competenciaValida, taxaValida, valorComSinal, valorPositivo } from './validadores';

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

  it('valorPositivo recusa negativo e texto', () => {
    expect(valorPositivo(new FormControl('1.234,56', { nonNullable: true }))).toBeNull();
    expect(valorPositivo(new FormControl('0', { nonNullable: true }))).toBeNull();
    expect(valorPositivo(new FormControl('-1', { nonNullable: true }))).toEqual({ valor: true });
    expect(valorPositivo({ value: null } as unknown as AbstractControl<string>)).toEqual({
      valor: true,
    });
  });

  it('taxaValida exige uma taxa maior que zero', () => {
    expect(taxaValida(new FormControl('13,75', { nonNullable: true }))).toBeNull();
    expect(taxaValida(new FormControl('0', { nonNullable: true }))).toEqual({ taxa: true });
    expect(taxaValida(new FormControl('x', { nonNullable: true }))).toEqual({ taxa: true });
    expect(taxaValida({ value: null } as unknown as AbstractControl<string>)).toEqual({
      taxa: true,
    });
  });
});
