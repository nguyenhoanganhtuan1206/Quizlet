import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from '../../store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { decodeToken } from '../../utils/jwtUtilities';
import { JwtPayload } from '../../type/Auth/authTypes';

export default function PrivateRoutes() {
  // const { pathname } = useLocation();

  // const dispatch = useDispatch();
  // const token = useSelector((state: RootState) => state.authProvider.token);
  // const isAuthenticated = !!token;
  // const decodedToken: JwtPayload | null = token ? decodeToken(token) : null;

  // if (!isAuthenticated || !decodeToken) {
  //   dispatch(logout());
  //   return <Navigate to="/auth" replace />;
  // }

  // // Check token expiration
  // const currentTime = Math.floor(Date.now() / 1000);
  // if (decodedToken?.exp && currentTime >= decodedToken.exp) {
  //   dispatch(logout()); // Token expired, log out
  //   return <Navigate to="/auth" replace />;
  // }

  // /*
  //  * Define the privateRoute for Admin
  //  */
  // if (pathname === '/admin' && decodedToken?.role !== 'Admin') {
  //   return <Navigate to="/forbidden" replace />;
  // }

  return <Outlet />;
}
