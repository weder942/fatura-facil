import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { VisaoDoMes } from '../core/models/mes.model';
import { MesService } from '../core/services/mes.service';
import { FormCompraComponent } from '../compras/form-compra/form-compra.component';
import { FormAvulsoComponent } from './form-avulso/form-avulso.component';
import { ValorDoMesComponent } from './valor-do-mes/valor-do-mes.component';
import { VisaoMensalComponent } from './visao-mensal.component';

registerLocaleData(localePt);

const NOVEMBRO: VisaoDoMes = {
  competencia: '2026-11',
  rendimentos: [],
  fixas: [],
  fontes: [
    {
      fonte: { id: 1, nome: 'Nubank', tipo: 'cartao', ativa: true },
      total: '1234.56',
      lancamentos: [
        {
          id: 10,
          compra: 5,
          fonte: 1,
          competencia: '2026-11',
          descricao: 'Passagem',
          parcela: '2/4',
          valor: '1234.56',
          tipo: 'normal',
          status: 'previsto',
          origem: 'importacao',
        },
      ],
    },
    {
      fonte: { id: 2, nome: 'Dinheiro', tipo: 'dinheiro', ativa: true },
      total: '0.00',
      lancamentos: [],
    },
  ],
  resumo: {
    total_rendimentos: '0.00',
    total_fixas: '0.00',
    total_dinheiro_e_contas: '0.00',
    total_cartoes: '1234.56',
    saldo: '-1234.56',
  },
};

describe('VisaoMensalComponent', () => {
  let fixture: ComponentFixture<VisaoMensalComponent>;
  let router: Router;
  const parametros = new BehaviorSubject(convertToParamMap({ competencia: '2026-11' }));
  const meses = { visao: vi.fn(), horizonte: vi.fn() };
  const dialog = { open: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    parametros.next(convertToParamMap({ competencia: '2026-11' }));
    meses.visao.mockReturnValue(of(NOVEMBRO));
    meses.horizonte.mockReturnValue(
      of([
        { competencia: '2026-11', atual: true },
        { competencia: '2026-12', atual: false },
      ]),
    );
    TestBed.configureTestingModule({
      imports: [VisaoMensalComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: parametros } },
        { provide: MesService, useValue: meses },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(VisaoMensalComponent);
    fixture.detectChanges();
  });

  const texto = () => (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');

  it('mostra blocos, parcelas e valores em reais', () => {
    expect(meses.visao).toHaveBeenCalledWith('2026-11');
    expect(texto()).toContain('Nubank');
    expect(texto()).toContain('Passagem');
    expect(texto()).toContain('2/4');
    expect(texto()).toMatch(/R\$\s1\.234,56/);
    expect(texto()).toContain('Nenhum lançamento.');
  });

  it('destaca importados e saldo negativo', () => {
    expect(fixture.nativeElement.querySelector('.mes__lancamento--importado')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.mes__saldo--negativo')).not.toBeNull();
  });

  it('navega para o mês anterior e o seguinte', () => {
    fixture.nativeElement.querySelector('[aria-label="Mês anterior"]').click();
    fixture.nativeElement.querySelector('[aria-label="Mês seguinte"]').click();

    expect(router.navigate).toHaveBeenCalledWith(['/meses', '2026-10']);
    expect(router.navigate).toHaveBeenCalledWith(['/meses', '2026-12']);
  });

  it('recarrega quando a rota muda de mês', () => {
    parametros.next(convertToParamMap({ competencia: '2026-12' }));

    expect(meses.visao).toHaveBeenLastCalledWith('2026-12');
  });

  it('clicar num lançamento abre a compra e recarrega se ela mudou', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });

    fixture.nativeElement.querySelector('.mes__lancamento').click();

    expect(dialog.open).toHaveBeenCalledWith(
      FormCompraComponent,
      expect.objectContaining({ data: { compraId: 5, fonteId: null } }),
    );
    expect(meses.visao).toHaveBeenCalledTimes(2);
    expect(meses.horizonte).toHaveBeenCalledTimes(2);
  });

  it('nova compra abre o formulário vazio e não recarrega se cancelar', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(false) });

    fixture.nativeElement.querySelector('.mes__cabecalho > button').click();

    expect(dialog.open).toHaveBeenCalledWith(
      FormCompraComponent,
      expect.objectContaining({
        data: { compraId: null, fonteId: null },
        autoFocus: 'first-tabbable',
      }),
    );
    expect(meses.visao).toHaveBeenCalledTimes(1);
  });

  it('o "+" do bloco da fonte abre a nova compra com a fonte escolhida', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });

    const botao = fixture.nativeElement.querySelector(
      '[aria-label="Nova compra em Dinheiro"]',
    ) as HTMLButtonElement;
    botao.click();

    expect(dialog.open).toHaveBeenCalledWith(
      FormCompraComponent,
      expect.objectContaining({
        data: { compraId: null, fonteId: 2 },
        autoFocus: '.form-compra__descricao',
      }),
    );
    expect(meses.visao).toHaveBeenCalledTimes(2);
  });

  it('sem fontes, convida a cadastrar', () => {
    meses.visao.mockReturnValue(of({ ...NOVEMBRO, fontes: [] }));
    parametros.next(convertToParamMap({ competencia: '2026-11' }));
    fixture.detectChanges();

    expect(texto()).toContain('Nenhuma fonte cadastrada');
  });

  it('mostra o erro da API', () => {
    meses.visao.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Competência inválida.' } }),
      ),
    );
    parametros.next(convertToParamMap({ competencia: '2026-13' }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain(
      'Competência inválida.',
    );
  });

  describe('rendimentos e fixas', () => {
    const energia = {
      tipo: 'recorrente' as const,
      id: 7,
      descricao: 'Energia',
      valor: '432.80',
      variavel: true,
      pendente: true,
      ajustado: false,
    };
    const reembolso = {
      tipo: 'avulso' as const,
      id: 3,
      descricao: 'Icloud (Natalia)',
      valor: '66.90',
      variavel: false,
      pendente: false,
      ajustado: false,
    };
    const aluguel = {
      ...energia,
      id: 8,
      descricao: 'Aluguel',
      variavel: false,
      pendente: false,
      ajustado: true,
    };

    beforeEach(() => {
      meses.visao.mockReturnValue(
        of({
          ...NOVEMBRO,
          rendimentos: [reembolso],
          fixas: [aluguel, energia],
          resumo: { ...NOVEMBRO.resumo, total_rendimentos: '66.90', total_fixas: '1710.79' },
        }),
      );
      parametros.next(convertToParamMap({ competencia: '2026-11' }));
      fixture.detectChanges();
      dialog.open.mockReturnValue({ afterClosed: () => of(true) });
    });

    const linha = (descricao: string) =>
      [...fixture.nativeElement.querySelectorAll('.mes__lancamento')].find((el: HTMLElement) =>
        el.textContent!.includes(descricao),
      ) as HTMLElement;

    it('mostra os blocos com totais e marca estimado, ajustado e só este mês', () => {
      expect(texto()).toContain('Rendimentos');
      expect(texto()).toMatch(/R\$\s1\.710,79/);
      expect(linha('Energia').textContent).toContain('estimado');
      expect(linha('Energia').querySelector('.mes__valor--estimado')).not.toBeNull();
      expect(linha('Aluguel').textContent).toContain('ajustado');
      expect(linha('Icloud').textContent).toContain('só este mês');
    });

    it('recorrente abre o valor do mês e recarrega', () => {
      linha('Energia').click();

      expect(dialog.open).toHaveBeenCalledWith(ValorDoMesComponent, {
        data: { item: energia, competencia: '2026-11' },
      });
      expect(meses.visao).toHaveBeenCalledTimes(3);
    });

    it('avulso abre a edição no grupo certo', () => {
      linha('Icloud').click();

      expect(dialog.open).toHaveBeenCalledWith(FormAvulsoComponent, {
        data: { grupo: 'rendimento', competencia: '2026-11', avulso: reembolso },
      });
    });

    it('o + do bloco cria um avulso do mês', () => {
      fixture.nativeElement.querySelector('[aria-label="Adicionar fixas só deste mês"]').click();

      expect(dialog.open).toHaveBeenCalledWith(FormAvulsoComponent, {
        data: { grupo: 'fixa', competencia: '2026-11', avulso: null },
      });
    });
  });

  it('sem rendimentos, convida a cadastrar recorrentes', () => {
    expect(texto()).toContain('Cadastre os recorrentes');
  });
});
