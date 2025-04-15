"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskForm({
  onTaskCreated,
}: {
  onTaskCreated?: () => void;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!isLoggedIn) {
      setError("You must be logged in to submit a task.");
      return;
    }

    if (!title || !description || !taskStatus) {
      setError("Please fill in all fields.");
      return;
    }

    // Clear old messages
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/tasks/append/usertask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          status: taskStatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create task.");
      }

      if (res.ok) {
        setTitle("");
        setDescription("");
        setTaskStatus("");
        setSuccess("Task created successfully.");
        onTaskCreated?.(); // 🔥 Trigger list refresh
      }

      // Revalidate server content if needed
      router.refresh(); // only works if data is server-rendered (not useEffect)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isLoggedIn}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isLoggedIn}
        />
        <Select
          onValueChange={(value) => setTaskStatus(value)}
          disabled={!isLoggedIn}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Set Status ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TO_DO">To do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
            <SelectItem value="CANCELED">Canceled</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
          disabled={!isLoggedIn || isLoading}
        >
          Create Task
        </Button>
      </form>

      {/* Feedback messages */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </div>
  );
}
