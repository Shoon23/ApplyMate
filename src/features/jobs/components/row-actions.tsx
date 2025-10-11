import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JobApplication } from "../interfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewJobDialog from "./view-job-dialog";

interface RowActionsProps {
  job: JobApplication;
}

const RowActions = ({ job }: RowActionsProps) => {
  const showJob = async () => {};

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" className="justify-start">
            View
          </Button>

          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => console.log("Edit", job.id)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-red-600"
            onClick={() => console.log("Delete", job.id)}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RowActions;
