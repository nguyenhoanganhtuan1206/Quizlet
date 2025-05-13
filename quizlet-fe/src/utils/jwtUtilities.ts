import { jwtDecode } from "jwt-decode";

import { JwtPayload, AuthError } from "../type";

const AUTH_ERROR_MESSAGE =
  "Your session is expired or invalid!! Please try to login again";

export const getCurrentToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getCurrentRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

/**
 * Decodes a JWT token and returns the payload.
 * Check whether it expired or not
 * @param token - The JWT token to decode.
 * @returns The decoded JWT payload.
 * @throws Error if the token is invalid, expired, or does not contain a user_id.
 */
export const decodeToken = (token: string | null): JwtPayload => {
  if (!token) {
    throw new AuthError(AUTH_ERROR_MESSAGE);
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token {JwtUtilities | decode}: ", error);
    throw new AuthError(AUTH_ERROR_MESSAGE);
  }
};
