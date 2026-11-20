import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Avulso, AvulsoEntrada } from '../models/avulso.model';

const API = '/api/avulsos';

@Injectable({ providedIn: 'root' })
export class AvulsoService {
  private readonly http = inject(HttpClient);

  criar(avulso: AvulsoEntrada): Observable<Avulso> {
    return this.http.post<Avulso>(`${API}/`, avulso);
  }

  atualizar(id: number, avulso: Partial<AvulsoEntrada>): Observable<Avulso> {
    return this.http.patch<Avulso>(`${API}/${id}/`, avulso);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }
}
