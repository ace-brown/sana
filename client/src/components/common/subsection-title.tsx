import React, { ReactNode } from "react";
import { useLocale } from "next-intl";

export default function SubSectionTitle({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const rtl = locale === "fa";
  return (
    <h2
      className="text-3xl sm:text-2xl font-bold text-gray-800 mb-12"
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      {children}
    </h2>
  );
}
