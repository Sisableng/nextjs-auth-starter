"use server";

import { signIn } from "@/auth";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/schema";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const getUserFromDb = async (username: string) => {
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (data) {
    return data;
  }
  return null;
};

export const register = async (values: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const request = await db
      .insert(users)
      .values({
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .returning();

    if (request) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  } finally {
    revalidatePath("/");
  }
};

export const login = async (values: { username: string; password: string }) => {
  try {
    await signIn("credentials", {
      ...values,
      redirect: false,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: `Invalid credentials!` };

        default:
          return { error: `Internal server error!` };
      }
    }

    throw error;
  }
};
