import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JobApplication } from "../interfaces";
import { formatDate, formatSalary } from "@/lib/format";
import { getFitScoreColor, getStatusColor } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useJobMutation } from "../hooks/useJobMutation";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface JobDetailsDialogProps {
  job: JobApplication;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  setSelectedJob: React.Dispatch<React.SetStateAction<JobApplication | null>>;
}

export const JobDetailsDialog = ({
  onOpenChange,
  open,
  setSelectedJob,
  job,
}: JobDetailsDialogProps) => {
  const formatValue = (value?: string | number | null, fallback = "N/A") =>
    value && value !== "" ? value : fallback;

  const { createFitScoreMutation } = useJobMutation();

  const handleGeneratScore = () => {
    createFitScoreMutation.reset();

    createFitScoreMutation.mutate(job.id, {
      onSuccess(data) {
        setSelectedJob((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            jobEvaluation: {
              explanation: data.explanation ?? [],
              fitScore: data.fitScore ?? null,
            },
          };
        });
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="w-full sm:max-w-2xl md:max-w-5xl lg:max-w-7xl">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-xl md:text-2xl font-extrabold text-foreground">
            Job Application Details
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Detailed information about the job application.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Position
                  </p>
                  <h2 className="text-xl md:text-3xl font-extrabold text-foreground">
                    {job.position || "Untitled Position"}
                  </h2>
                  <p className="text-lg text-primary font-medium">
                    {job.company || "Unknown Company"}
                  </p>
                </div>

                <span
                  className={`mt-1 px-3 py-1 inline-flex text-sm font-bold rounded-full ${getStatusColor(
                    job.status
                  )}`}
                >
                  {formatValue(job.status, "No Status")}
                </span>
              </div>
              <div className="space-y-6 mt-3">
                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-muted-foreground">
                      Applied Date
                    </p>
                    <p>{formatValue(formatDate(job.appliedDate))}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-muted-foreground">
                      Target Salary
                    </p>
                    <p className="font-bold">{formatSalary(job.salary)}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-muted-foreground">
                      Deadline
                    </p>
                    <p>{formatDate(job.deadline)}</p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="border-t pt-4 space-y-2">
                  <h3 className="text-lg font-bold">Contact & Source</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Person
                      </p>
                      <p className="font-medium">
                        {formatValue(job.contactName, "No contact")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Email
                      </p>
                      <p className="font-medium">
                        {formatValue(job.contactEmail, "No email")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <p className="font-medium">{formatValue(job.source)}</p>
                  </div>
                </div>

                {/* Description Section */}
                <div className="border-t pt-4 space-y-2">
                  <h3 className="text-lg font-bold">Job Description</h3>
                  <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground border border-border whitespace-pre-wrap">
                    {formatValue(
                      job.description,
                      "No detailed job description provided."
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* AI Fit Evaluation */}
            <div className="flex-1 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6 space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center">
                🤖 AI Fit Evaluation
              </h3>

              <div className="flex items-center space-x-4">
                {createFitScoreMutation.isError ? (
                  <div className="w-full flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {createFitScoreMutation.error.message}
                    </span>
                  </div>
                ) : job.jobEvaluation?.fitScore !== undefined &&
                  job.jobEvaluation?.fitScore !== null ? (
                  <>
                    <span
                      className={`px-4 py-2 text-2xl leading-5 font-extrabold rounded-lg ${getFitScoreColor(
                        job.jobEvaluation.fitScore
                      )} shadow-md`}
                    >
                      {`${job.jobEvaluation.fitScore}%`}
                    </span>
                    <p className="text-base text-muted-foreground">
                      This score reflects how well your profile/resume matches
                      the job requirements.
                    </p>
                  </>
                ) : (
                  <div className="flex justify-center items-center w-full">
                    {job.description && job.description.trim() !== "" ? (
                      <Button
                        disabled={createFitScoreMutation.isPending}
                        onClick={handleGeneratScore}
                      >
                        {createFitScoreMutation.isPending ? (
                          <>
                            <Spinner />
                            Generating...
                          </>
                        ) : (
                          "Generate Score"
                        )}
                      </Button>
                    ) : (
                      <p className=" font-medium text-base">
                        Add a job description to generate a fit score.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 p-4 bg-muted/40 border border-border rounded-xl transition-all text-xl">
                <h4 className="font-semibold text-foreground mb-2 border-b pb-1">
                  Detailed Analysis:
                </h4>

                {createFitScoreMutation.isPending ? (
                  <div className="flex items-center gap-2 text-muted-foreground/80 animate-fade-in">
                    <Spinner />
                    <span className="text-sm">Analyzing job details...</span>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                    {job.jobEvaluation?.explanation?.length ? (
                      job.jobEvaluation.explanation.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed text-base">
                          {detail}
                        </li>
                      ))
                    ) : (
                      <li className="italic text-muted-foreground/80 text-base">
                        No detailed explanation available.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
