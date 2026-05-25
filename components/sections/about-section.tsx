"use client";

import { motion } from "framer-motion";

import { aboutJourney } from "@/data/about";
import { container, item, sectionViewport } from "@/lib/motion";
import { sectionClassName } from "@/lib/styles";

export function AboutSection() {
  return (
    <section
      id="about"
      className={sectionClassName}
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,var(--cosmic-glow),transparent)]"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="flex flex-col justify-center"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent/90"
          >
            About Me
          </motion.p>

          <motion.h2
            id="about-heading"
            variants={item}
            className="mb-8 max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
          >
            Turning ideas into thoughtful, working software.
          </motion.h2>

          <motion.p
            variants={item}
            className="mb-6 max-w-xl text-base leading-relaxed text-muted md:text-[1.05rem]"
          >
            I&apos;m <span className="text-foreground-soft">Abid</span> — a
            final-year Informatics Engineering student who cares as much about
            how software feels to use as how cleanly it&apos;s built. My work
            sits at the intersection of fullstack web and mobile development,
            where product thinking meets reliable engineering.
          </motion.p>

          <motion.p
            variants={item}
            className="mb-6 max-w-xl text-base leading-relaxed text-muted-deep"
          >
            What pulled me into this field was the freedom to shape an idea from
            sketch to shipped product — designing interfaces, wiring backends,
            and adding features that feel interesting yet genuinely useful. I
            gravitate toward portfolio platforms, information systems,
            e-commerce builds, and applications enhanced with AI — especially
            when intelligent detection gives software a sharper sense of
            context.
          </motion.p>

          <motion.p
            variants={item}
            className="mb-8 max-w-xl text-base leading-relaxed text-muted-deep"
          >
            I still enjoy the structured logic of engineering problems. Modern
            AI tools have accelerated how I explore solutions, but the craft —
            clear architecture, maintainable code, and intentional UX — remains
            firmly human.
          </motion.p>

          <motion.div
            variants={item}
            className="max-w-xl rounded-2xl border border-border bg-[var(--card)] p-5 sm:p-6"
          >
            <p className="mb-2 text-sm font-medium text-foreground-soft">
              Career perspective
            </p>
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Software development is my strongest ground today, and I&apos;m
              committed to growing deeper in fullstack and mobile work. At the
              same time, I&apos;m genuinely open to evolving into data science,
              AI engineering, or network infrastructure — not out of
              uncertainty, but because the industry&apos;s pace rewards curious
              builders who keep learning.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="relative lg:pt-4"
        >
          <motion.p
            variants={item}
            className="mb-10 text-sm font-medium uppercase tracking-[0.18em] text-muted"
          >
            Journey
          </motion.p>

          <div className="relative space-y-0">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-border to-transparent"
              aria-hidden
            />

            {aboutJourney.map((entry, index) => (
              <motion.article
                key={entry.title}
                variants={item}
                className="group relative pl-8 pb-10 last:pb-0"
              >
                <span
                  className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/35 bg-[var(--void)] transition-colors group-hover:border-cosmic/50 group-hover:bg-[var(--cosmic-glow)]"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                </span>

                <time className="mb-2 block text-xs font-medium tracking-wide text-cosmic/80">
                  {entry.period}
                </time>
                <h3 className="mb-1 text-lg font-medium text-foreground-soft transition-colors group-hover:text-foreground">
                  {entry.title}
                </h3>
                <p className="mb-2 text-sm text-muted">{entry.org}</p>
                <p className="max-w-md text-sm leading-relaxed text-muted-deep">
                  {entry.detail}
                </p>

                {index < aboutJourney.length - 1 && (
                  <div
                    className="mt-8 border-b border-border lg:hidden"
                    aria-hidden
                  />
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
