import { format, parseISO, isValid } from "date-fns";
import type { JobApplication } from "../interfaces";
import RowActions from "./row-actions";
import UpdateJobForm from "./update-job-form";

export const columns: {
  header: string;
  render: (job: JobApplication) => React.ReactNode;
}[] = [
  {
    header: "Position",
    render: (job) => job.position ?? "N/A",
  },
  {
    header: "Company",
    render: (job) => job.company ?? "N/A",
  },
  {
    header: "Status",
    render: (job) => job.status ?? "N/A",
  },
  {
    header: "Salary",
    render: (job) =>
      job.salary
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(Number(job.salary))
        : "N/A",
  },
  {
    header: "Applied Date",
    render: (job) => {
      if (!job.appliedDate) return "N/A";
      const date = parseISO(job.appliedDate);
      return isValid(date) ? format(date, "PPP") : "N/A";
    },
  },
  {
    header: "Actions",
    render: (job) => {
      return <UpdateJobForm job={job} />;
    },
  },
];
