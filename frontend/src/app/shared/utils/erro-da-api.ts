import { HttpErrorResponse } from '@angular/common/http';

/** Mensagem legível de um erro da API: {"detail": "..."} ou erros por campo. */
export function mensagemDeErro(
  erro: unknown,
  padrao = 'Não foi possível concluir. Tente novamente.',
): string {
  if (!(erro instanceof HttpErrorResponse) || !erro.error || typeof erro.error !== 'object') {
    return padrao;
  }
  const corpo = erro.error as Record<string, unknown>;
  if (typeof corpo['detail'] === 'string') {
    return corpo['detail'];
  }
  const mensagens = Object.entries(corpo).map(([campo, valor]) => {
    const texto = Array.isArray(valor) ? valor.join(' ') : String(valor);
    return campo === 'non_field_errors' ? texto : `${campo}: ${texto}`;
  });
  return mensagens.length ? mensagens.join(' ') : padrao;
}
