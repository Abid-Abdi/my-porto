"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 rounded-full border border-border"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border",
        "bg-[var(--elevated)] text-foreground-soft transition-all duration-300",
        "hover:border-[var(--border-hover)] hover:text-foreground hover:shadow-[0_0_20px_-6px_var(--accent-glow)]"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: easeOut }}
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </motion.span>
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="max-w-md">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent/90">
              {siteConfig.name}
            </p>
            <p className="text-base leading-relaxed text-muted">
              Thanks for visiting — I&apos;m open to meaningful collaborations,
              internships, and conversations about building thoughtful software.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-300 hover:text-foreground-soft"
              >
                {link.label === "About Me" ? "About" : link.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        <div className="mb-8 border-t border-border pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3" suppressHydrationWarning>
              <ThemeToggle />
              <span className="text-xs text-muted-deep">Theme</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3.5",
                    "bg-[var(--elevated)] text-xs font-medium text-muted transition-all duration-300",
                    "hover:border-[var(--border-hover)] hover:text-foreground-soft"
                  )}
                >
                  {social.label === "GitHub" && <GitHubIcon className="size-3.5" />}
                  {social.label === "LinkedIn" && (
                    <LinkedInIcon className="size-3.5" />
                  )}
                  {social.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-lg border border-border px-4",
                "text-xs font-medium text-muted transition-all duration-300",
                "hover:border-[var(--border-hover)] hover:text-foreground-soft"
              )}
            >
              <ArrowUp className="size-3.5" aria-hidden />
              Back to top
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-deep sm:text-left">
          © {year} {siteConfig.name}. Crafted with intent — fullstack development
          &amp; modern digital experiences.
        </p>
      </div>
    </footer>
  );
}
