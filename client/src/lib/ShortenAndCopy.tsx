import React, { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

interface ShortenAndCopyProps {
  id: string | undefined;
  length?: number;
}

export default function ShortenAndCopy({
  id,
  length = 6,
}: ShortenAndCopyProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (id) {
        await navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy ID:", error);
    }
  }

  let shortenedId = "";
  if (id) {
    shortenedId =
      id.length <= length * 2
        ? id
        : `${id.slice(0, length)}...${id.slice(-length)}`;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex w-fit items-center gap-2 rounded-md border bg-background px-2 py-1 font-mono text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
        data-tooltip-id="copy-tooltip"
        data-tooltip-content={copied ? "Copied!" : "Click to copy"}
        aria-label={copied ? "Copied" : `Copy ID ${id ?? ""}`}
      >
        <span className="text-primary">{shortenedId}</span>
        {copied ? (
          <FiCheck className="text-primary" />
        ) : (
          <FiCopy className="text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </button>
      <Tooltip id="copy-tooltip" />
    </>
  );
}
