// Centralised site copy, organised by surface. Spanish (Spain) primary.
export const copy = {
  hero: {
    // QUÉ ES (promesa concreta, no jerga). Manolo lo entiende en 5 segundos.
    // Sin "operating system", sin "IA", sin metáforas técnicas.
    eyebrow: "DEPARTIFY",
    title: "Trabaja menos. Tu empresa, no.",
    subtitle:
      "Dile qué quieres conseguir — vender más, responder clientes, crear contenido — y Departify lo hace por ti, como si tuvieras un equipo que nunca duerme.",
    primaryCta: "Probar gratis 14 días",
    secondaryCta: "Ver cómo funciona",
    microtext: "Sin tarjeta. Cancelas cuando quieras.",
    socialProof:
      "Manolo y cientos de pequeños empresarios ya delegan su trabajo en Departify.",
  },

  // POR QUÉ ME SIRVE — los 3 problemas que Manolo siente cada día.
  painPoints: {
    eyebrow: "El problema",
    title: "Lo que te pasa ahora mismo.",
    subtitle: "Si te identificas con cualquiera de estas, Departify es para ti.",
    items: [
      {
        head: "Tienes más trabajo que horas.",
        body: "Clientes esperando, ideas sin ejecutar, tareas que se acumulan. Y tú solo no llegas.",
      },
      {
        head: "Contratar es caro y lento.",
        body: "Un buen empleado cuesta 2.000€ al mes. Y hasta que rinda, pasan meses. Si lo encuentras.",
      },
      {
        head: "Ya probaste chatbots y no sirven.",
        body: "Responden preguntas. Pero no ejecutan. No recuerdan. No terminan nada.",
      },
    ],
  },

  // QUÉ ES — qué hace, en lenguaje de empresario.
  whatIs: {
    eyebrow: "Qué es",
    title: "Departify trabaja por ti. Tú decides.",
    subtitle:
      "Departify no es un chat. Es un equipo completo que ejecuta tareas reales: marketing, ventas, soporte, operaciones. Tú mandas. Ellos trabajan.",
    bullets: [
      "Le dices qué quieres conseguir.",
      "Departify monta el equipo que lo hace.",
      "Tú apruebas lo importante. Lo demás se hace solo.",
    ],
  },

  // POR QUÉ CONFIAR — lo que elimina el miedo.
  trust: {
    eyebrow: "Por qué confiar",
    title: "Tú tienes el control. Siempre.",
    items: [
      "Solo trabaja con la información que tú le das.",
      "Tú apruebas cada gasto y cada acción importante.",
      "Si no te convence, te vas. Sin contratos.",
    ],
  },

  // CÓMO EMPIEZO — los 3 pasos.
  howToStart: {
    eyebrow: "Cómo empezar",
    title: "De cero a funcionando en 10 minutos.",
    steps: [
      {
        n: "01",
        title: "Crea tu cuenta.",
        body: "Email y contraseña. Sin tarjeta. Sin instalar nada.",
      },
      {
        n: "02",
        title: "Dile a Departify qué necesitas.",
        body: "Respondes unas preguntas. Departify entiende tu negocio.",
      },
      {
        n: "03",
        title: "Empieza a delegar.",
        body: "Pide tu primera tarea. Approvas. Listo. Tu empresa trabaja sola.",
      },
    ],
  },

  // PRECIO — el momento de la verdad.
  pricing: {
    eyebrow: "Precio",
    title: "Lo que cuesta tener un equipo que trabaja solo.",
    subtitle: "14 días gratis. Después, desde 49€/mes. Cancela cuando quieras.",
    note: "Sin permanencia. Sin letra pequeña.",
  },

  // FAQ — las objeciones que faltan resolver.
  faqTitle: "Las preguntas que nos hace todo el mundo.",

  // CTA FINAL — la última oportunidad.
  finalCta: {
    title: "Deja de hacerlo todo tú.",
    subtitle: "14 días gratis. Después decides.",
    primaryCta: "Crear mi cuenta gratis",
    secondaryCta: "Hablar con el equipo",
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