import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAndValidateToken,
  getCurrentRefreshToken,
  getCurrentToken,
} from "../utils";
import { handleRefreshToken } from "../utils/jwtUtilities";
import { logout, setCredentials } from "../store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const currentToken = getCurrentToken();
  const currentRefreshToken = getCurrentRefreshToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runAuth = useCallback(async () => {
    // Check validate and expiration of current token
    const decodedToken = getAndValidateToken(currentToken);

    if (!decodedToken && !currentRefreshToken) {
      console.error("Your session is expired! Please try to login again!");
      navigate("/auths");
      dispatch(logout());
      return;
    }

    if (!currentRefreshToken) {
      console.error(
        "Current refresh token is expired or invalid {useAuth | getAndValidateToken}"
      );
      // Check if token is expired for more than 10 minutes
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExp = decodedToken?.exp;
      const tenMinutesInSeconds = 10 * 60;

      if (tokenExp && currentTime - tokenExp <= tenMinutesInSeconds) {
        setIsLoading(true);
        try {
          console.info("Successfully calling the API refresh token");
          const response = await handleRefreshToken();

          dispatch(setCredentials(response));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setIsError(true);
          console.error("Error while calling the API refresh token", error);
          dispatch(logout());
          navigate("/auths");
        }
      }
    }
  }, []);

  return { runAuth, isLoading, isError };
};
