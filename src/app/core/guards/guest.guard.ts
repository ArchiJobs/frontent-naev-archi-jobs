import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return true;
        }
        
        // Redirigir al dashboard según el tipo de usuario
        const user = this.authService.getCurrentUser();
        if (user?.userType === 'EMPRESA') {
          return this.router.createUrlTree(['/employer/dashboard']);
        } else {
          return this.router.createUrlTree(['/job-seeker/dashboard']);
        }
      })
    );
  }
}
