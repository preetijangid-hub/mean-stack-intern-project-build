import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Board } from './pages/board/board';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'board',
    component: Board,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];