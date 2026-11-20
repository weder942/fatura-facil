export type Grupo = 'rendimento' | 'fixa';

export const GRUPOS: { valor: Grupo; rotulo: string }[] = [
  { valor: 'rendimento', rotulo: 'Rendimento' },
  { valor: 'fixa', rotulo: 'Fixa' },
];

/** Um valor com vigência: vale de `a_partir_de` até o próximo reajuste (ou até `ate`). */
export interface Vigencia {
  id: number;
  valor: string;
  a_partir_de: string;
  ate: string | null;
}

export interface Recorrente {
  id: number;
  nome: string;
  grupo: Grupo;
  variavel: boolean;
  ordem: number;
  valores: Vigencia[];
  /** Valor na competência atual; null se ainda não começou ou já terminou. */
  valor_atual: string | null;
}

export interface RecorrenteEntrada {
  nome: string;
  grupo: Grupo;
  variavel: boolean;
  ordem: number;
  /** Só na criação: a primeira vigência. */
  valor?: string;
  a_partir_de?: string;
}
