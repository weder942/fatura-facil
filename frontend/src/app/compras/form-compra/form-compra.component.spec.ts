import { HttpErrorResponse } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
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
  const enviar = () => {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    fontes.listar.mockReturnValue(of([NUBANK, INATIVA]));
    fontes.competenciaSugerida.mockReturnValue(of('2027-01'));
    compras.obter.mockReturnValue(of(OCULOS));
  });

  describe('nova compra', () => {
    beforeEach(() => criar());

    it('só oferece fontes ativas', () => {
      expect(
        componente()
          .fontesDisponiveis()
          .map((f) => f.nome),
      ).toEqual(['Nubank']);
    });

    it('mostra a competência sugerida para a fonte e a data', () => {
      componente().form.patchValue({ fonte: 1, data: '2026-11-25' });
      fixture.detectChanges();

      expect(fontes.competenciaSugerida).toHaveBeenLastCalledWith(1, '2026-11-25');
      expect(fixture.nativeElement.textContent).toContain('Sugerida: janeiro de 2027');
    });

    it('envia o valor no formato da API e sem competência quando não foi escolhida', () => {
      compras.criar.mockReturnValue(of(OCULOS));
      componente().form.patchValue({
        fonte: 1,
        data: '2026-11-24',
        descricao: ' Óculos ',
        valor_total: '1.416,5',
        n_parcelas: 3,
      });

      enviar();

      expect(compras.criar).toHaveBeenCalledWith({
        fonte: 1,
        data: '2026-11-24',
        descricao: 'Óculos',
        valor_total: '1416.50',
        n_parcelas: 3,
      });
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });

    it('envia a competência escolhida à mão', () => {
      compras.criar.mockReturnValue(of(OCULOS));
      const { form } = componente();
      form.patchValue({ fonte: 1, data: '2026-11-24', descricao: 'X', valor_total: '10' });
      form.controls.competencia_inicial.setValue('2027-03');
      form.controls.competencia_inicial.markAsDirty();

      enviar();

      expect(compras.criar.mock.calls[0][0]).toMatchObject({ competencia_inicial: '2027-03' });
    });

    it.each(['abc', '0,00', ''])('recusa valor "%s"', (valor) => {
      componente().form.patchValue({
        fonte: 1,
        data: '2026-11-24',
        descricao: 'X',
        valor_total: valor,
      });

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
      componente().form.patchValue({
        fonte: 1,
        data: '2026-11-24',
        descricao: 'X',
        valor_total: '10',
      });

      enviar();

      expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain(
        'A fonte X está inativa.',
      );
    });
  });

  describe('edição', () => {
    beforeEach(() => criar(7));

    it('preenche o formulário e lista as parcelas', () => {
      const { form } = componente();

      expect(form.getRawValue()).toMatchObject({
        fonte: 1,
        valor_total: '416,00',
        n_parcelas: 3,
        competencia_inicial: '2026-12',
      });
      expect(fixture.nativeElement.textContent).toContain('Confirmada');
      expect(fixture.nativeElement.querySelector('[aria-label="Valor da parcela 1"]').value).toBe(
        '138,68',
      );
    });

    it('salva com PATCH sem mandar a competência que não foi tocada', () => {
      compras.atualizar.mockReturnValue(of(OCULOS));
      componente().form.patchValue({ valor_total: '330,00' });

      enviar();

      expect(compras.atualizar).toHaveBeenCalledWith(
        7,
        expect.not.objectContaining({ competencia_inicial: expect.anything() }),
      );
      expect(compras.atualizar.mock.calls[0][1]).toMatchObject({ valor_total: '330.00' });
    });

    it('ajusta o valor de uma parcela e marca que algo mudou', () => {
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
