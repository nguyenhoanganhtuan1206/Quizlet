import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../type/Auth/authTypes';

export const decodeToken = (token: string): JwtPayload | null => {
  try{ 
    return jwtDecode<JwtPayload>(token);
  }catch(error) {
    console.error('Failed to decode token: ', error);
    return null;
  }
};
