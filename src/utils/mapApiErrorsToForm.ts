import type { Path, UseFormReturn } from "react-hook-form";
import type { ApiError } from "@/features/auth/interfaces";

export function mapApiErrorsToForm<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  apiError: ApiError
) {
  const validFields = new Set(Object.keys(form.getValues()));

  apiError.errors.forEach((err) => {
    const field = validFields.has(err.property) ? err.property : "root";
    form.setError(field as Path<T> | "root", { message: err.message });
  });
}
