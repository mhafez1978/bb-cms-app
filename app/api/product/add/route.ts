import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      quantity,
      cost,
      price,
      notes,
      createdById,
      companyId,
    } = await req.json();

    if (!name || !companyId || !createdById) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
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
        companyId,
        createdById,
      },
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
