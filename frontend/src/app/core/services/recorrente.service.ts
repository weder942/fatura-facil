import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Grupo, Recorrente, RecorrenteEntrada } from '../models/recorrente.model';

const API = '/api/recorrentes';

@Injectable({ providedIn: 'root' })
export class RecorrenteService {
  private readonly http = inject(HttpClient);

  listar(grupo?: Grupo): Observable<Recorrente[]> {
    const params = grupo ? new HttpParams().set('grupo', grupo) : undefined;
    return this.http.get<Recorrente[]>(`${API}/`, { params });
  }

  criar(recorrente: RecorrenteEntrada): Observable<Recorrente> {
    return this.http.post<Recorrente>(`${API}/`, recorrente);
  }

  atualizar(id: number, recorrente: Partial<RecorrenteEntrada>): Observable<Recorrente> {
    return this.http.patch<Recorrente>(`${API}/${id}/`, recorrente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }

  /** Novo valor a partir de uma competência ("AAAA-MM"). */
  reajustar(id: number, valor: string, aPartirDe: string): Observable<Recorrente> {
    return this.http.post<Recorrente>(`${API}/${id}/reajustar/`, { valor, a_partir_de: aPartirDe });
  }

  /** O recorrente deixa de existir depois da competência `ate`. */
  encerrar(id: number, ate: string): Observable<Recorrente> {
    return this.http.post<Recorrente>(`${API}/${id}/encerrar/`, { ate });
  }

  removerVigencia(id: number, vigenciaId: number): Observable<Recorrente> {
    return this.http.delete<Recorrente>(`${API}/${id}/valores/${vigenciaId}/`);
  }

  /** O valor real do mês (variável) ou um ajuste só naquele mês (fixo). */
  definirNoMes(id: number, competencia: string, valor: string): Observable<{ valor: string }> {
    return this.http.put<{ valor: string }>(`${API}/${id}/meses/${competencia}/`, { valor });
  }

  limparNoMes(id: number, competencia: string): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/meses/${competencia}/`);
  }
}
