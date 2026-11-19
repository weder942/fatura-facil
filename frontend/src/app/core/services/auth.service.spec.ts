import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('começa sem usuário', () => {
    expect(service.autenticado()).toBe(false);
  });

  it('carregarSessao busca o CSRF e depois o usuário logado', () => {
    service.carregarSessao().subscribe();

    http.expectOne('/api/auth/csrf/').flush(null, { status: 204, statusText: 'No Content' });
    http.expectOne('/api/auth/me/').flush({ username: 'weder' });

    expect(service.usuario()).toEqual({ username: 'weder' });
    expect(service.autenticado()).toBe(true);
  });

  it('carregarSessao sem sessão termina sem erro e sem usuário', () => {
    let concluiu = false;
    service.carregarSessao().subscribe({ complete: () => (concluiu = true) });

    http.expectOne('/api/auth/csrf/').flush(null, { status: 204, statusText: 'No Content' });
    http
      .expectOne('/api/auth/me/')
      .flush({ detail: 'x' }, { status: 401, statusText: 'Unauthorized' });

    expect(concluiu).toBe(true);
    expect(service.autenticado()).toBe(false);
  });

  it('entrar envia as credenciais e guarda o usuário', () => {
    service.entrar('weder', 'segredo').subscribe();

    const req = http.expectOne('/api/auth/login/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'weder', password: 'segredo' });
    req.flush({ username: 'weder' });

    expect(service.usuario()).toEqual({ username: 'weder' });
  });

  it('entrar com erro não guarda usuário', () => {
    service.entrar('weder', 'errada').subscribe({ error: () => undefined });

    http
      .expectOne('/api/auth/login/')
      .flush({ detail: 'Usuário ou senha inválidos.' }, { status: 400, statusText: 'Bad Request' });

    expect(service.autenticado()).toBe(false);
  });

  it('sair limpa o usuário mesmo se a API falhar', () => {
    service.entrar('weder', 'segredo').subscribe();
    http.expectOne('/api/auth/login/').flush({ username: 'weder' });

    service.sair().subscribe({ error: () => undefined });
    http.expectOne('/api/auth/logout/').flush(null, { status: 500, statusText: 'Erro' });

    expect(service.autenticado()).toBe(false);
  });
});
