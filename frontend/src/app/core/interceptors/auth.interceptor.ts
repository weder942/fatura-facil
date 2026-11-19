import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Sessão expirada (401) em qualquer chamada fora de /api/auth/ leva ao login. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((erro: unknown) => {
      if (
        erro instanceof HttpErrorResponse &&
        erro.status === 401 &&
        !req.url.startsWith('/api/auth/')
      ) {
        auth.limparSessao();
        router.navigate(['/login'], { queryParams: { retorno: router.url } });
      }
      return throwError(() => erro);
    }),
  );
};
