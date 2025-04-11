import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { user: null, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Remove sensitive data before returning
    const { fullName, firstName, lastName, email, role, createdAt, phone } =
      user;
    console.log(user);
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
