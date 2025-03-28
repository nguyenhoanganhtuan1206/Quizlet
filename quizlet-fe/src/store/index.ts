import { configureStore } from '@reduxjs/toolkit';

import { authApis } from './apis/authApis';
import { authProviderSlice, authReducer } from './slices/authProviderSlices';
import { flashSetApis } from './apis/flashSetApis';
import { folderSlice } from './slices/folderSlices';
import { libraryFiltersReducer, libraryFiltersSlice } from './slices/libraryFiltersSlices';

const store = configureStore({
  reducer: {
    [authProviderSlice.reducerPath]: authReducer,
    [libraryFiltersSlice.reducerPath]: libraryFiltersReducer,
    [folderSlice.reducerPath]: folderSlice.reducer,
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
export {
  selectFilterLibraryItem,
} from './slices/libraryFiltersSlices';
export { useLoginMutation, useRegisterMutation } from './apis/authApis';
export { useGetFlashSetQuery } from './apis/flashSetApis';

export { fetchFolders } from './thunks/folderThunk';

export default store;
