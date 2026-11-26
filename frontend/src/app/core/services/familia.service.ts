import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AlteracaoDeFamilia, Familia, NovaFamilia } from '../models/familia.model';

const API = '/api/familias';

@Injectable({ providedIn: 'root' })
export class FamiliaService {
  private readonly http = inject(HttpClient);

  obter(id: number): Observable<Familia> {
    return this.http.get<Familia>(`${API}/${id}/`);
  }

  criar(familia: NovaFamilia): Observable<Familia> {
    return this.http.post<Familia>(`${API}/`, familia);
  }

  alterar(id: number, alteracao: AlteracaoDeFamilia): Observable<Familia> {
    return this.http.post<Familia>(`${API}/${id}/alterar/`, alteracao);
  }

  /** Sem mensalidade a partir do mês. Responde sem corpo se a família foi apagada. */
  encerrar(id: number, aPartirDe: string): Observable<Familia | null> {
    return this.http.post<Familia | null>(`${API}/${id}/encerrar/`, { a_partir_de: aPartirDe });
  }
}
