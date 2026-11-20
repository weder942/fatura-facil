import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';

import { CompetenciaDoHorizonte, LancamentoDoMes, VisaoDoMes } from '../core/models/mes.model';
import { MesService } from '../core/services/mes.service';
import {
  DadosDoFormCompra,
  FormCompraComponent,
} from '../compras/form-compra/form-compra.component';
import { CompetenciaPipe } from '../shared/pipes/competencia.pipe';
import { somarMeses } from '../shared/utils/competencia';
import { mensagemDeErro } from '../shared/utils/erro-da-api';

/** Tela principal: um mês por vez, com um bloco por fonte e o resumo. */
@Component({
  selector: 'app-visao-mensal',
  imports: [
    CurrencyPipe,
    CompetenciaPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './visao-mensal.component.html',
  styleUrl: './visao-mensal.component.scss',
})
export class VisaoMensalComponent {
  private readonly meses = inject(MesService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly recarregar$ = new BehaviorSubject<void>(undefined);

  protected readonly competencia = toSignal(
    this.route.paramMap.pipe(map((parametros) => parametros.get('competencia') ?? '')),
    { requireSync: true },
  );
  protected readonly visao = signal<VisaoDoMes | null>(null);
  protected readonly horizonte = signal<CompetenciaDoHorizonte[]>([]);
  protected readonly erro = signal<string | null>(null);

  protected readonly anterior = computed(() => this.navegavel(-1));
  protected readonly seguinte = computed(() => this.navegavel(1));
  /** O mês aberto entra na lista mesmo fora do horizonte (ex.: navegou além dele). */
  protected readonly opcoes = computed(() => {
    const lista = this.horizonte().map((item) => item.competencia);
    const atual = this.competencia();
    return lista.includes(atual) || !atual ? lista : [...lista, atual].sort();
  });

  constructor() {
    this.recarregar$
      .pipe(
        switchMap(() => this.meses.horizonte().pipe(catchError(() => of([])))),
        takeUntilDestroyed(),
      )
      .subscribe((horizonte) => this.horizonte.set(horizonte));

    combineLatest([this.route.paramMap, this.recarregar$])
      .pipe(
        map(([parametros]) => parametros.get('competencia') ?? ''),
        tap(() => this.erro.set(null)),
        switchMap((competencia) =>
          this.meses.visao(competencia).pipe(
            catchError((erro) => {
              this.erro.set(mensagemDeErro(erro, 'Não foi possível carregar o mês.'));
              return of(null);
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((visao) => this.visao.set(visao));
  }

  protected irPara(competencia: string): void {
    this.router.navigate(['/meses', competencia]);
  }

  protected novaCompra(): void {
    this.abrirCompra(null);
  }

  protected abrirLancamento(lancamento: LancamentoDoMes): void {
    if (lancamento.compra !== null) {
      this.abrirCompra(lancamento.compra);
    }
  }

  protected negativo(valor: string): boolean {
    return valor.startsWith('-');
  }

  private abrirCompra(compraId: number | null): void {
    this.dialog
      .open<FormCompraComponent, DadosDoFormCompra, boolean>(FormCompraComponent, {
        data: { compraId },
        autoFocus: 'first-tabbable',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.recarregar$.next());
  }

  private navegavel(meses: number): string | null {
    try {
      return somarMeses(this.competencia(), meses);
    } catch {
      return null;
    }
  }
}
