import type { ExperienceItem } from "@/types/portfolio";

export const experiences: ExperienceItem[] = [
  {
    id: "dbs-coding-camp",
    featured: true,
    logo: "/assets/logos/dbs.svg",
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
    logo: "/assets/logos/university.svg",
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
    logo: "/assets/logos/freelance.svg",
    role: "Freelance Web Developer",
    organization: "Independent Client Projects",
    period: "Jan 2024 – Present",
    description:
      "Delivered landing pages and lightweight business websites for local clients — from layout design to deployment, with emphasis on mobile-first UX and maintainable codebases.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    id: "ui-collab",
    logo: "/assets/logos/product-team.svg",
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
    logo: "/assets/logos/workshop.svg",
    role: "Technical Volunteer",
    organization: "Campus Tech Workshop Series",
    period: "Mar 2024 – May 2024",
    description:
      "Supported workshop operations and live coding demos for peer learning sessions on web fundamentals, version control, and introductory API concepts.",
    tech: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Webpack"],
  },
];
