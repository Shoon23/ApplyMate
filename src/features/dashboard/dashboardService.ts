import api from "@/lib/api";
import type { DashboardData } from "./interfaces";

export const getDashboard = async (): Promise<DashboardData> => {
  const res = await api.get("/dashboard");

  return res.data;
};
