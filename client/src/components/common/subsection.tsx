import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function SubSection({ children }: { children: ReactNode }) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";

  return (
    <div className={`mt-[7rem] md:mt-[5rem] sm:mt-[3rem] ${alignment}`}>
      {children}
    </div>
  );
}
