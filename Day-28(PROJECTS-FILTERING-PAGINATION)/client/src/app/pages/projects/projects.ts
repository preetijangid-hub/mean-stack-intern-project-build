import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-projects', standalone: true, imports: [RouterLink], templateUrl: './projects.html', styleUrl: './projects.css' })
export class Projects {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  get user() { return this.auth.getUser(); }
  logout(): void { this.auth.logout(); this.router.navigateByUrl('/login'); }
}
