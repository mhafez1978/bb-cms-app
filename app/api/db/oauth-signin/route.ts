import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { email, name, image, provider, providerAccountId } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Missing required email" },
      { status: 400 }
    );
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const username = `user_${provider}_${randomUUID().slice(0, 8)}`;
    const defaultPassword = await hash("Welcome!@#", 10);

    user = await prisma.user.create({
      data: {
        email,
        username,
        password: defaultPassword,
        fullName: name ?? null,
        image: image ?? null,
        firstName: null,
        lastName: null,
        phone: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        zipcode: null,
        country: null,
        active: true,
        account: {
          create: {
            provider,
            providerAccountId,
          },
        },
      },
    });
  } else {
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider,
        providerAccountId,
      },
    });

    if (!account) {
      await prisma.account.create({
        data: {
          userId: user.id,
          provider,
          providerAccountId,
        },
      });
    }
  }

  // sanitize response
  const safeUser = {
    id: user.id,
    active: user.active,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    fullName: user.fullName,
    phone: user.phone,
    username: user.username,
    email: user.email,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    country: user.country,
    notes: user.notes,
    companyId: user.companyId,
    createdAt: user.createdAt,
  };
  return NextResponse.json(safeUser);
}
