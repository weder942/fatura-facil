import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { NovaTaxaSelic, TaxaSelic } from '../models/cofrinho.model';

const API = '/api/taxas-selic';

@Injectable({ providedIn: 'root' })
export class TaxaSelicService {
  private readonly http = inject(HttpClient);

  /** Da mais recente à mais antiga. */
  listar(): Observable<TaxaSelic[]> {
    return this.http.get<TaxaSelic[]>(`${API}/`);
  }

  /** Numa data que já tem taxa, corrige aquela taxa. */
  salvar(taxa: NovaTaxaSelic): Observable<TaxaSelic> {
    return this.http.post<TaxaSelic>(`${API}/`, taxa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }
}
