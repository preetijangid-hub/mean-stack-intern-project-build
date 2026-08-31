import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  startWith,
  switchMap
} from 'rxjs';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.css'
})
export class TaskSearchComponent {
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly searchSubject =
    new BehaviorSubject<string>('');

  private readonly statusSubject =
    new BehaviorSubject<string>('All');

  loading = false;
  errorMessage = '';

  readonly tasks$: Observable<Task[]> = combineLatest([
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),

    this.statusSubject.pipe(
      distinctUntilChanged()
    )
  ]).pipe(
    switchMap(([searchTerm, status]) => {
      this.loading = true;
      this.errorMessage = '';

      return this.taskService
        .searchTasks(searchTerm, status)
        .pipe(
          catchError(() => {
            this.errorMessage =
              'Unable to load tasks. Please check the REST server.';

            return of([]);
          }),

          finalize(() => {
            this.loading = false;
          })
        );
    }),

    startWith([]),

    takeUntilDestroyed(this.destroyRef)
  );

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchSubject.next(input.value);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusSubject.next(select.value);
  }
}
