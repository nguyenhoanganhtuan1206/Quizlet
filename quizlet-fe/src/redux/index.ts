import { configureStore } from "@reduxjs/toolkit";
import { authApis } from "./apis/auth/authApis";

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { useLoginMutation } from "./apis/auth/authApis";

export default store;
