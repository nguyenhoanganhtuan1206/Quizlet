import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';

import { ToastContainer } from 'react-toastify';

import { AuthPage, HomePage } from './pages/';
import RootLayout from './shared/RootLayout';
import ProtectedRoute from './shared/components/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: '/',
              element: <HomePage />,
            },
            {
              path: '/libraries',
              element: <HomePage />,
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
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
