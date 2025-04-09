import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { doRefreshToken } from "../store";

import axiosInstance from "../hooks/useAxios";

interface ErrorHandlingType {
  error: any;
  dispatch: any;
  rejectWithValue: (message: string) => void;
}

export const handleUnauthorizedError = async ({
  error,
  dispatch,
  rejectWithValue,
}: ErrorHandlingType) => {
  console.log("handleUnauthorizedError", error.status);

  const navigate = useNavigate();

  if (error.status === 401) {
    console.error(
      "Error 401 {handleUnauthorizedError | errorHandlingUtilities}"
    );

    try {
      await dispatch(doRefreshToken()).unwrap();

      if (!error.config) {
        throw new Error("Request configuration is missing");
      }
      // Recall API after refresh token
      const { data } = await axiosInstance.request(error.config);
      return data;
    } catch (refreshError) {
      const refreshTokenError = refreshError as AxiosError;
      navigate("/auth");

      console.error(
        "Error when calling the refresh token {handleUnauthorizedError | errorHandlingUtilities}",
        refreshError
      );
      return rejectWithValue(refreshTokenError.message);
    }
  }
};
