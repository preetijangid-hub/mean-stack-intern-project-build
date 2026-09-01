/**
 * Task models.
 *
 * The live API (see src/environments/environment.ts) persists only a
 * small set of fields (title, description, completed). Everything richer
 * (status / priority / progress / project / assignee) is UI-only metadata
 * kept in localStorage keyed by task id and is NEVER sent to the API.
 */

/** Task status shown in the UI. A task with `completed === true` is 'completed'. */
export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export type TaskPriority = 'high' | 'medium' | 'low';

/** Fields actually persisted by the live backend. */
export interface ApiTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Body accepted by POST /tasks — backend-supported fields only. */
export interface CreateTaskPayload {
  title: string;
  description: string;
  completed: boolean;
}

/** Body accepted by PUT /tasks/:id — backend-supported fields only. */
export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

/** UI-only metadata persisted in localStorage, keyed by task id. */
export interface TaskMetadata {
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  projectId: string | null;
  assigneeId: string | null;
}

/** Full task shape used by the UI: API fields merged with UI metadata. */
export interface Task extends ApiTask, TaskMetadata {}

/** Status options for filters/forms. */
export const TASK_STATUS_OPTIONS: ReadonlyArray<{ value: TaskStatus; label: string }> = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

/** Priority options for filters/forms. */
export const TASK_PRIORITY_OPTIONS: ReadonlyArray<{ value: TaskPriority; label: string }> = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

/** Allowed progress steps. */
export const TASK_PROGRESS_OPTIONS: ReadonlyArray<number> = [0, 25, 50, 75, 100];

/** Default metadata applied when a task has no stored metadata yet. */
export function createDefaultTaskMetadata(): TaskMetadata {
  return {
    status: 'not-started',
    priority: 'medium',
    progress: 0,
    projectId: null,
    assigneeId: null,
  };
}

