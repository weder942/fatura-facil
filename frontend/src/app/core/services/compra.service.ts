import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Compra, CompraEntrada } from '../models/compra.model';

const API = '/api/compras';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private readonly http = inject(HttpClient);

  obter(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${API}/${id}/`);
  }

  criar(compra: CompraEntrada): Observable<Compra> {
    return this.http.post<Compra>(`${API}/`, compra);
  }

  atualizar(id: number, compra: Partial<CompraEntrada>): Observable<Compra> {
    return this.http.patch<Compra>(`${API}/${id}/`, compra);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }

  /** Ajusta o valor de uma parcela (o total da compra acompanha no backend). */
  ajustarParcela(lancamentoId: number, valor: string): Observable<unknown> {
    return this.http.patch(`/api/lancamentos/${lancamentoId}/`, { valor });
  }
}
