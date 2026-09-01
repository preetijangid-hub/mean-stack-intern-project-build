/**
 * Authentication & user related models.
 */

/** Authenticated user representation used across the app. */
export interface User {
  id: string;
  name: string;
  email: string;
}

/** Payload sent to POST /auth/register */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/** Payload sent to POST /auth/login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Normalized response returned by AuthService.login() / register(). */
export interface AuthResponse {
  token: string;
  user: User | null;
}

/** Subset of the JWT payload the app cares about. */
export interface JwtPayload {
  sub?: string;
  id?: string;
  _id?: string;
  userId?: string;
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

