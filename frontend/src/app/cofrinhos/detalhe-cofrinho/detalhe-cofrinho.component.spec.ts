import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { CofrinhoService } from '../../core/services/cofrinho.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { RESERVA, movimento, textoDe } from '../cofrinhos.testing';
import { FormCofrinhoComponent } from '../form-cofrinho/form-cofrinho.component';
import { FormMovimentoComponent } from '../form-movimento/form-movimento.component';
import { DetalheCofrinhoComponent } from './detalhe-cofrinho.component';

registerLocaleData(localePt);

const GUARDADO = movimento({
  id: 7,
  tipo: 'guardado',
  informado: '10.00',
  valor: '10.00',
  liquido: '10.00',
});

describe('DetalheCofrinhoComponent', () => {
  let fixture: ComponentFixture<DetalheCofrinhoComponent>;
  let router: Router;
  const service = { obter: vi.fn(), extrato: vi.fn(), excluir: vi.fn(), excluirMovimento: vi.fn() };
  const dialog = { open: vi.fn() };
  const snackBar = { open: vi.fn() };

  function criar() {
    TestBed.configureTestingModule({
      imports: [DetalheCofrinhoComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '3' }) } },
        },
        { provide: CofrinhoService, useValue: service },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture = TestBed.createComponent(DetalheCofrinhoComponent);
    fixture.detectChanges();
  }

  beforeEach(() => {
    vi.clearAllMocks();
    service.obter.mockReturnValue(of(RESERVA));
    service.extrato.mockReturnValue(of([movimento({ id: 8 }), GUARDADO]));
  });

  const texto = () => {
    fixture.detectChanges();
    return textoDe(fixture.nativeElement);
  };
  const fecharDialogCom = (resultado: unknown) =>
    dialog.open.mockReturnValue({ afterClosed: () => of(resultado) });
  const componente = () =>
    fixture.componentInstance as unknown as {
      editar(cofrinho: typeof RESERVA): void;
      excluir(cofrinho: typeof RESERVA): void;
    };
  const botao = (rotulo: string) =>
    [...fixture.nativeElement.querySelectorAll('button')].find((b: HTMLButtonElement) =>
      b.textContent!.includes(rotulo),
    ) as HTMLButtonElement;

  it('mostra o saldo e os últimos 5 movimentos', () => {
    criar();

    const conteudo = texto();
    expect(service.extrato).toHaveBeenCalledWith(3, { limite: 5 });
    expect(conteudo).toContain('PicPay · 102% do CDI · desde 02/11/2026');
    expect(conteudo).toContain('Saldo guardado R$ 10.017,48');
    expect(conteudo).toContain('Já rendeu R$ 17,48');
    expect(conteudo).toContain('IR R$ 5,08 e IOF R$ 6,84');
    expect(conteudo).toContain('Ver extrato completo');
  });

  it.each([
    ['Guardar', 'guardado'],
    ['Resgatar', 'resgatado'],
    ['Ajustar saldo', 'ajuste'],
  ])('%s abre o formulário e recarrega', (rotulo, tipo) => {
    criar();
    fecharDialogCom(true);

    botao(rotulo).click();

    expect(dialog.open).toHaveBeenCalledWith(FormMovimentoComponent, {
      data: { cofrinho: RESERVA, tipo },
    });
    expect(service.obter).toHaveBeenCalledTimes(2);
  });

  it('editar recarrega se salvou', () => {
    criar();
    fecharDialogCom(undefined);

    componente().editar(RESERVA);

    expect(dialog.open).toHaveBeenCalledWith(FormCofrinhoComponent, { data: RESERVA });
    expect(service.obter).toHaveBeenCalledTimes(1);
  });

  it('excluir confirmado volta para a lista', () => {
    criar();
    fecharDialogCom(true);
    service.excluir.mockReturnValue(of(undefined));

    componente().excluir(RESERVA);

    expect(dialog.open).toHaveBeenCalledWith(ConfirmacaoDialogComponent, expect.anything());
    expect(service.excluir).toHaveBeenCalledWith(3);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/cofrinhos');
  });

  it('excluir com erro avisa', () => {
    criar();
    fecharDialogCom(true);
    service.excluir.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { detail: 'Não deu.' } })),
    );

    componente().excluir(RESERVA);

    expect(snackBar.open).toHaveBeenCalledWith('Não deu.', 'Fechar');
  });

  it('exclui um movimento depois de confirmar', () => {
    criar();
    fecharDialogCom(true);
    service.excluirMovimento.mockReturnValue(of(undefined));

    fixture.nativeElement.querySelector('app-movimentos button').click();

    expect(service.excluirMovimento).toHaveBeenCalledWith(3, 7);
    expect(service.extrato).toHaveBeenCalledTimes(2);
  });

  it('erro ao excluir movimento avisa', () => {
    criar();
    fecharDialogCom(true);
    service.excluirMovimento.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Saldo não cobre.' } }),
      ),
    );

    fixture.nativeElement.querySelector('app-movimentos button').click();

    expect(snackBar.open).toHaveBeenCalledWith('Saldo não cobre.', 'Fechar');
  });

  it('erro ao carregar avisa', () => {
    service.obter.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 404, error: { detail: 'Não encontrado.' } }),
      ),
    );
    criar();

    expect(snackBar.open).toHaveBeenCalledWith('Não encontrado.', 'Fechar');
    expect(texto()).not.toContain('Saldo guardado');
  });
});
