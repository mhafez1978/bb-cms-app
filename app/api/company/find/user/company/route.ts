import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You need to be logged in." },
      { status: 401 }
    );
  }

  try {
    const { name, description, quantity, cost, price, notes, createdById } =
      await req.json();

    if (createdById !== session.user.id) {
      return NextResponse.json(
        { error: "User mismatch error." },
        { status: 403 }
      );
    }

    const company = await prisma.company.findFirst({
      where: {
        createdBy: {
          id: session.user.id,
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Can't find company under this account." },
        { status: 404 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        quantity,
        cost,
        price,
        notes,
        createdById,
        companyId: company.id,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
