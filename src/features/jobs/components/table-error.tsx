import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { JobApplication, Meta } from "../interfaces";

interface TableErrorProps {
  columns: number;
  refetch: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        data: JobApplication[];
        meta: Meta;
      },
      Error
    >
  >;
}

const TableError = ({ columns, refetch }: TableErrorProps) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns}
        className="h-24 text-center text-muted-foreground"
      >
        <div className="flex flex-col items-center space-y-3">
          <p>Something went wrong while loading data.</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableError;
