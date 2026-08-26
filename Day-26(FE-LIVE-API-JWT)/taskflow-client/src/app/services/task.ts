import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TasksResponse {
  count: number;
  tasks: Task[];
}

export interface TaskResponse {
  message?: string;
  task: Task;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.apiUrl);
  }

  getTask(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(
      `${this.apiUrl}/${id}`
    );
  }

  createTask(data: {
    title: string;
    description?: string;
    completed?: boolean;
  }): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      this.apiUrl,
      data
    );
  }

  updateTask(
    id: string,
    data: Partial<Task>
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}