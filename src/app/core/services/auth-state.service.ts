import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Estado de autenticación
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);

  // Observables públicos
  public readonly currentUser$ = this.currentUserSubject.asObservable();
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public readonly isLoading$ = this.isLoadingSubject.asObservable();

  // Keys para localStorage
  private readonly ACCESS_TOKEN_KEY = 'archi_access_token';
  private readonly REFRESH_TOKEN_KEY = 'archi_refresh_token';
  private readonly USER_KEY = 'archi_current_user';

  constructor() {
    this.initializeFromStorage();
  }

  /**
   * Inicializar estado desde localStorage
   */
  private initializeFromStorage(): void {
    const accessToken = this.getAccessToken();
    const user = this.getCurrentUserFromStorage();

    if (accessToken && user) {
      this.setCurrentUser(user);
      this.setAuthenticationState(true);
    }
  }

  // ===================
  // GESTIÓN DE TOKENS
  // ===================

  /**
   * Establecer tokens en localStorage
   */
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Establecer solo access token
   */
  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  /**
   * Obtener access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Obtener refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // ===================
  // GESTIÓN DE USUARIO
  // ===================

  /**
   * Establecer usuario actual
   */
  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
    } else {
      localStorage.removeItem(this.USER_KEY);
      this.currentUserSubject.next(null);
    }
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtener usuario desde localStorage
   */
  private getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // ===================
  // GESTIÓN DE ESTADO
  // ===================

  /**
   * Establecer estado de autenticación
   */
  setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Establecer estado de carga
   */
  setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }

  /**
   * Verificar si está cargando
   */
  isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  // ===================
  // VERIFICACIONES DE ROL
  // ===================

  /**
   * Verificar si el usuario es empresa
   */
  isCompany(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 'EMPRESA';
  }

  /**
   * Verificar si el usuario es profesional
   */
  isProfessional(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 'PROFESIONAL';
  }

  // ===================
  // LIMPIAR DATOS
  // ===================

  /**
   * Limpiar todos los datos de autenticación
   */
  clearAuthData(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.setAuthenticationState(false);
  }
}
