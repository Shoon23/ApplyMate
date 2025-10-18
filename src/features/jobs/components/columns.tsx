import { formatDate, formatSalary } from "@/lib/format";
import type { JobApplication } from "../interfaces";

import UpdateJobForm from "./update-job-form";
import { getStatusColor } from "@/lib/utils";

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
    render: (job) => {
      const statusColor = getStatusColor(job.status);
      return (
        <span className={`${statusColor} p-2 rounded-md`}>
          {job.status ?? "N/A"}{" "}
        </span>
      );
    },
  },
  {
    header: "Salary",
    render: (job) => formatSalary(job.salary),
  },
  {
    header: "Applied Date",
    render: (job) => {
      return formatDate(job.appliedDate);
    },
  },
];
