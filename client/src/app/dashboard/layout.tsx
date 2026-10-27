"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Lightbulb,
  Receipt,
  User,
  Users,
} from "lucide-react";

import { AuthContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/dashboard",
    asideLabel: "Profile",
    pageLabel: "Profile",
    icon: User,
  },
  {
    href: "/dashboard/user-ideas",
    asideLabel: "My Ideas",
    pageLabel: "My Ideas",
    icon: Lightbulb,
  },
  {
    href: "/dashboard/reports",
    asideLabel: "My Reports",
    pageLabel: "My Reports",
    icon: FileText,
  },
  {
    href: "/dashboard/costs",
    asideLabel: "My Costs",
    pageLabel: "My Costs",
    icon: Receipt,
  },
  {
    href: "/dashboard/users",
    asideLabel: "Users",
    pageLabel: "Users",
    icon: Users,
  },
];

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  // Find the current label for the heading
  const currentLink = links.find((link) => link.href === pathname);
  const heading = currentLink ? currentLink.pageLabel : "Dashboard";
  return (
    <div className="py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {auth.username && (
          <p className="mt-1 text-muted-foreground">
            Signed in as {auth.fullName || auth.username}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <aside className="md:sticky md:top-24 md:w-56 md:shrink-0">
          <nav className="flex gap-1 overflow-x-auto rounded-2xl border bg-card p-2 md:flex-col">
            {links.map((link) => {
              if (link.href === "/dashboard/users" && auth.role !== "admin") {
                return null; // Hide the link for non-admin users
              }
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {link.asideLabel}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1 rounded-2xl border bg-card p-4 shadow-sm md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
