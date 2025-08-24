import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  resetToken = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Obtener el token de la URL
    this.resetToken = this.route.snapshot.queryParams['token'] || '';
    
    if (!this.resetToken) {
      this.errorMessage = 'Token de restablecimiento inválido o expirado.';
    }
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  // Custom validator para confirmar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && !this.isLoading && this.resetToken) {
      this.isLoading = true;
      this.errorMessage = '';

      const { password } = this.resetPasswordForm.value;
      
      // Simular llamada al backend
      setTimeout(() => {
        console.log('Restableciendo contraseña con token:', this.resetToken);
        console.log('Nueva contraseña:', password);
        
        // Simular respuesta exitosa
        this.isLoading = false;
        this.successMessage = 'Contraseña restablecida exitosamente.';
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        
        // En producción, aquí harías la llamada real al microservicio de auth
        // this.authService.resetPassword(this.resetToken, password).subscribe({
        //   next: () => {
        //     this.successMessage = 'Contraseña restablecida exitosamente.';
        //     this.isLoading = false;
        //     setTimeout(() => {
        //       this.router.navigate(['/login']);
        //     }, 2000);
        //   },
        //   error: (error) => {
        //     this.errorMessage = 'Error al restablecer la contraseña. El token puede haber expirado.';
        //     this.isLoading = false;
        //   }
        // });
        
      }, 2000);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}
