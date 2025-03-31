import axios from 'axios';

import { handleRefreshToken } from '../utils';

export const createApiClient = async () => {
  try {
    const { token } = await handleRefreshToken();

    const apiClient = axios.create({
      baseURL: import.meta.env.VITE_API_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    /**
     * Handle request to the API
     * It included token
     * */
    apiClient.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
    return apiClient;
  } catch (error) {
    console.error(
      'Error while processing call API {createApiClient | useAxios}: ',
      error
    );
    throw new Error('Something went wrong! Please try to login again!');
  }
};
