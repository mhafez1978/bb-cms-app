import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, username, password } =
      await request.json();

    // 🔍 Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with that email or username already exists." },
        { status: 409 }
      );
    }

    // 🔐 Hash the password
    const hashedPassword = await hash(password, 10);

    // 👤 Create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });

    // 🎉 Return success
    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
