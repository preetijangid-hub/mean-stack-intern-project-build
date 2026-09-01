import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { ToastService } from '../../../core/services/toast';

/**
 * Register page — creates an account against the live TaskFlow API via
 * AuthService (which persists the returned JWT under the localStorage key
 * "token") and then navigates to /dashboard.
 */
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected get name() {
    return this.form.controls.name;
  }

  protected get email() {
    return this.form.controls.email;
  }

  protected get password() {
    return this.form.controls.password;
  }

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected nameError(): string | null {
    const control = this.name;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Name is required.';
    }
    if (control.errors['minlength']) {
      return 'Name must be at least 2 characters.';
    }
    return null;
  }

  protected emailError(): string | null {
    const control = this.email;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Email is required.';
    }
    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }
    return null;
  }

  protected passwordError(): string | null {
    const control = this.password;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Password is required.';
    }
    if (control.errors['minlength']) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  }

  protected onSubmit(): void {
    this.errorMessage.set(null);

    if (this.loading()) {
      return; // prevent duplicate submissions
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { name, email, password } = this.form.getRawValue();

    this.auth
      .register({ name: name.trim(), email: email.trim(), password })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          // AuthService persisted the JWT (key "token") when the API
          // returned one; only then navigate into the protected area.
          if (response.token) {
            this.toast.success('Account created. Welcome to TaskFlow!');
            void this.router.navigateByUrl('/dashboard');
          } else {
            // Backend indicated success without a JWT: send the user to
            // login to authenticate explicitly.
            this.toast.info('Account created. Please log in to continue.');
            void this.router.navigateByUrl('/login');
          }
        },
        error: (error: unknown) => {
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'Registration failed. Please try again.';
          this.errorMessage.set(message);
          this.toast.error(message);
        },
      });
  }
}
