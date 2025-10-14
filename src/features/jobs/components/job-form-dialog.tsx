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
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { toast } from "sonner";

import CoreDetailSection from "./core-detail-section";
import TimelineStatusSection from "./timeline-status-section";
import AdditionalInfoSection from "./additional-info-section";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { ErrorType, type ApiError } from "@/features/auth/interfaces";
import { Status, type JobApplication } from "../interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  company: z.string().nonempty({ error: "Company is Required" }),
  position: z.string().nonempty({ error: "Position is Required" }),
  source: z.string().optional(),
  status: z.enum(Status),
  appliedDate: z.iso.datetime().optional(),
  deadline: z.iso.datetime().optional(),
  salary: z.coerce.number().optional(),
  contactName: z.string().optional(),
  contactEmail: z.union([z.email(), z.literal("")]).optional(),
  description: z.string().optional(),
});

export type JobForm = z.infer<typeof formSchema>;

interface JobFormDialogProps {
  mode: "create" | "update";
  trigger?: React.ReactNode;
  initialValues?: Partial<JobForm>;
  onSubmit: (data: JobForm) => Promise<void> | void;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
}

const JobFormDialog = ({
  mode,
  trigger,
  initialValues,
  onSubmit,
  isSubmitting = false,
  title,
  description,
}: JobFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const form = useForm<JobForm>({
    resolver: zodResolver(formSchema) as any,
    mode: "onChange",
    defaultValues: {
      company: initialValues?.company ?? "",
      position: initialValues?.position ?? "",
      source: initialValues?.source ?? "",
      status: initialValues?.status ?? "WISHLIST",
      appliedDate: initialValues?.appliedDate ?? undefined,
      deadline: initialValues?.deadline ?? undefined,
      salary: initialValues?.salary ?? 0,
      contactName: initialValues?.contactName ?? "",
      contactEmail: initialValues?.contactEmail ?? "",
      description: initialValues?.description ?? "",
    },
  });

  const isDirty = form.formState.isDirty;

  const handleDialogChange = (nextOpen: boolean) => {
    if (form.formState.isSubmitting || isSubmitting) return;
    if (!nextOpen && isDirty) {
      setShowWarning(true);
      return;
    }
    if (!nextOpen) form.reset(initialValues);
    setOpen(nextOpen);
  };

  const handleConfirmClose = () => {
    form.reset(initialValues);
    setShowWarning(false);
    setOpen(false);
  };

  const handleSubmit = async (data: JobForm) => {
    try {
      await onSubmit(data);

      const message =
        mode === "create"
          ? "Job Added Successfully"
          : "Job Updated Successfully";
      toast.success(message, {
        position: "top-right",
      });
      form.reset(initialValues);
      setOpen(false);
    } catch (error: any) {
      const apiError = error.response?.data as ApiError;

      console.log(apiError);
      switch (apiError?.errorType) {
        case ErrorType.Validation:
          mapApiErrorsToForm(form, apiError);
          break;
        default:
          toast.error(
            apiError?.errors?.[0]?.message ?? "Something went wrong",
            {
              richColors: true,
              duration: 4000,
              position: "top-right",
              className: "bg-red-900 text-white",
            }
          );
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          {trigger || (
            <Button size="lg">
              {mode === "create" ? "+ Add Job" : "Edit Job"}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="w-full lg:max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {title ||
                (mode === "create"
                  ? "Track New Job Application"
                  : "Update Job Application")}
            </DialogTitle>
            <DialogDescription>
              {description || "Enter Job Application Details Below."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh] pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-4">
                  <CoreDetailSection />
                  <TimelineStatusSection />
                  <AdditionalInfoSection />
                </div>
                <DialogFooter className="mt-5">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      disabled={form.formState.isSubmitting || isSubmitting}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={
                      !form.formState.isValid ||
                      form.formState.isSubmitting ||
                      isSubmitting ||
                      (mode === "update" && !form.formState.isDirty)
                    }
                  >
                    {form.formState.isSubmitting || isSubmitting
                      ? mode === "create"
                        ? "Adding..."
                        : "Updating..."
                      : mode === "create"
                      ? "Add"
                      : "Update"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </ScrollArea>
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
              variant="destructive"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobFormDialog;
