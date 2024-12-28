"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/context/auth-context";

const links = [
  { href: "/dashboard", label: "پروفایل" },
  { href: "/dashboard/ideas", label: "ایده های من" },
  { href: "/dashboard/reports", label: "گزارش های من" },
  { href: "/dashboard/users", label: "کاربران" },
  { href: "/dashboard/analytics", label: "نمودارها" },
  { href: "/dashboard/settings", label: "تنظیمات" },
];

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  // Find the current label for the heading
  const currentLink = links.find((link) => link.href === pathname);
  const heading = currentLink ? currentLink.label : "";

  return (
    <div className="w-[80%] ml-auto mr-[8rem] shadow border p-8 mt-8 rounded-[0.5rem]">
      <h1 className="text-2xl">{heading}</h1>
      <Separator className="bg-border h-[1px] w-full mt-6 mb-4" />
      <div>
        <aside className="fixed top-[4rem] right-0 w-[200px] h-screen border shadow">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 mt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-6 ${
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
        <div>{children}</div>
      </div>
    </div>
  );
}
