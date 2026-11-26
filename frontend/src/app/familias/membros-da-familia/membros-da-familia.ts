import { FormArray, FormControl, Validators } from '@angular/forms';

import { MembroDaFamilia } from '../../core/models/familia.model';
import { mesesEntre } from '../../shared/utils/competencia';

/** Os nomes na ordem do rodízio e o índice de quem administra (ou null). */
export interface FormDeMembros {
  nomes: FormArray<FormControl<string>>;
  administrador: FormControl<number | null>;
}

export const MAXIMO_DE_MEMBROS = 12;

export function campoDeMembro(nome = ''): FormControl<string> {
  return new FormControl(nome, {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(60)],
  });
}

export function criarFormDeMembros(membros: MembroDaFamilia[]): FormDeMembros {
  const administrador = membros.findIndex((membro) => membro.administrador);
  return {
    nomes: new FormArray(membros.map((membro) => campoDeMembro(membro.nome))),
    administrador: new FormControl(administrador === -1 ? null : administrador),
  };
}

export function membrosDoForm({ nomes, administrador }: FormDeMembros): MembroDaFamilia[] {
  return nomes.controls.map((campo, indice) => ({
    nome: campo.value.trim(),
    administrador: indice === administrador.value,
  }));
}

/**
 * A lista começando por quem paga em `competencia`: o rodízio conta a partir
 * de `inicio`, em que paga o 1º membro.
 */
export function membrosAPartirDe(
  membros: MembroDaFamilia[],
  inicio: string,
  competencia: string,
): MembroDaFamilia[] {
  const total = membros.length;
  const vez = ((mesesEntre(inicio, competencia) % total) + total) % total;
  return [...membros.slice(vez), ...membros.slice(0, vez)];
}
