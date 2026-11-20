import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Fonte, FonteEntrada } from '../models/fonte.model';

const API = '/api/fontes';

@Injectable({ providedIn: 'root' })
export class FonteService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Fonte[]> {
    return this.http.get<Fonte[]>(`${API}/`);
  }

  criar(fonte: FonteEntrada): Observable<Fonte> {
    return this.http.post<Fonte>(`${API}/`, fonte);
  }

  atualizar(id: number, fonte: Partial<FonteEntrada>): Observable<Fonte> {
    return this.http.patch<Fonte>(`${API}/${id}/`, fonte);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }

  /** Competência ("AAAA-MM") da 1ª parcela de uma compra nesta fonte na data informada. */
  competenciaSugerida(id: number, data: string): Observable<string> {
    const params = new HttpParams().set('data', data);
    return this.http
      .get<{ competencia: string }>(`${API}/${id}/competencia-sugerida/`, { params })
      .pipe(map((resposta) => resposta.competencia));
  }
}
