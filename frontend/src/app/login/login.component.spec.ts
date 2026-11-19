import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';

import { Usuario } from '../core/models/usuario.model';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let resposta: Subject<Usuario>;
  const autenticado = signal(false);
  const auth = { autenticado, entrar: vi.fn() };

  function criar(retorno: string | null = null) {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap(retorno ? { retorno } : {}) } },
        },
      ],
    });
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  }

  function preencherEEnviar(username = 'weder', password = 'segredo') {
    const el: HTMLElement = fixture.nativeElement;
    const [usuario, senha] = Array.from(el.querySelectorAll('input'));
    usuario.value = username;
    usuario.dispatchEvent(new Event('input'));
    senha.value = password;
    senha.dispatchEvent(new Event('input'));
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  beforeEach(() => {
    autenticado.set(false);
    resposta = new Subject<Usuario>();
    auth.entrar.mockReset().mockReturnValue(resposta);
  });

  it('não envia com campos vazios', () => {
    criar();

    preencherEEnviar('', '');

    expect(auth.entrar).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Informe o usuário.');
  });

  it('entra e volta para a rota de retorno', () => {
    criar('/meses/2026-12');

    preencherEEnviar();
    resposta.next({ username: 'weder' });

    expect(auth.entrar).toHaveBeenCalledWith('weder', 'segredo');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/meses/2026-12');
  });

  it('ignora rota de retorno que não é interna', () => {
    criar('https://exemplo.com');

    preencherEEnviar();
    resposta.next({ username: 'weder' });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('mostra o detail da API quando a senha está errada', () => {
    criar();

    preencherEEnviar();
    resposta.error(
      new HttpErrorResponse({ status: 400, error: { detail: 'Usuário ou senha inválidos.' } }),
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain(
      'Usuário ou senha inválidos.',
    );
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(false);
  });

  it('avisa quando o login foi limitado por excesso de tentativas', () => {
    criar();

    preencherEEnviar();
    resposta.error(new HttpErrorResponse({ status: 429 }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Muitas tentativas');
  });

  it('quem já está logado vai direto para o início', () => {
    autenticado.set(true);

    criar();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
