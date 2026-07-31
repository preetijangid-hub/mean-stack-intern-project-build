import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { BoardComponent } from './pages/board/board';
import { TaskDetailComponent } from './pages/task-detail/task-detail';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'board',
    component: BoardComponent
  },

  {
    path: 'task/:id',
    component: TaskDetailComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];