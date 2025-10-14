import api from "@/lib/api";
import type { JobApplication, Meta, StatusType } from "./interfaces";
import type { JobForm } from "./components/job-form-dialog";
import type { IUpdateJobForm } from "./components/update-job-form";

export const getJobs = async (
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

  const res = await api.get(`/jobs?${params.toString()}`);

  return res.data;
};
export const addJob = async (data: JobForm): Promise<JobApplication> => {
  const res = await api.post("/jobs", data);

  return res.data;
};

export const updateJob = async (data: IUpdateJobForm) => {
  const res = await api.patch("/jobs", data);

  return res.data;
};
