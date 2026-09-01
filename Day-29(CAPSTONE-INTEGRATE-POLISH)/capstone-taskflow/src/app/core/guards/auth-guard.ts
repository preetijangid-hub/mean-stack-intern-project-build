import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Protects private routes (dashboard, tasks, projects, team).
 * Unauthenticated visitors are redirected to /login while remembering
 * the originally requested URL in the `returnUrl` query parameter.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  const returnUrl = state.url && state.url !== '/' ? state.url : undefined;
  return router.createUrlTree(['/login'], returnUrl ? { queryParams: { returnUrl } } : {});
};
