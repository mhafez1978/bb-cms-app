import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, newPass, repeatNewPass } = body;

    if (!id || !newPass || !repeatNewPass) {
      return NextResponse.json(
        { error: "Information Missing" },
        { status: 400 }
      );
    }

    if (newPass !== repeatNewPass) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const safePass = await bcrypt.hash(newPass, 10);

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { password: safePass },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
