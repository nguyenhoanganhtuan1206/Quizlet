import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authProvider.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
