import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getCurrentRefreshToken, getCurrentToken, pause } from "../utils";
import { decodeToken, handleRefreshToken } from "../utils/jwtUtilities";
import { logout, setCredentials } from "../store";
import { JwtPayload } from "../type";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState<JwtPayload | null>();

  const runAuth = useCallback(async () => {
    // Check validate and expiration of current token
    const currentToken = getCurrentToken();
    const currentRefreshToken = getCurrentRefreshToken();

    await pause(6000);

    const decodedToken = decodeToken(currentToken);

    console.log("decodedToken", decodedToken);
    console.log("currentRefreshToken", currentRefreshToken);

    if (!decodedToken && !currentRefreshToken) {
      console.error(
        "Current token or refresh token is invalid or expired {runAuth | useAuth}"
      );

      navigate("/auth");
      // dispatch(logout());

      toast.error(
        "Your session is expired or invalid!! Please try to login again!"
      );
      return;
    }

    if (decodedToken) {
      setCurrentUser(decodedToken);

      // Check if token is expired for more than 10 minutes
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExp = decodedToken?.exp;
      const tenMinutes = 10 * 60;

      // Call when token have 10 minutes
      if (tokenExp && currentTime - tokenExp <= tenMinutes) {
        setIsLoading(true);
        try {
          console.info("Successfully calling the API refresh token");
          const response = await handleRefreshToken();

          dispatch(setCredentials(response));

          // Refresh current user and token
          const decodedToken = getAndValidateToken(response.token);
          setCurrentUser(decodedToken);

          setIsLoading(false);
        } catch (error) {
          console.error("Error while calling the API refresh token", error);
          setIsLoading(false);
          setIsError(true);
          setCurrentUser(null);

          dispatch(logout());
          navigate("/auth");

          toast.error("Your session is expired!!! Please try to login again");
        }
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    console.log("currentUser updated:", currentUser);
  }, [currentUser]);

  return { runAuth, isLoading, isError, currentUser };
};
