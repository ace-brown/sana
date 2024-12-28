"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/context/auth-context";

const links = [
  { href: "/dashboard", label: "پروفایل" },
  { href: "/dashboard/settings", label: "تنظیمات" },
  { href: "/dashboard/ideas", label: "ایده های من" },
  { href: "/dashboard/reports", label: "گزارش های من" },
  { href: "//dashboard/users", label: "کاربران" },
  { href: "//dashboard/analytics", label: "نمودارها" },
];

export default function Main({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  console.log("auth", auth);
  const pathname = usePathname();
  return (
    <div className="shadow border p-8 mt-8 rounded-[0.5rem] min-h-[65vh]">
      <h1 className="text-2xl ">بیشتر بخوانید</h1>
      <Separator className="bg-border h-[1px] w-full mt-6 mb-4" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4 ${
                  pathname === link.href
                    ? "text-blue-500 font-bold"
                    : "text-gray-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
