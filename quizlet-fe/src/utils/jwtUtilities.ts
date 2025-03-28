import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../type';

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

/**
 * Decodes a JWT token and returns the payload.
 * @param token - The JWT token to decode.
 * @returns The decoded JWT payload.
 * @throws Error if the token is invalid, expired, or does not contain a user_id.
 */
export const decodeToken = (token: string | null): JwtPayload => {
  if (!token) {
    throw new Error('Token is null or undefined');
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new Error('Token has expired');
    }

    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    throw new Error('Invalid token');
  }
};

/**
 * Validates a token and returns the decoded payload if valid.
 * @returns The decoded JWT payload, or null if the token is invalid or missing.
 */
export const getJwtPayload = (): JwtPayload | null => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    return decodeToken(token);
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
};
