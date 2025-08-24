import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  DebugUserResponse,
  TestPasswordRequest,
  TestPasswordResponse,
} from '../interfaces/auth.interface';
import { AuthHttpService } from './auth-http.service';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authHttp: AuthHttpService,
    private readonly authState: AuthStateService,
    private readonly router: Router
  ) {
    this.initializeAuth();
  }

  // ===================
  // OBSERVABLES PÚBLICOS
  // ===================

  public get currentUser$() {
    return this.authState.currentUser$;
  }

  public get isAuthenticated$() {
    return this.authState.isAuthenticated$;
  }

  public get isLoading$() {
    return this.authState.isLoading$;
  }

  // ===================
  // INICIALIZACIÓN
  // ===================

  /**
   * Inicializar autenticación desde localStorage
   */
  private initializeAuth(): void {
    const accessToken = this.authState.getAccessToken();
    const user = this.authState.getCurrentUser();

    if (accessToken && user) {
      // Validar token con el backend a través del gateway
      this.validateToken(accessToken).subscribe({
        next: () => {
          this.authState.setCurrentUser(user);
          this.authState.setAuthenticationState(true);
        },
        error: () => {
          this.authState.clearAuthData();
        },
      });
    }
  }

  // ===================
  // MÉTODOS DE AUTENTICACIÓN
  // ===================

  /**
   * Registrar nuevo usuario
   */
  register(request: RegisterRequest): Observable<RegisterResponse> {
    this.authState.setLoading(true);

    return this.authHttp.register(request).pipe(
      tap((response: RegisterResponse) => {
        console.log('Registration response:', response);
      }),
      catchError(this.handleAuthError),
      tap(() => this.authState.setLoading(false))
    );
  }

  /**
   * Iniciar sesión
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    this.authState.setLoading(true);

    return this.authHttp.login(request).pipe(
      tap((response: LoginResponse) => {
        if (response.success && response.accessToken) {
          const user: User = {
            id: response.usuarioId,
            email: response.email,
            nombre: response.nombre,
            userType: response.userType,
          };
          this.authState.setTokens(response.accessToken, response.refreshToken);
          this.authState.setCurrentUser(user);
          this.authState.setAuthenticationState(true);
        }
      }),
      catchError(this.handleAuthError),
      tap(() => this.authState.setLoading(false))
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): Observable<any> {
    this.authState.setLoading(true);
    const refreshToken = this.authState.getRefreshToken();
    const accessToken = this.authState.getAccessToken();

    if (!refreshToken || !accessToken) {
      this.authState.clearAuthData();
      this.authState.setLoading(false);
      return throwError(() => new Error('No tokens found'));
    }

    return this.authHttp.logout(refreshToken, accessToken).pipe(
      tap(() => {
        console.log('Logout successful');
      }),
      catchError(this.handleAuthError),
      tap(() => {
        this.authState.clearAuthData();
        this.authState.setLoading(false);
        this.router.navigate(['/']);
      })
    );
  }

  /**
   * Refrescar token de acceso
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.authState.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { refreshToken };

    return this.authHttp.refreshToken(request).pipe(
      tap((response: RefreshTokenResponse) => {
        if (response.success && response.accessToken) {
          this.authState.setAccessToken(response.accessToken);
          console.log('Token refreshed successfully');
        }
      }),
      catchError(this.handleAuthError)
    );
  }

  /**
   * Validar token
   */
  validateToken(token?: string): Observable<boolean> {
    const tokenToValidate = token || this.authState.getAccessToken();

    if (!tokenToValidate) {
      return throwError(() => new Error('No token to validate'));
    }

    return this.authHttp.validateToken(tokenToValidate).pipe(
      map((response: string) => response === 'true'),
      catchError(() => {
        // Si la validación falla, el token no es válido
        return throwError(() => new Error('Token validation failed'));
      })
    );
  }

  /**
   * Solicitar recuperación de contraseña
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<any> {
    return this.authHttp
      .forgotPassword(request)
      .pipe(catchError(this.handleAuthError));
  }

  /**
   * Restablecer contraseña
   */
  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.authHttp
      .resetPassword(request)
      .pipe(catchError(this.handleAuthError));
  }

  /**
   * Obtener información de usuario por email (Debug)
   */
  getUserInfo(email: string): Observable<DebugUserResponse> {
    return this.authHttp
      .getUserInfo(email)
      .pipe(catchError(this.handleAuthError));
  }

  /**
   * Probar coincidencia de contraseña (Debug)
   */
  testPassword(request: TestPasswordRequest): Observable<TestPasswordResponse> {
    return this.authHttp
      .testPassword(request)
      .pipe(catchError(this.handleAuthError));
  }

  /**
   * Verificar salud del servicio
   */
  checkHealth(): Observable<string> {
    return this.authHttp.checkHealth().pipe(catchError(this.handleAuthError));
  }

  // ===================
  // MÉTODOS DE UTILIDAD
  // ===================

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    return this.authState.getCurrentUser();
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated();
  }

  /**
   * Obtener access token
   */
  getAccessToken(): string | null {
    return this.authState.getAccessToken();
  }

  /**
   * Obtener refresh token
   */
  getRefreshToken(): string | null {
    return this.authState.getRefreshToken();
  }

  /**
   * Verificar si el usuario es empresa
   */
  isCompany(): boolean {
    return this.authState.isCompany();
  }

  /**
   * Verificar si el usuario es profesional
   */
  isProfessional(): boolean {
    return this.authState.isProfessional();
  }

  // ===================
  // MÉTODOS PRIVADOS
  // ===================

  /**
   * Manejo centralizado de errores de autenticación
   */
  private readonly handleAuthError = (error: Error): Observable<never> => {
    console.error('Auth Service Error:', error);

    // Si es un error 401, limpiar datos de auth y redirigir
    if (error.message.includes('401')) {
      this.authState.clearAuthData();
      this.router.navigate(['/auth/login']);
    }

    return throwError(() => error);
  };
}
