import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const rtl = locale === "fa";
  const alignment = locale === "en" ? "text-left" : "text-right";
  return (
    <div
      className={`mt-bt-sect-lg md:mt-bt-sect-md sm:mt-bt-sect-sm ${alignment}`}
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      {children}
    </div>
  );
}
