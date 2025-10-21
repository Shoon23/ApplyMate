import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./features/auth/LoginPage";
import JobPage from "./features/jobs/JobPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";
import Layout from "./components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./features/auth/provider/AuthProvider";
import DashboarPage from "./features/dashboard/DashboarPage";
const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/" element={<DashboarPage />} />
              </Route>
            </Route>
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppRoutes;
