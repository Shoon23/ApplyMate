import type { LoginForm } from "./LoginPage";
import api from "@/lib/api";
import type { RegisterForm } from "./RegisterPage";
export const login = async (data: LoginForm) => {
  const { root, ...other } = data;

  const res = await api.post("/auth/login", other);

  return res.data;
};

export const register = async (data: RegisterForm) => {
  const { confirmPassword, root, ...other } = data;

  const res = await api.post("/auth/register", other);

  return res.data;
};

export const refresh = async () => {
  const res = await api.post("/auth/refresh");

  return res.data;
};
