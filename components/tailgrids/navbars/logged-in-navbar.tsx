"use client";

import React, { useState, useEffect } from "react";
import Avatar from "../avatar/avatar";
import ToggleSwitch from "../toggle-switch/toggle-switch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

interface PrivatePagesProps {
  id: number;
  pageTitle: string;
  pageUrl: string;
}

const privatePages: PrivatePagesProps[] = [
  { id: 1, pageTitle: "Dashboard", pageUrl: "/dashboard" },
  { id: 2, pageTitle: "Employees", pageUrl: "/employees" },
  { id: 3, pageTitle: "Customers", pageUrl: "/customers" },
  { id: 4, pageTitle: "Projects", pageUrl: "/projects" },
  { id: 5, pageTitle: "Products", pageUrl: "/products" },
  { id: 6, pageTitle: "Orders", pageUrl: "/orders" },
  { id: 7, pageTitle: "Invoices", pageUrl: "/invoices" },
  { id: 8, pageTitle: "Reports", pageUrl: "/reports" },
];

const LoggedInNavbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    resolvedTheme === "dark"
      ? "/bb-logo.png"
      : resolvedTheme === "light"
      ? "/bb-logo.png"
      : resolvedTheme === "system"
      ? "/bb-logo.png"
      : "/avatar.jpg";

  return (
    <header className="flex w-full items-center bg-slate-800">
      <div className="container mx-auto">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link href="/#" className="block w-full py-5">
              {!mounted ? (
                <div className="w-[240px] h-[84px] bg-gray-300 dark:bg-slate-700 animate-pulse" />
              ) : (
                <Image
                  width={240}
                  height={84}
                  src={logoSrc}
                  alt="logo"
                  className="w-full"
                />
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
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
              <nav
                className={`absolute right-4 top-full z-50 w-full max-w-[250px] rounded-lg bg-dark-2 px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  {privatePages.map((page) => (
                    <li key={page.id}>
                      <Link
                        className={
                          path === page.pageUrl
                            ? "flex py-2 text-base font-medium text-emerald-400 hover:text-white lg:ml-12 lg:inline-flex"
                            : "flex py-2 text-base font-medium text-white/70 hover:text-emerald-400 lg:ml-12 lg:inline-flex"
                        }
                        href={page.pageUrl}
                      >
                        {page.pageTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <span className="mr-4">
                <ToggleSwitch />
              </span>
              <Avatar
                username={user?.fullName || "John Doe"}
                userImage={user?.image || "/avatar.jpg"}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedInNavbar;
