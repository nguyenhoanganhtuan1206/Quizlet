export interface AuthRequestDTO {
  token: string;
}

export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string; // Email field
  user_id: string;
  role: string;
  iat: number;
  exp: number;
  [key: string]: any; // Allow additional fields
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
