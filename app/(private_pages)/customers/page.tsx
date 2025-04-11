import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <PageLayout>
      <section>
        <PageTitle
          pageTitle="Customers Page"
          pageSubtitle="This is the Customers Page"
        />
      </section>
    </PageLayout>
  );
};

export default Page;
