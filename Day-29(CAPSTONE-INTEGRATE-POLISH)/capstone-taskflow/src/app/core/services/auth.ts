import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  JwtPayload,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../models/auth.model';

const API_BASE_URL = environment.apiUrl;
const TOKEN_KEY = 'token';
const USER_KEY = 'taskflow.user';

/**
 * Authentication service for the live TaskFlow API.
 * The JWT is stored under the single localStorage key "token".
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly currentUserSignal = signal<User | null>(this.readStoredUser());

  /** Currently authenticated user (reactive). */
  readonly currentUser = computed(() => this.currentUserSignal());

  /** POST /auth/register — persists the returned session on success. */
  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<unknown>(`${API_BASE_URL}/auth/register`, payload).pipe(
      map((response) => this.handleAuthSuccess(response, 'Registration')),
      catchError((error: unknown) => this.toError(error))
    );
  }

  /** POST /auth/login — persists the returned session on success. */
  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<unknown>(`${API_BASE_URL}/auth/login`, payload).pipe(
      map((response) => this.handleAuthSuccess(response, 'Login')),
      catchError((error: unknown) => this.toError(error))
    );
  }

  /** Removes the stored JWT + user and resets auth state. */
  logout(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // Storage unavailable (private mode); state reset below still applies.
    }
    this.currentUserSignal.set(null);
  }

  /** Returns the stored JWT or null. */
  getToken(): string | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      return token && token.trim().length > 0 ? token : null;
    } catch {
      return null;
    }
  }

  /** True when a token exists and has not expired. */
  isAuthenticated(): boolean {
    return this.getToken() !== null && !this.isTokenExpired();
  }

  /** Best-effort JWT expiry check (false when the token has no `exp`). */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const payload = this.decodeToken(token);
    if (!payload || typeof payload.exp !== 'number') {
      return false;
    }
    return payload.exp * 1000 <= Date.now() + 30_000; // 30s clock-skew tolerance
  }

  private handleAuthSuccess(response: unknown, actionLabel: string): AuthResponse {
    const token = this.extractToken(response);
    if (!token) {
      throw new Error(`${actionLabel} succeeded but the server did not return an authentication token.`);
    }
    const user = this.extractUser(response) ?? this.buildUserFromToken(token);
    this.persistSession(token, user);
    return { token, user };
  }

  private persistSession(token: string, user: User | null): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // Ignore storage failures.
    }
    this.currentUserSignal.set(user);
  }

  private readStoredUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) {
        return null;
      }
      return this.normalizeUser(JSON.parse(raw) as unknown);
    } catch {
      return null;
    }
  }

  private normalizeUser(raw: unknown): User | null {
    const record = this.asRecord(raw);
    if (!record) {
      return null;
    }
    const id = this.asString(record['id'] ?? record['_id'] ?? record['userId']);
    const name = this.asString(record['name'] ?? record['username']);
    const email = this.asString(record['email']);
    if (!name && !email) {
      return null;
    }
    return {
      id: id || 'current-user',
      name: name || (email ? email.split('@')[0] : 'User'),
      email,
    };
  }

  // ------------------------------------------------------------------
  // Token / response helpers
  // ------------------------------------------------------------------

  private extractToken(response: unknown): string | null {
    const root = this.asRecord(response);
    if (!root) {
      return typeof response === 'string' && response.trim() ? response : null;
    }
    const direct = root['token'] ?? root['accessToken'] ?? root['jwt'] ?? root['authToken'];
    if (typeof direct === 'string' && direct.trim()) {
      return direct;
    }
    const data = this.asRecord(root['data']);
    if (data) {
      const nested = data['token'] ?? data['accessToken'] ?? data['jwt'];
      if (typeof nested === 'string' && nested.trim()) {
        return nested;
      }
    }
    return null;
  }

  private extractUser(response: unknown): User | null {
    const root = this.asRecord(response);
    if (!root) {
      return null;
    }
    const data = this.asRecord(root['data']);
    const rawUser = root['user'] ?? (data ? data['user'] : undefined);
    const userRecord = this.asRecord(rawUser);
    if (userRecord) {
      return this.normalizeUser(userRecord);
    }
    // Some APIs return user fields on the root / data object directly.
    if ('email' in root || 'name' in root) {
      return this.normalizeUser(root);
    }
    if (data && ('email' in data || 'name' in data)) {
      return this.normalizeUser(data);
    }
    return null;
  }

  private buildUserFromToken(token: string): User | null {
    const payload = this.decodeToken(token);
    if (!payload) {
      return null;
    }
    const id = this.asString(
      payload['userId'] ?? payload['id'] ?? payload['_id'] ?? payload['sub'],
    );
    const name = this.asString(payload['name']);
    const email = this.asString(payload['email']);
    if (!name && !email) {
      return null;
    }
    return {
      id: id || 'current-user',
      name: name || (email ? email.split('@')[0] : 'User'),
      email,
    };
  }

  /** Safely decodes a JWT payload; returns null when the token is malformed. */
  private decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const bytes = atob(padded);
      let escaped = '';
      for (let i = 0; i < bytes.length; i++) {
        escaped += `%${bytes.charCodeAt(i).toString(16).padStart(2, '0')}`;
      }
      const parsed: unknown = JSON.parse(decodeURIComponent(escaped));
      return this.asRecord(parsed) as JwtPayload | null;
    } catch {
      return null;
    }
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  }

  private asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
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
        return 'The submitted data was invalid. Please review the form and try again.';
      }
      if (error.status === 401 || error.status === 403) {
        return 'Invalid email or password. Please check your credentials and try again.';
      }
      if (error.status === 404) {
        return 'The authentication service was not found. Please try again later.';
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

