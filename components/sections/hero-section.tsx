"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownToLine, MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/social";
import { container, easeOut, item } from "@/lib/motion";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[clamp(420px,80dvh,920px)] w-full items-center justify-center"
      aria-hidden
    >
      <div className="h-12 w-12 animate-pulse rounded-full border border-border border-t-accent/70" />
    </div>
  ),
});

function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,var(--accent-glow),transparent_58%)]" />
      <motion.div
        className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[var(--shadow)]/12 blur-[100px]"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[var(--cosmic)]/10 blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroContent() {
  return (
    <motion.div
      className="flex flex-col justify-center py-6 lg:py-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="mb-6 space-y-4">
        <p className="text-sm font-medium tracking-wide text-muted">
          Hi, I&apos;m
        </p>
        <h1 className="max-w-[14ch] bg-gradient-to-br from-foreground via-foreground-soft to-star bg-clip-text text-[clamp(2.75rem,11vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.04em] text-transparent">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-muted md:text-xl">
          {siteConfig.roles.join(" · ")}
        </p>
      </motion.div>

      <motion.p
        variants={item}
        className="mb-5 max-w-lg text-lg leading-relaxed text-foreground-soft md:text-xl"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.p
        variants={item}
        className="mb-10 max-w-lg text-base leading-relaxed text-muted"
      >
        {siteConfig.intro}
      </motion.p>

      <motion.div
        variants={item}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <Button asChild size="lg" className="group">
          <Link href={siteConfig.resumeUrl} download>
            <ArrowDownToLine
              className="transition-transform group-hover:translate-y-0.5"
              aria-hidden
            />
            Download Resume
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </Link>
        </Button>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-10 flex items-center gap-1.5 text-sm text-muted-deep"
      >
        <MapPin className="size-3.5 shrink-0" aria-hidden />
        {siteConfig.location}
      </motion.p>
    </motion.div>
  );
}

function HeroLanyard() {
  return (
    <motion.div
      className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden pt-2 lg:pt-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.25, ease: easeOut }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[var(--accent-glow)] blur-[120px]"
        aria-hidden
      />
      <div className="relative h-full min-h-0 w-full overflow-hidden">
        <Lanyard
          fullScreen={false}
          position={[0, 0, 63]}
          fov={21}
          scaleMultiplier={9}
          gravity={[0, -40, 0]}
          transparent
        />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-5.25rem)] items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-0"
      aria-label="Introduction"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-6 xl:gap-10">
        <div className="order-2 min-w-0 lg:order-1">
          <HeroContent />
        </div>
        <div className="order-1 flex h-[clamp(380px,72dvh,820px)] min-h-0 items-center overflow-hidden lg:order-2 lg:h-[min(72dvh,820px)]">
          <HeroLanyard />
        </div>
      </div>
    </section>
  );
}
