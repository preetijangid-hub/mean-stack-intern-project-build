import { Component } from '@angular/core';
import { TaskSearchComponent } from './task-search/task-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskSearchComponent],
  template: `
    <app-task-search></app-task-search>
  `
})
export class App {}
