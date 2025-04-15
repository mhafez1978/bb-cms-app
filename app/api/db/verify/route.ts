import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: username }, // or username
    });

    if (!user) {
      return NextResponse.json(
        { user: null, error: "User not found" },
        { status: 404 }
      );
    }
    if (!user.active) {
      return NextResponse.json(
        { user: null, error: "User Not Active" },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { user: null, error: "Invalid password" },
        { status: 401 }
      );
    }
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
