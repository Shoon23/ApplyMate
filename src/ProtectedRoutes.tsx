import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./features/auth/hooks/useAuth";

const ProtectedRoutes = () => {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-primary animate-ping"
          fill="none"
          viewBox="0 0 24 16"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.282-8.455-3.245 1.66-1.5 3.73-2.52 6.135-3.094C10.74 8.79 12 7.7 12 6.5S10.74 4.21 9.68 3.75c2.405-.574 4.475-1.594 6.135-3.094A23.931 23.931 0 0121 1.045V13.255z"
          />
        </svg>
      </main>
    );
  }

  if (!session.accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
