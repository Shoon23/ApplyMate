import { format, parseISO, isValid } from "date-fns";
import type { JobApplication } from "../interfaces";

export const columns: {
  header: string;
  render: (job: JobApplication) => React.ReactNode;
}[] = [
  {
    header: "Position",
    render: (job) => job.position ?? "-",
  },
  {
    header: "Company",
    render: (job) => job.company ?? "-",
  },
  {
    header: "Status",
    render: (job) => job.status ?? "-",
  },
  {
    header: "Salary",
    render: (job) =>
      job.salary
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(Number(job.salary))
        : "-",
  },
  {
    header: "Applied Date",
    render: (job) => {
      if (!job.appliedDate) return "—";
      const date = parseISO(job.appliedDate);
      return isValid(date) ? format(date, "PPP") : "—";
    },
  },
];
