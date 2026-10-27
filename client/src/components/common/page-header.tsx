import React from "react";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
}

export default function PageHeader({
  title,
  eyebrow,
  description,
}: PageHeaderProps) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
