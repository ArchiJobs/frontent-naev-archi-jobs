import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Escuchar cambios en el estado de loading
    this.authService.isLoading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';

      const formValue = this.loginForm.value as {
        email: string;
        password: string;
      };

      const loginRequest: LoginRequest = {
        email: formValue.email,
        password: formValue.password,
      };

      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          // Redirigir según el tipo de usuario recibido del backend
          if (response.userType === 'EMPRESA') {
            this.router.navigate(['/employer/dashboard']);
          } else {
            this.router.navigate(['/job-seeker/dashboard']);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Error al iniciar sesión';
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
