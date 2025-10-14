import type { LoginForm } from "./LoginPage";
import { publicApi } from "@/lib/publicApi";

import type { RegisterForm } from "./RegisterPage";
import type { SessionType } from "./interfaces";
export const login = async (data: LoginForm): Promise<SessionType> => {
  const { root, ...other } = data;

  const res = await publicApi.post("/auth/login", other);

  return res.data;
};

export const register = async (data: RegisterForm): Promise<SessionType> => {
  const { confirmPassword, root, ...other } = data;

  const res = await publicApi.post("/auth/register", other);

  return res.data;
};

export const refresh = async (): Promise<SessionType> => {
  const res = await publicApi.post("/auth/refresh");

  return res.data;
};
