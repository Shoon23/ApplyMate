import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Status, type JobApplication, type Meta } from "../interfaces";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CoreDetailSection from "./core-detail-section";
import TimelineStatusSection from "./timeline-status-section";
import AdditionalInfoSection from "./additional-info-section";
import { ErrorType, type ApiError } from "@/features/auth/interfaces";
import { addJob } from "../jobService";

const formSchema = z.object({
  company: z.string().nonempty({
    error: "Company is Required",
  }),
  position: z.string().nonempty({
    error: "Position is Required",
  }),
  source: z.string().optional().nullable(),
  status: z.enum(Status),
  appliedDate: z.iso.datetime().optional().nullable(),
  deadline: z.iso.datetime().optional().nullable(),

  salary: z.coerce.number().optional(),
  contactName: z.string().optional().nullable(),
  contactEmail: z
    .union([z.email(), z.literal("")])
    .optional()
    .nullable(),

  description: z.string().optional().nullable(),
});
import { toast } from "sonner";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useJobMutation } from "../hooks/useJobMutation";
export type JobForm = z.infer<typeof formSchema> & {
  root?: string;
};

export type FormFields = keyof JobForm;

interface AddJobFormProps {
  // addJobMutation: UseMutationResult<JobApplication, Error, JobForm, unknown>;
}

const AddJobForm = ({}: AddJobFormProps) => {
  const form = useForm<JobForm>({
    resolver: zodResolver(formSchema) as any,
    mode: "onChange",
    defaultValues: {
      company: "",
      position: "",
      source: "",
      status: "WISHLIST",
      appliedDate: null,
      deadline: null,
      salary: 0,
      contactName: "",
      contactEmail: "",
      description: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const isDirty = form.formState.isDirty;

  const { addJobMutation } = useJobMutation();

  const handleDialogChange = (nextOpen: boolean) => {
    if (form.formState.isSubmitting) return;
    if (addJobMutation.isPending) return;
    if (!nextOpen && isDirty) {
      setShowWarning(true);
      return;
    }
    if (!nextOpen) form.reset();
    setOpen(nextOpen);
  };
  const handleConfirmClose = () => {
    form.reset();
    setShowWarning(false);
    setOpen(false);
  };

  const onSubmit = async (data: JobForm) => {
    addJobMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Job Added Succesfully", {
          position: "top-right",
        });
        form.reset();
        setOpen(false);
      },
      onError: (error: any) => {
        const apiError = error.response?.data as ApiError;
        switch (apiError.errorType) {
          case ErrorType.Validation:
            mapApiErrorsToForm(form, apiError);
            break;
          default:
            toast.error(
              apiError?.errors[0]?.message ?? "Something went wrong",
              {
                richColors: true,
                duration: 4000,
                position: "top-right",
                className: "bg-red-900 text-white",
              }
            );
        }
      },
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button size={"lg"}> + Add Job</Button>
        </DialogTrigger>

        <DialogContent className="w-full lg:max-w-5xl ">
          <DialogHeader>
            <DialogTitle>Track New Job Application</DialogTitle>
            <DialogDescription>
              Enter Job Application Details Below.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <CoreDetailSection />
                <TimelineStatusSection />
                <AdditionalInfoSection />
              </div>
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    disabled={
                      form.formState.isSubmitting || addJobMutation.isPending
                    }
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    addJobMutation.isPending
                  }
                >
                  {form.formState.isSubmitting ? "Adding..." : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Closing this form will lose them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClose}
              variant={"destructive"}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddJobForm;
