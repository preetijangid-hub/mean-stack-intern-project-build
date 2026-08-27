import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  loading = false;
  errorMessage = '';
  showPassword = false;

  get passwordStrength(): string {
    if (!this.password) return 'Start with at least 6 characters';
    if (this.password.length < 6) return 'Too short';
    if (this.password.length < 10) return 'Good start';
    return 'Strong password';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  register(): void {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);

        if (!response.token) {
          this.errorMessage = 'Registration succeeded but no JWT token was returned.';
          return;
        }

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.error('Registration error:', error);

        this.errorMessage =
          error?.status === 0
            ? 'The API could not be reached. Check the deployed API CORS settings.'
            : error?.error?.message ||
          error?.message ||
          'Registration failed. Please try again.';
      }
    });
  }
}