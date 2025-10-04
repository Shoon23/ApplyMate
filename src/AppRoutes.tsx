import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./features/auth/LoginPage";
import { AuthProvider } from "./features/auth/authContext";
import JobPage from "./features/jobs/JobPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<JobPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
