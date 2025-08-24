import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
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
  TestPasswordResponse
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private readonly GATEWAY_URL = 'http://localhost:8080';
  private readonly AUTH_API_PREFIX = '/auth';

  constructor(private readonly http: HttpClient) {}

  /**
   * Registrar nuevo usuario
   */
  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/register`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Iniciar sesión
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/login`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Cerrar sesión
   */
  logout(refreshToken: string, accessToken: string): Observable<any> {
    return this.http.post(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/logout?refreshToken=${refreshToken}`, {}, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Refrescar token de acceso
   */
  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/refresh`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Validar token
   */
  validateToken(token: string): Observable<string> {
    return this.http.get(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/validate?token=${token}`, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Solicitar recuperación de contraseña
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/forgot-password`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Restablecer contraseña
   */
  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/reset-password`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener información de usuario por email (Debug)
   */
  getUserInfo(email: string): Observable<DebugUserResponse> {
    return this.http.get<DebugUserResponse>(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/debug/user/${email}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Probar coincidencia de contraseña (Debug)
   */
  testPassword(request: TestPasswordRequest): Observable<TestPasswordResponse> {
    return this.http.post<TestPasswordResponse>(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/debug/test-password`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Verificar salud del servicio
   */
  checkHealth(): Observable<string> {
    return this.http.get(`${this.GATEWAY_URL}${this.AUTH_API_PREFIX}/health`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private readonly handleError = (error: HttpErrorResponse): Observable<never> => {
    console.error('Auth HTTP Service Error:', error);
    
    let errorMessage = 'Error en el servicio de autenticación';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar con el servidor';
    } else if (error.error?.mensaje) {
      errorMessage = error.error.mensaje;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  };
}
