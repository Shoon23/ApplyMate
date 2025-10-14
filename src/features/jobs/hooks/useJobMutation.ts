import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob, updateJob } from "@/features/jobs/jobService";
import type { JobForm } from "../components/job-form-dialog";
import type { IUpdateJobForm } from "../components/update-job-form";

export const useJobMutation = () => {
  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
    mutationFn: (jobData: JobForm) => addJob(jobData),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const updateJobMutation = useMutation({
    mutationFn: (jobData: IUpdateJobForm) => updateJob(jobData),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  return {
    addJobMutation,
    updateJobMutation,
    isAdding: addJobMutation.isPending,
    isUpdating: updateJobMutation.isPending,
  };
};
