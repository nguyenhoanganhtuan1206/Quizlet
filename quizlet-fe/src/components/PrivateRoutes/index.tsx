import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import { AppDispatch, logout, RootState } from "../../store";

export default function PrivateRoutes() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, runAuth } = useAuth();

  const { isAuthenticated, jwtInfo } = useSelector(
    (rootState: RootState) => rootState.authProvider
  );

  useEffect(() => {
    runAuth();
  }, [runAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!jwtInfo && !isAuthenticated) {
    dispatch(logout());
    return <Navigate to="/auth" replace />;
  }
  /*
   * Define the privateRoute for Admin
   */
  if (pathname === "/admin" && jwtInfo?.role !== "Admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
