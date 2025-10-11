import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob } from "@/features/jobs/jobService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { JobForm } from "../components/add-job-form";

export const useJobMutation = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
    mutationFn: (jobData: JobForm) => addJob(session.accessToken!, jobData),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  return {
    addJobMutation,
    isAdding: addJobMutation.isPending,
  };
};
