import { useMutation } from "@tanstack/react-query";
import { login, register, refresh } from "../authService";
import type { LoginForm } from "../LoginPage";
import type { RegisterForm } from "../RegisterPage";
import type { ApiError, AuthState } from "@/features/auth/interfaces";
import { ErrorType } from "@/features/auth/interfaces";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Handles login, registration, and token refresh
 * using React Query mutations.
 */
export const useAuth = (form?: any) => {
  /** LOGIN MUTATION */

  const [session, setSession] = useState<AuthState>({
    user: null,
    accessToken: null,
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const loginMutation = useMutation({
    mutationFn: (data: LoginForm) => login(data),
    onSuccess: (resData) => {
      setSession(resData);
    },
    onError: (error: any) => {
      const apiError = error.response?.data as ApiError;

      if (!form) return;

      switch (apiError?.errorType) {
        case ErrorType.Validation:
        case ErrorType.Auth:
          mapApiErrorsToForm(form, apiError);
          break;
        default:
          form.setError("root", {
            message: "Something went wrong. Please try again.",
          });
      }
    },
  });

  /** REGISTER MUTATION */
  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) => register(data),
    onSuccess: (resData) => {
      setSession(resData);
    },
    onError: (error: any) => {
      const apiError = error.response?.data as ApiError;

      if (!form) return;

      switch (apiError?.errorType) {
        case ErrorType.Validation:
        case ErrorType.Auth:
        case ErrorType.forbidden:
          mapApiErrorsToForm(form, apiError);
          break;
        default:
          form.setError("root", {
            message: "Something went wrong. Please try again.",
          });
      }
    },
  });

  /** REFRESH MUTATION */
  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: (resData) => {
      setSession(resData);
      setIsLoading(false);
    },
    onError: () => {
      setSession({ user: null, accessToken: null });
      setIsLoading(false);
    },
  });
  useEffect(() => {
    refreshMutation.mutate();
  }, []);

  return {
    session,
    loginMutation,
    registerMutation,
    refreshMutation,
    isLoading,
  };
};
