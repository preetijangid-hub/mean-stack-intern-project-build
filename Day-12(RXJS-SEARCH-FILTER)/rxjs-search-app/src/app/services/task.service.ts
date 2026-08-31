import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/tasks';

  searchTasks(
    searchTerm: string,
    status: string
  ): Observable<Task[]> {
    let params = new HttpParams();

    if (searchTerm.trim()) {
      params = params.set('title_like', searchTerm.trim());
    }

    if (status !== 'All') {
      params = params.set('status', status);
    }

    return this.http.get<Task[]>(this.apiUrl, { params });
  }
}
