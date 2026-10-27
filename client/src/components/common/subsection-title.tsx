import React, { ReactNode } from "react";

interface SubSectionTitleProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right";
}

export default function SubSectionTitle({
  children,
  textAlign = "left",
}: SubSectionTitleProps) {
  return (
    <h2
      className={`text-3xl sm:text-2xl font-bold text-foreground mb-12 ${
        textAlign === "right"
          ? "text-right"
          : textAlign === "center"
          ? "text-center"
          : "text-left"
      }`}
    >
      {children}
    </h2>
  );
}
