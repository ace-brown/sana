"use client";

import React, { useContext } from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/context/auth-context";

const links = [
  { href: "/account", label: "Profile" },
  { href: "/account/demo", label: "Account" },
  { href: "/account/appearance", label: "Appearance" },
  { href: "/notifications", label: "Notifications" },
  { href: "/display", label: "Display" },
];

export default function Main({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  console.log("auth", auth);
  return (
    <div className="shadow border p-8 mt-8 rounded-[0.5rem] min-h-[65vh]">
      <h1 className="text-2xl ">بیشتر بخوانید</h1>
      <Separator className="bg-border h-[1px] w-full mt-6 mb-4" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/settings"
            >
              Settings
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/analytics"
            >
              analytics
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account/appearance"
            >
              Appearance
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/notifications"
            >
              Notifications
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/display"
            >
              Display
            </Link>
          </nav>
        </aside>
        <div>
          <div>
            <h3 className="text-lg font-medium">title</h3>
            <p className="text-sm text-muted-foreground">description.</p>
          </div>
          <Separator className="bg-border h-[1px] w-full" />
          {children}
        </div>
      </div>
    </div>
  );
}
