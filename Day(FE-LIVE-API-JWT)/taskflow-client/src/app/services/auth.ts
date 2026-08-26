import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface AuthResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'https://taskflow-api-zad8.onrender.com/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      data
    );
  }

  login(data: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}