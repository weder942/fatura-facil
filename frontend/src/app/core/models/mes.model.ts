import { TipoFonte } from './fonte.model';

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
  origem: 'manual' | 'importacao';
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
  rendimentos: LancamentoDoMes[];
  fixas: LancamentoDoMes[];
  fontes: BlocoDaFonte[];
  resumo: ResumoDoMes;
}

export interface CompetenciaDoHorizonte {
  competencia: string;
  atual: boolean;
}
