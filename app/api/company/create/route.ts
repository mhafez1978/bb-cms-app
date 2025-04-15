import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"; // update path to your auth config
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      { error: "You're not authenticated or unauthorized." },
      { status: 401 }
    );
  }

  try {
    const {
      name,
      description,
      phone,
      website,
      email,
      poc,
      addressLine1,
      addressLine2,
      city,
      state,
      zipcode,
      country,
    } = await req.json();

    const createCompanyProfile = await prisma.company.create({
      data: {
        name,
        description,
        phone,
        website,
        email,
        poc,
        addressLine1,
        addressLine2,
        city,
        state,
        zipcode,
        country,
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return NextResponse.json(createCompanyProfile);
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
