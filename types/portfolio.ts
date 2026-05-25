export type ProjectItem = {
  title: string;
  category: string;
  tech: string[];
  date: string;
  image?: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  orgDetail?: string;
  period: string;
  description: string;
  tech: string[];
  logo?: string;
  featured?: boolean;
  certificate?: string;
  badge?: string;
};

export type AboutJourneyEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

export type ContactFormData = {
  fullName: string;
  email: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
};
