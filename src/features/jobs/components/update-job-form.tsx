import JobFormDialog, { type JobForm } from "./job-form-dialog";
import { useJobMutation } from "../hooks/useJobMutation";
import type { JobApplication } from "../interfaces";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";

export interface IUpdateJobForm extends JobForm {
  id: string;
}

interface UpdateJobFormProps {
  job: JobApplication;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const UpdateJobForm = ({ job, open, setOpen }: UpdateJobFormProps) => {
  const { updateJobMutation } = useJobMutation();

  return (
    <JobFormDialog
      open={open}
      setOpen={setOpen}
      mode="update"
      initialValues={{
        company: job.company ?? undefined,
        position: job.position ?? undefined,
        source: job.source ?? undefined,
        status: job.status,
        appliedDate: job.appliedDate
          ? new Date(job.appliedDate).toISOString()
          : undefined,
        deadline: job.deadline
          ? new Date(job.deadline).toISOString()
          : undefined,
        salary: job.salary ?? 0,
        contactName: job.contactName ?? undefined,
        contactEmail: job.contactEmail ?? undefined,
        description: job.description ?? undefined,
      }}
      onSubmit={async (data) => {
        await updateJobMutation.mutateAsync({ ...data, id: job.id });
      }}
      isSubmitting={updateJobMutation.isPending}
    />
  );
};

export default UpdateJobForm;
