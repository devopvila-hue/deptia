// Centralised brand configuration. Update here to rebrand the entire site.
export const brand = {
  name: "Departify",
  tagline: "Te devolvemos tiempo",
  shortTagline: "Te devolvemos tiempo",
  description:
    "Departify incorpora departamentos que conocen tu empresa, trabajan con las herramientas que ya utilizas y se ocupan de tareas que hoy dependen de ti. Tú decides qué delegar. Tú apruebas lo importante.",
  domain: "departify.app",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://departify.app",
  contactEmail: "hola@departify.app",
  securityEmail: "seguridad@departify.app",
  legalName: "Departify, S.L.",
  country: "España",
  foundedYear: 2025,
  social: {
    linkedin: "https://www.linkedin.com/company/departify",
    x: "https://x.com/departify",
  },
} as const;

export type Brand = typeof brand;
