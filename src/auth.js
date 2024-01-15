import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "i/flow/login",
    newUser: "/i/flow/signup",
  },
  callbacks: {
    jwt({ token }) {
      console.log("auth.js jwt", token);
      return token;
    },
    session({ session, newSession, user }) {
      console.log("auth.js session", session, newSession, user);
      return session;
    },
  },
  events: {
    signOut(data) {
      console.log(
        `auth.js signout`,
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
    session(data) {
      console.log(
        `auth.js events session`,
        `session` in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.AUTH_URL}/auth/login0`,
          {
            method: "POST",
            headers: { "Content-Type": "application.json" },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );

        const setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed);
        }
        if (authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          ...user,
        };
      },
    }),
  ],
});
