import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";

import { ToastContainer } from "react-toastify";

import RootLayout from "./shared/RootLayout";

import { AuthPage, HomePage, NotFoundPage } from "./pages/";
import { PrivateRoutes, PublicRoute } from "./components";

/* Just using for DEV Test */
import DevPage from "./pages/Dev/DevPage";

function App() {
  const router = createBrowserRouter([
    /** Public Route */
    {
      element: <PublicRoute restricted />,
      children: [
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },

    /** Public Route */

    /** Private Route */
    {
      element: <RootLayout />,
      children: [
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/latest",
              element: <HomePage />,
            },
            {
              path: "/libraries",
              element: <HomePage />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/dev",
          element: <DevPage />,
        },
      ],
    },
    /** Private Route */
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        className="text-[1.4rem]"
      />
    </>
  );
}

export default App;
