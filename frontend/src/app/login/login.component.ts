import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  protected readonly enviando = signal(false);
  protected readonly erro = signal<string | null>(null);

  constructor() {
    if (this.auth.autenticado()) {
      this.irParaRetorno();
    }
  }

  protected entrar(): void {
    if (this.form.invalid || this.enviando()) {
      this.form.markAllAsTouched();
      return;
    }
    this.enviando.set(true);
    this.erro.set(null);

    const { username, password } = this.form.getRawValue();
    this.auth.entrar(username, password).subscribe({
      next: () => this.irParaRetorno(),
      error: (resposta: HttpErrorResponse) => {
        this.enviando.set(false);
        this.erro.set(this.mensagemDeErro(resposta));
      },
    });
  }

  private irParaRetorno(): void {
    const retorno = this.route.snapshot.queryParamMap.get('retorno');
    this.router.navigateByUrl(retorno?.startsWith('/') ? retorno : '/');
  }

  private mensagemDeErro(resposta: HttpErrorResponse): string {
    if (resposta.status === 429) {
      return 'Muitas tentativas. Aguarde um minuto e tente de novo.';
    }
    return resposta.error?.detail ?? 'Não foi possível entrar. Tente novamente.';
  }
}
