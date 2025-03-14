import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';

import RootLayout from './shared/RootLayout';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
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
    {
      path: '/auth',
      element: <AuthPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
