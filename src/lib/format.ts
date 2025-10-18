import { format, parseISO, isValid } from "date-fns";

export const formatDate = (appliedDate: string | null) => {
  if (!appliedDate) return "N/A";
  const date = parseISO(appliedDate);
  return isValid(date) ? format(date, "PPP") : "N/A";
};

export const formatSalary = (salary: number) => {
  if (!salary) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(Number(salary));
};
