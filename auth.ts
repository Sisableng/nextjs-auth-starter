import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareHashPassword } from "./utils/password";
import { getUserFromDb } from "./app/actions/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle";
import { JWT } from "next-auth/jwt";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id?: string | undefined;
    username: string;
    avatar?: string | null;
    avatarId?: string | null;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string | undefined;
      username: string;
      avatar?: string | null;
      avatarId?: string | null;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string | undefined;
    username: string;
    avatar?: string | null;
    avatarId?: string | null;
  }
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
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session) {
        token.username = session.username;
        token.email = session.email;
        token.name = session.name;
        token.avatar = session.avatar;
        token.avatarId = session.avatarId;
      }
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        return {
          ...token,
          username: user.username,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          avatarId: user.avatarId,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          name: token.name,
          avatar: token.avatar,
          avatarId: token.avatarId,
        },
      };
    },
  },
});
