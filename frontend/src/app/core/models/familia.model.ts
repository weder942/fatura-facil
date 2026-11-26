/** Assinatura dividida em rodízio (ex.: Apple iCloud): cada mês um membro paga. */
export interface MembroDaFamilia {
  nome: string;
  /** Quem administra a família: no mês dele não há rendimento a receber. */
  administrador: boolean;
}

export interface Familia {
  id: number;
  nome: string;
  fonte: number;
  valor: string;
  /** Competência em que o 1º membro paga; o rodízio conta daqui. */
  inicio: string;
  /** Última competência, se a família foi encerrada. */
  ate: string | null;
  membros: MembroDaFamilia[];
  /** Primeiro mês que uma mudança pode alcançar (os anteriores estão fechados). */
  primeira_editavel: string;
}

interface ConfiguracaoDaFamilia {
  fonte: number;
  nome: string;
  valor: string;
  membros: MembroDaFamilia[];
}

export interface NovaFamilia extends ConfiguracaoDaFamilia {
  inicio: string;
}

export interface AlteracaoDeFamilia extends ConfiguracaoDaFamilia {
  /** Mês em que a mudança começa; nele paga o 1º membro da lista. */
  a_partir_de: string;
}
