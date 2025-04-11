"use client";
import { useSession } from "next-auth/react";
import LoggedOutFooter from "./logged-out-footer";
import LoggedInFooter from "./logged-in-footer";

export default function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <LoggedInFooter />
      </>
    );
  }
  return (
    <>
      <LoggedOutFooter />
    </>
  );
}
