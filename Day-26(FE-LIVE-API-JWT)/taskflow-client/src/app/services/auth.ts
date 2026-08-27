import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(
        timeout(30000),
        tap((response) => {
          if (response.token) {
            this.saveToken(response.token);
          }
          this.saveUser(response.user);
        })
      );
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        timeout(30000),
        tap((response) => {
          if (response.token) {
            this.saveToken(response.token);
          }
          this.saveUser(response.user);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveUser(user: AuthUser | undefined): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser(): AuthUser | null {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as { exp?: number };
      return !payload.exp || payload.exp * 1000 > Date.now();
    } catch {
      this.logout();
      return false;
    }
  }
}