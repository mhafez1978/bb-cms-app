import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export const GET = handler;
export const POST = handler;
