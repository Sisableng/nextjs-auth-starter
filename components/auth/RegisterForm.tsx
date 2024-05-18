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
import { ChevronLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useStep } from "@/hooks/useStep";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/app/actions/auth";
import { useRouter } from "next-nprogress-bar";
import { saltAndHashPassword } from "@/utils/password";

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

const formSchema = z
  .object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((values) => values.password === values.confirm, {
    message: "Passwords does not match!",
    path: ["confirm"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, helpers] = useStep(2);

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Processing...");
    try {
      const data = await register({
        username: values.username,
        email: values.email,
        password: saltAndHashPassword(values.password),
      });

      if (data.success) {
        router.push("/");
        toast.success("User Created.", {
          id: toastId,
        });
      } else {
        toast.error("Failed to creating user.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to creating user.", {
        id: toastId,
      });
    }
  }

  function updateSearchParams(query: string, value: string | number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, String(value));
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  React.useEffect(() => {
    if (searchParams.get("step")) {
      setStep(Number(searchParams.get("step")));
    }
  }, [searchParams, setStep]);
  return (
    <div className="relative">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 1 && (
              <>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="sisableng@mail.com"
                          className="border-accent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
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
                            key="show-buttom"
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
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-3">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="flex-1 border-accent"
                            {...field}
                          />
                          <Button
                            type="button"
                            key="show-buttom"
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
              </>
            )}
            {canGoToNextStep ? (
              <Button
                type="button"
                key="next-buttom"
                className="w-full"
                onClick={() => {
                  updateSearchParams("step", currentStep + 1);
                  goToNextStep();
                }}
              >
                Next
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                {canGoToPrevStep && (
                  <Button
                    type="button"
                    key={"prev-button"}
                    size={"icon"}
                    variant={"secondary"}
                    className="bg-accent hover:bg-accent/50"
                    onClick={() => {
                      updateSearchParams("step", currentStep - 1);
                      goToPrevStep();
                    }}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                )}
                <Button
                  type="submit"
                  key="submit-buttom"
                  className="w-full flex-1"
                >
                  Signup
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
      <div className="mt-4 text-center text-sm">
        <p className="text-muted-foreground">Already have an account?</p>
        <Link
          href={"/"}
          className="underline decoration-primary underline-offset-4 transition-colors ease-in-out hover:text-primary"
        >
          Login Now!
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
