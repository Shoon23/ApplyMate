import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob, createFitScore, updateJob } from "@/features/jobs/jobService";
import type { JobForm } from "../components/job-form-dialog";
import type { IUpdateJobForm } from "../components/update-job-form";
import { ErrorType, type ApiError } from "@/features/auth/interfaces";

export const useJobMutation = () => {
  const queryClient = useQueryClient();

  const addJobMutation = useMutation({
    mutationFn: (jobData: JobForm) => addJob(jobData),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const updateJobMutation = useMutation({
    mutationFn: (jobData: IUpdateJobForm) => updateJob(jobData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["jobs"], type: "active" }),
  });

  const createFitScoreMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await createFitScore(id);
      } catch (error: any) {
        const apiError = error.response?.data as ApiError;

        let message;
        switch (apiError?.errorType) {
          case ErrorType.NotFound:
            message =
              "To generate a match score, please include either your resume or the job description.";
            break;
          case ErrorType.LLMExtraction:
            message = apiError.errors[0].message;
            break;
          default:
            message = "Something Went Wrong!!";
        }

        throw new Error(message);
      }
    },
  });

  return {
    addJobMutation,
    updateJobMutation,
    isAdding: addJobMutation.isPending,
    isUpdating: updateJobMutation.isPending,
    createFitScoreMutation,
  };
};
