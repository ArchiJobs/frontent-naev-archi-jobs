import { Routes } from '@angular/router';
import { GuestGuard } from '../../core/guards/guest.guard';

// Auth Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'reset-password', 
    component: ResetPasswordComponent,
    canActivate: [GuestGuard]
  }
];
