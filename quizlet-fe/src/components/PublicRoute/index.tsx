import { Outlet } from "react-router-dom";

type PublicRouteProps = {
  restricted?: boolean;
};

export default function PublicRoute({
  restricted,
}: Readonly<PublicRouteProps>) {
  return <Outlet />;
}
