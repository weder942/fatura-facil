export type Classificacao = 'nova' | 'existente' | 'suspeita' | 'ignorada';
export type Decisao = 'vincular' | 'inserir' | 'ignorar';

/** Lançamento do sistema ligado a uma linha da fatura (ou previsto que não veio). */
export interface LancamentoVinculado {
  id: number;
  descricao: string;
  competencia: string;
  parcela: string;
  valor: string;
}

export interface LinhaDaPrevia {
  indice: number;
  data: string;
  descricao: string;
  cartao: string;
  parcela: string;
  valor: string;
  classificacao: Classificacao;
  motivo: string;
  vinculo: LancamentoVinculado | null;
  /** Decisão padrão da classificação. */
  decisao: Decisao;
  decisoes: Decisao[];
}

export interface PreviaDaImportacao {
  banco: string;
  emitida_em: string;
  competencia: string;
  competencia_sugerida: string;
  total_da_fatura: string | null;
  total_lido: string;
  linhas: LinhaDaPrevia[];
  faltas: LancamentoVinculado[];
}

export interface ResultadoDaImportacao {
  lote: number;
  competencia: string;
  criados: number;
  confirmados: number;
  ignorados: number;
}

export const CLASSIFICACOES: Record<Classificacao, string> = {
  nova: 'Nova',
  existente: 'Já lançada',
  suspeita: 'Confira',
  ignorada: 'Ignorada',
};

export const DECISOES: Record<Decisao, string> = {
  vincular: 'É a mesma',
  inserir: 'Criar',
  ignorar: 'Ignorar',
};
