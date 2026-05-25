"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { isNavActive, navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div className="pointer-events-auto flex w-full max-w-3xl flex-col items-center gap-3">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-full border px-3 py-2 sm:px-4 sm:py-2.5",
            "border-border bg-[var(--nav-bg)] text-foreground shadow-[0_8px_32px_-12px_var(--accent-glow)] backdrop-blur-xl",
            "transition-[border-color,box-shadow,background] duration-500",
            scrolled &&
              "border-[var(--border-hover)] shadow-[0_12px_40px_-14px_var(--accent-glow)]"
          )}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="shrink-0 rounded-full px-2 py-1 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:px-3"
          >
            {siteConfig.name.split(" ")[0]}
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const active = isNavActive(pathname, link.href);
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 lg:px-3.5 lg:text-sm",
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground-soft"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-accent/25 bg-[var(--accent-muted)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-soft transition-colors hover:border-[var(--border-hover)] hover:text-foreground md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </motion.nav>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-[var(--void)]/60 backdrop-blur-sm md:hidden"
                aria-label="Close menu overlay"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                id="mobile-nav-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className={cn(
                  "relative z-50 w-full overflow-hidden rounded-2xl border border-border md:hidden",
                  "bg-[var(--nav-bg)] shadow-[0_16px_48px_-20px_var(--accent-glow)] backdrop-blur-xl"
                )}
              >
                <ul className="flex flex-col gap-1 p-2">
                  {navLinks.map((link, index) => {
                    const active = isNavActive(pathname, link.href);
                    return (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                            active
                              ? "bg-[var(--accent-muted)] text-foreground"
                              : "text-muted hover:bg-foreground/[0.04] hover:text-foreground-soft"
                          )}
                        >
                          {link.label}
                          {active && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-accent"
                              aria-hidden
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
