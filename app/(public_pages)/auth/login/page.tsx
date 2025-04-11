import React from "react";
import PageLayout from "@/components/page-layout";
import LoginForm from "@/components/tailgrids/login/login-form";

const Page = () => {
  return (
    <PageLayout>
      <section>
        <div>
          <LoginForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default Page;
