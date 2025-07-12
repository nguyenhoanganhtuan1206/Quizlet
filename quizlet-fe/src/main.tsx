import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import App from "./App.tsx";
import axiosInstance from "./hooks/useAxios.ts";
import store, {
  doRefreshToken,
  logout,
  setCredentials,
} from "./store/index.ts";

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Error 401: Session is expired or invalid!!", error);

    if (error.response.status === 401) {
      try {
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
      } catch (error) {
        // navigate("/auth", { replace: true });
        // history.replace("/auth");
        store.dispatch(logout());

        // window.location.reload();
        console.error(
          "Error while calling {doRefreshToken || axiosInstance.interceptors.response}",
          error
        );
      }
      // Attempt token refresh, unwrap result
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StrictMode>
        <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
