import { createContext, useEffect, useState } from "react";
import type { AuthState } from "../interfaces";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { login, refresh, register } from "../authService";
import type { LoginForm } from "../LoginPage";
import type { RegisterForm } from "../RegisterPage";
import { tokenStore } from "@/lib/tokenStore";
interface AuthContextType {
  session: AuthState;
  isLoading: boolean;
  loginMutation: UseMutationResult<
    React.SetStateAction<AuthState>,
    Error,
    LoginForm,
    unknown
  >;
  registerMutation: UseMutationResult<
    React.SetStateAction<AuthState>,
    Error,
    RegisterForm,
    unknown
  >;
  refreshMutation: UseMutationResult<any, Error, void, unknown>;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<AuthState>({
    user: null,
    accessToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data);
      tokenStore.set(data.accessToken);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setSession(data);
      tokenStore.set(data.accessToken);
    },
  });

  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      setSession(data);
      setIsLoading(false);
      tokenStore.set(data.accessToken);
    },
    onError: () => {
      setSession({ user: null, accessToken: null });
      tokenStore.clear();
      setIsLoading(false);
    },
  });

  useEffect(() => {
    refreshMutation.mutate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        loginMutation,
        registerMutation,
        refreshMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
