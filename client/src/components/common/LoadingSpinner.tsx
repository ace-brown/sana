import React from "react";

import { cn } from "@/lib/utils";

// Brand spinner: an arc that grows and shrinks while rotating.
// Uses currentColor, so it inherits the text color (e.g. inside buttons).
export function Spinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 50 50"
      role="status"
      aria-label={label}
      className={cn("h-5 w-5 animate-spinner-rotate", className)}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        className="opacity-15"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="animate-spinner-dash"
      />
    </svg>
  );
}

// Page-level loader. Inline by default; `asOverlay` centers it on the
// screen without a backdrop.
const LoadingSpinner = ({ asOverlay = false }: { asOverlay?: boolean }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-primary",
        asOverlay ? "pointer-events-none fixed inset-0 z-[60]" : "py-16"
      )}
    >
      <Spinner className="h-10 w-10" />
    </div>
  );
};

export default LoadingSpinner;
