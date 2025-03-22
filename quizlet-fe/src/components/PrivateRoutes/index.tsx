import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { decodeToken } from "../../utils/jwtUtilities";
import { JwtPayload } from "../../type/Auth/authTypes";

export default function PrivateRoutes() {
  const { pathname } = useLocation();

  const token = useSelector((state: RootState) => state.authProvider.token);
  const isAuthenticated = !!token;
  const decodedToken: JwtPayload | null = token ? decodeToken(token) : null;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  /*
   * Define the privateRoute for Admin
   */
  if (pathname === "/admin" && decodedToken?.role !== "Admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
