import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="flex min-h-[50vh]">
        <div className="container mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default PageLayout;
