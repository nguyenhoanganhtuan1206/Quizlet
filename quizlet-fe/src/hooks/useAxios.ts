import axios, { AxiosError, AxiosResponse } from "axios";
import { getCurrentRefreshToken, getCurrentToken } from "../utils";
import { getAndValidateToken, handleRefreshToken } from "../utils/jwtUtilities";

const createApiClient = async () => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add the token to headers
  axios.interceptors.request.use(
    function (config) {
      const token = getCurrentToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401/403 errors
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const currentToken = getCurrentToken();
      const currentRefreshToken = getCurrentRefreshToken();
      const { response } = error;

      // 1. Should refresh token when status response 401
      // if status is response code 401, we need to send request token here
      if (response?.status === 401) {
        const decodedToken = getAndValidateToken(currentToken);

        if (!decodedToken) {
          // Token is expired but refresh token still existed
          if (currentRefreshToken) {
            try {
              const response = await handleRefreshToken();

              localStorage.setItem("token", response.token);
              localStorage.setItem("refreshToken", response.refreshToken);
            } catch (error) {
              console.error("Error while calling the refresh token", error);
            }
          }

          if (!currentToken && !currentRefreshToken) {
            localStorage.clear();
          }
        }
        // await handleRefreshToken();
      }

      // Handle 401 and 403 errors
      if (response?.status === 401 || response?.status === 403) {
        console.error("Error while calling API | {createApiClient | useAxios}");
        return Promise.reject(
          new Error("Something went wrong! Pleas try to login!")
        );
      }
    }
  );

  return apiClient;
};

export default createApiClient;
