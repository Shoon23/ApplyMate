import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./features/auth/hooks/useAuth";

const GuestRoutes = () => {
  const { session } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  if (session.accessToken) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;
