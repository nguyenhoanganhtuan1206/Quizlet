import { configureStore } from "@reduxjs/toolkit";

import {
  libraryFiltersReducer,
  libraryFiltersSlice,
  folderSlice,
  flashSetReducer,
  flashSetSlice,
  authProviderSlice,
  authReducer,
} from "./slices/";
import { flashSetApis, authApis, folderApis } from "./apis";

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [libraryFiltersSlice.reducerPath]: libraryFiltersReducer,
    [flashSetSlice.reducerPath]: flashSetReducer,
    [folderSlice.reducerPath]: folderSlice.reducer,
    [authApis.reducerPath]: authApis.reducer,
    [flashSetApis.reducerPath]: flashSetApis.reducer,
    [folderApis.reducerPath]: folderApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApis.middleware)
      .concat(flashSetApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { logout, setCredentials } from "./slices/authProviderSlices";
export { selectFilterLibraryItem } from "./slices/libraryFiltersSlices";
export { useLoginMutation, useRegisterMutation } from "./apis/authApis";
export { useGetFlashSetQuery } from "./apis/flashSetApis";

export { fetchFolders } from "./thunks/folderThunk";
export { fetchFlashSets } from "./thunks/flashsetThunk";
export { doRefreshToken } from "./thunks/refreshTokenThunk";

export default store;
