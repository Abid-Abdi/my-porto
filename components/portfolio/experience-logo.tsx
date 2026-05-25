"use client";

import { useState } from "react";
import Image from "next/image";

import type { ExperienceItem } from "@/types/portfolio";

type ExperienceLogoProps = {
  entry: ExperienceItem;
};

export function ExperienceLogo({ entry }: ExperienceLogoProps) {
  const [failed, setFailed] = useState(false);
  const initials = entry.organization
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClass = entry.featured ? "h-12 w-12" : "h-11 w-11";

  if (!entry.logo || failed) {
    return (
      <div
        className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-lg border border-border bg-[var(--elevated)] text-xs font-semibold tracking-wide text-accent/90`}
        aria-hidden
      >
        {initials || "—"}
      </div>
    );
  }

  return (
    <div
      className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-lg border border-border bg-[var(--elevated)]`}
    >
      <Image
        src={entry.logo}
        alt={`${entry.organization} logo`}
        fill
        className="object-contain p-1.5"
        sizes="48px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
