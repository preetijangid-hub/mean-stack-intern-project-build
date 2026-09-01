import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './shared/components/header/header';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Toast } from './shared/components/toast/toast';
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Root application layout. Authenticated pages (/dashboard, /tasks,
 * /projects, /team) render inside the app shell (sidebar + header +
 * content); /login and /register render as clean standalone pages.
 * RouterOutlet remains the single source of page rendering and
 * the global Toast outlet is always mounted.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);

  protected readonly shellVisible = signal(!App.isAuthPage(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.shellVisible.set(!App.isAuthPage(this.router.url));
      });
  }

  private static isAuthPage(url: string): boolean {
    const path = url.split('?')[0].split('#')[0];
    return AUTH_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));
  }
}
