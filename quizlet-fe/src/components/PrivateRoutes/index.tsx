import { useDispatch, useSelector } from 'react-redux';
import { logout, RootState } from '../../store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getJwtPayload } from '../../utils';

export default function PrivateRoutes() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authProvider.token);
  const isAuthenticated = !!token;
  const jwtInfo = getJwtPayload();

  if (!isAuthenticated || !jwtInfo) {
    dispatch(logout());
    return <Navigate to="/auth" replace />;
  }

  // Check token expiration
  const currentTime = Math.floor(Date.now() / 1000);
  if (jwtInfo?.exp && currentTime >= jwtInfo.exp) {
    dispatch(logout());
    return <Navigate to="/auth" replace />;
  }

  /*
   * Define the privateRoute for Admin
   */
  if (pathname === '/admin' && jwtInfo?.role !== 'Admin') {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
