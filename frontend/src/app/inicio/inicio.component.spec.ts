import { TestBed } from '@angular/core/testing';

import { InicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  it('renderiza o título', () => {
    const fixture = TestBed.createComponent(InicioComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Visão mensal');
  });
});
