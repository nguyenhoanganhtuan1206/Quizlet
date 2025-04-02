import {
  getAndValidateToken,
  handleRefreshToken,
} from "./../utils/jwtUtilities";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentRefreshToken, getCurrentToken } from "../utils";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../store";

const useAuth = () => {
  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuth = useCallback(async () => {
    if (!currentToken || !currentRefreshToken) {
      dispatch(logout());
      navigate("/auths");
      return;
    }

    // Verify the token expiration
    const decodedToken = getAndValidateToken(currentToken);

    if (!decodedToken || !currentRefreshToken) {
      console.error(
        "No refresh token available {jwtUtilities | handleRefreshToken}:"
      );
      dispatch(logout());
      navigate("/auths");
      return;
    }

    if (!currentRefreshToken) {
      // Check if the token is expired for more than 10 minutes
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExp = decodedToken?.exp;
      const tenMinutesInSeconds = 10 * 60;

      if (tokenExp && currentTime - tokenExp <= tenMinutesInSeconds) {
        setIsLoading(true);
        try {
          const response = await handleRefreshToken();
          setIsLoading(false);
          dispatch(setCredentials(response));
        } catch (error) {
          console.error("Session is expired:", error);
          setIsLoading(false);
          dispatch(logout());
          navigate("/auth");
        }
        return;
      }
    }
  }, [dispatch, navigate]);

  return { checkAuth, isLoading };
};

export default useAuth;
