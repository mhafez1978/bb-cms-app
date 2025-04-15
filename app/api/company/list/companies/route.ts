//import { getServerSession } from "next-auth";
//import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // make sure this path is correct
import { NextResponse } from "next/server";

export async function GET() {
  //   const session = await getServerSession(authOptions);

  //   if (!session || !session.user.id) {
  //     return NextResponse.json(
  //       { error: "You need to be logged in." },
  //       { status: 401 }
  //     );
  //   }

  try {
    const companies = await prisma.company.findMany(); // fetch all companies

    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching companies." },
      { status: 500 }
    );
  }
}
