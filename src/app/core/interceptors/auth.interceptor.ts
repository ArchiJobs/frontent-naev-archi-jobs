import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthStateService } from '../services/auth-state.service';
import { AuthHttpService } from '../services/auth-http.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authState = inject(AuthStateService);
  
  // Agregar token a las peticiones autenticadas
  const authReq = addTokenHeader(req, authState.getAccessToken());
  
  return next(authReq).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authState);
      }
      
      return throwError(() => error);
    })
  );
};

function addTokenHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
  if (token && shouldAddToken(request.url)) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  
  return request;
}

function shouldAddToken(url: string): boolean {
  // No agregar token a endpoints públicos
  const publicEndpoints = [
    '/register',
    '/login',
    '/forgot-password',
    '/reset-password',
    '/health'
  ];
  
  return !publicEndpoints.some(endpoint => url.includes(endpoint));
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authState: AuthStateService): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authState.getRefreshToken();
    
    if (refreshToken) {
      const authHttp = inject(AuthHttpService);
      
      return authHttp.refreshToken({ refreshToken }).pipe(
        switchMap((response: any) => {
          isRefreshing = false;
          refreshTokenSubject.next(response.accessToken);
          
          // Actualizar tokens en el estado
          authState.setTokens(response.accessToken, refreshToken);
          
          return next(addTokenHeader(request, response.accessToken));
        }),
        catchError((error) => {
          isRefreshing = false;
          // Si falla el refresh, limpiar estado
          authState.clearAuthData();
          return throwError(() => error);
        })
      );
    } else {
      // No hay refresh token, limpiar estado
      authState.clearAuthData();
      return throwError(() => new Error('No refresh token available'));
    }
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((token) => next(addTokenHeader(request, token)))
  );
}
