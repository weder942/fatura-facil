import { HttpErrorResponse } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Compra } from '../../core/models/compra.model';
import { Fonte } from '../../core/models/fonte.model';
import { CompraService } from '../../core/services/compra.service';
import { FonteService } from '../../core/services/fonte.service';
import { FormCompraComponent } from './form-compra.component';

registerLocaleData(localePt);

const NUBANK: Fonte = {
  id: 1,
  nome: 'Nubank',
  tipo: 'cartao',
  dia_fechamento: 3,
  dia_vencimento: 10,
  ativa: true,
  ordem: 0,
};
const INATIVA: Fonte = {
  id: 2,
  nome: 'Inativa',
  tipo: 'dinheiro',
  dia_fechamento: null,
  dia_vencimento: null,
  ativa: false,
  ordem: 1,
};
const OCULOS: Compra = {
  id: 7,
  fonte: 1,
  data: '2026-11-24',
  descricao: 'Óculos',
  descricao_original: '',
  valor_total: '416.00',
  n_parcelas: 3,
  competencia_inicial: '2026-12',
  origem: 'manual',
  parcelas: [
    { id: 71, parcela: 1, competencia: '2026-12', valor: '138.68', status: 'previsto' },
    { id: 72, parcela: 2, competencia: '2027-01', valor: '138.66', status: 'confirmado' },
    { id: 73, parcela: 3, competencia: '2027-02', valor: '138.66', status: 'previsto' },
  ],
};

describe('FormCompraComponent', () => {
  let fixture: ComponentFixture<FormCompraComponent>;
  const compras = {
    obter: vi.fn(),
    criar: vi.fn(),
    atualizar: vi.fn(),
    excluir: vi.fn(),
    ajustarParcela: vi.fn(),
  };
  const fontes = { listar: vi.fn(), competenciaSugerida: vi.fn() };
  const dialogRef = { close: vi.fn() };
  const dialog = { open: vi.fn() };

  function criar(compraId: number | null = null) {
    TestBed.configureTestingModule({
      imports: [FormCompraComponent],
      providers: [
        { provide: CompraService, useValue: compras },
        { provide: FonteService, useValue: fontes },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { compraId } },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(FormCompraComponent);
    fixture.detectChanges();
  }

  const componente = () =>
    fixture.componentInstance as unknown as {
      form: FormCompraComponent['form'];
      fontesDisponiveis: () => Fonte[];
    };
  const form = () => componente().form;
  const texto = () => {
    fixture.detectChanges();
    return (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
  };
  const enviar = () => {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };
  const preencherBasico = () =>
    form().patchValue({ fonte: 1, data: '2026-11-25', descricao: ' Óculos ' });

  beforeEach(() => {
    vi.clearAllMocks();
    fontes.listar.mockReturnValue(of([NUBANK, INATIVA]));
    fontes.competenciaSugerida.mockReturnValue(of('2027-01'));
    compras.obter.mockReturnValue(of(OCULOS));
    compras.criar.mockReturnValue(of(OCULOS));
    compras.atualizar.mockReturnValue(of(OCULOS));
  });

  describe('nova compra à vista', () => {
    beforeEach(() => criar());

    it('só oferece fontes ativas', () => {
      expect(
        componente()
          .fontesDisponiveis()
          .map((f) => f.nome),
      ).toEqual(['Nubank']);
    });

    it('mostra "Valor" e "Competência", sem campos de parcela', () => {
      expect(texto()).toContain('Valor');
      expect(texto()).toContain('Competência');
      expect(texto()).not.toContain('Competência da 1ª parcela');
      expect(texto()).not.toContain('Valor da 1ª parcela');
    });

    it('preenche a competência com a sugerida pela fonte e data', () => {
      preencherBasico();

      expect(fontes.competenciaSugerida).toHaveBeenLastCalledWith(1, '2026-11-25');
      expect(form().controls.competencia.value).toBe('2027-01');
    });

    it('não sobrescreve a competência escolhida à mão', () => {
      form().controls.competencia.setValue('2027-03');
      form().controls.competencia.markAsDirty();

      preencherBasico();

      expect(form().controls.competencia.value).toBe('2027-03');
      expect(texto()).toContain('Sugerida: janeiro de 2027');
    });

    it('envia 1 parcela com a competência e o valor no formato da API', () => {
      preencherBasico();
      form().patchValue({ valor_total: '1.416,5' });

      enviar();

      expect(compras.criar).toHaveBeenCalledWith({
        fonte: 1,
        data: '2026-11-25',
        descricao: 'Óculos',
        valor_total: '1416.50',
        n_parcelas: 1,
        competencia_inicial: '2027-01',
      });
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });

    it.each(['abc', '0,00', ''])('recusa valor "%s"', (valor) => {
      preencherBasico();
      form().patchValue({ valor_total: valor });

      enviar();

      expect(compras.criar).not.toHaveBeenCalled();
    });

    it('mostra o detail da API', () => {
      compras.criar.mockReturnValue(
        throwError(
          () =>
            new HttpErrorResponse({ status: 400, error: { detail: 'A fonte X está inativa.' } }),
        ),
      );
      preencherBasico();
      form().patchValue({ valor_total: '10' });

      enviar();

      expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain(
        'A fonte X está inativa.',
      );
    });
  });

  describe('nova compra parcelada', () => {
    beforeEach(() => {
      criar();
      preencherBasico();
      form().controls.parcelada.setValue(true);
    });

    it('abre os campos de parcela e troca os rótulos', () => {
      expect(form().controls.n_parcelas.value).toBe(2);
      expect(texto()).toContain('Valor total');
      expect(texto()).toContain('Competência da 1ª parcela');
      expect(texto()).toContain('Valor da 1ª parcela');
    });

    it('calcula a 1ª parcela pelo total e pela quantidade', () => {
      form().patchValue({ valor_total: '416,00', n_parcelas: 3 });

      expect(form().controls.valor_primeira.value).toBe('138,68');
      expect(texto()).toMatch(/2 × R\$\s138,66/);
    });

    it('sem editar a 1ª parcela, não a envia', () => {
      form().patchValue({ valor_total: '416,00', n_parcelas: 3 });

      enviar();

      expect(compras.criar.mock.calls[0][0]).toMatchObject({
        n_parcelas: 3,
        valor_total: '416.00',
      });
      expect(compras.criar.mock.calls[0][0]).not.toHaveProperty('valor_primeira_parcela');
    });

    it('1ª parcela editada é enviada e as demais aparecem na prévia', () => {
      form().patchValue({ valor_total: '416,00', n_parcelas: 3 });
      form().controls.valor_primeira.setValue('138,66');
      form().controls.valor_primeira.markAsDirty();

      expect(texto()).toMatch(/2 × R\$\s138,67/);
      enviar();

      expect(compras.criar.mock.calls[0][0]).toMatchObject({ valor_primeira_parcela: '138.66' });
    });

    it('depois de editada, a 1ª parcela não é recalculada', () => {
      form().patchValue({ valor_total: '416,00', n_parcelas: 3 });
      form().controls.valor_primeira.setValue('100,00');
      form().controls.valor_primeira.markAsDirty();

      form().patchValue({ n_parcelas: 4 });

      expect(form().controls.valor_primeira.value).toBe('100,00');
    });

    it('recusa 1ª parcela que não deixa valor para as demais', () => {
      form().patchValue({ valor_total: '100,00', n_parcelas: 3 });
      form().controls.valor_primeira.setValue('100,00');
      form().controls.valor_primeira.markAsDirty();

      enviar();

      expect(compras.criar).not.toHaveBeenCalled();
      expect(texto()).toContain('1ª parcela: Precisa ser menor que o total');
    });

    it('desligar "parcelada" volta para 1 parcela', () => {
      form().patchValue({ valor_total: '416,00', n_parcelas: 3 });
      form().controls.parcelada.setValue(false);

      enviar();

      expect(compras.criar.mock.calls[0][0]).toMatchObject({ n_parcelas: 1 });
      expect(compras.criar.mock.calls[0][0]).not.toHaveProperty('valor_primeira_parcela');
    });
  });

  describe('edição', () => {
    beforeEach(() => criar(7));

    it('preenche o formulário sem recalcular nada', () => {
      expect(form().getRawValue()).toMatchObject({
        fonte: 1,
        parcelada: true,
        valor_total: '416,00',
        n_parcelas: 3,
        valor_primeira: '138,68',
        competencia: '2026-12',
      });
      expect(fontes.competenciaSugerida).not.toHaveBeenCalled();
      expect(texto()).toContain('Confirmada');
      expect(fixture.nativeElement.querySelector('[aria-label="Valor da parcela 1"]').value).toBe(
        '138,68',
      );
    });

    it('salva com PATCH, com a competência e sem a 1ª parcela não tocada', () => {
      form().patchValue({ valor_total: '330,00' });

      enviar();

      expect(compras.atualizar).toHaveBeenCalledWith(
        7,
        expect.objectContaining({ valor_total: '330.00', competencia_inicial: '2026-12' }),
      );
      expect(compras.atualizar.mock.calls[0][1]).not.toHaveProperty('valor_primeira_parcela');
    });

    it('mudar a data recalcula a competência', () => {
      form().controls.data.setValue('2026-11-26');

      expect(form().controls.competencia.value).toBe('2027-01');
    });

    it('1ª parcela confirmada fica bloqueada', () => {
      compras.obter.mockReturnValue(
        of({
          ...OCULOS,
          parcelas: [{ ...OCULOS.parcelas[0], status: 'confirmado' }, ...OCULOS.parcelas.slice(1)],
        }),
      );
      fixture.destroy();
      TestBed.resetTestingModule();
      criar(7);

      expect(form().controls.valor_primeira.disabled).toBe(true);
      expect(texto()).toContain('Confirmada pela fatura.');
    });

    it('ajusta o valor de uma parcela e recarrega a compra', () => {
      compras.ajustarParcela.mockReturnValue(of({}));
      const campo: HTMLInputElement = fixture.nativeElement.querySelector(
        '[aria-label="Valor da parcela 1"]',
      );

      campo.value = '138,67';
      campo.dispatchEvent(new Event('blur'));

      expect(compras.ajustarParcela).toHaveBeenCalledWith(71, '138.67');
      expect(compras.obter).toHaveBeenCalledTimes(2);
    });

    it('não chama a API se o valor da parcela não mudou ou é inválido', () => {
      const campo: HTMLInputElement = fixture.nativeElement.querySelector(
        '[aria-label="Valor da parcela 1"]',
      );

      campo.dispatchEvent(new Event('blur'));
      campo.value = 'xyz';
      campo.dispatchEvent(new Event('blur'));

      expect(compras.ajustarParcela).not.toHaveBeenCalled();
    });

    it('excluir pede confirmação e fecha com true', () => {
      dialog.open.mockReturnValue({ afterClosed: () => of(true) });
      compras.excluir.mockReturnValue(of(undefined));

      fixture.nativeElement.querySelector('.form-compra__excluir').click();

      expect(compras.excluir).toHaveBeenCalledWith(7);
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
