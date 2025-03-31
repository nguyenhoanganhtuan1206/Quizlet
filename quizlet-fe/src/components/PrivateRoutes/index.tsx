import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { JwtPayload } from '../../type';
import { AppDispatch, logout, RootState, setCredentials } from '../../store';
import {
  getAndValidateToken,
  getCurrentToken,
  handleRefreshToken,
} from '../../utils';

export default function PrivateRoutes() {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const [jwtInfo, setJwtInfo] = useState<JwtPayload | null>();
  const { isAuthenticated } = useSelector(
    (rootState: RootState) => rootState.authProvider
  );

  useEffect(() => {
    const reAuthenticate = async () => {
      try {
        /**
         * Recheck and call API refresh token
         * Check expiration of the current token
         */
        const { token: newToken, refreshToken: newRefreshToken } =
          await handleRefreshToken();

        // Define credentials to the localStorage
        dispatch(
          setCredentials({ token: newToken, refreshToken: newRefreshToken })
        );

        // Verify with the new token and get jwt information
        const currentToken = getCurrentToken();
        setJwtInfo(getAndValidateToken(currentToken));
      } catch (error) {
        // If error to call -> Logout
        dispatch(logout());
      }
    };

    reAuthenticate();
  }, [dispatch]);

  if (!jwtInfo && !isAuthenticated) {
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
