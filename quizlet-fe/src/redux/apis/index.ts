import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '..';

type baseQueryWithTokenProps = {
  isToken: boolean;
};

export const baseQueryWithToken = ({ isToken }: baseQueryWithTokenProps) => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
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
