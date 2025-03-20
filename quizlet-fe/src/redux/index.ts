import { configureStore } from '@reduxjs/toolkit';

import { authApis } from './apis/auth/authApis';
import { authProviderSlice, authReducer } from './slices/authProviderSlice';

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { logout, setCredentials } from './slices/authProviderSlice';
export { useLoginMutation, useRegisterMutation } from './apis/auth/authApis';

export default store;
