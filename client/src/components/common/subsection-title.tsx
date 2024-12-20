import React, { ReactNode } from "react";
import { useLocale } from "next-intl";

interface SubSectionTitleProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right";
}

export default function SubSectionTitle({
  children,
  textAlign = "right",
}: SubSectionTitleProps) {
  const locale = useLocale();
  const rtl = locale === "fa";
  return (
    <h2
      className="text-3xl sm:text-2xl font-bold text-gray-800 mb-12"
      style={{
        direction: rtl ? "rtl" : "ltr",
        textAlign: textAlign,
      }}
    >
      {children}
    </h2>
  );
}
