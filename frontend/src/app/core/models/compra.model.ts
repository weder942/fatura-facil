/** Valores em dinheiro trafegam como string ("416.00"), nunca como number. */
export interface Parcela {
  id: number;
  parcela: number;
  competencia: string;
  valor: string;
  status: 'previsto' | 'confirmado';
}

export interface Compra {
  id: number;
  fonte: number;
  data: string;
  descricao: string;
  descricao_original: string;
  valor_total: string;
  n_parcelas: number;
  competencia_inicial: string;
  origem: 'manual' | 'importacao';
  parcelas: Parcela[];
}

export interface CompraEntrada {
  fonte: number;
  data: string;
  descricao: string;
  valor_total: string;
  n_parcelas: number;
  competencia_inicial: string;
  /** Só quando o usuário muda a 1ª parcela; as demais dividem o resto. */
  valor_primeira_parcela?: string;
}
