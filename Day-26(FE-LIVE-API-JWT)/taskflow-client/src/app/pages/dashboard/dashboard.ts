import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  TaskService,
  Task
} from '../../services/task';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);

  tasks: Task[] = [];

  title = '';
  description = '';

  loading = false;
  creating = false;
  updating = false;
  deletingId: string | null = null;

  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks()
      .subscribe({

        next: (response) => {

          this.tasks = response.tasks ?? [];

          this.loading = false;

        },

        error: (error: any) => {

          this.loading = false;

          if (error?.status === 401) {

            this.authService.logout();

            this.router.navigate(['/login']);

            return;
          }

          this.errorMessage =
            error?.error?.message ||
            'Failed to load tasks. Please try again.';

        }

      });
  }

  createTask(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.title.trim()) {

      this.errorMessage =
        'Task title is required.';

      return;
    }

    this.creating = true;

    this.taskService.createTask({
      title: this.title.trim(),
      description: this.description.trim(),
      completed: false
    })
    .subscribe({

      next: (response) => {

        this.creating = false;

        if (response.task) {

          this.tasks.unshift(
            response.task
          );

        }

        this.title = '';
        this.description = '';

        this.successMessage =
          'Task created successfully.';

        this.clearSuccessMessage();

      },

      error: (error: any) => {

        this.creating = false;

        this.errorMessage =
          error?.error?.message ||
          'Failed to create task.';

      }

    });
  }

  toggleTask(task: Task): void {

    if (!task._id) {
      return;
    }

    const newCompleted =
      !task.completed;

    this.errorMessage = '';

    this.taskService.updateTask(
      task._id,
      {
        completed: newCompleted
      }
    )
    .subscribe({

      next: (response) => {

        if (response.task) {

          task.completed =
            response.task.completed;

        } else {

          task.completed =
            newCompleted;

        }

      },

      error: (error: any) => {

        this.errorMessage =
          error?.error?.message ||
          'Failed to update task.';

      }

    });
  }

  deleteTask(task: Task): void {

    if (!task._id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete "${task.title}"?`
      );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';

    this.deletingId = task._id;

    this.taskService.deleteTask(
      task._id
    )
    .subscribe({

      next: () => {

        this.tasks =
          this.tasks.filter(
            item =>
              item._id !== task._id
          );

        this.deletingId = null;

        this.successMessage =
          'Task deleted successfully.';

        this.clearSuccessMessage();

      },

      error: (error: any) => {

        this.deletingId = null;

        this.errorMessage =
          error?.error?.message ||
          'Failed to delete task.';

      }

    });
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

  clearSuccessMessage(): void {

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

  }
}