import { createAsyncThunk } from '@reduxjs/toolkit';

import { FolderSummaryDTO } from '../../type';
import { createApiClient } from '../../hooks/useAxios';

import { getAndValidateToken, getCurrentToken, pause } from '../../utils';

export const fetchFolders = createAsyncThunk<FolderSummaryDTO[], void>(
  'folder/fetchFolders',
  async () => {
    const apiClient = await createApiClient();
    const currentToken = getCurrentToken();

    await pause(600);
    const decoded = getAndValidateToken(currentToken);
    const response = await apiClient.get(`folders/${decoded?.user_id}/users`);

    return response.data;
  }
);
