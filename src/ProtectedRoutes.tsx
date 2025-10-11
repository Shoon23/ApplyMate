import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./features/auth/hooks/useAuth";

const ProtectedRoutes = () => {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session.accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
