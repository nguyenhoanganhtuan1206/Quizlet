import axios, { AxiosInstance, AxiosResponse } from "axios";

import { AppDispatch, logout } from "../store";

interface CreateApiClientOptions {
  token: string | null;
  dispatch?: AppDispatch;
}

export default function createApiClient({
  token,
  dispatch,
}: CreateApiClientOptions): AxiosInstance {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * Handle request to the API
   * It included token
   * */
  apiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  /**
   * Handle response
   * if the response return 403 or 401 clear token
   */
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        if (dispatch) {
          dispatch(logout());
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
}
