import { createAsyncThunk } from '@reduxjs/toolkit';
import { Folder } from '../../type';
import createApiClient from '../../hooks/useAxios';
import { RootState } from '..';

export const fetchFolders = createAsyncThunk<
  Folder[],
  void,
  { state: RootState }
>('folder/fetchFolders', async (_, { getState, dispatch }) => {
  try {
    const token = getState().authProvider.token;

    const apiClient = createApiClient({ token, dispatch }); // We'll fix this function below
    const response = await apiClient.get('/folders');
    return response.data as Folder[];
  } catch (error) {}
});
