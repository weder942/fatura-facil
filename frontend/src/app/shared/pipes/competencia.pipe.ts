import { Pipe, PipeTransform } from '@angular/core';

import { nomeDaCompetencia } from '../utils/competencia';

/** "2026-11" → "novembro de 2026". */
@Pipe({ name: 'competencia' })
export class CompetenciaPipe implements PipeTransform {
  transform(competencia: string | null | undefined): string {
    return competencia ? nomeDaCompetencia(competencia) : '';
  }
}
