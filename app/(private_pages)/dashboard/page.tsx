import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the path based on your project structure
import { redirect } from "next/navigation";
import ClockWithDate from "@/components/ClockWirhDate";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let user = null;
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  if (session && session.user) {
    console.log(session.user);
    user = session.user;
  }

  return (
    <PageLayout>
      <section>
        <PageTitle
          pageTitle="Dashboard Page"
          pageSubtitle="This is a test Dashboard"
        />
      </section>
      <section>
        <div className="pl-4">
          <p>Welcome back, {user?.firstName}</p>
          <p>
            You've been a member since:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Unknown"}
          </p>
        </div>
        <div>
          <ClockWithDate />
        </div>
      </section>
    </PageLayout>
  );
};

export default Page;
