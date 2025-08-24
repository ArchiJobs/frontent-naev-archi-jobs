import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/auth/login']);
        }

        // Verificar si el usuario tiene acceso según la ruta actual
        const url = this.router.url;
        
        if (url.startsWith('/employer') && user.userType !== 'EMPRESA') {
          return this.router.createUrlTree(['/job-seeker/dashboard']);
        }
        
        if (url.startsWith('/job-seeker') && user.userType !== 'PROFESIONAL') {
          return this.router.createUrlTree(['/employer/dashboard']);
        }

        return true;
      })
    );
  }
}
