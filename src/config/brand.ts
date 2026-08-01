// Centralised brand configuration. Update here to rebrand the entire site.
export const brand = {
  name: "Nexus AI Systems",
  tagline: "The operating system for modern companies.",
  shortTagline: "The operating system for modern companies.",
  description:
    "Nexus AI Systems is no longer an agency. It is the platform that runs a company's operations through an Executive Director and intelligent business departments — quiet, structural, and built to scale.",
  domain: "nexusaisystems.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexusaisystems.com",
  contactEmail: "hola@nexusaisystems.com",
  securityEmail: "seguridad@nexusaisystems.com",
  legalName: "Nexus AI Systems, S.L.",
  country: "España",
  foundedYear: 2025,
  social: {
    linkedin: "https://www.linkedin.com/company/nexus-ai-systems",
    x: "https://x.com/nexus_ai_systems",
  },
} as const;

export type Brand = typeof brand;
