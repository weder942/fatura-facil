import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';

import {
  CompetenciaDoHorizonte,
  ItemDoMes,
  LancamentoDoMes,
  VisaoDoMes,
} from '../core/models/mes.model';
import { Grupo } from '../core/models/recorrente.model';
import { MesService } from '../core/services/mes.service';
import {
  DadosDoFormCompra,
  FormCompraComponent,
} from '../compras/form-compra/form-compra.component';
import {
  DadosDoFormFamilia,
  FormFamiliaComponent,
} from '../familias/form-familia/form-familia.component';
import { ImportarFaturaComponent } from '../importacao/importar-fatura/importar-fatura.component';
import { CompetenciaPipe } from '../shared/pipes/competencia.pipe';
import { DadosDoFormAvulso, FormAvulsoComponent } from './form-avulso/form-avulso.component';
import { DadosDoValorDoMes, ValorDoMesComponent } from './valor-do-mes/valor-do-mes.component';
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

  /** Os blocos de rendimentos e fixas, antes dos blocos das fontes. */
  protected readonly grupos = computed(() => {
    const mes = this.visao();
    if (!mes) {
      return [];
    }
    return [
      {
        valor: 'rendimento' as Grupo,
        titulo: 'Rendimentos',
        itens: mes.rendimentos,
        total: mes.resumo.total_rendimentos,
      },
      { valor: 'fixa' as Grupo, titulo: 'Fixas', itens: mes.fixas, total: mes.resumo.total_fixas },
    ];
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

  protected novaCompra(fonteId: number | null = null): void {
    this.abrirCompra(null, fonteId);
  }

  /** Depois de importar, mostra o mês da fatura. */
  protected importarFatura(): void {
    this.dialog
      .open<ImportarFaturaComponent, void, string>(ImportarFaturaComponent, {
        width: 'min(960px, 95vw)',
        maxWidth: '95vw',
        autoFocus: 'first-tabbable',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((competencia) => {
        this.irPara(competencia);
        this.recarregar$.next(); // o horizonte pode ter crescido com parcelas novas
      });
  }

  protected abrirLancamento(lancamento: LancamentoDoMes): void {
    if (lancamento.compra !== null) {
      this.abrirCompra(lancamento.compra);
    } else if (lancamento.familia !== null) {
      this.abrirFamilia(lancamento.familia);
    }
  }

  protected novoAvulso(grupo: Grupo): void {
    this.aoFechar(
      this.dialog.open<FormAvulsoComponent, DadosDoFormAvulso, boolean>(FormAvulsoComponent, {
        data: { grupo, competencia: this.competencia(), avulso: null },
      }),
    );
  }

  /** Recorrente: valor deste mês. Avulso: editar ou excluir. De família: a família. */
  protected abrirItem(item: ItemDoMes, grupo: Grupo): void {
    if (item.familia) {
      this.abrirFamilia(item.familia);
      return;
    }
    const competencia = this.competencia();
    this.aoFechar(
      item.tipo === 'recorrente'
        ? this.dialog.open<ValorDoMesComponent, DadosDoValorDoMes, boolean>(ValorDoMesComponent, {
            data: { item, competencia },
          })
        : this.dialog.open<FormAvulsoComponent, DadosDoFormAvulso, boolean>(FormAvulsoComponent, {
            data: { grupo, competencia, avulso: item },
          }),
    );
  }

  protected negativo(valor: string): boolean {
    return valor.startsWith('-');
  }

  private abrirCompra(compraId: number | null, fonteId: number | null = null): void {
    this.aoFechar(
      this.dialog.open<FormCompraComponent, DadosDoFormCompra, boolean>(FormCompraComponent, {
        data: { compraId, fonteId },
        // Vindo do "+" de uma fonte, ela já está escolhida: começa pela descrição.
        autoFocus: fonteId === null ? 'first-tabbable' : '.form-compra__descricao',
      }),
    );
  }

  private abrirFamilia(familiaId: number): void {
    this.aoFechar(
      this.dialog.open<FormFamiliaComponent, DadosDoFormFamilia, boolean>(FormFamiliaComponent, {
        data: { familiaId },
      }),
    );
  }

  /** Recarrega o mês se o diálogo fechar dizendo que algo mudou. */
  private aoFechar(dialogo: MatDialogRef<unknown, boolean>): void {
    dialogo
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
