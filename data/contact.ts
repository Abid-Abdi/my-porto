import type { ContactFormData, Testimonial } from "@/types/portfolio";

export const CONTACT_EMAIL = "AbidAbdillah3.14@gmail.com";

/** Set when wiring Resend, Formspree, or /api/contact */
export const CONTACT_API_ENDPOINT: string | undefined = undefined;

export const initialContactForm: ContactFormData = {
  fullName: "",
  email: "",
  company: "",
  inquiryType: "general",
  subject: "",
  message: "",
};

export const inquiryOptions = [
  { value: "recruitment", label: "Recruitment / hiring" },
  { value: "collaboration", label: "Project collaboration" },
  { value: "freelance", label: "Freelance work" },
  { value: "general", label: "General inquiry" },
] as const;

export const testimonials: Testimonial[] = [
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
