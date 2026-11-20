import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CompetenciaDoHorizonte, VisaoDoMes } from '../models/mes.model';

const API = '/api/meses';

@Injectable({ providedIn: 'root' })
export class MesService {
  private readonly http = inject(HttpClient);

  horizonte(): Observable<CompetenciaDoHorizonte[]> {
    return this.http.get<CompetenciaDoHorizonte[]>(`${API}/`);
  }

  visao(competencia: string): Observable<VisaoDoMes> {
    return this.http.get<VisaoDoMes>(`${API}/${competencia}/`);
  }
}
