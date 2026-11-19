import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;
  const auth = { usuario: signal({ username: 'weder' }), sair: vi.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }],
    });
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
  });

  it('mostra o usuário logado', () => {
    expect(fixture.nativeElement.textContent).toContain('weder');
  });

  it('sair encerra a sessão e vai para o login', () => {
    auth.sair.mockReturnValue(of(undefined));

    fixture.nativeElement.querySelector('button[aria-label=Sair]').click();

    expect(auth.sair).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('vai para o login mesmo se o logout falhar', () => {
    auth.sair.mockReturnValue(throwError(() => new Error('falhou')));

    fixture.nativeElement.querySelector('button[aria-label=Sair]').click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
