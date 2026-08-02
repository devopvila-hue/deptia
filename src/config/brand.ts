// Centralised brand configuration. Update here to rebrand the entire site.
export const brand = {
  name: "DEPARTIFY",
  tagline: "Business Operating System",
  shortTagline: "Business Operating System",
  description:
    "DEPARTIFY is the platform that runs a company's operations through an Executive Director and intelligent business departments — quiet, structural, and built to scale.",
  domain: "deptify.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://deptify.com",
  contactEmail: "hola@deptify.com",
  securityEmail: "seguridad@deptify.com",
  legalName: "Deptify Technologies, S.L.",
  country: "España",
  foundedYear: 2025,
  social: {
    linkedin: "https://www.linkedin.com/company/deptify",
    x: "https://x.com/deptify",
  },
} as const;

export type Brand = typeof brand;
