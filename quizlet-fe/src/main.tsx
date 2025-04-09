import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";

import { Provider } from "react-redux";
import App from "./App.tsx";
import store, { doRefreshToken, setCredentials } from "./store/index.ts";
import axiosInstance from "./hooks/useAxios.ts";

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Error 401: Session is expired or invalid!!");
    if (error.response.status === 401) {
      // Attempt token refresh, unwrap result
      const refreshTokenResult = await store
        .dispatch(doRefreshToken())
        .unwrap();

      console.info("Called refresh token successfully!!");

      // Reset token and refresh token
      store.dispatch(
        setCredentials({
          token: refreshTokenResult.token,
          refreshToken: refreshTokenResult.refreshToken,
        })
      );

      // Recall the api after refresh token
      return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
