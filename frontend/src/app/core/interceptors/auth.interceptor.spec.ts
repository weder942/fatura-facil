import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let router: Router;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    vi.spyOn(auth, 'limparSessao');
  });

  afterEach(() => controller.verify());

  it('401 numa rota da API leva ao login e repassa o erro', () => {
    let recebeuErro = false;
    http.get('/api/meses/').subscribe({ error: () => (recebeuErro = true) });

    controller.expectOne('/api/meses/').flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(recebeuErro).toBe(true);
    expect(auth.limparSessao).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { retorno: '/' } });
  });

  it('401 nas rotas de autenticação não redireciona', () => {
    http.get('/api/auth/me/').subscribe({ error: () => undefined });

    controller.expectOne('/api/auth/me/').flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('outros erros não redirecionam', () => {
    http.get('/api/meses/').subscribe({ error: () => undefined });

    controller.expectOne('/api/meses/').flush({}, { status: 403, statusText: 'Forbidden' });

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
