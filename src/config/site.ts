// Centralised site copy, organised by surface. Spanish (Spain) primary.
export const copy = {
  hero: {
    eyebrow: "Deptify / Workforce",
    title: "The operating system for modern companies.",
    subtitle:
      "Deptify is the platform that runs a company's operations through an Executive Director and intelligent business departments — quiet, structural, and built to scale.",
    primaryCta: "Crear mi equipo",
    secondaryCta: "Ver cómo trabaja",
    microtext: "Instancia privada · Configuración guiada · Cancela cuando quieras",
  },
  positioning: {
    title: "No es un chatbot. Es una estructura de trabajo.",
    subtitle:
      "La diferencia no es la tecnología, es la organización. Un chatbot responde. Un departamento ejecuta.",
    leftColumn: {
      label: "Chatbot",
      items: ["Responde preguntas."] as string[],
    },
    rightColumn: {
      label: "Departamento",
      items: [
        "Comprende objetivos.",
        "Planifica.",
        "Coordina.",
        "Ejecuta.",
        "Mide.",
        "Recuerda.",
      ] as string[],
    },
  },
  // Generic copy used across shared components
  shared: {
    learnMore: "Conocer más",
    seeDemo: "Ver demo",
    contact: "Hablar con el equipo",
    explore: "Explorar",
    viewAll: "Ver todos",
    comingSoon: "Próximamente",
  },
} as const;

export type SiteCopy = typeof copy;
