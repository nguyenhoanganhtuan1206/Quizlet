// src/utils/jwtUtils.ts
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '../type';

export const decodeToken = (token: string): JwtPayload => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.user_id) {
      throw new Error('Token does not contain user_id');
    }
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    throw new Error('Invalid token');
  }
};