// /lib/auth.ts

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import prisma from "./prisma";
import { AuthOptions } from "next-auth";

export function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const authOptions = {
  providers: [
    GitHubProvider({
      name: "github",
      clientId: getEnvVar("AUTH_GITHUB_ID"),
      clientSecret: getEnvVar("AUTH_GITHUB_SECRET"),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      name: "google",
      clientId: getEnvVar("AUTH_GOOGLE_ID"),
      clientSecret: getEnvVar("AUTH_GOOGLE_SECRET"),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      name: "facebook",
      clientId: getEnvVar("AUTH_FACEBOOK_ID"),
      clientSecret: getEnvVar("AUTH_FACEBOOK_SECRET"),
    }),
    LinkedInProvider({
      name: "linkedIn",
      clientId: getEnvVar("AUTH_LINKEDIN_ID"),
      clientSecret: getEnvVar("AUTH_LINKEDIN_SECRET"),
      authorization: {
        params: {
          scope: "r_liteprofile r_emailaddress", // basic LinkedIn scopes
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/db/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.user) return data.user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Only for OAuth providers

      if (account?.provider !== "credentials") {
        if (!user?.email || !account?.provider || !account?.providerAccountId) {
          console.warn("Missing OAuth user data");
          return false;
        }
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/db/oauth-signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              }),
            }
          );

          if (!res.ok) {
            console.error("OAuth SignIn error:", await res.text());
            return false;
          }
        } catch (error) {
          console.error("OAuth SignIn Exception:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // First-time login (OAuth or Credentials)
      if (user) {
        token.email = user.email;
      }

      // Always: fetch user from DB using email
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.username = dbUser.username;
          token.phone = dbUser.phone;
          token.fullName = dbUser.fullName;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.createdAt = dbUser.createdAt;
          token.provider = account?.provider ?? token.provider ?? "credentials";
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user.fullName = token.fullName;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.createdAt = token.createdAt;
        session.user.provider = token.provider;
      }

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // ✅ Only secure in prod
      },
    },
  },
  secret: getEnvVar("NEXTAUTH_SECRET"),
} satisfies AuthOptions;
