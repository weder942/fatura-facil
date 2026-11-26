import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { Banco } from '../../core/models/cofrinho.model';
import { BancoService } from '../../core/services/banco.service';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';

/** Cadastro dos bancos onde ficam os cofrinhos. Fecha com `true` se algo mudou. */
@Component({
  selector: 'app-bancos-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './bancos-dialog.component.html',
  styleUrl: './bancos-dialog.component.scss',
})
export class BancosDialogComponent {
  private readonly service = inject(BancoService);

  protected readonly bancos = signal<Banco[]>([]);
  protected readonly mudou = signal(false);
  protected readonly erro = signal<string | null>(null);
  protected readonly nome = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(60)],
  });

  constructor() {
    this.carregar();
  }

  protected adicionar(): void {
    if (this.nome.invalid) {
      this.nome.markAsTouched();
      return;
    }
    this.executar(this.service.criar(this.nome.value.trim()), () => this.nome.reset());
  }

  protected alternar(banco: Banco): void {
    this.executar(this.service.atualizar(banco.id, { ativo: !banco.ativo }));
  }

  protected excluir(banco: Banco): void {
    this.executar(this.service.excluir(banco.id));
  }

  private executar(requisicao: Observable<unknown>, depois?: () => void): void {
    this.erro.set(null);
    requisicao.subscribe({
      next: () => {
        this.mudou.set(true);
        depois?.();
        this.carregar();
      },
      error: (erro) => this.erro.set(mensagemDeErro(erro)),
    });
  }

  private carregar(): void {
    this.service.listar().subscribe((bancos) => this.bancos.set(bancos));
  }
}
