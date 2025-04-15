import React from "react";

interface PageTitleProps {
  pageTitle: string;
  pageSubtitle: string;
}

const PageTitle = ({ pageTitle, pageSubtitle }: PageTitleProps) => {
  return (
    <section className="dark:bg-dark">
      <div className="px-4">
        <div className="border-l-[5px] border-primary pl-5">
          <h2 className="mb-2 text-2xl font-semibold text-emerald-500 dark:text-white">
            {pageTitle}
          </h2>
          <p className="text-sm font-medium text-body-color dark:text-dark-6">
            {pageSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
