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
export class Login {

  email = '';
  password = '';

  loading = false;
  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  login(): void {

    this.errorMessage = '';


    if (
      !this.email.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'Email and password are required';

      return;
    }


    this.loading = true;


    this.authService
      .login({
        email: this.email.trim(),
        password: this.password
      })
      .subscribe({

        next: (response) => {

          console.log(
            'Login successful:',
            response
          );

          this.loading = false;

          this.router.navigateByUrl(
            '/dashboard'
          );

        },


        error: (error: any) => {

          console.error(
            'Login error:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            error?.message ||
            'Login failed. Please try again.';

        }

      });

  }

}