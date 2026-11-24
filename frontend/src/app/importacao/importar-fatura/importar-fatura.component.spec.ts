import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Fonte } from '../../core/models/fonte.model';
import { Decisao, LinhaDaPrevia, PreviaDaImportacao } from '../../core/models/importacao.model';
import { FonteService } from '../../core/services/fonte.service';
import { ImportacaoService } from '../../core/services/importacao.service';
import { ImportarFaturaComponent } from './importar-fatura.component';

registerLocaleData(localePt);

const BRADESCO: Fonte = {
  id: 1,
  nome: 'Bradesco',
  tipo: 'cartao',
  dia_fechamento: 25,
  dia_vencimento: 5,
  ativa: true,
  ordem: 1,
};
const VELHA: Fonte = { ...BRADESCO, id: 2, nome: 'Velha', ativa: false };

function linha(indice: number, extra: Partial<LinhaDaPrevia>): LinhaDaPrevia {
  return {
    indice,
    data: '2026-11-21',
    descricao: 'RESTAURANTE',
    cartao: '1234',
    parcela: '',
    valor: '33.69',
    classificacao: 'nova',
    motivo: '',
    vinculo: null,
    decisao: 'inserir',
    decisoes: ['ignorar', 'inserir'],
    ...extra,
  };
}

const PREVIA: PreviaDaImportacao = {
  banco: 'Bradesco Cartões',
  emitida_em: '2026-11-24',
  competencia: '2026-12',
  competencia_sugerida: '2026-12',
  total_da_fatura: '172.35',
  total_lido: '172.35',
  linhas: [
    linha(0, {}),
    linha(1, {
      descricao: 'ELIANE PEREIRA',
      parcela: '2/3',
      valor: '138.66',
      classificacao: 'existente',
      decisao: 'vincular',
      decisoes: ['ignorar', 'vincular'],
      vinculo: {
        id: 7,
        descricao: 'Óculos',
        competencia: '2026-12',
        parcela: '2/3',
        valor: '138.67',
      },
    }),
    linha(2, {
      descricao: 'PAGTO. POR DEB EM C/C',
      valor: '-100.00',
      classificacao: 'ignorada',
      motivo: 'Pagamento, saldo ou valor zero.',
      decisao: 'ignorar',
      decisoes: ['ignorar'],
    }),
  ],
  faltas: [{ id: 9, descricao: 'Ar', competencia: '2026-12', parcela: '8/12', valor: '180.74' }],
};

describe('ImportarFaturaComponent', () => {
  let fixture: ComponentFixture<ImportarFaturaComponent>;
  const importacoes = { previa: vi.fn(), importar: vi.fn() };
  const fontes = { listar: vi.fn() };
  const dialogRef = { close: vi.fn() };
  const arquivo = new File(['%PDF'], 'fatura.pdf', { type: 'application/pdf' });

  const componente = () =>
    fixture.componentInstance as unknown as {
      fonte: ImportarFaturaComponent['fonte'];
      competencia: ImportarFaturaComponent['competencia'];
      fontes: () => Fonte[];
      escolherArquivo(evento: Event): void;
      lerFatura(): void;
      trocarCompetencia(): void;
      voltar(): void;
      decidir(linha: LinhaDaPrevia, decisao: Decisao): void;
      importar(): void;
    };
  const texto = () => {
    fixture.detectChanges();
    return (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
  };
  const escolher = () => {
    componente().fonte.setValue(1);
    componente().escolherArquivo({ target: { files: [arquivo] } } as unknown as Event);
  };
  const lerPrevia = () => {
    escolher();
    componente().lerFatura();
    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fontes.listar.mockReturnValue(of([BRADESCO, VELHA]));
    importacoes.previa.mockReturnValue(of(PREVIA));
    importacoes.importar.mockReturnValue(
      of({ lote: 1, competencia: '2026-12', criados: 1, confirmados: 1, ignorados: 0 }),
    );
    TestBed.configureTestingModule({
      imports: [ImportarFaturaComponent],
      providers: [
        { provide: ImportacaoService, useValue: importacoes },
        { provide: FonteService, useValue: fontes },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    fixture = TestBed.createComponent(ImportarFaturaComponent);
    fixture.detectChanges();
  });

  it('oferece só as fontes ativas', () => {
    expect(
      componente()
        .fontes()
        .map((fonte) => fonte.nome),
    ).toEqual(['Bradesco']);
  });

  it('exige fonte e arquivo antes de ler', () => {
    componente().lerFatura();

    expect(texto()).toContain('Escolha o PDF da fatura.');
    expect(componente().fonte.touched).toBe(true);
    expect(importacoes.previa).not.toHaveBeenCalled();

    componente().escolherArquivo({ target: { files: [] } } as unknown as Event);
    componente().lerFatura();
    expect(importacoes.previa).not.toHaveBeenCalled();
  });

  it('mostra o nome do arquivo escolhido', () => {
    expect(texto()).toContain('Nenhum arquivo escolhido');
    escolher();
    expect(texto()).toContain('fatura.pdf');
  });

  it('lê a fatura e mostra a prévia', () => {
    lerPrevia();

    expect(importacoes.previa).toHaveBeenCalledWith(1, arquivo, undefined);
    expect(componente().competencia.value).toBe('2026-12');
    const conteudo = texto();
    expect(conteudo).toContain('Bradesco Cartões · emitida em 24/11/2026 · Bradesco');
    expect(conteudo).toContain('1 nova');
    expect(conteudo).toContain('1 já lançada');
    expect(conteudo).toContain('↳ Óculos 2/3 · R$ 138,67 · dezembro de 2026');
    expect(conteudo).toContain('Ar 8/12 · R$ 180,74');
    expect(conteudo).toContain('Importar (1 novas, 1 confirmadas)');
    expect(fixture.nativeElement.querySelector('.importar__total--diverge')).toBeNull();
    // A ignorada não tem o que escolher e não repete o motivo.
    expect(conteudo).not.toContain('Pagamento, saldo ou valor zero.');
    expect(fixture.nativeElement.querySelectorAll('mat-select').length).toBe(2);
  });

  it('avisa quando o total lido não bate com o da fatura', () => {
    importacoes.previa.mockReturnValue(of({ ...PREVIA, total_lido: '100.00' }));
    lerPrevia();

    expect(fixture.nativeElement.querySelector('.importar__total--diverge')).not.toBeNull();
  });

  it('fatura sem total e sem faltas', () => {
    importacoes.previa.mockReturnValue(
      of({ ...PREVIA, total_da_fatura: null, faltas: [], linhas: [] }),
    );
    lerPrevia();

    expect(texto()).toContain('Nenhum lançamento na fatura.');
    expect(texto()).not.toContain('que não vieram');
  });

  it('trocar a competência refaz a prévia', () => {
    lerPrevia();

    componente().trocarCompetencia(); // mesma competência
    componente().competencia.setValue('');
    componente().trocarCompetencia(); // inválida
    expect(importacoes.previa).toHaveBeenCalledTimes(1);

    componente().competencia.setValue('2027-01');
    componente().trocarCompetencia();
    expect(importacoes.previa).toHaveBeenLastCalledWith(1, arquivo, '2027-01');
  });

  it('importa com as decisões mudadas e fecha com a competência', () => {
    lerPrevia();
    componente().decidir(PREVIA.linhas[0], 'ignorar');
    componente().decidir(PREVIA.linhas[1], 'ignorar');
    componente().decidir(PREVIA.linhas[1], 'vincular'); // voltou ao padrão
    expect(texto()).toContain('Importar (0 novas, 1 confirmadas)');

    componente().importar();

    expect(importacoes.importar).toHaveBeenCalledWith(1, arquivo, '2026-12', { 0: 'ignorar' });
    expect(dialogRef.close).toHaveBeenCalledWith('2026-12');
  });

  it('importar sem prévia não faz nada', () => {
    componente().importar();

    expect(importacoes.importar).not.toHaveBeenCalled();
  });

  it('voltar descarta a prévia', () => {
    lerPrevia();
    componente().voltar();

    expect(texto()).toContain('Escolher PDF');
  });

  it('mostra o erro da API', () => {
    importacoes.previa.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: { detail: 'Ainda não sei ler este PDF.' },
          }),
      ),
    );
    lerPrevia();

    expect(texto()).toContain('Ainda não sei ler este PDF.');
    expect(texto()).toContain('Ler fatura');
  });
});
