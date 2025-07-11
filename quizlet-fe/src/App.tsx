import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";

import { ToastContainer } from "react-toastify";

import RootLayout from "./shared/RootLayout";

import {
  AuthPage,
  HomePage,
  NotFoundPage,
  YourLibraryPage,
  FlashCardPage,
  FolderDetailsPage,
} from "./pages/";
import { PrivateRoutes, PublicRoute } from "./components";

function App() {
  const router = createBrowserRouter([
    /** Public Route */
    {
      element: <PublicRoute />,
      children: [
        {
          path: "auth",
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
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/libraries",
              element: <YourLibraryPage />,
            },
            {
              path: "/flashcard/:flashCardId",
              element: <FlashCardPage />,
            },
            {
              path: "/libraries/folders/:folderId",
              element: <FolderDetailsPage />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
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
