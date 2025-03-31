import { createAsyncThunk } from '@reduxjs/toolkit';

import { FlashSetSummaryDTO } from '../../type';
import { createApiClient } from '../../hooks/useAxios';
import { getJwtPayload, pause } from '../../utils';

export const fetchFlashSets = createAsyncThunk<FlashSetSummaryDTO[], void>(
  'flashsets/fetchFlashSets',
  async () => {
    const apiClient = await createApiClient();

    await pause(600);
    const decoded = getJwtPayload();
    const response = await apiClient.get(`flashsets/${decoded?.user_id}/users`);

    return response.data;
  }
);
