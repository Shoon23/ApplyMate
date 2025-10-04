import { Button } from "@/components/ui/button";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import z from "zod";
import type { ApiError } from "@/features/auth/interfaces";
import { ErrorType } from "@/features/auth/interfaces";
import { useAuth } from "@/hooks/useAuth";
import { register } from "./authService";

const formSchema = z
  .object({
    name: z.string({ error: "Name is required" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters" }),
    confirmPassword: z.string({ error: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof formSchema> & {
  root?: string;
};
type FormFields = "email" | "password" | "name" | "root";

const RegisterPage = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setSession } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const resData = await register(data);

      const from = location.state?.from?.pathname || "/";

      setSession(resData);

      navigate(from, { replace: true });
    } catch (error: any) {
      const apiError = error.response?.data as ApiError;

      switch (apiError.errorType) {
        case ErrorType.Validation:
        case ErrorType.Auth:
        case ErrorType.forbidden:
          apiError.errors.forEach((err) => {
            const field = (
              ["email", "password", "name"].includes(err.property)
                ? err.property
                : "root"
            ) as FormFields;

            form.setError(field, { message: err.message });
          });
          break;
        default:
          form.setError("root", {
            message: "Something went wrong. Please try again.",
          });
      }
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {form.formState.errors.root && (
                    <FormField
                      control={form.control}
                      name="root"
                      render={() => (
                        <FormItem>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            type="email"
                            disabled={form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            type="text"
                            disabled={form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={form.formState.isSubmitting}
                            placeholder="Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={form.formState.isSubmitting}
                            placeholder="Confirm Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-3">
                    <Button
                      disabled={form.formState.isSubmitting}
                      type="submit"
                    >
                      {form.formState.isSubmitting ? "Loading" : "Log in"}
                    </Button>
                  </div>
                </form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
