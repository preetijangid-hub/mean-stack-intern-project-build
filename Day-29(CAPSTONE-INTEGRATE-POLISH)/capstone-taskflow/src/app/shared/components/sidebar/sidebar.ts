import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

/**
 * Application sidebar — primary navigation for the authenticated shell.
 * Vertical on desktop (~244px), horizontal top bar on mobile.
 */
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/team', label: 'Team Members', icon: '👥' },
  ];
}
