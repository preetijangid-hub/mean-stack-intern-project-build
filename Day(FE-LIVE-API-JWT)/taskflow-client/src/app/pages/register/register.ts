import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill all fields.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({

      next: (response) => {

        this.loading = false;

        console.log('REGISTER RESPONSE:', response);

        if (!response.token) {
          this.error =
            response.message ||
            'Registration completed but JWT token was not received.';
          return;
        }

        this.authService.saveToken(response.token);

        this.success = 'Registration successful!';

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        this.loading = false;

        console.error('REGISTER ERROR:', err);

        this.error =
          err.error?.message ||
          err.error?.error ||
          'Registration failed. Please try again.';
      }
    });
  }
}