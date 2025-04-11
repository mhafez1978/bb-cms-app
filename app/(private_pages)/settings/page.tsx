import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Loading = () => {
  return (
    <>
      <h1 className="text-emerald-500">Loading ...</h1>
    </>
  );
};

const Page = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <PageLayout>
      <Suspense fallback={<Loading />}>
        <section>
          <PageTitle
            pageTitle="Settings Page"
            pageSubtitle="This is Settings page"
          />
        </section>
      </Suspense>
    </PageLayout>
  );
};

export default Page;
