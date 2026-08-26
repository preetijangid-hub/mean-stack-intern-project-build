import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({

      next: (response) => {

        this.loading = false;

        if (!response.token) {
          this.error = 'Login successful but JWT token was not received.';
          return;
        }

        this.authService.saveToken(response.token);

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        this.loading = false;

        console.error('LOGIN ERROR:', err);

        this.error =
          err.error?.message ||
          err.error?.error ||
          'Login failed. Please check your credentials.';
      }
    });
  }
}