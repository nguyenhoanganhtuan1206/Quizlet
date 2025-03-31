import { createAsyncThunk } from '@reduxjs/toolkit';

import { FlashSetSummaryDTO } from '../../type';
import { createApiClient } from '../../hooks/useAxios';
import { getAndValidateToken, getCurrentToken, pause } from '../../utils';

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], void>(
  'flashsets/fetchFlashSets',
  async () => {
    const apiClient = await createApiClient();
    const currentToken = getCurrentToken();

    await pause(600);
    const decoded = getAndValidateToken(currentToken);
    const response = await apiClient.get(`flashsets/${decoded?.user_id}/users`);

    return response.data;
  }
);
