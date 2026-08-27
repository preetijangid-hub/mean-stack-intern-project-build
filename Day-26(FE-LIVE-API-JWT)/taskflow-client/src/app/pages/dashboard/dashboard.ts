import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Task, TaskService } from '../../services/task';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  tasks: Task[] = [];
  loading = true;
  creating = false;
  errorMessage = '';
  successMessage = '';
  sidebarCollapsed = false;
  userMenuOpen = false;
  showNewTask = false;
  selectedView: 'all' | 'open' | 'completed' = 'all';
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private taskService: TaskService,
    private changeDetector: ChangeDetectorRef
  ) {}

  get user() {
    return this.authService.getUser();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  get filteredTasks(): Task[] {
    if (this.selectedView === 'completed') {
      return this.tasks.filter((task) => task.completed);
    }

    if (this.selectedView === 'open') {
      return this.tasks.filter((task) => !task.completed);
    }

    return this.tasks;
  }

  get completedCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  get openCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  get inProgressCount(): number {
    return this.tasks.filter((task) => task.status === 'in-progress').length;
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks().pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        this.tasks = response.tasks || [];
      },
      error: (error) => {
        this.errorMessage = this.getErrorMessage(error, 'Tasks could not be loaded.');
      }
    });
  }

  createTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title || this.creating) {
      return;
    }

    this.creating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.taskService.createTask({
      title,
      description: this.newTaskDescription.trim() || undefined
    }).pipe(
      finalize(() => {
        this.creating = false;
        this.changeDetector.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        this.tasks = [response.task, ...this.tasks];
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.showNewTask = false;
        this.successMessage = 'Task created successfully.';
      },
      error: (error) => {
        this.errorMessage = this.getErrorMessage(error, 'Task could not be created.');
      }
    });
  }

  toggleTask(task: Task): void {
    if (!task._id) {
      return;
    }

    const previousValue = task.completed;
    task.completed = !task.completed;

    this.taskService.updateTask(task._id, { completed: task.completed }).subscribe({
      error: (error) => {
        task.completed = previousValue;
        this.errorMessage = this.getErrorMessage(error, 'Task could not be updated.');
        this.changeDetector.detectChanges();
      }
    });
  }

  deleteTask(task: Task): void {
    if (!task._id) {
      return;
    }

    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((item) => item._id !== task._id);
        this.successMessage = 'Task deleted.';
      },
      error: (error) => {
        this.errorMessage = this.getErrorMessage(error, 'Task could not be deleted.');
      }
    });
  }

  trackTask(_: number, task: Task): string {
    return task._id || task.title;
  }

  private getErrorMessage(error: { status?: number; error?: { message?: string }; message?: string }, fallback: string): string {
    if (error?.status === 0) {
      return 'The API could not be reached. Check your connection and CORS settings.';
    }

    return error?.error?.message || error?.message || fallback;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}