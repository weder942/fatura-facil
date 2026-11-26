import { Grupo } from './recorrente.model';

/** Rendimento ou fixa de um mês só (férias, reembolso de alguém). */
export interface Avulso {
  id: number;
  grupo: Grupo;
  competencia: string;
  descricao: string;
  valor: string;
  familia?: number | null;
}

export type AvulsoEntrada = Omit<Avulso, 'id' | 'familia'>;
