export const navLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "/about", label: "About Me", id: "about" },
  { href: "/projects", label: "Projects", id: "projects" },
  { href: "/experience", label: "Experience", id: "experience" },
  { href: "/contact", label: "Contact", id: "contact" },
] as const;

export type NavLink = (typeof navLinks)[number];

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
