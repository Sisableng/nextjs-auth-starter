"use client";
import React from "react";

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
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { getUserFromDb } from "@/app/actions/auth";
import { signOut, useSession } from "next-auth/react";
import { compareHashPassword, saltAndHashPassword } from "@/utils/password";
import { updatePassword } from "@/app/(dashboard)/dashboard/profile/actions";

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
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords does not match!",
    path: ["confirmPassword"],
  });

export default function PasswordForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { data: session } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Checking Password...");

    if (!session) {
      toast.error("Session not found", {
        id: toastId,
      });
      return;
    }

    try {
      // Check current password
      const user = await getUserFromDb(session.user.username);

      if (user) {
        const checkPassword: boolean = compareHashPassword(
          values.password,
          user.password,
        );

        if (checkPassword) {
          toast.loading("Updating...", {
            id: toastId,
          });

          const hashedPassword: string = saltAndHashPassword(
            values.newPassword,
          );

          // update password
          const result = await updatePassword(user.id, hashedPassword);

          if (result) {
            // Updated success
            toast.success("Password updated.", {
              id: toastId,
            });

            signOut();
          } else {
            // Updated Failed
            toast.error("Failed to updated password.", {
              id: toastId,
            });
          }
        } else {
          // Invalid Password
          toast.error("Invalid password.", {
            id: toastId,
          });
        }
      } else {
        toast.error("User not found.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethink went wrong.", {
        id: toastId,
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="border-accent"
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
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              value={String(showPassword)}
              onCheckedChange={(val: boolean) => setShowPassword(val)}
            />
            <label
              htmlFor="terms1"
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show All
            </label>
          </div>
          <Button type="submit" size={"lg"} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
