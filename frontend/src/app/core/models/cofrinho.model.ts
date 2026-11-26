/** Onde o dinheiro de um cofrinho está guardado. */
export interface Banco {
  id: number;
  nome: string;
  ativo: boolean;
}

/** Selic meta vigente a partir de uma data ("AAAA-MM-DD"); o CDI fica junto. */
export interface TaxaSelic {
  id: number;
  vigente_desde: string;
  selic: string;
  cdi: string;
}

export interface NovaTaxaSelic {
  vigente_desde: string;
  selic: string;
  /** Vazio: a Selic menos 0,10 ponto. */
  cdi: string | null;
}

export interface PercentualDoCofrinho {
  vigente_desde: string;
  percentual: string;
}

/** Saldos e rendimentos são calculados pela API, dia útil a dia útil. */
export interface Cofrinho {
  id: number;
  nome: string;
  banco: number;
  banco_nome: string;
  inicio: string;
  /** % do CDI vigente hoje. */
  percentual: string;
  percentuais: PercentualDoCofrinho[];
  saldo_bruto: string;
  /** O que sobraria resgatando tudo hoje (sem IR e IOF). */
  saldo_liquido: string;
  ir_estimado: string;
  iof_estimado: string;
  ja_rendeu: string;
  rendeu_no_mes: string;
}

export interface NovoCofrinho {
  nome: string;
  banco: number;
  inicio: string;
  saldo: string;
  percentual: string;
}

export type TipoDeMovimento = 'guardado' | 'resgatado' | 'rendimento' | 'ajuste';

export const TIPOS_DE_MOVIMENTO: Record<TipoDeMovimento, string> = {
  guardado: 'Guardado',
  resgatado: 'Resgatado',
  rendimento: 'Rendimentos',
  ajuste: 'Ajuste de saldo',
};

export interface MovimentoDoCofrinho {
  id: number;
  data: string;
  tipo: TipoDeMovimento;
  /** Null nos rendimentos, que são calculados. */
  informado: string | null;
  inicial: boolean;
  /** Efeito no saldo bruto (negativo quando sai). */
  valor: string;
  /** O que o extrato mostra: rendimento sem o IR; resgate, o que caiu na conta. */
  liquido: string;
  ir: string;
  iof: string;
}

export type TipoInformado = Exclude<TipoDeMovimento, 'rendimento'>;

export interface NovoMovimento {
  tipo: TipoInformado;
  data: string;
  informado: string;
}

/** Resumo de um mês: IR e IOF são a variação da provisão mais o retido em resgates. */
export interface MesDoCofrinho {
  mes: string;
  bruto: string;
  ajustes: string;
  ir: string;
  iof: string;
  liquido: string;
}
