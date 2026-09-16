import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface Project {
  _id: string;
  name: string;
  description: string;
  team: string[];
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  projects: Project[];
}

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/projects`;

  getProjects(
    page: number,
    limit: number,
    search: string
  ): Observable<ProjectsResponse> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ProjectsResponse>(this.url, { params });
  }

  createProject(
    name: string,
    description: string,
    team: string[]
  ): Observable<{ success: boolean; message: string; project: Project }> {
    return this.http.post<{ success: boolean; message: string; project: Project }>(
      this.url,
      { name, description, team }
    );
  }
}