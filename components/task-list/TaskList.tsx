"use client";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  project?: {
    name: string;
  };
  assignedTo?: {
    username: string;
  };
}

const TaskList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTasks = async () => {
    try {
      const res = await fetch("/api/tasks/usertasklist", {
        cache: "no-cache",
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTasks();
  }, [refreshTrigger]); // 👈 Trigger fetch on refresh

  if (loading) return <p className="text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (tasks.length === 0)
    return <p className="text-gray-600">No tasks found.</p>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 rounded shadow hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Status: {task.status}</span>
            {task.project && <span>Project: {task.project.name}</span>}
            {task.assignedTo && (
              <span>Assigned: {task.assignedTo.username}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
