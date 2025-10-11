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

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["jobs", page, search, status],
    queryFn: async () =>
      getJobs(session.accessToken!, page, initialLimit, status, search),
    enabled: !!session.accessToken && enabled,
    staleTime: 1000 * 60 * 10,
  });

  const jobs = data?.data ?? [];
  const meta = data?.meta ?? null;

  const handleNext = () => {
    if (meta?.hasNextPage) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (meta?.hasPrevPage && page > 1) setPage((prev) => prev - 1);
  };

  const isPageLoading = isLoading || (isFetching && !data);

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
    jobs,
    meta,
    page,
    isLoading: isPageLoading,
    handleNext,
    handlePrev,
    setStatus,
    setSearch,
    refetch,
    handleFilter,
    resetFilter,
    status: status ?? "",
    search: search ?? "",
  };
};
