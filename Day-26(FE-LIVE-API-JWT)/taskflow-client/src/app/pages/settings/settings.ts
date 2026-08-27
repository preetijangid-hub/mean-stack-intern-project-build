import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({ selector: 'app-settings', imports: [FormsModule, RouterLink], templateUrl: './settings.html', styleUrl: '../workspace.css' })
export class Settings { sidebarCompact = false; constructor(private auth: AuthService, private router: Router) {} get user() { return this.auth.getUser(); } logout(): void { this.auth.logout(); this.router.navigate(['/login']); } }
