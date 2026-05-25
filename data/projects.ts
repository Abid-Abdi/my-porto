import type { ProjectItem } from "@/types/portfolio";

export const projects: ProjectItem[] = [
  {
    title: "Personal Portfolio Platform",
    category: "Fullstack Web · Portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    date: "2025",
    gradient:
      "from-[var(--shadow)]/30 via-[var(--elevated)] to-[var(--cosmic)]/20",
    liveUrl: "#",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "Campus Information System",
    category: "Information System · Web App",
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    date: "2024",
    gradient:
      "from-[var(--indigo-aura)]/25 via-[var(--surface)] to-[var(--abyss)]",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "E-Commerce Storefront",
    category: "Fullstack Web · E-Commerce",
    tech: ["Next.js", "Prisma", "Stripe", "Tailwind CSS"],
    date: "2024",
    gradient:
      "from-[var(--cosmic)]/20 via-[var(--elevated)] to-[var(--shadow)]/25",
    liveUrl: "#",
    githubUrl: "https://github.com/abid_abdi",
  },
  {
    title: "AI Object Detection Dashboard",
    category: "AI Integration · Detection System",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    date: "2025",
    gradient:
      "from-[var(--shadow-soft)]/20 via-[var(--surface)] to-[var(--cosmic-soft)]/15",
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
    gradient:
      "from-[var(--cosmic-glow)] via-[var(--surface)] to-[var(--accent-muted)]",
    githubUrl: "https://github.com/abid_abdi",
  },
];

export const marqueeProjects = [...projects, ...projects];
