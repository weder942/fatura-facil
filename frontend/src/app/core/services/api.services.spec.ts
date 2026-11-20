import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AvulsoService } from './avulso.service';
import { CompraService } from './compra.service';
import { FonteService } from './fonte.service';
import { MesService } from './mes.service';
import { RecorrenteService } from './recorrente.service';

describe('services da API', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function esperar(metodo: string, url: string, corpo?: unknown) {
    const req = http.expectOne((r) => r.urlWithParams === url);
    expect(req.request.method).toBe(metodo);
    if (corpo !== undefined) {
      expect(req.request.body).toEqual(corpo);
    }
    return req;
  }

  it('FonteService chama os endpoints de fontes', () => {
    const service = TestBed.inject(FonteService);
    const fonte = {
      nome: 'Nubank',
      tipo: 'cartao' as const,
      dia_fechamento: 3,
      dia_vencimento: 10,
      ativa: true,
      ordem: 0,
    };

    service.listar().subscribe();
    esperar('GET', '/api/fontes/').flush([]);
    service.criar(fonte).subscribe();
    esperar('POST', '/api/fontes/', fonte).flush({});
    service.atualizar(1, { ativa: false }).subscribe();
    esperar('PATCH', '/api/fontes/1/', { ativa: false }).flush({});
    service.excluir(1).subscribe();
    esperar('DELETE', '/api/fontes/1/').flush(null);

    let competencia = '';
    service.competenciaSugerida(1, '2026-11-25').subscribe((c) => (competencia = c));
    esperar('GET', '/api/fontes/1/competencia-sugerida/?data=2026-11-25').flush({
      competencia: '2027-01',
    });
    expect(competencia).toBe('2027-01');
  });

  it('CompraService chama os endpoints de compras e lançamentos', () => {
    const service = TestBed.inject(CompraService);
    const compra = {
      fonte: 1,
      data: '2026-11-24',
      descricao: 'Óculos',
      valor_total: '416.00',
      n_parcelas: 3,
      competencia_inicial: '2026-12',
    };

    service.obter(7).subscribe();
    esperar('GET', '/api/compras/7/').flush({});
    service.criar(compra).subscribe();
    esperar('POST', '/api/compras/', compra).flush({});
    service.atualizar(7, { descricao: 'X' }).subscribe();
    esperar('PATCH', '/api/compras/7/', { descricao: 'X' }).flush({});
    service.excluir(7).subscribe();
    esperar('DELETE', '/api/compras/7/').flush(null);
    service.ajustarParcela(3, '138.67').subscribe();
    esperar('PATCH', '/api/lancamentos/3/', { valor: '138.67' }).flush({});
  });

  it('MesService chama horizonte e visão', () => {
    const service = TestBed.inject(MesService);

    service.horizonte().subscribe();
    esperar('GET', '/api/meses/').flush([]);
    service.visao('2026-11').subscribe();
    esperar('GET', '/api/meses/2026-11/').flush({});
  });

  it('RecorrenteService chama os endpoints de recorrentes', () => {
    const service = TestBed.inject(RecorrenteService);
    const novo = { nome: 'INSS', grupo: 'rendimento' as const, variavel: false, ordem: 2 };

    service.listar().subscribe();
    esperar('GET', '/api/recorrentes/').flush([]);
    service.listar('fixa').subscribe();
    esperar('GET', '/api/recorrentes/?grupo=fixa').flush([]);
    service.criar({ ...novo, valor: '-951.52', a_partir_de: '2026-01' }).subscribe();
    esperar('POST', '/api/recorrentes/', {
      ...novo,
      valor: '-951.52',
      a_partir_de: '2026-01',
    }).flush({});
    service.atualizar(1, { nome: 'INSS mensal' }).subscribe();
    esperar('PATCH', '/api/recorrentes/1/', { nome: 'INSS mensal' }).flush({});
    service.excluir(1).subscribe();
    esperar('DELETE', '/api/recorrentes/1/').flush(null);
    service.reajustar(1, '1277.99', '2026-06').subscribe();
    esperar('POST', '/api/recorrentes/1/reajustar/', {
      valor: '1277.99',
      a_partir_de: '2026-06',
    }).flush({});
    service.encerrar(1, '2026-12').subscribe();
    esperar('POST', '/api/recorrentes/1/encerrar/', { ate: '2026-12' }).flush({});
    service.removerVigencia(1, 9).subscribe();
    esperar('DELETE', '/api/recorrentes/1/valores/9/').flush({});
    service.definirNoMes(1, '2026-11', '432.80').subscribe();
    esperar('PUT', '/api/recorrentes/1/meses/2026-11/', { valor: '432.80' }).flush({});
    service.limparNoMes(1, '2026-11').subscribe();
    esperar('DELETE', '/api/recorrentes/1/meses/2026-11/').flush(null);
  });

  it('AvulsoService chama os endpoints de avulsos', () => {
    const service = TestBed.inject(AvulsoService);
    const avulso = {
      grupo: 'fixa' as const,
      competencia: '2026-11',
      descricao: 'Docs',
      valor: '80.00',
    };

    service.criar(avulso).subscribe();
    esperar('POST', '/api/avulsos/', avulso).flush({});
    service.atualizar(3, { valor: '90.00' }).subscribe();
    esperar('PATCH', '/api/avulsos/3/', { valor: '90.00' }).flush({});
    service.excluir(3).subscribe();
    esperar('DELETE', '/api/avulsos/3/').flush(null);
  });
});
