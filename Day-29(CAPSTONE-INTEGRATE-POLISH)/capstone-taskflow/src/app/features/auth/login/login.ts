import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth';

/**
 * Login page — authenticates against the live TaskFlow API via AuthService
 * (which persists the JWT under the localStorage key "token") and then
 * navigates to the returnUrl or /dashboard.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected get email() {
    return this.form.controls.email;
  }

  protected get password() {
    return this.form.controls.password;
  }

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
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
    const { email, password } = this.form.getRawValue();

    this.auth
      .login({ email: email.trim(), password })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          const requested = this.route.snapshot.queryParamMap.get('returnUrl');
          void this.router.navigateByUrl(this.safeReturnUrl(requested));
        },
        error: (error: unknown) => {
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'Login failed. Please try again.';
          this.errorMessage.set(message);
        },
      });
  }

  /** Only allows relative, single-slash internal URLs. */
  private safeReturnUrl(url: string | null): string {
    if (!url || !url.startsWith('/') || url.startsWith('//')) {
      return '/dashboard';
    }
    return url;
  }
}
