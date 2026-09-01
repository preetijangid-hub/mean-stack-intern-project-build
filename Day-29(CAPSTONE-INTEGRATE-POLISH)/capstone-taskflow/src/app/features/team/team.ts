import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { ProjectService } from '../../core/services/project';
import { TaskMetadataService } from '../../core/services/task-metadata';
import { TaskService } from '../../core/services/task';
import { TeamService } from '../../core/services/team';
import { ToastService } from '../../core/services/toast';
import { Task, TaskPriority } from '../../models/task.model';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';
import { TeamMember } from '../../models/team-member.model';

type TeamSort = 'recent' | 'name' | 'tasks' | 'performance';

/** Per-member statistics calculated from real task data. */
interface MemberStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  rate: number;
}

/**
 * Team page — members are managed locally via TeamService (localStorage
 * backed, no backend team endpoints exist), while all performance numbers
 * are computed from real live-API tasks merged with UI metadata.
 */
@Component({
  selector: 'app-team',
  imports: [ReactiveFormsModule, TaskStatusPipe],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  private static readonly PRIORITY_LABELS: Record<TaskPriority, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  private readonly teamService = inject(TeamService);
  private readonly taskService = inject(TaskService);
  private readonly metadataService = inject(TaskMetadataService);
  private readonly projectService = inject(ProjectService);
  private readonly toast = inject(ToastService);

  protected readonly loadingTasks = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly tasks = signal<Task[]>([]);

  protected readonly searchTerm = signal('');
  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly sortControl = new FormControl<TeamSort>('recent', { nonNullable: true });
  private readonly currentSort = signal<TeamSort>('recent');

  protected readonly modalOpen = signal(false);
  protected readonly editingMember = signal<TeamMember | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);
  protected readonly deleteMemberId = signal<string | null>(null);
  protected readonly deleting = signal(false);
  protected readonly expandedMemberId = signal<string | null>(null);

  protected readonly memberForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    role: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
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

  protected readonly totalMembers = computed(() => this.teamService.teamMembers().length);

  protected readonly membersWithTasks = computed(
    () => this.teamService.teamMembers().filter((member) => this.stats(member.id).total > 0).length,
  );

  protected readonly topPerformer = computed<string>(() => {
    let best: TeamMember | null = null;
    let bestRate = -1;
    for (const member of this.teamService.teamMembers()) {
      const memberStats = this.stats(member.id);
      if (memberStats.total > 0 && memberStats.rate > bestRate) {
        best = member;
        bestRate = memberStats.rate;
      }
    }
    return best ? best.name : 'No data';
  });

  protected readonly averageCompletion = computed(() => {
    const members = this.teamService.teamMembers();
    if (members.length === 0) {
      return 0;
    }
    const sum = members.reduce((total, member) => total + this.stats(member.id).rate, 0);
    return Math.round(sum / members.length);
  });

  protected readonly visibleMembers = computed(() => {
    const term = this.searchTerm();
    const sorted = [...this.teamService.teamMembers()].sort((a, b) => this.compare(a, b));
    if (!term) {
      return sorted;
    }
    return sorted.filter(
      (member) =>
        member.name.toLowerCase().includes(term) || member.role.toLowerCase().includes(term),
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

  protected stats(memberId: string): MemberStats {
    const assigned = this.tasks().filter((task) => task.assigneeId === memberId);
    const total = assigned.length;
    const completed = assigned.filter((task) => task.completed).length;
    const inProgress = assigned.filter((task) => task.status === 'in-progress').length;
    const notStarted = assigned.filter((task) => task.status === 'not-started').length;
    return {
      total,
      completed,
      inProgress,
      notStarted,
      rate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }

  protected tasksFor(memberId: string): Task[] {
    return this.tasks().filter((task) => task.assigneeId === memberId);
  }

  protected toggleExpanded(memberId: string): void {
    this.expandedMemberId.update((current) => (current === memberId ? null : memberId));
  }

  protected openCreate(): void {
    this.editingMember.set(null);
    this.formError.set(null);
    this.memberForm.reset({ name: '', role: '' });
    this.modalOpen.set(true);
  }

  protected openEdit(member: TeamMember): void {
    this.editingMember.set(member);
    this.formError.set(null);
    this.memberForm.reset({ name: member.name, role: member.role });
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    if (this.saving()) {
      return;
    }
    this.modalOpen.set(false);
  }

  protected nameError(): string | null {
    const control = this.memberForm.controls.name;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Name is required.';
    }
    if (control.errors['minlength']) {
      return 'Name must be at least 2 characters.';
    }
    return null;
  }

  protected roleError(): string | null {
    const control = this.memberForm.controls.role;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Role is required.';
    }
    if (control.errors['minlength']) {
      return 'Role must be at least 2 characters.';
    }
    return null;
  }

  protected saveMember(): void {
    if (this.saving()) {
      return;
    }
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }
    const { name, role } = this.memberForm.getRawValue();
    const editing = this.editingMember();
    this.saving.set(true);
    this.formError.set(null);
    const saved = editing
      ? this.teamService.updateMember(editing.id, name, role)
      : this.teamService.createTeamMember(name, role);
    this.saving.set(false);
    if (editing && !saved) {
      this.formError.set('Could not update the member. Please try again.');
      return;
    }
    this.toast.success(editing ? 'Member updated successfully.' : 'Member added successfully.');
    this.modalOpen.set(false);
  }

  protected requestDelete(member: TeamMember): void {
    this.deleteMemberId.set(member.id);
  }

  protected cancelDelete(): void {
    if (!this.deleting()) {
      this.deleteMemberId.set(null);
    }
  }

  protected confirmDelete(): void {
    const id = this.deleteMemberId();
    if (!id || this.deleting()) {
      return;
    }
    this.deleting.set(true);
    // Clear the assignee reference from task metadata so assignments stay clean.
    for (const task of this.tasks()) {
      if (task.assigneeId === id) {
        this.metadataService.set(task.id, {
          ...this.metadataService.get(task.id),
          assigneeId: null,
        });
      }
    }
    this.tasks.update((list) =>
      list.map((task) => (task.assigneeId === id ? { ...task, assigneeId: null } : task)),
    );
    if (this.expandedMemberId() === id) {
      this.expandedMemberId.set(null);
    }
    this.teamService.deleteMember(id);
    this.deleteMemberId.set(null);
    this.deleting.set(false);
    this.toast.success('Member deleted. Their tasks now show "Unassigned".');
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }

  protected priorityLabel(priority: TaskPriority): string {
    return Team.PRIORITY_LABELS[priority];
  }

  protected projectName(projectId: string | null): string {
    if (!projectId) {
      return 'No Project';
    }
    return this.projectService.projects().find((project) => project.id === projectId)?.name ?? 'No Project';
  }

  protected initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter((part) => part.length > 0);
    if (parts.length === 0) {
      return '?';
    }
    const first = parts[0].charAt(0);
    const second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + second).toUpperCase();
  }

  private compare(a: TeamMember, b: TeamMember): number {
    switch (this.currentSort()) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'tasks':
        return this.stats(b.id).total - this.stats(a.id).total;
      case 'performance':
        return this.stats(b.id).rate - this.stats(a.id).rate;
      case 'recent':
      default:
        return this.orderOf(b) - this.orderOf(a);
    }
  }

  private orderOf(member: TeamMember): number {
    return this.teamService.teamMembers().findIndex((item) => item.id === member.id);
  }
}
