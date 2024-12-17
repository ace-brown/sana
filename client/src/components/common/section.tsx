import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";

  return (
    <div className={`mt-[9rem] md:mt-[8rem] sm:mt-[5rem] ${alignment}`}>
      {children}
    </div>
  );
}
