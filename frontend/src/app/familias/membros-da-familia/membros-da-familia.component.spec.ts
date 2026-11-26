import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosDaFamiliaComponent } from './membros-da-familia.component';
import {
  FormDeMembros,
  criarFormDeMembros,
  membrosAPartirDe,
  membrosDoForm,
} from './membros-da-familia';

registerLocaleData(localePt);

const ICLOUD = [
  { nome: 'Weder', administrador: true },
  { nome: 'Gustavo', administrador: false },
  { nome: 'Edson', administrador: false },
  { nome: 'Natalia', administrador: false },
];

describe('membros da família', () => {
  it('form e valores ida e volta, sem espaços nas pontas', () => {
    const form = criarFormDeMembros(ICLOUD);
    form.nomes.at(1).setValue(' Gustavo ');

    expect(membrosDoForm(form)).toEqual(ICLOUD);
    expect(criarFormDeMembros([{ nome: 'Ana', administrador: false }]).administrador.value).toBe(
      null,
    );
  });

  it('a lista começa por quem paga no mês', () => {
    const nomes = (competencia: string) =>
      membrosAPartirDe(ICLOUD, '2026-12', competencia).map((membro) => membro.nome);

    expect(nomes('2026-12')).toEqual(['Weder', 'Gustavo', 'Edson', 'Natalia']);
    expect(nomes('2027-03')).toEqual(['Natalia', 'Weder', 'Gustavo', 'Edson']);
    expect(nomes('2027-05')).toEqual(['Gustavo', 'Edson', 'Natalia', 'Weder']);
    expect(nomes('2026-11')).toEqual(['Natalia', 'Weder', 'Gustavo', 'Edson']);
  });
});

describe('MembrosDaFamiliaComponent', () => {
  let fixture: ComponentFixture<MembrosDaFamiliaComponent>;
  let form: FormDeMembros;

  const componente = () =>
    fixture.componentInstance as unknown as {
      definirQuantidade(digitado: string): void;
      mover(posicao: number, direcao: -1 | 1): void;
    };
  const texto = () => {
    fixture.detectChanges();
    return (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
  };
  const nomes = () => form.nomes.controls.map((campo) => campo.value);

  beforeEach(() => {
    form = criarFormDeMembros(ICLOUD.slice(0, 2));
    TestBed.configureTestingModule({
      imports: [MembrosDaFamiliaComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    });
    fixture = TestBed.createComponent(MembrosDaFamiliaComponent);
    fixture.componentRef.setInput('form', form);
    fixture.componentRef.setInput('inicio', '2026-12');
    fixture.detectChanges();
  });

  it('um campo por membro com o mês de cada um', () => {
    expect(texto()).toContain('1º mês');
    expect(texto()).toContain('Paga em dezembro de 2026');
    expect(texto()).toContain('2º mês');
    expect(texto()).toContain('Paga em janeiro de 2027');
  });

  it('sem competência válida, não mostra os meses', () => {
    fixture.componentRef.setInput('inicio', '');

    expect(texto()).not.toContain('Paga em');
  });

  it('a quantidade abre e fecha campos pelo fim', () => {
    const quantidade = fixture.nativeElement.querySelector('input[type="number"]');
    quantidade.value = '4';
    quantidade.dispatchEvent(new Event('input'));

    expect(nomes()).toEqual(['Weder', 'Gustavo', '', '']);
    expect(form.nomes.dirty).toBe(true);
    expect(texto()).toContain('4º mês');

    componente().definirQuantidade('1');
    expect(nomes()).toEqual(['Weder']);
    expect(form.administrador.value).toBe(0);
  });

  it('ignora quantidade inválida', () => {
    for (const digitado of ['', '0', '13', 'abc']) {
      componente().definirQuantidade(digitado);
    }

    expect(nomes()).toEqual(['Weder', 'Gustavo']);
  });

  it('diminuir sem o administrador deixa ninguém marcado', () => {
    form.administrador.setValue(1);

    componente().definirQuantidade('1');

    expect(form.administrador.value).toBe(null);
  });

  it('muda a ordem levando junto a marca de quem administra', () => {
    componente().definirQuantidade('3');
    form.nomes.at(2).setValue('Edson');

    componente().mover(0, 1);
    expect(nomes()).toEqual(['Gustavo', 'Weder', 'Edson']);
    expect(form.administrador.value).toBe(1);

    componente().mover(2, -1);
    expect(nomes()).toEqual(['Gustavo', 'Edson', 'Weder']);
    expect(form.administrador.value).toBe(2);

    componente().mover(1, -1); // o vizinho de quem administra
    expect(nomes()).toEqual(['Edson', 'Gustavo', 'Weder']);
    expect(form.administrador.value).toBe(2);

    componente().mover(0, -1); // já é o primeiro
    componente().mover(2, 1); // já é o último
    expect(nomes()).toEqual(['Edson', 'Gustavo', 'Weder']);
  });

  it('os botões de ordem ficam desabilitados nas pontas', () => {
    const subir = fixture.nativeElement.querySelector('[aria-label="Subir o 1º"]');
    const descer = fixture.nativeElement.querySelector('[aria-label="Descer o 2º"]');

    expect(subir.disabled).toBe(true);
    expect(descer.disabled).toBe(true);
    fixture.nativeElement.querySelector('[aria-label="Descer o 1º"]').click();
    expect(nomes()).toEqual(['Gustavo', 'Weder']);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-label="Subir o 2º"]').click();
    expect(nomes()).toEqual(['Weder', 'Gustavo']);
  });
});
