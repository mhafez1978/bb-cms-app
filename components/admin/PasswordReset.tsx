"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PasswordReset = () => {
  const [newpass, setNewPass] = useState("");
  const [repeatedNewPass, setRepeatedNewPass] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const changeUserPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await fetch("/api/db/pass/reset", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          newPass: newpass,
          repeatNewPass: repeatedNewPass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!results.ok) {
        const msg = await results.text();
        throw new Error(msg || "Failed to create user.");
      }
      if (results.ok) {
        setSuccess("password reset ok...");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Password Reset Utility</h2>
      <form onSubmit={changeUserPassword} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Enter user id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter New Password"
          value={newpass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Repeat New Password"
          value={repeatedNewPass}
          onChange={(e) => setRepeatedNewPass(e.target.value)}
        />
        <Button type="submit" className="py-4 px-8">
          Change Password
        </Button>
      </form>
      <div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
