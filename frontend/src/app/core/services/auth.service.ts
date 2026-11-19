import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';

import { Usuario } from '../models/usuario.model';

const API = '/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly usuarioAtual = signal<Usuario | null>(null);

  readonly usuario = this.usuarioAtual.asReadonly();
  readonly autenticado = computed(() => this.usuarioAtual() !== null);

  /** Garante o cookie CSRF e carrega o usuário da sessão, se houver. Nunca falha. */
  carregarSessao(): Observable<void> {
    return this.http.get<void>(`${API}/csrf/`).pipe(
      switchMap(() => this.http.get<Usuario>(`${API}/me/`)),
      tap((usuario) => this.usuarioAtual.set(usuario)),
      map(() => undefined),
      catchError(() => {
        this.usuarioAtual.set(null);
        return of(undefined);
      }),
    );
  }

  entrar(username: string, password: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${API}/login/`, { username, password })
      .pipe(tap((usuario) => this.usuarioAtual.set(usuario)));
  }

  sair(): Observable<void> {
    return this.http.post<void>(`${API}/logout/`, {}).pipe(finalize(() => this.limparSessao()));
  }

  limparSessao(): void {
    this.usuarioAtual.set(null);
  }
}
