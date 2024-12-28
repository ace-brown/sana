import React, { ReactNode } from "react";

export default function ReadContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-bt-sect-lg md:mt-bt-sect-md sm:mt-bt-sect-sm text-right mx-auto w-[60%] md:w-[70%] sm:w-full"
      // style={{ direction: "rtl" }}
    >
      {children}
    </div>
  );
}
