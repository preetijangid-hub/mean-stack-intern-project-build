import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { ProjectService } from '../../core/services/project';
import { TaskMetadataService } from '../../core/services/task-metadata';
import { TaskService } from '../../core/services/task';
import { ToastService } from '../../core/services/toast';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';

type ProjectSort = 'recent' | 'name' | 'tasks' | 'progress';

/** Per-project statistics calculated from real task data. */
interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percent: number;
}

/**
 * Projects page — projects are managed locally via ProjectService
 * (localStorage-backed, no backend project endpoints exist), while all
 * statistics are computed from real live-API tasks merged with UI metadata.
 */
@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);
  private readonly metadataService = inject(TaskMetadataService);
  private readonly toast = inject(ToastService);

  protected readonly loadingTasks = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly tasks = signal<Task[]>([]);

  protected readonly searchTerm = signal('');
  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly sortControl = new FormControl<ProjectSort>('recent', { nonNullable: true });
  private readonly currentSort = signal<ProjectSort>('recent');

  protected readonly modalOpen = signal(false);
  protected readonly editingProject = signal<Project | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);
  protected readonly deleteProjectId = signal<string | null>(null);
  protected readonly deleting = signal(false);

  protected readonly projectForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) => this.searchTerm.set(term.trim().toLowerCase()));

    this.sortControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((sort) => {
      this.currentSort.set(sort);
    });

    void this.loadTasks();
  }

  protected readonly totalProjects = computed(() => this.projectService.projects().length);

  protected readonly activeProjects = computed(
    () =>
      this.projectService.projects().filter((project) => {
        const stats = this.stats(project.id);
        return stats.total > 0 && stats.completed < stats.total;
      }).length,
  );

  protected readonly completedProjects = computed(
    () =>
      this.projectService.projects().filter((project) => {
        const stats = this.stats(project.id);
        return stats.total > 0 && stats.completed === stats.total;
      }).length,
  );

  protected readonly averageProgress = computed(() => {
    const projects = this.projectService.projects();
    if (projects.length === 0) {
      return 0;
    }
    const sum = projects.reduce((total, project) => total + this.stats(project.id).percent, 0);
    return Math.round(sum / projects.length);
  });

  protected readonly visibleProjects = computed(() => {
    const term = this.searchTerm();
    const sorted = [...this.projectService.projects()].sort((a, b) => this.compare(a, b));
    if (!term) {
      return sorted;
    }
    return sorted.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term),
    );
  });

  protected loadTasks(): void {
    this.loadingTasks.set(true);
    this.errorMessage.set(null);
    this.taskService
      .getTasks()
      .pipe(finalize(() => this.loadingTasks.set(false)))
      .subscribe({
        next: (apiTasks) => this.tasks.set(this.metadataService.hydrateAll(apiTasks)),
        error: (error: unknown) =>
          this.errorMessage.set(
            error instanceof Error && error.message ? error.message : 'Failed to load tasks.',
          ),
      });
  }

  protected stats(projectId: string): ProjectStats {
    const assigned = this.tasks().filter((task) => task.projectId === projectId);
    const total = assigned.length;
    const completed = assigned.filter((task) => task.completed).length;
    const inProgress = assigned.filter((task) => task.status === 'in-progress').length;
    const notStarted = assigned.filter((task) => task.status === 'not-started').length;
    return {
      total,
      completed,
      inProgress,
      notStarted,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  protected openCreate(): void {
    this.editingProject.set(null);
    this.formError.set(null);
    this.projectForm.reset({ name: '', description: '' });
    this.modalOpen.set(true);
  }

  protected openEdit(project: Project): void {
    this.editingProject.set(project);
    this.formError.set(null);
    this.projectForm.reset({ name: project.name, description: project.description });
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    if (this.saving()) {
      return;
    }
    this.modalOpen.set(false);
  }

  protected nameError(): string | null {
    const control = this.projectForm.controls.name;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Project name is required.';
    }
    if (control.errors['minlength']) {
      return 'Project name must be at least 2 characters.';
    }
    return null;
  }

  protected saveProject(): void {
    if (this.saving()) {
      return;
    }
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    const { name, description } = this.projectForm.getRawValue();
    const editing = this.editingProject();
    this.saving.set(true);
    this.formError.set(null);
    const updated = editing
      ? this.projectService.updateProject(editing.id, name, description)
      : this.projectService.createProject(name, description);
    this.saving.set(false);
    if (editing && !updated) {
      this.formError.set('Could not update the project. Please try again.');
      return;
    }
    this.toast.success(editing ? 'Project updated successfully.' : 'Project created successfully.');
    this.modalOpen.set(false);
  }

  protected requestDelete(project: Project): void {
    this.deleteProjectId.set(project.id);
  }

  protected cancelDelete(): void {
    if (!this.deleting()) {
      this.deleteProjectId.set(null);
    }
  }

  protected confirmDelete(): void {
    const id = this.deleteProjectId();
    if (!id || this.deleting()) {
      return;
    }
    this.deleting.set(true);
    // Clear the project reference from task metadata so assignments stay clean.
    for (const task of this.tasks()) {
      if (task.projectId === id) {
        this.metadataService.set(task.id, {
          ...this.metadataService.get(task.id),
          projectId: null,
        });
      }
    }
    this.tasks.update((list) =>
      list.map((task) => (task.projectId === id ? { ...task, projectId: null } : task)),
    );
    this.projectService.deleteProject(id);
    this.deleteProjectId.set(null);
    this.deleting.set(false);
    this.toast.success('Project deleted. Its tasks now show "No Project".');
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }

  private compare(a: Project, b: Project): number {
    switch (this.currentSort()) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'tasks':
        return this.stats(b.id).total - this.stats(a.id).total;
      case 'progress':
        return this.stats(b.id).percent - this.stats(a.id).percent;
      case 'recent':
      default:
        return this.createdAt(b) - this.createdAt(a);
    }
  }

  private createdAt(project: Project): number {
    const time = project.createdAt ? Date.parse(project.createdAt) : NaN;
    return Number.isNaN(time) ? 0 : time;
  }
}
