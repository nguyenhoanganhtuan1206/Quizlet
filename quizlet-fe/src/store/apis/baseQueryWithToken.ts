import { toast } from "react-toastify";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { logout, setCredentials } from "..";
import { AuthResponseDTO } from "../../type";
import {
  getCurrentRefreshToken,
  getCurrentToken,
  navigateTo,
  pause,
} from "../../utils";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  fetchFn: async (...args) => {
    await pause(600);
    return fetch(...args);
  },
  prepareHeaders: (headers) => {
    const token = getCurrentToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getCurrentRefreshToken();

    if (!refreshToken) {
      console.error("Doesn't have refresh token {baseQueryWithToken}");

      store.dispatch(logout());
      navigateTo("/auth");
      return result;
    }

    // Try refreshing the token
    try {
      const refreshResult = await baseQuery(
        {
          url: "/auths/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        store,
        extraOptions
      );

      console.error(
        "Error 401 refreshResult: {baseQueryWithToken}",
        refreshResult
      );

      if (refreshResult.data) {
        const response = refreshResult.data as AuthResponseDTO;
        store.dispatch(setCredentials(response));

        result = await baseQuery(args, store, extraOptions);
      } else {
        toast.error(
          "The seem your session is expired or invalid!! Please try to login again!!"
        );
        navigateTo("/auth"); // Redirect to auth page
        store.dispatch(logout());
      }
    } catch (error) {
      console.error("Error while calling api {baseQueryWithToken}", error);

      store.dispatch(logout());
      navigateTo("/auth"); // Redirect to auth page
      throw new Error(
        "The seem your session is expired or invalid!! Please try to login again!!"
      );
    }
  }

  return result;
};
