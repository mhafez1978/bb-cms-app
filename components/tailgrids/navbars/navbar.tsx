"use client";
import { useSession } from "next-auth/react";
import LoggedInNavbar from "./logged-in-navbar";
import LoggedOutNavbar from "./logged-out-navbar";

export default function Navbar() {
  const { data: session, status } = useSession();

  // While loading (optional)
  if (status === "loading") {
    return <LoggedOutNavbar />;
  }

  // If the user is authenticated
  if (status === "authenticated" && session?.user) {
    return (
      <LoggedInNavbar
        username={session.user.name || "Guest User"}
        userImage={session.user.image || "/avatar.jpg"}
      />
    );
  }

  return <LoggedOutNavbar />;
}
