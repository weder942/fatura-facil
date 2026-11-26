import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { competenciaEmAberto } from './shared/utils/competencia';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Entrar · Fatura Fácil',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: () => `/meses/${competenciaEmAberto()}` },
      {
        path: 'meses/:competencia',
        loadComponent: () =>
          import('./meses/visao-mensal.component').then((m) => m.VisaoMensalComponent),
        title: 'Mês · Fatura Fácil',
      },
      {
        path: 'fontes',
        loadComponent: () => import('./fontes/fontes.component').then((m) => m.FontesComponent),
        title: 'Fontes · Fatura Fácil',
      },
      {
        path: 'recorrentes',
        loadComponent: () =>
          import('./recorrentes/recorrentes.component').then((m) => m.RecorrentesComponent),
        title: 'Recorrentes · Fatura Fácil',
      },
      {
        path: 'cofrinhos',
        loadComponent: () =>
          import('./cofrinhos/cofrinhos.component').then((m) => m.CofrinhosComponent),
        title: 'Cofrinhos · Fatura Fácil',
      },
      {
        path: 'cofrinhos/:id',
        loadComponent: () =>
          import('./cofrinhos/detalhe-cofrinho/detalhe-cofrinho.component').then(
            (m) => m.DetalheCofrinhoComponent,
          ),
        title: 'Cofrinho · Fatura Fácil',
      },
      {
        path: 'cofrinhos/:id/extrato',
        loadComponent: () =>
          import('./cofrinhos/extrato-cofrinho/extrato-cofrinho.component').then(
            (m) => m.ExtratoCofrinhoComponent,
          ),
        title: 'Extrato do cofrinho · Fatura Fácil',
      },
      {
        path: 'cofrinhos/:id/rendimentos',
        loadComponent: () =>
          import('./cofrinhos/rendimentos-cofrinho/rendimentos-cofrinho.component').then(
            (m) => m.RendimentosCofrinhoComponent,
          ),
        title: 'Rendimentos do cofrinho · Fatura Fácil',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
