// Tipos de usuario según tu backend
export type UserType = 'PROFESIONAL' | 'EMPRESA';

// Interface para registro de usuario
export interface RegisterRequest {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

// Interface para login
export interface LoginRequest {
  email: string;
  password: string;
}

// Interface para respuesta de registro
export interface RegisterResponse {
  success: boolean;
  usuarioId: number;
  email: string;
  mensaje?: string;
}

// Interface para respuesta de login
export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuarioId: number;
  nombre: string;
  email: string;
  userType: UserType;
  mensaje?: string;
}

// Interface para usuario
export interface User {
  id: number;
  email: string;
  nombre: string;
  userType: UserType;
}

// Interface para refresh token
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Interface para respuesta de refresh token
export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  expiresIn?: number;
  mensaje?: string;
}

// Interface para forgot password
export interface ForgotPasswordRequest {
  email: string;
}

// Interface para reset password
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

// Interface para respuestas de error
export interface ApiErrorResponse {
  success: false;
  mensaje: string;
  errors?: { [key: string]: string };
}

// Interface para debug endpoints
export interface DebugUserResponse {
  found: boolean;
  usuario?: User;
}

// Interface para test password
export interface TestPasswordRequest {
  email: string;
  password: string;
}

// Interface para test password response
export interface TestPasswordResponse {
  userFound: boolean;
  passwordMatches: boolean;
}

// Interface para logout request
export interface LogoutRequest {
  refreshToken: string;
}

// Interface para validación de token
export interface TokenValidationResponse {
  valid: boolean;
  expired?: boolean;
  mensaje?: string;
}

// Interface para respuesta de logout
export interface LogoutResponse {
  success: boolean;
  mensaje: string;
}

// Interface base para respuestas del API
export interface BaseApiResponse {
  success: boolean;
  mensaje?: string;
}

// Interface para perfil de usuario simplificado (del token)
export interface UserProfile {
  usuarioId: number;
  nombre: string;
  email: string;
  userType: UserType;
  activo?: boolean;
}

// Interface para cambio de contraseña
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Interface para actualización de perfil
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}
