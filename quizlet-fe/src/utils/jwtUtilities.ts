import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../type/Auth/authTypes';

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
