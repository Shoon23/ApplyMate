import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { type JobApplication, type Meta } from "../interfaces";

interface DataTableProps {
  columns: {
    header: string;
    render: (job: JobApplication) => React.ReactNode;
  }[];
  handleNext: () => void;
  handlePrev: () => void;
  isLoading: boolean;
  jobs: JobApplication[];
  page: number;
  meta: Meta | null;
}
export function DataTable({
  columns,
  handleNext,
  handlePrev,
  isLoading,
  jobs,
  meta,
  page,
}: DataTableProps) {
  return (
    <div className="w-full">
      <div className="m-3 rounded-md border ">
        <Table>
          <TableHeader className="text-md">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.header as string} className="p-4">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="text-md">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className="p-3">
                      <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : jobs.length ? (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  {columns.map((col) => (
                    <TableCell key={col.header as string} className="p-3">
                      {col.render(job)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 m-5">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {page} of {meta?.totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={!meta?.hasPrevPage || page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!meta?.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
