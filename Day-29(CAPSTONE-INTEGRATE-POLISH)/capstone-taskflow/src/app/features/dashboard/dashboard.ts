import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProjectService } from '../../core/services/project';
import { TaskMetadataService } from '../../core/services/task-metadata';
import { TaskService } from '../../core/services/task';
import { TeamService } from '../../core/services/team';
import { Task } from '../../models/task.model';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';

/** One row inside the status / priority distribution cards. */
interface DistributionItem {
  label: string;
  count: number;
  percent: number;
  cssClass: string;
}

/** One row inside the project / team performance cards. */
interface GroupPerformance {
  id: string;
  name: string;
  subtitle: string | null;
  total: number;
  completed: number;
  percent: number;
}

/**
 * Dashboard — live summary, task progress, performance overview
 * and recent tasks. All numbers are computed from real API tasks
 * merged with local UI metadata.
 */
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HighlightDirective, TaskStatusPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly taskService = inject(TaskService);
  private readonly metadataService = inject(TaskMetadataService);
  private readonly projectService = inject(ProjectService);
  private readonly teamService = inject(TeamService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly tasks = signal<Task[]>([]);

  protected readonly projects = this.projectService.projects;
  protected readonly teamMembers = this.teamService.teamMembers;

  protected readonly totalTasks = computed(() => this.tasks().length);
  protected readonly completedCount = computed(
    () => this.tasks().filter((task) => task.completed).length,
  );
  protected readonly notStartedCount = computed(
    () => this.tasks().filter((task) => task.status === 'not-started').length,
  );
  protected readonly inProgressCount = computed(
    () => this.tasks().filter((task) => task.status === 'in-progress').length,
  );
  protected readonly highPriorityCount = computed(
    () => this.tasks().filter((task) => task.priority === 'high').length,
  );
  protected readonly mediumPriorityCount = computed(
    () => this.tasks().filter((task) => task.priority === 'medium').length,
  );
  protected readonly lowPriorityCount = computed(
    () => this.tasks().filter((task) => task.priority === 'low').length,
  );
  protected readonly completionRate = computed(() =>
    this.percent(this.completedCount(), this.totalTasks()),
  );
  protected readonly overallProgress = computed(() => {
    const tasks = this.tasks();
    if (tasks.length === 0) {
      return 0;
    }
    const sum = tasks.reduce((total, task) => total + task.progress, 0);
    return Math.round(sum / tasks.length);
  });

  protected readonly recentTasks = computed(() =>
    [...this.tasks()].sort((a, b) => this.timestamp(b) - this.timestamp(a)).slice(0, 6),
  );

  protected readonly statusDistribution = computed<DistributionItem[]>(() => [
    {
      label: 'Not Started',
      count: this.notStartedCount(),
      percent: this.percent(this.notStartedCount(), this.totalTasks()),
      cssClass: 'not-started',
    },
    {
      label: 'In Progress',
      count: this.inProgressCount(),
      percent: this.percent(this.inProgressCount(), this.totalTasks()),
      cssClass: 'in-progress',
    },
    {
      label: 'Completed',
      count: this.completedCount(),
      percent: this.completionRate(),
      cssClass: 'completed',
    },
  ]);

  protected readonly priorityDistribution = computed<DistributionItem[]>(() => [
    {
      label: 'High',
      count: this.highPriorityCount(),
      percent: this.percent(this.highPriorityCount(), this.totalTasks()),
      cssClass: 'high',
    },
    {
      label: 'Medium',
      count: this.mediumPriorityCount(),
      percent: this.percent(this.mediumPriorityCount(), this.totalTasks()),
      cssClass: 'medium',
    },
    {
      label: 'Low',
      count: this.lowPriorityCount(),
      percent: this.percent(this.lowPriorityCount(), this.totalTasks()),
      cssClass: 'low',
    },
  ]);

  protected readonly projectPerformance = computed<GroupPerformance[]>(() =>
    this.projects().map((project) => {
      const assigned = this.tasks().filter((task) => task.projectId === project.id);
      const completed = assigned.filter((task) => task.completed).length;
      return {
        id: project.id,
        name: project.name,
        subtitle: null,
        total: assigned.length,
        completed,
        percent: this.percent(completed, assigned.length),
      };
    }),
  );

  protected readonly teamPerformance = computed<GroupPerformance[]>(() =>
    this.teamMembers().map((member) => {
      const assigned = this.tasks().filter((task) => task.assigneeId === member.id);
      const completed = assigned.filter((task) => task.completed).length;
      return {
        id: member.id,
        name: member.name,
        subtitle: member.role,
        total: assigned.length,
        completed,
        percent: this.percent(completed, assigned.length),
      };
    }),
  );

  constructor() {
    void this.loadTasks();
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

  private percent(part: number, total: number): number {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }

  private timestamp(task: Task): number {
    const value = task.updatedAt || task.createdAt;
    const time = value ? Date.parse(value) : NaN;
    return Number.isNaN(time) ? 0 : time;
  }
}
