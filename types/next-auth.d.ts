import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      image?: string | null;
      role?: string;
      phone?: string | null;
      username?: string | null;
      fullName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      createdAt?: string | Date;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email?: string;
    image?: string | null;
    role?: string;
    phone?: string | null;
    username?: string | null;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: string | Date;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    image?: string | null;
    role?: string;
    phone?: string | null;
    username?: string | null;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: string | Date;
    provider?: string;
  }
}
