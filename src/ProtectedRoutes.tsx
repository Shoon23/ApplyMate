import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoutes = () => {
  const { state, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  if (!state.accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
