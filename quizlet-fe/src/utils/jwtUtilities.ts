import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { AuthResponseDTO, JwtPayload } from '../type';

export const getCurrentToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getCurrentRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

/**
 * Decodes a JWT token and returns the payload.
 * Check whether it expired or not
 * @param token - The JWT token to decode.
 * @returns The decoded JWT payload.
 * @throws Error if the token is invalid, expired, or does not contain a user_id.
 */
export const decodeToken = (token: string | null): JwtPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token {JwtUtilities | decode}: ', error);
    throw new Error('Error while decoding token');
  }
};

export const getAndValidateToken = (
  token: string | null
): JwtPayload | null => {
  const decoded = decodeToken(token);

  if (!decoded) {
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && currentTime >= decoded.exp) {
    console.error('The token is expired {JwtUtilities | getAndValidateToken}:');
    throw new Error('Token is expired! Please try to login again!');
  }

  return decoded;
};

/**
 * Refreshes the access token using the refresh token.
 * @returns The new access token and refresh token.
 * @throws Error if the refresh token is missing, invalid, or expired.
 */
export const handleRefreshToken = async (): Promise<AuthResponseDTO> => {
  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();

  // Verify current token
  getAndValidateToken(currentToken);

  if (!currentRefreshToken) {
    console.log('Login');

    throw new Error('Without refresh token');
  }

  try {
    const response = await axios.post<AuthResponseDTO>(
      `${import.meta.env.VITE_API_ENDPOINT}/auths/refresh-token`,
      { refreshToken: currentRefreshToken }
    );

    const { token: newToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return { token: newToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw new Error('Failed to refresh token');
  }
};
