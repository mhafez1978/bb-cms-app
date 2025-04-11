"use client";
import React, { useState } from "react";
import Link from "next/link";
import ToggleSwitch from "../toggle-switch/toggle-switch";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

interface PublicPagesProps {
  id: number;
  pageTitle: string;
  pageUrl: string;
}
const publicPages: PublicPagesProps[] = [
  { id: 1, pageTitle: "Home", pageUrl: "/" },
  { id: 2, pageTitle: "About", pageUrl: "/about" },
  { id: 3, pageTitle: "Services", pageUrl: "/services" },
  { id: 4, pageTitle: "Contact", pageUrl: "/contact" },
];

const LoggedOutNavbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { theme } = useTheme();
  return (
    <header className="flex w-full items-center bg-slate-300 dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link href="/" className="block w-full py-5">
              {theme === "dark" ? (
                <img src="/bb-logo.png" alt="logo" className="w-full" />
              ) : (
                <img src="/light-bb-logo.png" alt="logo" className="w-full" />
              )}
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-slate-500 dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-slate-500 dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-slate-500 dark:bg-white"></span>
              </button>
              <nav
                className={`absolute right-4 top-full z-50 w-full max-w-[250px] rounded-lg bg-dark-2 px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  {publicPages.map((page) => (
                    <li key={page.id}>
                      <Link
                        href={page.pageUrl}
                        className={
                          path === page.pageUrl
                            ? "flex py-2 text-base font-medium text-emerald-600 dark:text-amber-300 hover:text-emerald-700 lg:ml-12 lg:inline-flex"
                            : "flex py-2 text-base font-medium text-black hover:text-emerald-700 dark:text-white dark:hover:text-amber-300 lg:ml-12 lg:inline-flex"
                        }
                      >
                        {page.pageTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <ToggleSwitch />
              <Link
                href="/auth/login"
                className="px-6 py-2.5 text-base font-medium text-white bg-slate-800 border border-white rounded-md mr-4 dark:hover:bg-emerald-500"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-md bg-white px-6 py-2.5 text-base font-medium dark:bg-slate-200 dark:hover:bg-emerald-400 dark:text-black"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedOutNavbar;
