import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status, type StatusType } from "./interfaces";
import { Button } from "@/components/ui/button";
import { useJobsQuery } from "./hooks/useJobsQuery";
import { DebouncedInput } from "@/components/debounced-input";
import JobFormDialog from "./components/job-form-dialog";
import { useJobMutation } from "./hooks/useJobMutation";
const JobPage = () => {
  const {
    handleFilter,
    status,
    search,
    resetFilter,
    handleNext,
    handlePrev,
    isLoading,
    jobs,
    meta,
    page,
  } = useJobsQuery({
    initialLimit: 10,
    enabled: true,
  });

  const { addJobMutation, isAdding } = useJobMutation();

  return (
    <div className="mx-3">
      <header className="pb-3 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <h1 className="text-2xl font-medium">Job Applications</h1>
        </div>
      </header>
      <div className="flex justify-between m-5 gap-2">
        <div className="flex w-full max-w-2xl items-center gap-2">
          <DebouncedInput
            value={search}
            placeholder="Search Jobs"
            onChange={(val: string) => {
              handleFilter({
                search: val,
              });
            }}
          />

          <Select
            value={status}
            onValueChange={(value) => {
              handleFilter({ status: value as StatusType });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {Status.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {(search || status) && (
            <Button
              variant="secondary"
              onClick={() => {
                resetFilter();
              }}
            >
              ✕ Clear
            </Button>
          )}
        </div>
        <JobFormDialog
          mode="create"
          onSubmit={async (data) => {
            await addJobMutation.mutateAsync(data);
          }}
          isSubmitting={isAdding}
        />
      </div>
      <DataTable
        columns={columns}
        handleNext={handleNext}
        handlePrev={handlePrev}
        isLoading={isLoading}
        jobs={jobs}
        meta={meta}
        page={page}
      />
    </div>
  );
};

export default JobPage;
