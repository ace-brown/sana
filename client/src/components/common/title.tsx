import React, { ReactNode } from "react";
import { useLocale } from "next-intl";

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  const locale = useLocale();

  const alignment = locale === "en" ? "text-left" : "text-right";

  return (
    <h1
      className={`text-4xl font-bold ${alignment} ${
        className ?? "text-gray-800"
      }`}
    >
      {children}
    </h1>
  );
}
