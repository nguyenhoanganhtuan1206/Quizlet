import axios from "axios";
import { getCurrentToken } from "../utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCurrentToken();

    if (token) {
      config.headers = config.headers || {};
      // eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJfaWQiOiIyMzdjNzM2Yi05YWEzLTRjNGUtOGQ3ZS01NTgxNjZiYjNkNmIiLCJzdWIiOiJuZ3V5ZW5ob2FuZ2FuaHR1YW4xMjA2QGdtYWlsLmNvbSIsImlhdCI6MTc0Mzk5MjQ1NiwiZXhwIjoxNzQzOTk2MDU2fQ.lCpidZHxDT8BcBdxOyJXgv8pM42a6KyXyCIaMnGCs7o
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
