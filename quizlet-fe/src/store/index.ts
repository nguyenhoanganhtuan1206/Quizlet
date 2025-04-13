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
      .concat(folderApis.middleware)
      .concat(flashSetApis.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { logout, setCredentials, selectFilterLibraryItem } from "./slices";
export {
  useLoginMutation,
  useRegisterMutation,
  useGetFlashSetQuery,
  useFetchFolderByIdQuery,
} from "./apis";

export { fetchFolders, fetchFlashSets, doRefreshToken } from "./thunks/";

export default store;
