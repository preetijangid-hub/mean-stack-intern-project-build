import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-register', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './register.html', styleUrl: './register.css' })
export class Register {
  private readonly auth = inject(AuthService); private readonly router = inject(Router); private readonly changeDetector = inject(ChangeDetectorRef);
  name = ''; email = ''; password = ''; loading = false; error = '';
  submit(form: NgForm): void { if (form.invalid) { form.control.markAllAsTouched(); return; } this.loading = true; this.error = ''; this.auth.register(this.name.trim(), this.email.trim(), this.password).pipe(finalize(() => { this.loading = false; })).subscribe({ next: () => this.router.navigateByUrl('/dashboard'), error: (error) => { this.error = error.status === 0 ? 'The live API could not be reached.' : error.error?.message || 'Registration failed. Please try again.'; this.loading = false; this.changeDetector.detectChanges(); } }); }
}