import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '..';
import pause from '../../utils/timeoutApiUtilities';

type baseQueryWithTokenProps = {
  isToken: boolean;
  isSlowDuration?: boolean;
  durationCallApi?: number;
};

export const baseQueryWithToken = ({
  isToken,
  isSlowDuration = false,
  durationCallApi = 600,
}: baseQueryWithTokenProps) => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
    fetchFn: async (...args) => {
      if (isSlowDuration) {
        await pause(durationCallApi);
      }
      return fetch(...args);
    },
    prepareHeaders: (headers, { getState }) => {
      if (isToken) {
        // getState -> allow to get the Redux store
        const token = (getState() as RootState).authProvider.token;

        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};
