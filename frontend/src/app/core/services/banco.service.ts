import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Banco } from '../models/cofrinho.model';

const API = '/api/bancos';

@Injectable({ providedIn: 'root' })
export class BancoService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${API}/`);
  }

  criar(nome: string): Observable<Banco> {
    return this.http.post<Banco>(`${API}/`, { nome });
  }

  atualizar(id: number, banco: Partial<Omit<Banco, 'id'>>): Observable<Banco> {
    return this.http.patch<Banco>(`${API}/${id}/`, banco);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }
}
