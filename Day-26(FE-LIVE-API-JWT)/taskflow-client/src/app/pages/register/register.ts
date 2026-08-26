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
export class Register {

  name = '';
  email = '';
  password = '';

  loading = false;
  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  register(): void {

    this.errorMessage = '';


    // Validation

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'All fields are required';

      return;
    }


    if (this.password.length < 6) {

      this.errorMessage =
        'Password must be at least 6 characters';

      return;
    }


    this.loading = true;


    this.authService
      .register({
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password
      })
      .subscribe({

        next: (response) => {

          console.log(
            'Registration successful:',
            response
          );

          this.loading = false;

          this.router.navigateByUrl(
            '/dashboard'
          );

        },


        error: (error: any) => {

          console.error(
            'Registration error:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            error?.message ||
            'Registration failed. Please try again.';

        }

      });

  }

}