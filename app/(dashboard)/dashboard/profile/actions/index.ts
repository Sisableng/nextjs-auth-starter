"use server";

import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";

type ProfileFormValues = {
  username: string;
  email: string;
  name: string;
};

export const updateProfile = async (
  userId: string,
  values: ProfileFormValues,
) => {
  try {
    const data = await db
      .update(users)
      .set({ ...values })
      .where(eq(users.id, userId))
      .returning()
      .then((result) => result[0]);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkUser = async (
  left: keyof typeof users._.columns,
  right: string,
) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users[left], right),
    });

    if (user) {
      return user;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const updatePassword = async (
  userId: string,
  hashedPassword: string,
) => {
  try {
    const data = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId))
      .returning()
      .then((result) => result[0]);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAccount = async (userId: string) => {
  try {
    const data = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning()
      .then((result) => result[0]);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
