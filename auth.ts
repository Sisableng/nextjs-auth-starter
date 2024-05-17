import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareHashPassword } from "./utils/password";
import { getUserFromDb } from "./app/actions/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", placeholder: "username", type: "text" },
        email: { label: "Email", placeholder: "email", type: "email" },
        password: {
          label: "Password",
          placeholder: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No Credentials");
        }

        let user: User | null = null;

        // logic to verify if user exists
        user = await getUserFromDb(credentials.username as string);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        const correctPassword: boolean = compareHashPassword(
          credentials.password as string,
          user.password,
        );

        if (!correctPassword) {
          throw new InvalidLoginError();
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  // callbacks: {
  //   jwt({ token, user }) {
  //     if (user) { // User is available during sign-in
  //       token.id = user.id
  //     }
  //     return token
  //   },
  //   session({ session, token }) {
  //     session.user.id = token.id
  //     return session
  //   },
  // },
});
