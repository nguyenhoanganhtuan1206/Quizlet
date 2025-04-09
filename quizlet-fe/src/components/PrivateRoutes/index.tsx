import { toast } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";

import { getCurrentRefreshToken, getCurrentToken } from "../../utils";

export default function PrivateRoutes() {
  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();

  /**
   * Verify current token and current refresh token
   **/
  if (!currentToken || !currentRefreshToken) {
    toast.error(
      "Your session login is expired or invalid!! Please try to login again!"
    );
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
