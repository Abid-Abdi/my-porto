"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons/social";
import { marqueeProjects } from "@/data/projects";
import { easeOut, container, item, sectionViewport } from "@/lib/motion";
import {
  iconActionClassName,
  sectionEyebrowClassName,
  sectionOverflowClassName,
  sectionTitleClassName,
  techTagClassName,
} from "@/lib/styles";
import type { ProjectItem } from "@/types/portfolio";

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group relative w-[min(88vw,300px)] shrink-0 overflow-hidden rounded-2xl border border-border bg-[var(--card)] transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_24px_48px_-24px_var(--accent-glow)] sm:w-[340px] lg:w-[360px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--void)]/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
          aria-hidden
        />

        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={iconActionClassName}
              aria-label={`View ${project.title} live`}
            >
              <ArrowUpRight className="size-4" />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={iconActionClassName}
              aria-label={`View ${project.title} on GitHub`}
            >
              <GitHubIcon className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-medium tracking-wide text-cosmic/80">
              {project.category}
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground-soft">
              {project.title}
            </h3>
          </div>
          <span className="shrink-0 text-xs font-medium text-muted-deep">
            {project.date}
          </span>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <li key={tech} className={techTagClassName}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const loopWidthRef = useRef(0);

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    loopWidthRef.current = track.scrollWidth / 2;
  }, []);

  useEffect(() => {
    measureLoop();
    window.addEventListener("resize", measureLoop);
    return () => window.removeEventListener("resize", measureLoop);
  }, [measureLoop]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let frameId = 0;
    const speed = 0.45;

    const tick = () => {
      if (!pausedRef.current && loopWidthRef.current > 0) {
        offsetRef.current += speed;
        if (offsetRef.current >= loopWidthRef.current) {
          offsetRef.current = 0;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [measureLoop]);

  return (
    <div
      className="project-carousel-mask relative -mx-4 sm:-mx-6 lg:-mx-8"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          ref={trackRef}
          className="flex w-max gap-5 will-change-transform sm:gap-6"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {marqueeProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className={sectionOverflowClassName}
      aria-labelledby="projects-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_80%_30%,var(--accent-glow),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          className="mb-12 max-w-2xl lg:mb-14"
        >
          <motion.p variants={item} className={sectionEyebrowClassName}>
            Projects
          </motion.p>
          <motion.h2
            id="projects-heading"
            variants={item}
            className={sectionTitleClassName}
          >
            Work that reflects how I build
          </motion.h2>
          <motion.p
            variants={item}
            className="text-base leading-relaxed text-muted md:text-lg"
          >
            Selected projects showcasing my experience in building modern
            digital products — from fullstack web platforms to AI-enhanced
            applications with clean architecture and thoughtful interfaces.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={sectionViewport}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <ProjectCarousel />
        </motion.div>
      </div>
    </section>
  );
}
