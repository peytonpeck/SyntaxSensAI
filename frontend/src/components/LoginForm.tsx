import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FC } from "react";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/api";
import { Loader2 } from "lucide-react";
import { accountQueryOptionsKey } from "@/queryOptions/accountQueryOptions";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/constants";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export const LoginForm: FC = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const navigate = useNavigate({ from: "/login" });

  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: Api.Authentication.login,
    onSuccess: (user) => {
      if (user.token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, user.token);
        queryClient.setQueryData([accountQueryOptionsKey], user);
        navigate({ to: "/app/dashboard" });
      }
    },
  });
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <form.AppField
                  name="email"
                  children={({ Input, state, handleChange }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <form.AppField
                  name="password"
                  children={({ Input, state, handleChange }) => (
                    <Input
                      id="password"
                      type="password"
                      required
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <form.AppForm>
                <form.Button
                  type="submit"
                  className="w-full"
                  disabled={!form.state.canSubmit}
                >
                  {isPending && <Loader2 />} Login
                </form.Button>
              </form.AppForm>
              {error && (
                <span className="text-red-500 text-sm text-center">
                  {error.message}
                </span>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
