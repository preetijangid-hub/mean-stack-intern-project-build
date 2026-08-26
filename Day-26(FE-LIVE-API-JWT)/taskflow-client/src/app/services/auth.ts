import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

export interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/auth`;


  // ===============================
  // LOGIN
  // ===============================

  login(credentials: LoginRequest): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          if (response.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );
          }

        })
      );
  }


  // ===============================
  // REGISTER
  // ===============================

  register(
    data: RegisterRequest
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/register`,
        data
      )
      .pipe(
        tap((response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          if (response.user) {
            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );
          }

        })
      );
  }


  // ===============================
  // TOKEN
  // ===============================

  getToken(): string | null {

    return localStorage.getItem('token');

  }


  // ===============================
  // USER
  // ===============================

  getUser(): User | null {

    const user = localStorage.getItem('user');

    return user
      ? JSON.parse(user)
      : null;

  }


  // ===============================
  // LOGIN STATUS
  // ===============================

  isLoggedIn(): boolean {

    return !!this.getToken();

  }


  // ===============================
  // LOGOUT
  // ===============================

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }

}