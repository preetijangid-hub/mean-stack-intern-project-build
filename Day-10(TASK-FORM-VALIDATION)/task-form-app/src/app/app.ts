import { Component } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent],
  template: `
    <app-task-form></app-task-form>
  `
})
export class App {}
