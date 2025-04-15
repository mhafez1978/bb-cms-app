import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            assignedTo: {
              email: session.user.email,
            },
          },
          {
            createdBy: {
              email: session.user.email,
            },
          },
        ],
      },
      include: {
        project: true,
        assignedTo: true,
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
