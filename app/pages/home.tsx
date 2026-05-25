"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/social";

const Lanyard = dynamic(() => import("@/app/components/Lanyard"), {
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const aboutViewport = { once: true, margin: "-80px" as const };

type ProjectItem = {
  title: string;
  category: string;
  tech: string[];
  date: string;
  image?: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: ProjectItem[] = [
  {
    title: "Personal Portfolio Platform",
    category: "Fullstack Web · Portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    date: "2025",
    gradient: "from-[var(--shadow)]/30 via-[var(--elevated)] to-[var(--cosmic)]/20",
    liveUrl: "#",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "Campus Information System",
    category: "Information System · Web App",
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    date: "2024",
    gradient: "from-[var(--indigo-aura)]/25 via-[var(--surface)] to-[var(--abyss)]",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "E-Commerce Storefront",
    category: "Fullstack Web · E-Commerce",
    tech: ["Next.js", "Prisma", "Stripe", "Tailwind CSS"],
    date: "2024",
    gradient: "from-[var(--cosmic)]/20 via-[var(--elevated)] to-[var(--shadow)]/25",
    liveUrl: "#",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "AI Object Detection Dashboard",
    category: "AI Integration · Detection System",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    date: "2025",
    gradient: "from-[var(--shadow-soft)]/20 via-[var(--surface)] to-[var(--cosmic-soft)]/15",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "Mobile Task Manager",
    category: "Mobile Application",
    tech: ["React Native", "TypeScript", "Firebase"],
    date: "2024",
    gradient: "from-[var(--accent)]/15 via-[var(--elevated)] to-[var(--void)]",
    liveUrl: "#",
  },
  {
    title: "DBS Coding Camp Capstone",
    category: "Fullstack · Learning Project",
    tech: ["JavaScript", "Express", "MongoDB", "React"],
    date: "2025",
    gradient: "from-[var(--cosmic-glow)] via-[var(--surface)] to-[var(--accent-muted)]",
    githubUrl: "https://github.com/abid_abdi",
  },
];

const marqueeProjects = [...projects, ...projects];

type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  orgDetail?: string;
  period: string;
  description: string;
  tech: string[];
  featured?: boolean;
  certificate?: string;
  badge?: string;
};

const experiences: ExperienceItem[] = [
  {
    id: "dbs-coding-camp",
    featured: true,
    role: "Front-End & Back-End Developer Learning Path",
    organization: "Coding Camp · DBS Foundation",
    orgDetail: "DBS Foundation × Dicoding",
    period: "Feb 2025 – Jul 2025",
    description:
      "Intensive accelerator program bridging industry-ready fullstack skills with professional growth. Structured around accelerating delivery, in-depth engineering practice, and comprehensive learning — spanning modern web development alongside soft skills, communication, and digital literacy for real-world tech careers.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MySQL",
      "REST API",
      "Git",
      "Tailwind CSS",
    ],
    certificate: "/assets/certificates/dbs-certificate.png",
    badge: "/assets/badges/dicoding-badge.png",
  },
  {
    id: "univ-it-division",
    role: "Web Developer · IT Division",
    organization: "Informatics Student Association",
    orgDetail: "Dipa University of Makassar",
    period: "Aug 2024 – Present",
    description:
      "Maintained and improved association web platforms, supporting event registration flows and internal content updates with responsive UI and reliable deployment practices.",
    tech: ["React", "Tailwind CSS", "Firebase", "Git"],
  },
  {
    id: "freelance-web",
    role: "Freelance Web Developer",
    organization: "Independent Client Projects",
    period: "Jan 2024 – Present",
    description:
      "Delivered landing pages and lightweight business websites for local clients — from layout design to deployment, with emphasis on mobile-first UX and maintainable codebases.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    id: "ui-collab",
    role: "Frontend Developer · UI Collaboration",
    organization: "University Product Team",
    orgDetail: "Capstone UI Module",
    period: "Sep 2024 – Dec 2024",
    description:
      "Collaborated with a small product team to translate Figma designs into interactive React interfaces, focusing on component consistency and accessible form patterns.",
    tech: ["React", "Figma", "CSS Modules", "Git"],
  },
  {
    id: "volunteer-tech",
    role: "Technical Volunteer",
    organization: "Campus Tech Workshop Series",
    period: "Mar 2024 – May 2024",
    description:
      "Supported workshop operations and live coding demos for peer learning sessions on web fundamentals, version control, and introductory API concepts.",
    tech: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Webpack"],
  },
];

const aboutJourney = [
  {
    period: "Sep 2022 – Apr 2026",
    title: "Informatics Engineering",
    org: "Dipa University of Makassar",
    detail: "GPA 3.80 · Building a strong foundation in software engineering and systems thinking.",
  },
  {
    period: "Feb – Jul 2025",
    title: "Coding Camp · DBS Foundation",
    org: "Front-End & Back-End Learning Path",
    detail: "Intensive fullstack training — from fundamentals to shipping real application features.",
  },
  {
    period: "Focus",
    title: "What I love building",
    org: "Products with purpose",
    detail:
      "Portfolio apps, information systems, e-commerce, and AI-integrated tools — especially systems that gain intelligent “eyes” through ML.",
  },
  {
    period: "Direction",
    title: "Where I”™m headed",
    org: "Software development first",
    detail:
      "Deepening fullstack and mobile craft while staying curious about data, AI, and infrastructure as the industry evolves.",
  },
];

const CONTACT_EMAIL = "AbidAbdillah3.14@gmail.com";

/** Set when wiring Resend, Formspree, or /api/contact */
const CONTACT_API_ENDPOINT: string | undefined = undefined;

type ContactFormData = {
  fullName: string;
  email: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
};

const initialContactForm: ContactFormData = {
  fullName: "",
  email: "",
  company: "",
  inquiryType: "general",
  subject: "",
  message: "",
};

const inquiryOptions = [
  { value: "recruitment", label: "Recruitment / hiring" },
  { value: "collaboration", label: "Project collaboration" },
  { value: "freelance", label: "Freelance work" },
  { value: "general", label: "General inquiry" },
] as const;

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    id: "recruiter-1",
    name: "Rina Wijaya",
    role: "Technical Recruiter",
    company: "Makassar Digital Talent",
    quote:
      "Clear communication and a thoughtful approach to problem-solving. His portfolio and camp background showed strong fundamentals—we moved forward with an interview.",
    initials: "RW",
  },
  {
    id: "client-1",
    name: "Andi Pratama",
    role: "Small Business Owner",
    company: "Local Retail Client",
    quote:
      "Delivered a clean landing page on time and handled revision rounds without friction. Professional, responsive, and easy to work with.",
    initials: "AP",
  },
  {
    id: "collab-1",
    name: "Siti Nurhaliza",
    role: "UI Designer",
    company: "University Product Team",
    quote:
      "Translated designs into React components with good attention to spacing and states. A reliable teammate during our capstone sprint.",
    initials: "SN",
  },
  {
    id: "team-1",
    name: "Fajar Hidayat",
    role: "Peer Developer",
    company: "Campus IT Division",
    quote:
      "Consistent with Git workflow and code reviews. Helped stabilize our event registration flow before a major campus launch.",
    initials: "FH",
  },
];

const inputClassName =
  "w-full rounded-lg border border-border bg-[var(--elevated)] px-4 py-3 text-sm text-foreground placeholder:text-muted-deep transition-[border-color,box-shadow] duration-300 focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60";

function buildMailtoPayload(data: ContactFormData) {
  const inquiryLabel =
    inquiryOptions.find((o) => o.value === data.inquiryType)?.label ??
    data.inquiryType;
  const subject = data.subject.trim() || `Portfolio inquiry — ${inquiryLabel}`;
  const body = [
    `Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    data.company.trim() ? `Organization: ${data.company.trim()}` : null,
    `Inquiry type: ${inquiryLabel}`,
    "",
    data.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(body),
  };
}

async function deliverContactMessage(data: ContactFormData): Promise<void> {
  if (CONTACT_API_ENDPOINT) {
    const res = await fetch(CONTACT_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        to: CONTACT_EMAIL,
        replyTo: data.email.trim(),
      }),
    });
    if (!res.ok) {
      throw new Error("Unable to send message. Please try again.");
    }
    return;
  }

  const { subject, body } = buildMailtoPayload(data);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${count} out of 5`}
      role="img"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-accent/70"
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ entry }: { entry: Testimonial }) {
  return (
    <motion.blockquote
      variants={item}
      initial={false}
      className="group rounded-2xl border border-border bg-[var(--card)] p-5 transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-24px_var(--accent-glow)] sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--elevated)] text-xs font-semibold tracking-wide text-accent/90"
            aria-hidden
          >
            {entry.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{entry.name}</p>
            <p className="text-xs text-muted">
              {entry.role} · {entry.company}
            </p>
          </div>
        </div>
        <StarRating />
      </div>
      <p className="text-sm leading-relaxed text-muted">&ldquo;{entry.quote}&rdquo;</p>
    </motion.blockquote>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialContactForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const isValid =
    form.fullName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.message.trim().length >= 10;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      await new Promise((r) => setTimeout(r, 600));
      await deliverContactMessage(form);
      setStatus("success");
      setForm(initialContactForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <motion.div
      variants={item}
      initial={false}
      className="relative overflow-hidden rounded-2xl border border-border bg-[var(--card)] p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,var(--accent-glow),transparent_55%)]"
        aria-hidden
      />

      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-[var(--elevated)] text-accent/90">
          <Mail className="size-4" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Send a message
          </h3>
          <p className="mt-1 text-sm text-muted">
            Submissions open your email client addressed to me—like writing
            directly, without a middle layer.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-[var(--accent-muted)] text-accent">
            <CheckCircle2 className="size-7" aria-hidden />
          </div>
          <p className="text-lg font-semibold text-foreground">Ready to send</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Your email app should open with the message pre-filled. If it
            didn&apos;t, you can reach me at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent/90 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-medium tracking-wide text-muted"
                >
                  Full name <span className="text-accent/80">*</span>
                </label>
                <input
                  id="contact-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Your name"
                  className={inputClassName}
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-medium tracking-wide text-muted"
                >
                  Email <span className="text-accent/80">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@company.com"
                  className={inputClassName}
                  disabled={status === "loading"}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-company"
                  className="text-xs font-medium tracking-wide text-muted"
                >
                  Company / organization
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Optional"
                  className={inputClassName}
                  disabled={status === "loading"}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-inquiry"
                  className="text-xs font-medium tracking-wide text-muted"
                >
                  Inquiry type
                </label>
                <select
                  id="contact-inquiry"
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={(e) => updateField("inquiryType", e.target.value)}
                  className={`${inputClassName} cursor-pointer appearance-none bg-[var(--elevated)]`}
                  disabled={status === "loading"}
                >
                  {inquiryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-subject"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                placeholder="What would you like to discuss?"
                className={inputClassName}
                disabled={status === "loading"}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Message <span className="text-accent/80">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Share context about the role, project, or collaboration..."
                className={`${inputClassName} resize-y min-h-[120px]`}
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && errorMessage && (
              <p className="text-sm text-red-400/90" role="alert">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={!isValid || status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Send message
                </>
              )}
            </Button>
        </form>
      )}
    </motion.div>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,var(--accent-glow),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial={false}
          whileInView="show"
          viewport={aboutViewport}
          className="mb-12 max-w-2xl lg:mb-14"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent/90"
          >
            Contact
          </motion.p>
          <motion.h2
            id="contact-heading"
            variants={item}
            className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Let&apos;s build something meaningful
          </motion.h2>
          <motion.p variants={item} className="text-base leading-relaxed text-muted md:text-lg">
            Open to internships, collaborations, and thoughtful conversations
            with recruiters, teams, and clients. Reach out—I typically respond
            within a few business days.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            variants={container}
            initial={false}
            whileInView="show"
            viewport={aboutViewport}
          >
            <ContactForm />
            <motion.p
              variants={item}
              className="mt-4 text-center text-xs text-muted-deep sm:text-left"
            >
              Prefer email directly?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent/90 underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial={false}
            whileInView="show"
            viewport={aboutViewport}
            className="flex flex-col"
          >
            <motion.div variants={item} className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                What others say
              </h3>
              <p className="mt-1 text-sm text-muted">
                Impressions from collaboration, client work, and peer feedback.
              </p>
            </motion.div>
            <div className="flex flex-col gap-4">
              {testimonials.map((entry) => (
                <TestimonialCard key={entry.id} entry={entry} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
      className="relative flex h-[clamp(420px,80dvh,920px)] w-full items-center justify-center pt-2 lg:h-[min(80dvh,920px)] lg:pt-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[var(--accent-glow)] blur-[120px]"
        aria-hidden
      />
      <div className="relative h-full w-full min-h-[inherit] overflow-visible">
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

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-x-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-0"
      aria-label="Introduction"
    >
      <HeroBackground />

      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-6 xl:gap-10">
        <div className="order-2 lg:order-1">
          <HeroContent />
        </div>
        <div className="order-1 flex min-h-[clamp(420px,80dvh,920px)] items-center lg:order-2">
          <HeroLanyard />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
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
          viewport={aboutViewport}
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
            I&apos;m <span className="text-foreground-soft">Abid</span> — a final-year
            Informatics Engineering student who cares as much about how software
            feels to use as how cleanly it&apos;s built. My work sits at the
            intersection of fullstack web and mobile development, where product
            thinking meets reliable engineering.
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
            I still enjoy the structured logic of engineering problems. Modern AI
            tools have accelerated how I explore solutions, but the craft —
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
              AI engineering, or network infrastructure — not out of uncertainty,
              but because the industry&apos;s pace rewards curious builders who
              keep learning.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={aboutViewport}
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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article
      className="group relative w-[min(88vw,300px)] shrink-0 overflow-hidden rounded-2xl border border-border bg-[var(--card)] transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_24px_48px_-24px_var(--accent-glow)] sm:w-[340px] lg:w-[360px]"
    >
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[var(--void)]/80 text-foreground-soft backdrop-blur-sm transition-colors hover:border-[var(--border-hover)] hover:text-foreground"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[var(--void)]/80 text-foreground-soft backdrop-blur-sm transition-colors hover:border-[var(--border-hover)] hover:text-foreground"
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
            <li
              key={tech}
              className="rounded-md border border-border bg-[var(--elevated)] px-2.5 py-1 font-mono text-[0.68rem] leading-none tracking-wide text-muted transition-colors duration-300 group-hover:border-[var(--border-hover)] group-hover:text-foreground-soft"
            >
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

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
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
          viewport={aboutViewport}
          className="mb-12 max-w-2xl lg:mb-14"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent/90"
          >
            Projects
          </motion.p>
          <motion.h2
            id="projects-heading"
            variants={item}
            className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Work that reflects how I build
          </motion.h2>
          <motion.p variants={item} className="text-base leading-relaxed text-muted md:text-lg">
            Selected projects showcasing my experience in building modern digital
            products — from fullstack web platforms to AI-enhanced applications
            with clean architecture and thoughtful interfaces.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={aboutViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCarousel />
        </motion.div>
      </div>
    </section>
  );
}

function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-border bg-[var(--elevated)] px-2.5 py-1 font-mono text-[0.68rem] leading-none tracking-wide text-muted transition-colors duration-300 group-hover:border-[var(--border-hover)] group-hover:text-foreground-soft"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

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

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          {isFeatured && (
            <span className="inline-flex rounded-full border border-accent/30 bg-[var(--accent-muted)] px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-accent/90">
              Primary highlight
            </span>
          )}
          <h3
            className={`font-semibold tracking-tight text-foreground ${
              isFeatured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {entry.role}
          </h3>
          <p className="text-sm text-foreground-soft">{entry.organization}</p>
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

function ExperienceSection() {
  const featured = experiences.find((e) => e.featured);
  const supporting = experiences.filter((e) => !e.featured);

  return (
    <section
      id="experience"
      className="relative border-t border-border px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
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
          viewport={aboutViewport}
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
          viewport={aboutViewport}
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

export default function HomePage() {
  return (
    <main className="relative flex-1">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
