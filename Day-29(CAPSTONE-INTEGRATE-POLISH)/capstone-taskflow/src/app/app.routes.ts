import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

/**
 * Application routes.
 * Class names expected from the feature component files:
 * login.ts -> Login, register.ts -> Register, dashboard.ts -> Dashboard,
 * tasks.ts -> Tasks, projects.ts -> Projects, team.ts -> Team.
 */
export const routes: Routes = [
  // Root: authenticated users land on /dashboard, guests are bounced
  // to /login by the authGuard on the dashboard route.
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./features/auth/login/login').then((m) => m.Login) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./features/auth/register/register').then((m) => m.Register) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: 'tasks', canActivate: [authGuard], loadComponent: () => import('./features/tasks/tasks').then((m) => m.Tasks) },
  { path: 'projects', canActivate: [authGuard], loadComponent: () => import('./features/projects/projects').then((m) => m.Projects) },
  { path: 'team', canActivate: [authGuard], loadComponent: () => import('./features/team/team').then((m) => m.Team) },
  // Wildcard: safely send unknown URLs to the default protected route.
  { path: '**', redirectTo: 'dashboard' },
];
