export type TipoFonte = 'cartao' | 'dinheiro' | 'conta';

export interface Fonte {
  id: number;
  nome: string;
  tipo: TipoFonte;
  dia_fechamento: number | null;
  dia_vencimento: number | null;
  ativa: boolean;
  ordem: number;
}

export type FonteEntrada = Omit<Fonte, 'id'>;

export const TIPOS_DE_FONTE: { valor: TipoFonte; rotulo: string }[] = [
  { valor: 'cartao', rotulo: 'Cartão' },
  { valor: 'dinheiro', rotulo: 'Dinheiro' },
  { valor: 'conta', rotulo: 'Conta' },
];
