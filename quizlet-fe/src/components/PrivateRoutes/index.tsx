import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppDispatch, doRefreshToken, logout, RootState } from '../../store';
import {
  getCurrentRefreshToken,
  getCurrentToken,
  handleRefreshToken,
} from '../../utils/jwtUtilities';

export default function PrivateRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();

  const { isLoading, isError, isAuthenticated, jwtInfo, refreshToken, token } =
    useSelector((rootState: RootState) => rootState.authProvider);

  useEffect(() => {
    if (!currentToken && !currentRefreshToken) {
      dispatch(logout());
      navigate('/auth');
    }
  }, []);

  useEffect(() => {
    const refreshToken = () => {
      const refreshInterval = setInterval(async () => {
        console.info('Call the refresh before 10 minutes expired!!!');

        try {
          await handleRefreshToken();
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }, (60 - 10) * 1000); // Refresh 10 minutes before expired

      return () => clearInterval(refreshInterval);
    };

    refreshToken();
  }, [token, refreshToken, dispatch]);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

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
