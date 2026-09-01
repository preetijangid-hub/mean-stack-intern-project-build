import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth';

const API_BASE_URL = environment.apiUrl;

/**
 * Functional HTTP interceptor:
 * - attaches `Authorization: Bearer <token>` to API requests when a JWT exists
 * - never adds the header when no token is stored
 * - on a 401 from a non-auth API endpoint it clears the stale session and
 *   redirects to /login once (login/register calls are excluded to avoid
 *   redirect loops on invalid credentials).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isExternal = req.url.startsWith('http') && !req.url.startsWith(API_BASE_URL);
  const token = auth.getToken();
  const authedRequest =
    token && !isExternal ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authedRequest).pipe(
    catchError((error: unknown) => {
      const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/register');
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isAuthEndpoint &&
        !isExternal
      ) {
        auth.logout();
        void router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
};

