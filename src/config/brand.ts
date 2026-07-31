// Centralised brand configuration. Update here to rebrand the entire site.
export const brand = {
  name: "DEPT.IA",
  tagline: "Tu empresa, con más equipo.",
  shortTagline: "Contrata un departamento. No otra herramienta.",
  description:
    "Departamentos empresariales operados mediante inteligencia artificial. Equipos especializados que conocen tu empresa, trabajan con tus herramientas y ejecutan tareas bajo tu control.",
  domain: "dept.ia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dept.ia",
  contactEmail: "hola@dept.ia",
  securityEmail: "seguridad@dept.ia",
  legalName: "DEPT.IA Technologies, S.L.",
  country: "España",
  foundedYear: 2025,
  social: {
    linkedin: "https://www.linkedin.com/company/dept-ia",
    x: "https://x.com/dept_ia",
  },
} as const;

export type Brand = typeof brand;
