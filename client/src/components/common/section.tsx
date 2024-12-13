import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";

  return (
    <div className={`mt-h-txt-lg md:h-txt-md sm:h-txt-sm ${alignment}`}>
      {children}
    </div>
  );
}
