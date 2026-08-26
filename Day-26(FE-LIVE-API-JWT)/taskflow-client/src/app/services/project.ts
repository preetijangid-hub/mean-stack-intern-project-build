import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/projects`;

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      project
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }
}