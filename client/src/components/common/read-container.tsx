import { useLocale } from "next-intl";
import React, { ReactNode } from "react";

export default function ReadContainer({ children }: { children: ReactNode }) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";
  return (
    <div
      className={`mt-bt-sect-lg md:mt-bt-sect-md sm:mt-bt-sect-sm ${alignment} mx-auto w-[60%] md:w-[70%] sm:w-full`}
    >
      {children}
    </div>
  );
}
