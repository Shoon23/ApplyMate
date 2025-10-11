import api from "@/lib/api";
import type { JobForm } from "./components/add-job-form";
import type { JobApplication, Meta, StatusType } from "./interfaces";

export const getJobs = async (
  token: string,
  pageNumber: number = 1,
  limit: number = 10,
  status?: StatusType | null,
  search?: string | null
): Promise<{ data: JobApplication[]; meta: Meta }> => {
  const params = new URLSearchParams({
    order: "desc",
    limit: limit.toString(),
    page: pageNumber.toString(),
  });

  if (status) params.append("status", status);

  if (search) params.append("search", search);

  const res = await api.get(`/jobs?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const addJob = async (
  token: string,
  data: JobForm
): Promise<JobApplication> => {
  const res = await api.post("/jobs", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
