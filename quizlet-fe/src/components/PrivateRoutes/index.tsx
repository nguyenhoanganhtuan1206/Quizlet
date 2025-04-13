import { toast } from "react-toastify";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { getCurrentRefreshToken, getCurrentToken } from "../../utils";
import { useEffect } from "react";

export default function PrivateRoutes() {
  console.log("PrivateRoutes");

  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();
  const navigate = useNavigate();

  /**
   * Verify current token and current refresh token
   **/

  useEffect(() => {
    if (!currentToken || !currentRefreshToken) {
      toast.error(
        "Your session login is expired or invalid!! Please try to login again!"
      );
      navigate("auth", {
        replace: true,
      });
    }
  }, []);

  return currentToken && currentRefreshToken ? (
    <Outlet />
  ) : (
    <Navigate to="auth" replace />
  );
}
