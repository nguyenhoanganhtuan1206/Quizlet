export interface AuthRequestDTO {
  token: string;
}

export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string; // it's email
  user_id: string;
  role: string;
  iat: number;
  exp: number;
  [key: string]: any; // Allow additional fields
}
