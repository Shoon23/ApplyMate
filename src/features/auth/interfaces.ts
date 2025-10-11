export const ErrorType = {
  Validation: "VALIDATION_ERROR",
  Auth: "AUTH_ERROR",
  forbidden: "FORBIDDEN_ERROR",
} as const;

type ApiErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export interface ApiFieldError {
  property: string;
  message: string;
}

export interface ApiError {
  errorType: ApiErrorType;
  errors: ApiFieldError[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface SessionType {
  user: User;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}
