export interface JobApplication {
  id: string;
  company: string | null;
  contactEmail: string | null;
  contactName: string | null;
  createdAt: Date;
  deadline: string | null;
  description: string | null;
  position: string | null;
  salary: number | null;
  source: string | null;
  status: StatusType;
  updatedAt: Date;
  userId: string;
  appliedDate: string;
}

export interface Meta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
export const Status = [
  "WISHLIST",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "HIRED",
  "REJECTED",
] as const;
export type StatusType = (typeof Status)[number];
