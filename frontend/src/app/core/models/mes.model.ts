import { TipoFonte } from './fonte.model';

/** Uma linha de rendimentos ou fixas. */
export interface ItemDoMes {
  tipo: 'recorrente' | 'avulso';
  id: number;
  descricao: string;
  valor: string;
  variavel: boolean;
  /** Variável sem o valor real do mês: o valor mostrado é estimativa. */
  pendente: boolean;
  /** Fixo com valor sobrescrito só neste mês. */
  ajustado: boolean;
}

export interface LancamentoDoMes {
  id: number;
  compra: number | null;
  fonte: number;
  competencia: string;
  descricao: string;
  parcela: string;
  valor: string;
  tipo: 'normal' | 'estorno' | 'recorrente';
  status: 'previsto' | 'confirmado';
  origem: 'manual' | 'importacao' | 'planilha';
}

export interface BlocoDaFonte {
  fonte: { id: number; nome: string; tipo: TipoFonte; ativa: boolean };
  lancamentos: LancamentoDoMes[];
  total: string;
}

export interface ResumoDoMes {
  total_rendimentos: string;
  total_fixas: string;
  total_dinheiro_e_contas: string;
  total_cartoes: string;
  saldo: string;
}

export interface VisaoDoMes {
  competencia: string;
  rendimentos: ItemDoMes[];
  fixas: ItemDoMes[];
  fontes: BlocoDaFonte[];
  resumo: ResumoDoMes;
}

export interface CompetenciaDoHorizonte {
  competencia: string;
  atual: boolean;
}
