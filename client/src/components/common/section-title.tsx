import React, { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  eyebrow?: string;
  description?: string;
}

export default function SectionTitle({
  children,
  eyebrow,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {children}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
