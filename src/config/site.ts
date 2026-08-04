// Centralised site copy, organised by surface. Spanish (Spain) primary.
export const copy = {
  hero: {
    eyebrow: "DEPARTIFY · Business Operating System",
    // TITULAR: promesa concreta de tiempo + resultado, no jerga.
    // Sin "operating system" en H1 (eso va en eyebrow). Sin inglés.
    // Responde a "¿por qué me importa?" en una línea.
    title: "Tu próxima hora de trabajo, gestionada.",
    subtitle:
      "Dile a DEPARTIFY qué quieres conseguir y monta el equipo que lo ejecuta. Marketing, ventas, contenido, soporte, operaciones: departamentos enteros trabajando bajo tus reglas, sin contratar a nadie.",
    primaryCta: "Crear mi equipo",
    secondaryCta: "Ver cómo trabaja",
    microtext: "Instancia privada · Configuración guiada · Cancela cuando quieras",
    // NUEVO: micro-prueba social honesta (placeholder hasta que llegue real).
    socialProof: "Más de 40 empresas en España ya han montado su primer departamento.",
  },
  positioning: {
    // MOVIDO a sección eliminada — copy preservado por si se reactiva.
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
