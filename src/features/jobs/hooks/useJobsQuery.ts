import { useState } from "react";
import type { StatusType } from "../interfaces";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../jobService";

export const useJobsQuery = (options?: {
  enabled?: boolean;
  initialLimit?: number;
}) => {
  const initialLimit = options?.initialLimit ?? 10;
  const enabled = options?.enabled ?? true;

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [search, setSearch] = useState<string | null>(null);

  const { session } = useAuth();

  const jobQuery = useQuery({
    queryKey: ["jobs", page, search, status],
    queryFn: async () => getJobs(page, initialLimit, status, search),
    enabled: !!session.accessToken && enabled,
    staleTime: 1000 * 60 * 10,
  });

  const meta = jobQuery.data?.meta ?? null;

  const handleNext = () => {
    if (meta?.hasNextPage) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (meta?.hasPrevPage && page > 1) setPage((prev) => prev - 1);
  };

  const handleFilter = (options: {
    search?: string;
    status?: StatusType;
    resetPage?: boolean;
  }) => {
    const { search: newSearch, status: newStatus, resetPage = true } = options;

    if (resetPage) setPage(1);
    if (newSearch) setSearch(newSearch);
    if (newStatus) setStatus(newStatus);
  };
  const resetFilter = () => {
    setPage(1);
    setSearch(null);
    setStatus(null);
  };

  return {
    page,
    handleNext,
    handlePrev,
    setStatus,
    setSearch,
    jobQuery,
    handleFilter,
    resetFilter,
    status: status ?? "",
    search: search ?? "",
  };
};
