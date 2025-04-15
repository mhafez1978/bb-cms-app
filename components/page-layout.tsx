import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col">{children}</div>
      </div>
    </section>
  );
};

export default PageLayout;
