import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Entrar · Fatura Fácil' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: InicioComponent, title: 'Fatura Fácil' }],
  },
  { path: '**', redirectTo: '' },
];
