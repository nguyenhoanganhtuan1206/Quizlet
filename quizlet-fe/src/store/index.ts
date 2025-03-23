import { configureStore } from "@reduxjs/toolkit";

import { authApis } from "./apis/auth/authApis";
import { authProviderSlice, authReducer } from "./slices/authProviderSlice";
import { flashSetApis } from "./apis/flashsets/flashSetApis";

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
} from "./slices/authProviderSlice";
export { useLoginMutation, useRegisterMutation } from "./apis/auth/authApis";
export { useGetFlashSetQuery } from "./apis/flashsets/flashSetApis";

export default store;
