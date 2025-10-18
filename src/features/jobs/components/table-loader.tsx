import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableLoaderProps {
  columns: number;
  rows?: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ columns, rows = 10 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: columns }).map((_, j) => (
            <TableCell key={j} className="p-5">
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableLoader;
