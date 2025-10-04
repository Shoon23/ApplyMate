import { useAuth } from "./hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

const GuestRoutes = () => {
  const { state } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  if (state.accessToken) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;
