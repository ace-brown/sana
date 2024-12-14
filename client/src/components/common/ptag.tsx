import React, { ReactNode } from "react";

export default function P({ children }: { children: ReactNode }) {
  return (
    <div className="mt-[1.5rem] md:mt-[1.2rem] sm:mt-[1rem]">{children}</div>
  );
}
