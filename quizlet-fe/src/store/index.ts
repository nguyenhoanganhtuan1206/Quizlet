import { configureStore } from '@reduxjs/toolkit';

import { authApis } from './apis/authApis';
import { authProviderSlice, authReducer } from './slices/authProviderSlices';
import { flashSetApis } from './apis/flashSetApis';

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [authApis.reducerPath]: authApis.reducer,
    [flashSetApis.reducerPath]: flashSetApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApis.middleware)
      .concat(flashSetApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {
  logout,
  setCredentials,
  updateAccessToken,
} from './slices/authProviderSlices';
export { useLoginMutation, useRegisterMutation } from './apis/authApis';
export { useGetFlashSetQuery } from './apis/flashSetApis';

export default store;
