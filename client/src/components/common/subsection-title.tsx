import React, { ReactNode } from "react";

export default function SubSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-2xl font-bold text-center text-gray-800 mb-12">
      {children}
    </h2>
  );
}
