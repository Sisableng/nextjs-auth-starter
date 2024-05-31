import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const role = auth?.user.role
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session) {
        token.user = {
          ...session,
        };

        // console.log("update", {
        //   token,
        //   session,
        // });
      }

      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.user = {
          ...user,
          id: user.id,
        };
      }

      // console.log("jwt", {
      //   token,
      // });

      return token;
    },
    async session({ session, token }) {
      // console.log("session", {
      //   session,
      //   token,
      // });

      return {
        ...session,
        user: {
          ...token.user,
        },
      };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
