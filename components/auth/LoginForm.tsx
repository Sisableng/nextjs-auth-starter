"use client";
import Link from "next/link";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { login } from "@/app/actions/auth";
import { useRouter } from "next-nprogress-bar";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/(?=.*?[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/(?=.*?[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/(?=.*?[0-9])/, "Password must contain at least one digit of number")
  .regex(
    /(?=.*?[#?!@$%^&*-])/,
    "Password must contain at least one special character",
  );

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: passwordSchema,
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const request = await login(values);

      if (request && request.error) {
        toast.error(request?.error);
      } else {
        toast.success("Signed In.");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  }
  return (
    <div className="relative">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sisableng"
                      className="border-accent"
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
                    <div className="flex items-center gap-3">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="flex-1 border-accent"
                        {...field}
                      />
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Signin
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-4 text-center text-sm">
        <p className="text-muted-foreground">{`Don't have an account yet?`}</p>
        <Link
          href={{
            pathname: "/",
            query: { auth: "sign-up" },
          }}
          className="underline decoration-primary underline-offset-4 transition-colors ease-in-out hover:text-primary"
        >
          Register Now!
        </Link>
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80">
          <LoaderCircle size={40} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
