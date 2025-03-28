import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, Outlet } from "react-router-dom";

type PublicRouteProps = {
  restricted?: boolean;
};

export default function PublicRoute({
  restricted,
}: Readonly<PublicRouteProps>) {
  const isAuthenticated = useSelector(
    (root: RootState) => root.authProvider.isAuthenticated
  );

  if (restricted && isAuthenticated) {
    return <Navigate to="/latest" replace />;
  }

  return <Outlet />;
}
