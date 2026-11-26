import { Cofrinho, MovimentoDoCofrinho } from '../core/models/cofrinho.model';

/** Dados de exemplo para os specs dos cofrinhos. */
export const RESERVA: Cofrinho = {
  id: 3,
  nome: 'Reserva',
  banco: 1,
  banco_nome: 'PicPay',
  inicio: '2026-11-02',
  percentual: '102.00',
  percentuais: [{ vigente_desde: '2026-11-02', percentual: '102.00' }],
  saldo_bruto: '10029.40',
  saldo_liquido: '10017.48',
  ir_estimado: '5.08',
  iof_estimado: '6.84',
  ja_rendeu: '17.48',
  rendeu_no_mes: '17.48',
};

export function movimento(extra: Partial<MovimentoDoCofrinho>): MovimentoDoCofrinho {
  return {
    id: 1,
    data: '2026-11-24',
    tipo: 'rendimento',
    informado: null,
    inicial: false,
    valor: '1.84',
    liquido: '1.43',
    ir: '0.00',
    iof: '0.00',
    ...extra,
  };
}

/** O texto visível com um espaço entre os elementos, como o usuário lê. */
export function textoDe(elemento: HTMLElement): string {
  const partes: string[] = [];
  const caminhante = document.createTreeWalker(elemento, NodeFilter.SHOW_TEXT);
  while (caminhante.nextNode()) {
    partes.push(caminhante.currentNode.textContent ?? '');
  }
  return partes.join(' ').replace(/\s+/g, ' ').trim();
}
