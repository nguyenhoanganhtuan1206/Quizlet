import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout, RootState, updateAccessToken } from "..";
import { AuthResponseDTO } from "../../type/Auth/authTypes";
import pause from "../../utils/timeoutApiUtilities";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  fetchFn: async (...args) => {
    await pause(600);
    return fetch(...args);
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authProvider.token;

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
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).authProvider
      .refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    // Try refreshing the token
    try {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { token } = refreshResult.data as AuthResponseDTO;
        api.dispatch(updateAccessToken(token));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      api.dispatch(logout());
    }
  }

  return result;
};
