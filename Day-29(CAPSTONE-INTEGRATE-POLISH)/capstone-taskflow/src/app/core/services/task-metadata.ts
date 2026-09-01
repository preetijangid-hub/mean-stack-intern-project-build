import { Injectable, computed, signal } from '@angular/core';
import {
  ApiTask,
  Task,
  TaskMetadata,
  TaskPriority,
  TaskStatus,
  createDefaultTaskMetadata,
} from '../../models/task.model';

const STORAGE_KEY = 'taskflow.taskMetadata';

/**
 * UI-only task metadata (status / priority / progress / project / assignee).
 *
 * The live backend persists only title/description/completed, so this extra
 * productivity data is kept in localStorage keyed by task id and merged into
 * Task objects for the UI. It is NEVER sent to the API.
 */
@Injectable({ providedIn: 'root' })
export class TaskMetadataService {
  private readonly metadataSignal = signal<Record<string, TaskMetadata>>(this.load());

  /** All stored metadata, keyed by task id (reactive). */
  readonly metadata = computed(() => this.metadataSignal());

  /** Returns stored metadata for a task or sensible defaults. */
  get(taskId: string): TaskMetadata {
    return this.metadataSignal()[taskId] ?? createDefaultTaskMetadata();
  }

  /** Persists metadata for one task. */
  set(taskId: string, metadata: TaskMetadata): void {
    this.metadataSignal.update((all) => ({ ...all, [taskId]: metadata }));
    this.persist();
  }

  /** Removes metadata when a task is deleted. */
  remove(taskId: string): void {
    this.metadataSignal.update((all) => {
      if (!(taskId in all)) {
        return all;
      }
      const next = { ...all };
      delete next[taskId];
      return next;
    });
    this.persist();
  }

  /** Merges one API task with its UI metadata into a full UI Task. */
  hydrate(task: ApiTask): Task {
    const stored = this.metadataSignal()[task.id];
    const metadata = stored ? this.normalizeMetadata(stored) : createDefaultTaskMetadata();
    return this.merge(task, metadata);
  }

  /** Merges a list of API tasks with their UI metadata. */
  hydrateAll(tasks: ApiTask[]): Task[] {
    return tasks.map((task) => this.hydrate(task));
  }

  // ------------------------------------------------------------------

  private merge(task: ApiTask, metadata: TaskMetadata): Task {
    const status: TaskStatus = task.completed
      ? 'completed'
      : metadata.status === 'completed'
        ? 'in-progress'
        : metadata.status;
    const progress = task.completed ? 100 : status === 'not-started' ? 0 : metadata.progress || 25;
    return {
      ...task,
      status,
      priority: metadata.priority,
      progress,
      projectId: metadata.projectId,
      assigneeId: metadata.assigneeId,
    };
  }

  private normalizeMetadata(raw: TaskMetadata): TaskMetadata {
    const status: TaskStatus =
      raw.status === 'in-progress' || raw.status === 'completed' ? raw.status : 'not-started';
    const priority: TaskPriority =
      raw.priority === 'high' || raw.priority === 'low' ? raw.priority : 'medium';
    const progress =
      typeof raw.progress === 'number' && raw.progress >= 0 && raw.progress <= 100
        ? Math.round(raw.progress)
        : 0;
    return {
      status,
      priority,
      progress,
      projectId: typeof raw.projectId === 'string' && raw.projectId ? raw.projectId : null,
      assigneeId: typeof raw.assigneeId === 'string' && raw.assigneeId ? raw.assigneeId : null,
    };
  }

  private load(): Record<string, TaskMetadata> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {};
      }
      const result: Record<string, TaskMetadata> = {};
      for (const [taskId, value] of Object.entries(parsed as Record<string, unknown>)) {
        if (value && typeof value === 'object') {
          result[taskId] = this.normalizeMetadata(value as TaskMetadata);
        }
      }
      return result;
    } catch {
      return {};
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.metadataSignal()));
    } catch {
      // Storage unavailable; in-memory state still works for this session.
    }
  }
}
