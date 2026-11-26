import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { Familia } from '../../core/models/familia.model';
import { Fonte } from '../../core/models/fonte.model';
import { FamiliaService } from '../../core/services/familia.service';
import { FonteService } from '../../core/services/fonte.service';
import { FormDeMembros } from '../membros-da-familia/membros-da-familia';
import { FormFamiliaComponent } from './form-familia.component';

registerLocaleData(localePt);

const AMAZON: Fonte = {
  id: 1,
  nome: 'Amazon',
  tipo: 'cartao',
  dia_fechamento: 25,
  dia_vencimento: 5,
  ativa: true,
  ordem: 0,
};
const VELHA: Fonte = { ...AMAZON, id: 2, nome: 'Velha', ativa: false };
const ICLOUD: Familia = {
  id: 9,
  nome: 'Apple icloud',
  fonte: 1,
  valor: '66.90',
  inicio: '2026-12',
  ate: null,
  membros: [
    { nome: 'Weder', administrador: true },
    { nome: 'Gustavo', administrador: false },
    { nome: 'Edson', administrador: false },
    { nome: 'Natalia', administrador: false },
  ],
  primeira_editavel: '2026-12',
};

describe('FormFamiliaComponent', () => {
  let fixture: ComponentFixture<FormFamiliaComponent>;
  const familias = { obter: vi.fn(), alterar: vi.fn(), encerrar: vi.fn() };
  const fontes = { listar: vi.fn() };
  const dialogRef = { close: vi.fn() };
  const dialog = { open: vi.fn() };

  const componente = () =>
    fixture.componentInstance as unknown as {
      form: FormFamiliaComponent['form'];
      membros: FormDeMembros;
      fontesDisponiveis: () => Fonte[];
      salvar(): void;
      encerrar(): void;
    };
  const texto = () => {
    fixture.detectChanges();
    return (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
  };
  const nomes = () => componente().membros.nomes.controls.map((campo) => campo.value);
  const aPartirDe = (mes: string) => componente().form.controls.a_partir_de.setValue(mes);

  function criar(familia: Familia = ICLOUD) {
    familias.obter.mockReturnValue(of(familia));
    TestBed.configureTestingModule({
      imports: [FormFamiliaComponent],
      providers: [
        { provide: FamiliaService, useValue: familias },
        { provide: FonteService, useValue: fontes },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { familiaId: 9 } },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    });
    TestBed.overrideProvider(MatDialog, { useValue: dialog });
    fixture = TestBed.createComponent(FormFamiliaComponent);
    fixture.detectChanges();
  }

  beforeEach(() => {
    vi.clearAllMocks();
    fontes.listar.mockReturnValue(of([AMAZON, VELHA]));
    familias.alterar.mockReturnValue(of(ICLOUD));
    familias.encerrar.mockReturnValue(of(null));
  });

  it('carrega a família a partir do primeiro mês editável', () => {
    criar();

    expect(familias.obter).toHaveBeenCalledWith(9);
    expect(componente().form.getRawValue()).toEqual({
      a_partir_de: '2026-12',
      fonte: 1,
      nome: 'Apple icloud',
      valor: '66,90',
    });
    expect(nomes()).toEqual(['Weder', 'Gustavo', 'Edson', 'Natalia']);
    expect(
      componente()
        .fontesDisponiveis()
        .map((fonte) => fonte.nome),
    ).toEqual(['Amazon']);
    expect(texto()).toContain('Nele paga o 1º da lista.');
  });

  it('a lista começa por quem paga no mês escolhido', () => {
    criar();

    aPartirDe('2027-03');
    expect(nomes()).toEqual(['Natalia', 'Weder', 'Gustavo', 'Edson']);
    expect(componente().membros.administrador.value).toBe(1);

    aPartirDe('2027');
    expect(nomes()).toEqual(['Weder', 'Gustavo', 'Edson', 'Natalia']);
  });

  it('depois de mexer nos membros, trocar o mês não reordena', () => {
    criar();
    componente().membros.nomes.at(0).setValue('Ana');
    componente().membros.nomes.markAsDirty();

    aPartirDe('2027-03');

    expect(nomes()).toEqual(['Ana', 'Gustavo', 'Edson', 'Natalia']);
  });

  it('salva a mudança a partir do mês', () => {
    criar();
    aPartirDe('2027-03');
    componente().form.controls.valor.setValue('79,90');

    componente().salvar();

    expect(familias.alterar).toHaveBeenCalledWith(9, {
      a_partir_de: '2027-03',
      fonte: 1,
      nome: 'Apple icloud',
      valor: '79.90',
      membros: [
        { nome: 'Natalia', administrador: false },
        { nome: 'Weder', administrador: true },
        { nome: 'Gustavo', administrador: false },
        { nome: 'Edson', administrador: false },
      ],
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('não salva antes do primeiro mês editável nem com campos vazios', () => {
    criar({ ...ICLOUD, primeira_editavel: '2027-01' });
    aPartirDe('2026-12');

    expect(texto()).toContain('Os meses antes de janeiro de 2027 já estão fechados.');
    componente().salvar();
    componente().encerrar();

    aPartirDe('2027-01');
    componente().membros.nomes.at(0).setValue('');
    componente().salvar();

    expect(familias.alterar).not.toHaveBeenCalled();
    expect(dialog.open).not.toHaveBeenCalled();
  });

  it('encerra depois de confirmar', () => {
    criar();
    dialog.open.mockReturnValue({ afterClosed: () => of(true) });
    aPartirDe('2027-02');

    componente().encerrar();

    expect(dialog.open.mock.calls[0][1].data.mensagem).toContain('a partir de fevereiro de 2027');
    expect(familias.encerrar).toHaveBeenCalledWith(9, '2027-02');
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('não encerra se desistir', () => {
    criar();
    dialog.open.mockReturnValue({ afterClosed: () => of(false) });

    componente().encerrar();

    expect(familias.encerrar).not.toHaveBeenCalled();
  });

  it('mostra o erro da API', () => {
    criar();
    familias.alterar.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { detail: 'Já foi confirmada.' } }),
      ),
    );

    componente().salvar();

    expect(texto()).toContain('Já foi confirmada.');
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('família encerrada só mostra', () => {
    criar({ ...ICLOUD, ate: '2027-02' });

    expect(texto()).toContain('Encerrada: a última mensalidade foi em fevereiro de 2027.');
    expect(texto()).toContain('4 membro(s): Weder - Gustavo - Edson - Natalia');
    expect(texto()).toContain('Fechar');
    expect(texto()).not.toContain('Salvar');
    expect(componente().form.disabled).toBe(true);
    componente().salvar();
    expect(familias.alterar).not.toHaveBeenCalled();
  });

  it('erro ao carregar', () => {
    familias.obter.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 404 })));
    TestBed.configureTestingModule({
      imports: [FormFamiliaComponent],
      providers: [
        { provide: FamiliaService, useValue: familias },
        { provide: FonteService, useValue: fontes },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { familiaId: 9 } },
      ],
    });
    fixture = TestBed.createComponent(FormFamiliaComponent);
    fixture.detectChanges();

    componente().salvar();
    componente().encerrar();

    expect(texto()).toContain('Família');
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });
});
