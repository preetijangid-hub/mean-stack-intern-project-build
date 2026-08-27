import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tasks } from './pages/tasks/tasks';
import { Performance } from './pages/performance/performance';
import { Queries } from './pages/queries/queries';
import { Settings } from './pages/settings/settings';
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
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    component: Tasks,
    canActivate: [authGuard]
  },
  {
    path: 'performance',
    component: Performance,
    canActivate: [authGuard]
  },
  {
    path: 'queries',
    component: Queries,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: Settings,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];























// import { Routes } from '@angular/router';

// import { Login } from './pages/login/login';
// import { Register } from './pages/register/register';
// import { Dashboard } from './pages/dashboard/dashboard';
// import { authGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'login',
//     component: Login
//   },
//   {
//     path: 'register',
//     component: Register
//   },
//   {
//     path: 'dashboard',
//     component: Dashboard,
//     canActivate: [authGuard]
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   }
// ];