"use client";
import { useState } from "react";
import TaskForm from "@/components/task-form/TaskForm";
import TaskList from "@/components/task-list/TaskList";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import ClockWithDate from "../ClockWirhDate";

export default function ClientDashboard({ user }: { user: Session["user"] }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const session = useSession();

  const handleTaskCreated = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div className="overflow-hidden flex flex-col gap-4 px-3 items-start justify-evenly">
      <div className="w-full mb-4">
        <p>
          Welcome back,{" "}
          {session.data?.user.name ??
            session.data?.user.firstName ??
            session.data?.user.lastName ??
            session.data?.user.fullName ??
            session.data?.user.email ??
            "Unknown"}
        </p>
        <p className="mb-4">
          Member since:{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown"}{" "}
        </p>
        <div className="w-full">
          <ClockWithDate />
        </div>
      </div>
      <div className=" mt-10 w-full flex flex-col gap-4">
        <div className="flex flex-row gap-5">
          <div className="w-1/2 flex flex-col gap-4">
            <h2 className="font-semibold text-2xl uppercase">Create A Task</h2>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
          <div className="w-3/4 max-h-[50vh] overflow-y-auto pr-2">
            <TaskList refreshTrigger={refreshCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
