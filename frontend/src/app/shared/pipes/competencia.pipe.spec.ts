import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CompetenciaPipe } from './competencia.pipe';

registerLocaleData(localePt);

describe('CompetenciaPipe', () => {
  it('formata e tolera vazio', () => {
    const pipe = new CompetenciaPipe();

    expect(pipe.transform('2027-01')).toBe('janeiro de 2027');
    expect(pipe.transform(null)).toBe('');
  });
});
