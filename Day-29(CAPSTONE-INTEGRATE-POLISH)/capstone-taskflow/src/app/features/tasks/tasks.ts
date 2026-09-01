import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { ProjectService } from '../../core/services/project';
import { TaskMetadataService } from '../../core/services/task-metadata';
import { TaskService } from '../../core/services/task';
import { TeamService } from '../../core/services/team';
import { ToastService } from '../../core/services/toast';
import {
  TASK_PRIORITY_OPTIONS,
  TASK_PROGRESS_OPTIONS,
  TASK_STATUS_OPTIONS,
  Task,
  TaskPriority,
  TaskStatus,
  createDefaultTaskMetadata,
} from '../../models/task.model';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';

type StatusFilter = 'all' | TaskStatus;
type PriorityFilter = 'all' | TaskPriority;
type SortOption = 'newest' | 'oldest' | 'priority' | 'progress';

/** Tasks shown per page (client-side pagination over the filtered list). */
const TASKS_PER_PAGE = 8;

/**
 * Tasks page — full CRUD against the live API. Backend-supported fields
 * (title/description/completed) go through TaskService; richer UI data
 * (status/priority/progress/project/assignee) is stored locally via
 * TaskMetadataService and never sent to the backend.
 */
@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule, TaskStatusPipe],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  private static readonly PRIORITY_LABELS: Record<TaskPriority, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  private static readonly PRIORITY_RANK: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  private readonly taskService = inject(TaskService);
  private readonly metadataService = inject(TaskMetadataService);
  private readonly projectService = inject(ProjectService);
  private readonly teamService = inject(TeamService);
  private readonly toast = inject(ToastService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly tasks = signal<Task[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly page = signal(1);

  protected readonly projects = this.projectService.projects;
  protected readonly teamMembers = this.teamService.teamMembers;

  protected readonly statusOptions = TASK_STATUS_OPTIONS;
  protected readonly priorityOptions = TASK_PRIORITY_OPTIONS;
  protected readonly progressOptions = TASK_PROGRESS_OPTIONS;

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  protected readonly filterForm = new FormGroup({
    status: new FormControl<StatusFilter>('all', { nonNullable: true }),
    priority: new FormControl<PriorityFilter>('all', { nonNullable: true }),
    project: new FormControl('all', { nonNullable: true }),
    sort: new FormControl<SortOption>('newest', { nonNullable: true }),
  });

  private readonly filters = signal<{
    status: StatusFilter;
    priority: PriorityFilter;
    project: string;
    sort: SortOption;
  }>({ status: 'all', priority: 'all', project: 'all', sort: 'newest' });

  protected readonly taskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    status: new FormControl<TaskStatus>('not-started', { nonNullable: true }),
    priority: new FormControl<TaskPriority>('medium', { nonNullable: true }),
    progress: new FormControl(0, { nonNullable: true }),
    projectId: new FormControl('', { nonNullable: true }),
    assigneeId: new FormControl('', { nonNullable: true }),
  });

  protected readonly totalCount = computed(() => this.tasks().length);
  protected readonly shownCount = computed(() => this.filteredTasks().length);

  protected readonly modalOpen = signal(false);
  protected readonly editingTask = signal<Task | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);
  protected readonly deleteTaskId = signal<string | null>(null);
  protected readonly deleting = signal(false);
  protected readonly togglingId = signal<string | null>(null);

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) => {
        this.searchTerm.set(term.trim().toLowerCase());
        this.page.set(1);
      });

    this.filterForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((values) => {
      this.filters.set({
        status: values.status ?? 'all',
        priority: values.priority ?? 'all',
        project: values.project ?? 'all',
        sort: values.sort ?? 'newest',
      });
      this.page.set(1);
    });

    this.taskForm.controls.status.valueChanges.pipe(takeUntilDestroyed()).subscribe((status) => {
      const progress = this.taskForm.controls.progress.value;
      if (status === 'completed') {
        if (progress !== 100) {
          this.taskForm.controls.progress.setValue(100);
        }
      } else if (status === 'not-started') {
        if (progress !== 0) {
          this.taskForm.controls.progress.setValue(0);
        }
      } else if (progress === 0 || progress === 100) {
        this.taskForm.controls.progress.setValue(25);
      }
    });

    this.taskForm.controls.progress.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((progress) => {
        const status = this.taskForm.controls.status.value;
        if (progress === 100 && status !== 'completed') {
          this.taskForm.controls.status.setValue('completed');
        } else if (progress === 0 && status === 'in-progress') {
          this.taskForm.controls.status.setValue('not-started');
        } else if (progress > 0 && progress < 100 && status === 'not-started') {
          this.taskForm.controls.status.setValue('in-progress');
        }
      });

    void this.loadTasks();
  }

  protected readonly filteredTasks = computed(() => {
    const tasks = this.tasks();
    const term = this.searchTerm();
    const filters = this.filters();
    const filtered = tasks.filter((task) => {
      if (
        term &&
        !task.title.toLowerCase().includes(term) &&
        !task.description.toLowerCase().includes(term)
      ) {
        return false;
      }
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      if (filters.project !== 'all' && task.projectId !== filters.project) {
        return false;
      }
      return true;
    });
    return this.sortTasks(filtered, filters.sort);
  });

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filteredTasks().length / TASKS_PER_PAGE)),
  );

  /** Current page clamped to the valid range so list changes never blank out the view. */
  protected readonly currentPage = computed(() => Math.min(this.page(), this.pageCount()));

  protected readonly pagedTasks = computed(() => {
    const start = (this.currentPage() - 1) * TASKS_PER_PAGE;
    return this.filteredTasks().slice(start, start + TASKS_PER_PAGE);
  });

  protected goToPage(target: number): void {
    const clamped = Math.min(Math.max(target, 1), this.pageCount());
    if (clamped !== this.page()) {
      this.page.set(clamped);
    }
  }

  protected previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  protected nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  protected loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.taskService
      .getTasks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (apiTasks) => this.tasks.set(this.metadataService.hydrateAll(apiTasks)),
        error: (error: unknown) =>
          this.errorMessage.set(
            error instanceof Error && error.message ? error.message : 'Failed to load tasks.',
          ),
      });
  }

  protected openCreate(): void {
    this.editingTask.set(null);
    this.formError.set(null);
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'not-started',
      priority: 'medium',
      progress: 0,
      projectId: '',
      assigneeId: '',
    });
    this.modalOpen.set(true);
  }

  protected openEdit(task: Task): void {
    this.editingTask.set(task);
    this.formError.set(null);
    this.taskForm.reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      progress: task.progress,
      projectId: task.projectId ?? '',
      assigneeId: task.assigneeId ?? '',
    });
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    if (this.saving()) {
      return;
    }
    this.modalOpen.set(false);
  }

  protected titleError(): string | null {
    const control = this.taskForm.controls.title;
    if (!control.touched || !control.errors) {
      return null;
    }
    return control.errors['required'] ? 'Title is required.' : null;
  }

  protected saveTask(): void {
    if (this.saving()) {
      return;
    }
    const titleControl = this.taskForm.controls.title;
    if (this.taskForm.invalid || titleControl.value.trim() === '') {
      this.taskForm.markAllAsTouched();
      return;
    }

    const editing = this.editingTask();
    const formValue = this.taskForm.getRawValue();
    const payload = {
      title: formValue.title.trim(),
      description: formValue.description.trim(),
      completed: formValue.status === 'completed',
    };
    const metadata = {
      status: formValue.status,
      priority: formValue.priority,
      progress: formValue.progress,
      projectId: formValue.projectId || null,
      assigneeId: formValue.assigneeId || null,
    };

    this.saving.set(true);
    this.formError.set(null);
    const request$ = editing
      ? this.taskService.updateTask(editing.id, payload)
      : this.taskService.createTask(payload);

    request$
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (apiTask) => {
          const id = editing ? editing.id : apiTask.id;
          this.metadataService.set(id, metadata);
          const merged = this.metadataService.hydrate({
            ...(editing ?? apiTask),
            title: payload.title,
            description: payload.description,
            completed: payload.completed,
          });
          this.tasks.update((list) =>
            editing ? list.map((task) => (task.id === id ? merged : task)) : [merged, ...list],
          );
          if (!editing) {
            this.page.set(1); // jump to the first page so the new task is visible
          }
          this.toast.success(editing ? 'Task updated successfully.' : 'Task created successfully.');
          this.modalOpen.set(false);
        },
        error: (error: unknown) =>
          this.formError.set(
            error instanceof Error && error.message
              ? error.message
              : 'Could not save the task. Please try again.',
          ),
      });
  }

  protected toggleComplete(task: Task): void {
    if (this.togglingId() !== null) {
      return;
    }
    const targetCompleted = !task.completed;
    const base = createDefaultTaskMetadata();
    const metadata = {
      ...base,
      status: (targetCompleted ? 'completed' : 'in-progress') as TaskStatus,
      priority: task.priority,
      progress: targetCompleted ? 100 : task.progress === 100 ? 50 : task.progress || 25,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
    };
    this.togglingId.set(task.id);
    this.taskService
      .updateTask(task.id, { completed: targetCompleted })
      .pipe(finalize(() => this.togglingId.set(null)))
      .subscribe({
        next: () => {
          this.metadataService.set(task.id, metadata);
          const merged = this.metadataService.hydrate({ ...task, completed: targetCompleted });
          this.tasks.update((list) => list.map((item) => (item.id === task.id ? merged : item)));
          this.toast.success(
            targetCompleted ? 'Task marked as completed.' : 'Task marked as in progress.',
          );
        },
        error: (error: unknown) =>
          this.toast.error(
            error instanceof Error && error.message
              ? error.message
              : 'Could not update the task. Please try again.',
          ),
      });
  }

  protected requestDelete(task: Task): void {
    this.deleteTaskId.set(task.id);
  }

  protected cancelDelete(): void {
    if (!this.deleting()) {
      this.deleteTaskId.set(null);
    }
  }

  protected confirmDelete(): void {
    const id = this.deleteTaskId();
    if (!id || this.deleting()) {
      return;
    }
    this.deleting.set(true);
    this.taskService
      .deleteTask(id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.metadataService.remove(id);
          this.tasks.update((list) => list.filter((task) => task.id !== id));
          this.deleteTaskId.set(null);
          this.toast.success('Task deleted successfully.');
        },
        error: (error: unknown) => {
          this.deleteTaskId.set(null);
          this.toast.error(
            error instanceof Error && error.message
              ? error.message
              : 'Could not delete the task. Please try again.',
          );
        },
      });
  }

  protected clearFilters(): void {
    this.searchControl.setValue('');
    this.filterForm.setValue({ status: 'all', priority: 'all', project: 'all', sort: 'newest' });
  }

  protected priorityLabel(priority: TaskPriority): string {
    return Tasks.PRIORITY_LABELS[priority];
  }

  protected projectName(projectId: string | null): string {
    if (!projectId) {
      return 'No Project';
    }
    return this.projects().find((project) => project.id === projectId)?.name ?? 'No Project';
  }

  protected memberName(assigneeId: string | null): string {
    if (!assigneeId) {
      return 'Unassigned';
    }
    return this.teamMembers().find((member) => member.id === assigneeId)?.name ?? 'Unassigned';
  }

  private sortTasks(tasks: Task[], sort: SortOption): Task[] {
    const list = [...tasks];
    switch (sort) {
      case 'newest':
        return list.sort((a, b) => this.timestamp(b) - this.timestamp(a));
      case 'oldest':
        return list.sort((a, b) => this.timestamp(a) - this.timestamp(b));
      case 'priority':
        return list.sort(
          (a, b) => Tasks.PRIORITY_RANK[a.priority] - Tasks.PRIORITY_RANK[b.priority],
        );
      case 'progress':
        return list.sort((a, b) => b.progress - a.progress);
      default:
        return list;
    }
  }

  private timestamp(task: Task): number {
    const value = task.updatedAt || task.createdAt;
    const time = value ? Date.parse(value) : NaN;
    return Number.isNaN(time) ? 0 : time;
  }
}
