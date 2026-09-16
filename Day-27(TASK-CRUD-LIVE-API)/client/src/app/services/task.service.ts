import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TasksResponse {
  success: boolean;
  count: number;
  tasks: Task[];
}

export interface TaskResponse {
  success: boolean;
  message: string;
  task: Task;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.url);
  }

  createTask(title: string, description: string): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.url, { title, description });
  }

  updateTask(
    id: string,
    updates: Partial<Pick<Task, "title" | "description" | "completed">>
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.url}/${id}`, updates);
  }

  deleteTask(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.url}/${id}`
    );
  }
}
