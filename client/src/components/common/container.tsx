import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";
  return (
    <div
      className={`mt-bt-sect-lg md:mt-bt-sect-md sm:mt-bt-sect-sm ${alignment}`}
    >
      {children}
    </div>
  );
}
