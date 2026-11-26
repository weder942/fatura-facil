import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { dataDaApi, dataNaApi, rotuloDoDia } from './data';

registerLocaleData(localePt);

describe('datas', () => {
  const hoje = new Date(2026, 10, 26, 15, 30);

  it('converte entre Date local e o formato da API', () => {
    expect(dataNaApi(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(dataDaApi('2026-11-24')).toEqual(new Date(2026, 10, 24));
    expect(dataNaApi()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('rotula os dias como o extrato do banco', () => {
    expect(rotuloDoDia('2026-11-26', hoje)).toBe('Hoje');
    expect(rotuloDoDia('2026-11-25', hoje)).toBe('Ontem');
    expect(rotuloDoDia('2026-11-24', hoje)).toBe('terça-feira, 24 de novembro');
    expect(rotuloDoDia('2025-12-31', hoje)).toBe('quarta-feira, 31 de dezembro de 2025');
    expect(rotuloDoDia('2026-11-26')).not.toBe('');
  });
});
