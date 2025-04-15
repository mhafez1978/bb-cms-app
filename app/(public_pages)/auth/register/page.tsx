import React from "react";
import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import RegisterForm from "@/components/register/RegisterForm";

const Page = () => {
  return (
    <PageLayout>
      <section>
        <PageTitle
          pageTitle="Register Page"
          pageSubtitle="This is the Register Page"
        />
      </section>
      <div className="flex justify-center items-center">
        <RegisterForm />
      </div>
    </PageLayout>
  );
};

export default Page;
