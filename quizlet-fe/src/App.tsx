import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';
import AuthPage from './pages/auth/AuthPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '/login',
          element: <AuthPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
