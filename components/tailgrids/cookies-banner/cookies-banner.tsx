"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface CookiesBannerProps {
  CookiesBannerTitle: string;
  CookiesBannerText: string;
}

const CookiesBanner = ({
  CookiesBannerTitle,
  CookiesBannerText,
}: CookiesBannerProps) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setTimeout(() => {
        setIsHidden(false);
      }, 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsHidden(true);
  };

  const handleClose = () => {
    setIsHidden(true);
  };

  return (
    <section className={isHidden ? "hidden" : "block"}>
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between rounded-lg border border-stroke bg-gray-2 px-6 py-8 dark:border-dark-3 dark:bg-dark-2 xs:px-10 md:px-8 lg:px-10">
          <div className="w-full md:w-7/12 lg:w-2/3">
            <div className="mb-6 md:mb-0">
              <h4 className="mb-1 text-xl font-semibold text-dark dark:text-white xs:text-2xl md:text-xl lg:text-2xl">
                {CookiesBannerTitle}
              </h4>
              <p className="text-base text-body-color dark:text-dark-6">
                {CookiesBannerText} -{" "}
                <Link href="#" className="text-sky-600">
                  Review Our Data Collection Policy
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full md:w-5/12 lg:w-1/3">
            <div className="flex items-center space-x-3 md:justify-end">
              <button
                onClick={handleAccept}
                className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-blue-dark"
              >
                Accept
              </button>
              <button
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-center text-base font-medium text-body-color shadow-1 hover:bg-primary hover:text-white dark:bg-dark dark:text-dark-6 dark:shadow-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiesBanner;
