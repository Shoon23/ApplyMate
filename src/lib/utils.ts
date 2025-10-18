import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getStatusColor(status?: string) {
  if (!status)
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";

  switch (status.toUpperCase()) {
    case "WISHLIST":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300";

    case "APPLIED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";

    case "INTERVIEW":
    case "INTERVIEWING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";

    case "OFFER":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";

    case "HIRED":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";

    case "REJECTED":
    case "HOLD":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";

    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

export function getFitScoreColor(score?: number) {
  if (score === undefined || score === null) return "bg-gray-100 text-gray-800";

  if (score > 80) return "bg-green-100 text-green-800";
  if (score > 50) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}
