import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { title, description, taskStatus, projectId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return new Response("User not found", { status: 404 });

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      status: taskStatus,
      projectId,
      createdBy: {
        connect: { id: user.id },
      },
    },
  });

  return Response.json({ data: newTask });
}
