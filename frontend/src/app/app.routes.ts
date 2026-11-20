import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { competenciaAtual } from './shared/utils/competencia';

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
      { path: '', pathMatch: 'full', redirectTo: () => `/meses/${competenciaAtual()}` },
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
    ],
  },
  { path: '**', redirectTo: '' },
];
