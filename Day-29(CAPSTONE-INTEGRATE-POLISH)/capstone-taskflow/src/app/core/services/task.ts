import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiTask, CreateTaskPayload, UpdateTaskPayload } from '../../models/task.model';

const API_BASE_URL = environment.apiUrl;

/**
 * Data access for the live /tasks endpoints.
 *
 * Only backend-supported fields (title, description, completed) are sent.
 * Richer UI metadata (status / priority / progress / project / assignee) is
 * kept locally by the UI layer and is never pushed to the API.
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);

  /** GET /tasks — returns the raw backend task list. */
  getTasks(): Observable<ApiTask[]> {
    return this.http.get<unknown>(`${API_BASE_URL}/tasks`).pipe(
      map((response) => this.normalizeTaskList(response)),
      catchError((error: unknown) => this.toError(error))
    );
  }

  /** POST /tasks — creates a task with backend-supported fields only. */
  createTask(payload: CreateTaskPayload): Observable<ApiTask> {
    const body: CreateTaskPayload = {
      title: payload.title.trim(),
      description: payload.description.trim(),
      completed: payload.completed,
    };
    return this.http.post<unknown>(`${API_BASE_URL}/tasks`, body).pipe(
      map((response) => this.normalizeTask(response)),
      catchError((error: unknown) => this.toError(error))
    );
  }

  /** PUT /tasks/:id — updates backend-supported fields only. */
  updateTask(id: string, payload: UpdateTaskPayload): Observable<ApiTask> {
    const body: UpdateTaskPayload = {};
    if (payload.title !== undefined) {
      body.title = payload.title.trim();
    }
    if (payload.description !== undefined) {
      body.description = payload.description.trim();
    }
    if (payload.completed !== undefined) {
      body.completed = payload.completed;
    }
    return this.http.put<unknown>(`${API_BASE_URL}/tasks/${encodeURIComponent(id)}`, body).pipe(
      map((response) => this.normalizeTask(response)),
      catchError((error: unknown) => this.toError(error))
    );
  }

  /** DELETE /tasks/:id */
  deleteTask(id: string): Observable<boolean> {
    return this.http.delete<unknown>(`${API_BASE_URL}/tasks/${encodeURIComponent(id)}`).pipe(
      map(() => true),
      catchError((error: unknown) => this.toError(error))
    );
  }

  // ------------------------------------------------------------------
  // Response normalization (handles _id/id, wrapped lists, etc.)
  // ------------------------------------------------------------------

  private normalizeTaskList(response: unknown): ApiTask[] {
    let items: unknown = [];
    if (Array.isArray(response)) {
      items = response;
    } else {
      const record = this.asRecord(response);
      if (record) {
        const candidate = record['tasks'] ?? record['data'] ?? record['items'] ?? record['results'] ?? record['docs'];
        if (Array.isArray(candidate)) {
          items = candidate;
        }
      }
    }
    if (!Array.isArray(items)) {
      return [];
    }
    const tasks: ApiTask[] = [];
    for (const item of items) {
      const task = this.normalizeTaskOrNull(item);
      if (task) {
        tasks.push(task);
      }
    }
    return tasks;
  }

  private normalizeTask(response: unknown): ApiTask {
    return this.normalizeTaskOrNull(response) ?? this.emptyTask();
  }

  private normalizeTaskOrNull(raw: unknown): ApiTask | null {
    const record = this.asRecord(raw);
    if (!record) {
      return null;
    }
    return {
      id: this.asString(record['id'] ?? record['_id']) || this.generateFallbackId(),
      title: this.asString(record['title'] ?? record['name']),
      description: this.asString(record['description'] ?? record['desc']),
      completed: record['completed'] === true || record['completed'] === 'true',
      user: this.asNullableString(record['user']),
      createdAt: this.asNullableString(record['createdAt']) ?? undefined,
      updatedAt: this.asNullableString(record['updatedAt']) ?? undefined,
    };
  }

  private emptyTask(): ApiTask {
    return {
      id: this.generateFallbackId(),
      title: '',
      description: '',
      completed: false,
      user: null,
    };
  }

  private generateFallbackId(): string {
    return `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  }

  private asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  private asNullableString(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }
    return value.trim() || null;
  }

  // ------------------------------------------------------------------
  // Error handling
  // ------------------------------------------------------------------

  private toError(error: unknown): Observable<never> {
    return throwError(() => new Error(this.getErrorMessage(error)));
  }

  /** Maps any thrown value to a user-friendly message. */
  getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return (
          'Unable to reach the TaskFlow API. Check your internet connection, make sure the ' +
          'API is awake (free Render instances may need a minute to start) and that the ' +
          'configured API URL is reachable from this browser.'
        );
      }
      const apiMessage = this.extractApiMessage(error.error);
      if (apiMessage) {
        return apiMessage;
      }
      if (error.status === 400) {
        return 'The task data was invalid. Please review the form and try again.';
      }
      if (error.status === 401 || error.status === 403) {
        return 'Your session is invalid or has expired. Please log in again.';
      }
      if (error.status === 404) {
        return 'The task was not found. It may have been deleted already.';
      }
      if (error.status >= 500) {
        return 'The server encountered an error. Please try again in a moment.';
      }
      return `Request failed with status ${error.status}.`;
    }
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'Something went wrong. Please try again.';
  }

  private extractApiMessage(body: unknown): string | null {
    if (typeof body === 'string') {
      return body.trim() || null;
    }
    const record = this.asRecord(body);
    if (!record) {
      return null;
    }
    for (const key of ['message', 'error', 'msg']) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    const errors = record['errors'];
    if (typeof errors === 'string' && errors.trim()) {
      return errors.trim();
    }
    if (Array.isArray(errors)) {
      const parts: string[] = [];
      for (const item of errors) {
        const nested = this.asRecord(item);
        const text = typeof item === 'string' ? item : nested ? (nested['msg'] ?? nested['message']) : undefined;
        if (typeof text === 'string' && text.trim()) {
          parts.push(text.trim());
        }
      }
      if (parts.length) {
        return parts.join('; ');
      }
    }
    return null;
  }
}

