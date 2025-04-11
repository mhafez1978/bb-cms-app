import React from "react";

const LoggedInFooter = () => {
  return (
    <section>
      <div className="w-screen fixed bottom-0 bg-slate-900 text-white">
        <div className="container mx-auto py-20">
          <p>All rights reserved &copy; {new Date().getFullYear()} to BB CMS</p>
        </div>
      </div>
    </section>
  );
};

export default LoggedInFooter;
