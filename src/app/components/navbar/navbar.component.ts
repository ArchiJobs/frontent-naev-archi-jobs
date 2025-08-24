import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

import { AuthStateService } from '../../core/services/auth-state.service';
import { User } from '../../core/interfaces/auth.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;

  currentUser: User | null = null;
  isAuthenticated = false;
  userMenuOpen = false;

  constructor(
    private readonly router: Router,
    private readonly authState: AuthStateService
  ) {
    this.authState.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.authState.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.userMenuOpen = false;
  }
  goToPostulaciones() {
    this.router.navigate(['/job-seeker/postulaciones']);
    this.userMenuOpen = false;
  }
  goToDashboard() {
    if (this.currentUser?.userType === 'EMPRESA') {
      this.router.navigate(['/employer/dashboard']);
    } else {
      this.router.navigate(['/job-seeker/dashboard']);
    }
    this.userMenuOpen = false;
  }
  get userDisplayName(): string {
    if (!this.currentUser) return '';
    return (this.currentUser as any).nombre;
  }
  logout() {
    this.authState.clearAuthData();
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToAbout() {
    this.router.navigate(['/about']);
  }

  redirectToPayments() {
    this.router.navigate(['/payments']);
  }

  redirectToJobDetails() {
    this.router.navigate(['/job-details']);
  }

  redirectToSearchJobs() {
    this.router.navigate(['/search-jobs']);
  }
  redirectToRegister(){
    this.router.navigate(['/register']);
  }
  goToOfertas() {
    this.router.navigate(['/employer/ofertas']);
    this.userMenuOpen = false;
  }
}