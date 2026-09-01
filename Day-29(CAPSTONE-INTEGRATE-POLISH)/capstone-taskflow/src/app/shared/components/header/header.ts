import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/projects': 'Projects',
  '/team': 'Team Members',
};

/**
 * Application header — shows the current page title, the authenticated
 * user (with a safe "User" fallback) and a working logout button.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly pageTitle = signal('TaskFlow');
  protected readonly user = this.auth.currentUser;

  protected readonly displayName = computed(() => {
    const name = this.user()?.name;
    return name && name.trim().length > 0 ? name.trim() : 'User';
  });

  protected readonly initial = computed(() => {
    const name = this.displayName();
    return name.charAt(0).toUpperCase();
  });

  constructor() {
    this.pageTitle.set(this.titleFor(this.router.url));
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.pageTitle.set(this.titleFor(this.router.url));
      });
  }

  protected logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }

  private titleFor(url: string): string {
    const path = url.split('?')[0].split('#')[0];
    return PAGE_TITLES[path] ?? 'TaskFlow';
  }
}
