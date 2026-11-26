import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Cofrinho,
  MesDoCofrinho,
  MovimentoDoCofrinho,
  NovoCofrinho,
  NovoMovimento,
  TipoDeMovimento,
} from '../models/cofrinho.model';

const API = '/api/cofrinhos';

@Injectable({ providedIn: 'root' })
export class CofrinhoService {
  private readonly http = inject(HttpClient);

  listar(): Observable<Cofrinho[]> {
    return this.http.get<Cofrinho[]>(`${API}/`);
  }

  obter(id: number): Observable<Cofrinho> {
    return this.http.get<Cofrinho>(`${API}/${id}/`);
  }

  criar(cofrinho: NovoCofrinho): Observable<Cofrinho> {
    return this.http.post<Cofrinho>(`${API}/`, cofrinho);
  }

  atualizar(id: number, cofrinho: { nome?: string; banco?: number }): Observable<Cofrinho> {
    return this.http.patch<Cofrinho>(`${API}/${id}/`, cofrinho);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/`);
  }

  /** Novo % do CDI a partir de uma data (o banco mudou a taxa). */
  definirPercentual(id: number, percentual: string, aPartirDe: string): Observable<Cofrinho> {
    return this.http.post<Cofrinho>(`${API}/${id}/percentual/`, {
      percentual,
      a_partir_de: aPartirDe,
    });
  }

  movimentar(id: number, movimento: NovoMovimento): Observable<MovimentoDoCofrinho> {
    return this.http.post<MovimentoDoCofrinho>(`${API}/${id}/movimentos/`, movimento);
  }

  excluirMovimento(id: number, movimentoId: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}/movimentos/${movimentoId}/`);
  }

  /** Do mais recente ao mais antigo. */
  extrato(id: number, filtro: { tipo?: TipoDeMovimento; limite?: number } = {}) {
    let params = new HttpParams();
    if (filtro.tipo) {
      params = params.set('tipo', filtro.tipo);
    }
    if (filtro.limite) {
      params = params.set('limite', filtro.limite);
    }
    return this.http.get<MovimentoDoCofrinho[]>(`${API}/${id}/extrato/`, { params });
  }

  /** Um resumo por mês, do início do cofrinho até o mês atual. */
  rendimentos(id: number): Observable<MesDoCofrinho[]> {
    return this.http.get<MesDoCofrinho[]>(`${API}/${id}/rendimentos/`);
  }
}
