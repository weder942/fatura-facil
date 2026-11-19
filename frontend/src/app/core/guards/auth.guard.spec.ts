import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const autenticado = signal(false);

  const executar = (url: string) =>
    TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { autenticado } }],
    });
  });

  it('deixa passar quem está logado', () => {
    autenticado.set(true);

    expect(executar('/')).toBe(true);
  });

  it('manda para o login guardando a rota de retorno', () => {
    autenticado.set(false);

    const resultado = executar('/meses/2026-12') as UrlTree;

    expect(TestBed.inject(Router).serializeUrl(resultado)).toBe(
      '/login?retorno=%2Fmeses%2F2026-12',
    );
  });
});
