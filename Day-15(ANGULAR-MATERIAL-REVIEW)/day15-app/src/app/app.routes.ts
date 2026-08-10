import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tasks } from './pages/tasks/tasks';
import { Completed } from './pages/completed/completed';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'tasks', component: Tasks },
  { path: 'completed', component: Completed },
  { path: 'reports', component: Reports },
];
