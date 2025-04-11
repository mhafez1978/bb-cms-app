import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ✅ Extend Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      image?: string | null;
      role?: string;
      phone?: string | null;
      username?: string | null;
      fullName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      createdAt?: string | Date;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    image?: string | null;
    role?: string;
    phone?: string | null;
    username?: string | null;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: string | Date;
  }
}

// ✅ Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string | null;
    image?: string | null;
    role?: string;
    phone?: string | null;
    username?: string | null;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: string | Date;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });

        if (!user || !credentials?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // const { password, ...safeUser } = user;
        // return safeUser;
        return {
          id: user.id,
          fullName: user.fullName,
          firstName: user.firstName,
          username: user.username,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          image: "/avatar.jpg",
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.phone = user.phone;
        token.fullName = user.fullName;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.fullName = token.fullName;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.username = token.username;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
