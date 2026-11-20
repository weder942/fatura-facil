import { HttpErrorResponse } from '@angular/common/http';

import { mensagemDeErro } from './erro-da-api';

const erro = (corpo: unknown) => new HttpErrorResponse({ status: 400, error: corpo });

describe('mensagemDeErro', () => {
  it('usa o detail', () => {
    expect(mensagemDeErro(erro({ detail: 'Mês consolidado.' }))).toBe('Mês consolidado.');
  });

  it('junta erros por campo', () => {
    expect(
      mensagemDeErro(
        erro({ dia_fechamento: ['Obrigatório para cartão.'], non_field_errors: ['X'] }),
      ),
    ).toBe('dia_fechamento: Obrigatório para cartão. X');
  });

  it('cai no padrão quando não há corpo útil', () => {
    expect(mensagemDeErro(new Error('rede'))).toContain('Não foi possível');
    expect(mensagemDeErro(erro(null), 'padrão')).toBe('padrão');
    expect(mensagemDeErro(erro({}), 'padrão')).toBe('padrão');
  });
});
