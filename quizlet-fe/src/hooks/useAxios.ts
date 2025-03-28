import axios from 'axios';

import { AuthResponseDTO } from '../type';
import { getJwtPayload } from '../utils';
import { getToken } from '../utils/jwtUtilities';

const handleRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post<AuthResponseDTO>(
      `${import.meta.env.VITE_API_ENDPOINT}/auths/refresh-token`,
      { refreshToken }
    );

    const { token, refreshToken: newRefreshToken } = response.data;

    // Update tokens in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);

    return { token, refreshToken };
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw new Error('Failed to refresh token');
  }
};

export const createApiClient = async () => {
  const jwtPayload = getJwtPayload();

  if (!jwtPayload) {
    // Update token
    await handleRefreshToken();
  }

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
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  return apiClient;
};
