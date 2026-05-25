"use client";

import { motion } from "framer-motion";

import { ExperienceLogo } from "@/components/portfolio/experience-logo";
import { TechTags } from "@/components/portfolio/tech-tags";
import { experiences } from "@/data/experience";
import { container, item, sectionViewport } from "@/lib/motion";
import { sectionClassName } from "@/lib/styles";
import type { ExperienceItem } from "@/types/portfolio";

function ExperienceCard({ entry }: { entry: ExperienceItem }) {
  const isFeatured = entry.featured;

  return (
    <motion.article
      variants={item}
      className={`group relative overflow-hidden rounded-2xl border bg-[var(--card)] transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_20px_48px_-24px_var(--accent-glow)] ${
        isFeatured
          ? "border-[var(--border-hover)] p-6 sm:p-8 lg:p-9"
          : "border-border p-5 sm:p-6"
      }`}
    >
      {isFeatured && (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,var(--accent-glow),transparent_55%)]"
          aria-hidden
        />
      )}

      <div className="mb-4 flex flex-wrap items-start gap-4">
        <ExperienceLogo entry={entry} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <h3
                className={`font-semibold tracking-tight text-foreground ${
                  isFeatured ? "text-xl sm:text-2xl" : "text-lg"
                }`}
              >
                {entry.role}
              </h3>
              <p className="text-sm text-foreground-soft">
                {entry.organization}
              </p>
              {entry.orgDetail && (
                <p className="text-xs text-cosmic/80">{entry.orgDetail}</p>
              )}
            </div>
            <time
              className={`shrink-0 font-medium text-muted-deep ${
                isFeatured ? "text-sm" : "text-xs"
              }`}
            >
              {entry.period}
            </time>
          </div>
        </div>
      </div>

      <p
        className={`mb-5 leading-relaxed text-muted ${
          isFeatured ? "max-w-2xl text-base" : "text-sm"
        }`}
      >
        {entry.description}
      </p>

      <TechTags items={entry.tech} />

      {isFeatured && (entry.certificate || entry.badge) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {entry.certificate && (
            <div className="overflow-hidden rounded-xl border border-border bg-[var(--elevated)]">
              <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-[var(--shadow)]/20 via-[var(--surface)] to-[var(--cosmic)]/15 p-4 text-center">
                <p className="text-xs font-medium text-muted">Certificate</p>
                <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted-deep">
                  {entry.certificate}
                </p>
              </div>
            </div>
          )}
          {entry.badge && (
            <div className="overflow-hidden rounded-xl border border-border bg-[var(--elevated)]">
              <div className="relative mx-auto flex aspect-square max-w-[200px] flex-col items-center justify-center bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface)] to-transparent p-4 text-center">
                <p className="text-xs font-medium text-muted">Badge</p>
                <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted-deep">
                  {entry.badge}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function ExperienceSection() {
  const featured = experiences.find((e) => e.featured);
  const supporting = experiences.filter((e) => !e.featured);

  return (
    <section
      id="experience"
      className={sectionClassName}
      aria-labelledby="experience-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_15%_60%,var(--cosmic-glow),transparent_50%)]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent/90"
          >
            Experience
          </motion.p>
          <motion.h2
            id="experience-heading"
            variants={item}
            className="mb-6 max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
          >
            Learning in public, building with intent
          </motion.h2>
          <motion.p
            variants={item}
            className="mb-6 max-w-md text-base leading-relaxed text-muted"
          >
            A growing path through structured programs, collaborative builds,
            and hands-on development — focused on becoming a stronger fullstack
            engineer with real product discipline.
          </motion.p>
          <motion.p
            variants={item}
            className="max-w-md text-sm leading-relaxed text-muted-deep"
          >
            From intensive industry programs to freelance and campus initiatives,
            each experience adds depth to how I design, ship, and maintain
            modern software.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="relative space-y-6"
        >
          <motion.div
            className="absolute left-[7px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent/40 via-border to-transparent lg:block"
            aria-hidden
          />

          {featured && (
            <div className="relative lg:pl-8">
              <span
                className="absolute left-0 top-8 hidden h-3 w-3 rounded-full border border-accent/50 bg-accent/30 lg:block"
                aria-hidden
              />
              <ExperienceCard entry={featured} />
            </div>
          )}

          {supporting.map((entry) => (
            <div key={entry.id} className="relative lg:pl-8">
              <span
                className="absolute left-0 top-8 hidden h-2.5 w-2.5 rounded-full border border-border bg-[var(--void)] transition-colors group-hover:border-cosmic/50 lg:block"
                aria-hidden
              />
              <ExperienceCard entry={entry} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
