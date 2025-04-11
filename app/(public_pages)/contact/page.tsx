import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import React from "react";

const Page = () => {
  return (
    <PageLayout>
      <section>
        <PageTitle
          pageTitle="Contact Page"
          pageSubtitle="This is the Contact Page"
        />
      </section>
    </PageLayout>
  );
};

export default Page;
