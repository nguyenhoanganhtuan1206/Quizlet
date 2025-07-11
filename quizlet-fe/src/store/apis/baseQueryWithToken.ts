import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { getCurrentRefreshToken, getCurrentToken, pause } from "../../utils";
import { logout, setCredentials } from "../slices";
import { AuthResponseDTO } from "@/type";

/**
 * BaseQuery with out header
 * Not contain the token is expired to call `refreshToken` API
 */
const baseQueryWithoutHeader = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  fetchFn: async (...args) => {
    await pause(600);
    return fetch(...args);
  },
});

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
      return result;
    }

    // Try refreshing the token
    try {
      const refreshResult = await baseQueryWithoutHeader(
        {
          url: "/auths/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        store,
        extraOptions
      );

      console.info("Calling the refresh token {baseQueryWithToken}");

      if (refreshResult.data) {
        const response = refreshResult.data as AuthResponseDTO;

        store.dispatch(setCredentials(response));

        result = await baseQuery(args, store, extraOptions);
      }
    } catch (error) {
      console.error("Error while calling api {baseQueryWithToken}", error);

      store.dispatch(logout());
    }
  }

  return result;
};
