import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  loading = true;
  errorMessage = '';

  tasks$: Observable<Task[]> = this.taskService.getTasks().pipe(
    catchError(() => {
      this.errorMessage =
        'Unable to load tasks. Please make sure the mock server is running.';

      return of([]);
    }),
    finalize(() => {
      this.loading = false;
    })
  );
}
