import { formatDate } from '@angular/common';

/** Competência no formato da API: "AAAA-MM". */
const FORMATO = /^(\d{4})-(\d{2})$/;

export function competenciaAtual(hoje: Date = new Date()): string {
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * O mês que está sendo planejado: o seguinte ao do calendário. As contas são
 * acompanhadas junto com a fatura do cartão, então em novembro planeja-se dezembro.
 */
export function competenciaEmAberto(hoje: Date = new Date()): string {
  return somarMeses(competenciaAtual(hoje), 1);
}

export function somarMeses(competencia: string, meses: number): string {
  const [ano, mes] = partes(competencia);
  const indice = ano * 12 + (mes - 1) + meses;
  return `${Math.floor(indice / 12)}-${String((indice % 12) + 1).padStart(2, '0')}`;
}

/** "2026-11" → "novembro de 2026". */
export function nomeDaCompetencia(competencia: string): string {
  const [ano, mes] = partes(competencia);
  return formatDate(new Date(ano, mes - 1, 1), "MMMM 'de' y", 'pt-BR');
}

function partes(competencia: string): [number, number] {
  const encontrado = FORMATO.exec(competencia);
  if (!encontrado) {
    throw new Error(`Competência inválida: ${competencia}`);
  }
  return [Number(encontrado[1]), Number(encontrado[2])];
}
