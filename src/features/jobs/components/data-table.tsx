import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type JobApplication, type Meta } from "../interfaces";
import TableLoader from "./table-loader";
import { useJobsQuery } from "../hooks/useJobsQuery";
import TableError from "./table-error";
import { JobDetailsDialog } from "./job-detail-dialog";
import { useState } from "react";
import UpdateJobForm from "./update-job-form";
import { Pencil } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";

interface DataTableProps {
  columns: {
    header: string;
    render: (job: JobApplication) => React.ReactNode;
  }[];
  jobQuery: UseQueryResult<
    {
      data: JobApplication[];
      meta: Meta;
    },
    Error
  >;
  handleNext: () => void;
  handlePrev: () => void;
  page: number;
}

export function DataTable({
  columns,
  jobQuery,
  handleNext,
  handlePrev,
  page,
}: DataTableProps) {
  const { data, isLoading, isError, refetch } = jobQuery;

  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const handleOpenDetails = (job: JobApplication) => {
    setSelectedJob(job);
    setIsDetailsDialogOpen(true);
  };

  const [selectedEditJob, setSelectedEditJob] = useState<JobApplication | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="m-3 rounded-md border ">
        <Table>
          <TableHeader className="text-md">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header} className="p-4">
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-md">
            {isLoading ? (
              <TableLoader columns={columns.length + 1} />
            ) : isError ? (
              <TableError columns={columns.length + 1} refetch={refetch} />
            ) : data?.data.length ? (
              data.data.map((job) => (
                <TableRow
                  key={job.id}
                  onClick={() => {
                    if (!isEditOpen) handleOpenDetails(job);
                  }}
                  className="cursor-pointer"
                >
                  {columns.map((col) => (
                    <TableCell key={col.header} className="p-3">
                      {col.render(job)}
                    </TableCell>
                  ))}

                  {/* Actions Cell */}
                  <TableCell className="p-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEditJob(job);
                        setIsEditOpen(true);
                      }}
                      size="sm"
                      className="flex justify-center items-center bg-accent-foreground hover:bg-accent-foreground/90"
                    >
                      <Pencil /> Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 m-5">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {page} of {data?.meta?.totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={!data?.meta?.hasPrevPage || page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!data?.meta?.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsDialog
          setSelectedJob={setSelectedJob}
          job={selectedJob}
          open={isDetailsDialogOpen}
          onOpenChange={(open) => {
            setIsDetailsDialogOpen(open);
            if (!open) setSelectedJob(null);
          }}
        />
      )}

      {/* Edit Job Modal */}
      {selectedEditJob && (
        <UpdateJobForm
          job={selectedEditJob}
          open={isEditOpen}
          setOpen={setIsEditOpen}
        />
      )}
    </div>
  );
}
