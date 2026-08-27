import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  loading = false;
  errorMessage = '';
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.loading = true;

    this.authService.login({
      email: this.email,
      password: this.password
    }).pipe(
      finalize(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        if (!response.token) {
          this.errorMessage = 'Login succeeded but no JWT token was returned.';
          return;
        }

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);

        this.errorMessage =
          error?.status === 0
            ? 'The API could not be reached. Check the deployed API CORS settings.'
            : error?.error?.message ||
          error?.message ||
          'Login failed. Please check your email and password.';
      }
    });
  }
}