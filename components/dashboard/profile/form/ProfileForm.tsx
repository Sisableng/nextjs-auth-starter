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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  checkUser,
  updateProfile,
} from "@/app/(dashboard)/dashboard/profile/actions";
import { useDebouncedCallback } from "use-debounce";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import useStore from "@/hooks/zustand/useStore";
import useCheckUser from "@/hooks/zustand/store/useCheckUser";
import useDebouncedCheck from "@/hooks/useDebouncedCheck";

type UserCheckStatus =
  | "username"
  | "email"
  | "usernameChecked"
  | "emailChecked"
  | null;

const formSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  name: z.string(),
});

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const store = useStore(useCheckUser, (state) => state);

  const init = React.useCallback(async () => {
    if (session && session.user) {
      return {
        username: String(session.user.username),
        email: String(session.user.email),
        name: String(session.user.name ?? ""),
      };
    }

    return {
      username: "",
      email: "",
      name: "",
    };
  }, [session]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => await init(),
  });

  const { isSubmitting } = form.formState;
  const watchUsername = form.watch("username") ?? "";
  const watchEmail = form.watch("email") ?? "";

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating...");

    if (!session) {
      toast.error("Session not found", {
        id: toastId,
      });
      return;
    }

    try {
      // Update user in database
      const request = await updateProfile(session.user.id as string, values);

      if (request) {
        // Update user in session
        await update(values);

        // route refresh
        toast.success("Profile updated.", {
          id: toastId,
        });
      } else {
        toast.error("Failed to update profile.", {
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

  const debouncedUsernameCheck = useDebouncedCheck(
    "username",
    String(session?.user.username),
  );
  const debouncedEmailCheck = useDebouncedCheck(
    "email",
    String(session?.user.email),
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid h-20 place-content-center rounded-md border border-dashed border-accent">
          <p className="text-sm italic text-muted-foreground">
            Implement to update avatar
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="sisableng"
                      className="border-accent pr-8"
                      onChange={(e) => {
                        field.onChange(e.target.value);

                        debouncedUsernameCheck(e.target.value);
                      }}
                    />
                    {form.getValues("username") !==
                      String(session?.user.username) &&
                      watchUsername.length !== 0 && (
                        <div className="absolute right-2.5 top-2.5">
                          {store?.isChecking === "username" && (
                            <LoaderCircle
                              size={16}
                              className="animate-spin text-primary"
                            />
                          )}
                          {store?.isChecking === "usernameChecked" &&
                            (store?.isUsernameExists ? (
                              <CircleAlert
                                size={16}
                                className="text-yellow-500"
                              />
                            ) : (
                              <CircleCheck
                                size={16}
                                className="text-green-500"
                              />
                            ))}
                        </div>
                      )}
                  </div>
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
                  <div className="relative">
                    <Input
                      {...field}
                      type="email"
                      placeholder="sisableng@mail.com"
                      className="border-accent"
                      onChange={(e) => {
                        field.onChange(e.target.value);

                        debouncedEmailCheck(e.target.value);
                      }}
                    />
                    {form.getValues("email") !== String(session?.user.email) &&
                      watchEmail.length !== 0 && (
                        <div className="absolute right-2.5 top-2.5">
                          {store?.isChecking === "email" && (
                            <LoaderCircle
                              size={16}
                              className="animate-spin text-primary"
                            />
                          )}
                          {store?.isChecking === "emailChecked" &&
                            (store?.isEmailExists ? (
                              <CircleAlert
                                size={16}
                                className="text-yellow-500"
                              />
                            ) : (
                              <CircleCheck
                                size={16}
                                className="text-green-500"
                              />
                            ))}
                        </div>
                      )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
