import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ErrorType,
  type ApiError,
  type SessionType,
  type User,
} from "./interfaces";
import { refresh } from "./authService";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};

type AuthContextType = {
  state: AuthState;
  setSession: (data: SessionType) => void;
  clearSession: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    user: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const createSession = async () => {
      try {
        if (!state.accessToken) {
          const session = await refresh();
          setSession(session);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const apiError = error.response?.data as ApiError;

          switch (apiError.errorType) {
            case ErrorType.Auth:
              navigate("/login", { state: { from: location } });
              break;
            default:
              navigate("/login", { state: { from: location } });
              break;
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    createSession();
  }, []);

  const setSession = (data: SessionType) => {
    setState(data);
  };

  const clearSession = () => {
    setState({ accessToken: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{ state, setSession, clearSession, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
