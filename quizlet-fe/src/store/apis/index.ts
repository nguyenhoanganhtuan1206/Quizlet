import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { logout, setCredentials } from '..';
import { AuthResponseDTO } from '../../type';
import { getCurrentRefreshToken, getCurrentToken, pause } from '../../utils/';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  fetchFn: async (...args) => {
    await pause(600);
    return fetch(...args);
  },
  prepareHeaders: (headers) => {
    const token = getCurrentToken();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
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
    const refreshToken = getCurrentRefreshToken();

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    // Try refreshing the token
    try {
      const refreshResult = await baseQuery(
        {
          url: '/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const response = refreshResult.data as AuthResponseDTO;
        api.dispatch(setCredentials(response));

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
