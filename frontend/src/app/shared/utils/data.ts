import { formatDate } from '@angular/common';

/** Data local como a API e o `<input type="date">` usam: "AAAA-MM-DD". */
export function dataNaApi(dia: Date = new Date()): string {
  const mes = String(dia.getMonth() + 1).padStart(2, '0');
  return `${dia.getFullYear()}-${mes}-${String(dia.getDate()).padStart(2, '0')}`;
}

/** "AAAA-MM-DD" → Date local (sem o deslocamento de fuso de `new Date(texto)`). */
export function dataDaApi(texto: string): Date {
  const [ano, mes, dia] = texto.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

/** Como o extrato do banco agrupa: "Hoje", "Ontem", "terça, 24 de novembro". */
export function rotuloDoDia(texto: string, hoje: Date = new Date()): string {
  if (texto === dataNaApi(hoje)) {
    return 'Hoje';
  }
  const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1);
  if (texto === dataNaApi(ontem)) {
    return 'Ontem';
  }
  const dia = dataDaApi(texto);
  const formato =
    dia.getFullYear() === hoje.getFullYear() ? "EEEE, d 'de' MMMM" : "EEEE, d 'de' MMMM 'de' y";
  return formatDate(dia, formato, 'pt-BR');
}
