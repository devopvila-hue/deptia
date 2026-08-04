// Centralised site copy, organised by surface. Spanish (Spain) primary.
// VENDING MACHINE V3 — Categoría nueva: un compañero de trabajo
// que primero entiende tu negocio y después trabaja contigo.
// Sin competir con ChatGPT. Sin nombrar competidores.
export const copy = {
  hero: {
    // QUÉ ES (la categoría, no el rival).
    // Departify es un compañero de trabajo.
    eyebrow: "DEPARTIFY",
    title: "Antes de ayudarte, te entendemos.",
    subtitle:
      "Departify pasa dos días aprendiendo cómo funciona tu negocio. Solo entonces empieza a trabajar contigo. Y cuanto más pasa, mejor te conoce.",
    primaryCta: "Probar gratis 14 días",
    secondaryCta: "Ver cómo funciona",
    microtext: "Sin tarjeta. Configuración guiada. Cancela cuando quieras.",
    socialProof:
      "Ferreterías, asesorías, academias y tiendas online ya trabajan con Departify a diario.",
  },

  // WOW — LA DIFERENCIA. Esta es la sección central.
  // Un compañero de trabajo que primero entiende, después trabaja,
  // y cada día te conoce mejor. Eso es la categoría.
  wow: {
    eyebrow: "Cómo trabaja",
    title: "Primero entiende. Después trabaja. Y cada día te conoce mejor.",
    subtitle:
      "Departify no es una herramienta que responde. Es un compañero que conoce tu empresa, trabaja contigo bajo tus reglas, y aprende cómo lo haces para ayudarte cada vez mejor.",
    steps: [
      {
        n: "01",
        head: "Nos cuentas tu negocio.",
        body: "Respondes unas preguntas. Nada técnico. Qué haces, qué quieres conseguir, qué te frena hoy.",
      },
      {
        n: "02",
        head: "Departify aprende tu realidad.",
        body: "Dos días. Conecta con tus herramientas. Lee lo que tienes. Entiende cómo trabajas hoy, no cómo debería ser.",
      },
      {
        n: "03",
        head: "Te propone, no te impone.",
        body: "Te dice exactamente qué puede hacer por ti. Tú eliges qué activar. Lo que no quieras, no se hace.",
      },
      {
        n: "04",
        head: "Cada día te conoce mejor.",
        body: "Con el tiempo, Departify trabaja mejor. Recuerda tus decisiones, tus reglas, tus prioridades. Como un compañero que ya sabe cómo lo haces.",
      },
    ],
  },

  // POR QUÉ ME SIRVE — problemas reales, sin nombrar competidores.
  painPoints: {
    eyebrow: "El problema",
    title: "Lo que te pasa ahora mismo.",
    subtitle: "Si te identificas con cualquiera de estas, sigue leyendo.",
    items: [
      {
        head: "Tienes más trabajo del que puedes hacer solo.",
        body: "Clientes esperando, ideas sin ejecutar, tareas que se acumulan. Y el día solo tiene 24 horas.",
      },
      {
        head: "Contratar es caro y lento.",
        body: "Un buen empleado cuesta 2.000€ al mes. Y hasta que rinda, pasan meses. Si lo encuentras.",
      },
      {
        head: "Sigues haciendo trabajo que otros podrían hacer por ti.",
        body: "Tareas repetitivas que quitan tiempo a lo importante. Trabajo que sabes hacer pero no deberías tener que hacer.",
      },
    ],
  },

  // CÓMO EMPIEZO — los 3 pasos reales.
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
        title: "Cuéntanos qué necesitas.",
        body: "Respondes unas preguntas. Departify entiende tu negocio en 48h.",
      },
      {
        n: "03",
        title: "Empieza a delegar.",
        body: "Recibes tu primera propuesta. Apruebas. Departify trabaja. Tú llegas a casa antes.",
      },
    ],
  },

  // PRUEBA SOCIAL — sectores reales.
  proof: {
    eyebrow: "Quién lo usa",
    title: "Quién ya trabaja con Departify.",
    items: [
      { type: "Ferreterías", detail: "que automatizan pedidos y atención" },
      { type: "Asesorias", detail: "que delegan seguimiento de clientes" },
      { type: "Academias", detail: "que programan contenidos solos" },
      { type: "Tiendas online", detail: "que responden clientes 24h" },
    ],
  },

  // FAQ — objeciones reales, sin nombrar ChatGPT.
  faqTitle: "Las preguntas que nos hace todo el mundo.",

  // CTA FINAL — con precio y urgencia.
  finalCta: {
    badge: "Última oportunidad",
    title: "Los próximos 14 días son gratis. Después, desde 49€/mes.",
    subtitle: "Sin tarjeta. Cancelas cuando quieras. Tus datos son tuyos.",
    primaryCta: "Crear mi cuenta gratis",
    secondaryCta: "Hablar con el equipo",
    note: "Si no te convence, no pagas nada. Y no pierdes nada.",
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