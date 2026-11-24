import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

import { Fonte } from '../../core/models/fonte.model';
import {
  CLASSIFICACOES,
  Classificacao,
  DECISOES,
  Decisao,
  LinhaDaPrevia,
  PreviaDaImportacao,
} from '../../core/models/importacao.model';
import { FonteService } from '../../core/services/fonte.service';
import { ImportacaoService } from '../../core/services/importacao.service';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { competenciaValida } from '../../shared/utils/validadores';

/**
 * Importar a fatura em PDF: escolhe a fonte e o arquivo, revisa a prévia
 * (o que é novo, o que já está lançado, o que precisa de conferência) e
 * importa. Fecha com a competência importada, ou sem valor se cancelar.
 */
@Component({
  selector: 'app-importar-fatura',
  imports: [
    CompetenciaPipe,
    CurrencyPipe,
    DatePipe,
    LowerCasePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  templateUrl: './importar-fatura.component.html',
  styleUrl: './importar-fatura.component.scss',
})
export class ImportarFaturaComponent {
  private readonly importacoes = inject(ImportacaoService);
  private readonly dialogRef =
    inject<MatDialogRef<ImportarFaturaComponent, string | undefined>>(MatDialogRef);

  protected readonly classificacoes = CLASSIFICACOES;
  protected readonly ordemDasClasses: Classificacao[] = [
    'nova',
    'existente',
    'suspeita',
    'ignorada',
  ];
  protected readonly rotulosDeDecisao = DECISOES;

  protected readonly fontes = signal<Fonte[]>([]);
  protected readonly fonte = new FormControl<number | null>(null, Validators.required);
  protected readonly arquivo = signal<File | null>(null);
  protected readonly competencia = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, competenciaValida],
  });

  protected readonly previa = signal<PreviaDaImportacao | null>(null);
  /** Só as decisões que o usuário mudou; o resto segue o padrão da linha. */
  protected readonly decisoes = signal<Record<number, Decisao>>({});
  protected readonly carregando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly contagem = computed(() => {
    const previa = this.previa();
    const porClasse: Record<Classificacao, number> = {
      nova: 0,
      existente: 0,
      suspeita: 0,
      ignorada: 0,
    };
    const porDecisao: Record<Decisao, number> = { vincular: 0, inserir: 0, ignorar: 0 };
    for (const linha of previa?.linhas ?? []) {
      porClasse[linha.classificacao]++;
      porDecisao[this.decisaoDe(linha)]++;
    }
    return { porClasse, porDecisao };
  });

  /** O total lido (sem pagamentos) bate com o total impresso na fatura? */
  protected readonly totalConfere = computed(() => {
    const previa = this.previa();
    return !previa?.total_da_fatura || previa.total_da_fatura === previa.total_lido;
  });

  constructor() {
    inject(FonteService)
      .listar()
      .subscribe((fontes) => this.fontes.set(fontes.filter((fonte) => fonte.ativa)));
  }

  protected nomeDaFonte(): string {
    return this.fontes().find((fonte) => fonte.id === this.fonte.value)?.nome ?? '';
  }

  protected escolherArquivo(evento: Event): void {
    const entrada = evento.target as HTMLInputElement;
    this.arquivo.set(entrada.files?.[0] ?? null);
    this.erro.set(null);
  }

  protected lerFatura(): void {
    if (this.fonte.invalid || !this.arquivo()) {
      this.fonte.markAsTouched();
      this.erro.set(this.arquivo() ? null : 'Escolha o PDF da fatura.');
      return;
    }
    this.carregarPrevia();
  }

  /** Outra competência muda o que casa com o quê: refaz a prévia. */
  protected trocarCompetencia(): void {
    if (this.competencia.valid && this.competencia.value !== this.previa()?.competencia) {
      this.carregarPrevia(this.competencia.value);
    }
  }

  protected voltar(): void {
    this.previa.set(null);
    this.decisoes.set({});
    this.erro.set(null);
  }

  protected decisaoDe(linha: LinhaDaPrevia): Decisao {
    return this.decisoes()[linha.indice] ?? linha.decisao;
  }

  protected decidir(linha: LinhaDaPrevia, decisao: Decisao): void {
    this.decisoes.update((atuais) => {
      const novas = { ...atuais };
      if (decisao === linha.decisao) {
        delete novas[linha.indice];
      } else {
        novas[linha.indice] = decisao;
      }
      return novas;
    });
  }

  protected importar(): void {
    const previa = this.previa();
    if (!previa || this.carregando()) {
      return;
    }
    this.executar(
      this.importacoes.importar(
        this.fonte.value!,
        this.arquivo()!,
        previa.competencia,
        this.decisoes(),
      ),
      (resultado) => this.dialogRef.close(resultado.competencia),
    );
  }

  private carregarPrevia(competencia?: string): void {
    this.executar(
      this.importacoes.previa(this.fonte.value!, this.arquivo()!, competencia),
      (previa) => {
        this.previa.set(previa);
        this.decisoes.set({});
        this.competencia.setValue(previa.competencia);
      },
    );
  }

  private executar<T>(requisicao: Observable<T>, sucesso: (resposta: T) => void): void {
    this.carregando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: (resposta) => {
        this.carregando.set(false);
        sucesso(resposta);
      },
      error: (erro) => {
        this.carregando.set(false);
        this.erro.set(mensagemDeErro(erro, 'Não foi possível ler a fatura.'));
      },
    });
  }
}
