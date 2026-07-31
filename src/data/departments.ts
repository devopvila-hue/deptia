import type { Department, IntegrationRef } from "@/types/department";

const defaultPermissions = [
  {
    action: "Investigar mercado y competencia",
    level: "can" as const,
    example: "Análisis de tendencias y benchmarks del sector.",
  },
  {
    action: "Preparar borradores de contenido",
    level: "can" as const,
    example: "Textos, creatividades y propuestas de campaña.",
  },
  {
    action: "Publicar en redes sociales",
    level: "approval" as const,
    example: "Requiere tu confirmación antes de publicar.",
  },
  {
    action: "Enviar correos o newsletters",
    level: "approval" as const,
    example: "Te muestra el envío y espera tu visto bueno.",
  },
  {
    action: "Modificar tu CRM",
    level: "approval" as const,
    example: "Propone cambios, no los aplica solo.",
  },
  {
    action: "Realizar pagos o transferencias",
    level: "never" as const,
    example: "No tiene acceso a medios de pago.",
  },
  {
    action: "Firmar contratos en tu nombre",
    level: "never" as const,
    example: "Solo prepara borradores para tu firma.",
  },
  {
    action: "Eliminar datos de clientes",
    level: "never" as const,
    example: "Operaciones destructivas siempre requieren confirmación humana.",
  },
];

const defaultWorkflow = [
  {
    number: "01",
    title: "Seleccionas tu departamento",
    description: "Eliges el equipo que necesita tu empresa según objetivos y volumen.",
    duration: "≈ 2 min",
  },
  {
    number: "02",
    title: "Creamos tu instancia privada",
    description: "Se prepara un entorno independiente para tu organización, con sus propios recursos.",
    duration: "≈ 3 min",
  },
  {
    number: "03",
    title: "Tu equipo aprende el negocio",
    description: "Un onboarding guiado comprende marca, objetivos, herramientas y permisos.",
    duration: "≈ 30 min",
  },
  {
    number: "04",
    title: "Empieza la primera misión",
    description: "El departamento propone, ejecuta y mide bajo tus reglas desde el primer día.",
    duration: "Continuo",
  },
];

export const departments: Department[] = [
  {
    slug: "marketing",
    name: "Departamento de Marketing",
    shortName: "Marketing",
    promise:
      "Estrategia, campañas, email, análisis y coordinación de canales en un solo equipo.",
    description:
      "Un departamento de marketing operativo desde el primer día. Estrategia, contenido, campañas, email, redes y analítica coordinados bajo tus objetivos y tu marca.",
    tagline: "Estrategia, campañas y crecimiento en un solo equipo.",
    category: "Crecimiento",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Canales coordinados", value: "Hasta 6" },
      { label: "Iteraciones por semana", value: "Continuas" },
      { label: "Tiempo de primera propuesta", value: "72 h" },
    ],
    members: [
      {
        id: "strategy",
        role: "Dirección de marketing",
        initials: "DM",
        pattern: "wave",
        responsibilities: [
          "Define la estrategia trimestral",
          "Asigna prioridades a cada canal",
          "Revisa los resultados semanales",
        ],
      },
      {
        id: "copy",
        role: "Copywriting",
        initials: "CP",
        pattern: "bars",
        responsibilities: [
          "Escribe los mensajes principales",
          "Mantiene el tono de marca",
          "Adapta piezas por canal",
        ],
      },
      {
        id: "email",
        role: "Email marketing",
        initials: "EM",
        pattern: "dots",
        responsibilities: [
          "Programa secuencias",
          "Segmenta la base de datos",
          "Mide aperturas y clics",
        ],
      },
      {
        id: "social",
        role: "Redes sociales",
        initials: "RS",
        pattern: "orbit",
        responsibilities: [
          "Gestiona el calendario editorial",
          "Prepara creatividades",
          "Atiende comentarios",
        ],
      },
      {
        id: "analytics",
        role: "Analítica",
        initials: "AN",
        pattern: "grid",
        responsibilities: [
          "Mide campañas activas",
          "Construye informes",
          "Detecta patrones de conversión",
        ],
      },
      {
        id: "ads",
        role: "Coordinación de medios",
        initials: "MD",
        pattern: "spiral",
        responsibilities: [
          "Prepara presupuestos",
          "Propone audiencias",
          "Optimiza creatividades",
        ],
      },
    ],
    capabilities: [
      "Plan de marketing trimestral y roadmap operativo",
      "Campañas de email nurturing y lanzamiento",
      "Calendario editorial y creatividades para redes",
      "Investigación de mercado y benchmarks",
      "Informes semanales con insights accionables",
      "Propuestas de medios pagados y audiencias",
    ],
    deliverables: [
      "Plan trimestral revisable",
      "Calendario editorial activo",
      "Borradores de campaña listos para aprobar",
      "Informes semanales con KPIs",
      "Memoria viva de marca",
    ],
    problems: [
      {
        title: "Campañas sin continuidad",
        description:
          "Las acciones se planifican y ejecutan de forma coordinada, no como piezas sueltas.",
      },
      {
        title: "Información dispersa",
        description:
          "El departamento mantiene memoria de marca, decisiones pasadas y aprendizajes.",
      },
      {
        title: "Dependencia de agencias externas",
        description:
          "Un equipo interno que propone, ejecuta y mide, sin intermediarios.",
      },
    ],
    integrations: [
      "Gmail",
      "Google Calendar",
      "Google Drive",
      "HubSpot",
      "Mailchimp",
      "Buffer",
      "Meta",
      "LinkedIn",
      "Canva",
      "Notion",
    ],
    workflow: defaultWorkflow,
    permissions: defaultPermissions,
    faq: [
      {
        question: "¿El departamento publica automáticamente?",
        answer:
          "No sin tu aprobación. Prepara, propone y espera tu visto bueno antes de cualquier publicación o envío.",
      },
      {
        question: "¿Puede trabajar con mi CRM?",
        answer:
          "Sí. Se conecta a HubSpot, Pipedrive o Salesforce y propone actualizaciones que tú validas.",
      },
      {
        question: "¿Cuánto tarda en estar operativo?",
        answer:
          "Tras la contratación, en menos de una hora tu instancia está creada y se inicia el onboarding guiado.",
      },
      {
        question: "¿Puedo asignar más de una marca?",
        answer:
          "Sí, puedes crear sub-espacios de marca dentro del mismo departamento.",
      },
    ],
    mission: {
      brief: "Queremos captar 30 clientes nuevos durante septiembre.",
      response:
        "Antes de proponer la campaña, he revisado el producto, los canales actuales y el histórico. Recomiendo priorizar LinkedIn, email y una landing específica.",
      tasks: [
        "Analizar el histórico de captación",
        "Proponer segmentación inicial",
        "Preparar 3 secuencias de email",
        "Borrador de 6 creatividades para LinkedIn",
        "Definir métricas de éxito",
        "Calendario de publicación diario",
      ],
    },
    color: {
      base: "#d8ff62",
      accent: "rgba(216, 255, 98, 0.18)",
    },
    ordering: 1,
  },
  {
    slug: "ventas",
    name: "Departamento de Ventas",
    shortName: "Ventas",
    promise:
      "Prospección, seguimiento, propuestas y actualización del pipeline sin perder oportunidades.",
    description:
      "Un departamento comercial que investiga cuentas, prepara outreach, mantiene el pipeline vivo y prepara propuestas. Tú apruebas los mensajes y los puntos críticos.",
    tagline: "Pipeline activo, seguimiento constante, propuestas listas.",
    category: "Comercial",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Cualificación de leads", value: "Continua" },
      { label: "Tiempo de respuesta", value: "< 4 h" },
      { label: "Seguimientos por cuenta", value: "Ilimitados",
      },
    ],
    members: [
      {
        id: "sales-lead",
        role: "Dirección comercial",
        initials: "DC",
        pattern: "orbit",
        responsibilities: [
          "Define la estrategia de cuentas",
          "Asigna prioridades",
          "Revisa el pipeline semanal",
        ],
      },
      {
        id: "research",
        role: "Investigación",
        initials: "IN",
        pattern: "grid",
        responsibilities: [
          "Investiga cuentas y decisores",
          "Recopila señales de compra",
          "Construye dossiers",
        ],
      },
      {
        id: "prospect",
        role: "Prospección",
        initials: "PR",
        pattern: "wave",
        responsibilities: [
          "Prepara outreach personalizado",
          "Coordina primeros contactos",
          "Detecta interés real",
        ],
      },
      {
        id: "followup",
        role: "Seguimiento",
        initials: "SG",
        pattern: "dots",
        responsibilities: [
          "Mantiene cadencia de seguimiento",
          "Programa recordatorios",
          "Detecta objeciones comunes",
        ],
      },
      {
        id: "proposals",
        role: "Propuestas",
        initials: "PP",
        pattern: "bars",
        responsibilities: [
          "Estructura propuestas comerciales",
          "Adapta casos de éxito",
          "Prepara dosieres",
        ],
      },
      {
        id: "crm",
        role: "Operaciones de CRM",
        initials: "CR",
        pattern: "spiral",
        responsibilities: [
          "Propone actualizaciones",
          "Mantiene el pipeline limpio",
          "Sincroniza con tu stack",
        ],
      },
    ],
    capabilities: [
      "Investigación de cuentas y decisores",
      "Outreach multicanal con tu tono de marca",
      "Seguimiento persistente y secuenciado",
      "Propuestas personalizadas listas para enviar",
      "Actualización propuesta del CRM",
      "Reportes de pipeline y forecast",
    ],
    deliverables: [
      "Listas de cuentas cualificadas",
      "Mensajes de outreach personalizados",
      "Propuestas en formato editable",
      "Informes semanales de pipeline",
      "Notas y resúmenes por cuenta",
    ],
    problems: [
      {
        title: "Leads que se enfrían",
        description:
          "El seguimiento es continuo, persistente y registrado en la memoria de cada cuenta.",
      },
      {
        title: "Propuestas que tardan días",
        description:
          "El equipo prepara propuestas en horas, con información viva del cliente.",
      },
      {
        title: "Pipeline sin orden",
        description:
          "Cada cuenta tiene un dossier vivo con contexto, estado y próximos pasos.",
      },
    ],
    integrations: [
      "Gmail",
      "Google Calendar",
      "HubSpot",
      "Pipedrive",
      "Salesforce",
      "LinkedIn",
      "Slack",
      "Telegram",
    ],
    workflow: defaultWorkflow,
    permissions: defaultPermissions,
    faq: [
      {
        question: "¿Envía emails sin que yo los revise?",
        answer:
          "No. Prepara borradores, los deja en cola y solicita tu aprobación antes de cualquier envío.",
      },
      {
        question: "¿Puede actualizar mi CRM automáticamente?",
        answer:
          "Puede proponer cambios, pero la confirmación final siempre es tuya.",
      },
      {
        question: "¿Cuántas cuentas puede gestionar?",
        answer:
          "El plan Business cubre hasta 500 cuentas activas simultáneas con seguimiento vivo.",
      },
      {
        question: "¿Trabaja con mi calendario?",
        answer:
          "Sí, se conecta a Google Calendar y propone huecos para reuniones cuando corresponde.",
      },
    ],
    mission: {
      brief: "Necesitamos reactivar 40 cuentas del pipeline que llevan dos meses paradas.",
      response:
        "He revisado las cuentas y detecté 12 con señales recientes de interés. Propongo tres secuencias distintas: reactivación, recap de producto y caso de éxito adaptado.",
      tasks: [
        "Auditar el pipeline actual",
        "Clasificar las 40 cuentas por señal",
        "Preparar 3 secuencias de reactivación",
        "Detectar duplicados y oportunidades",
        "Programar seguimientos escalonados",
        "Actualizar el estado del CRM",
      ],
    },
    color: {
      base: "#7ce5a3",
      accent: "rgba(124, 229, 163, 0.16)",
    },
    ordering: 2,
  },
  {
    slug: "contenido",
    name: "Departamento de Contenido",
    shortName: "Contenido",
    promise:
      "Ideas, guiones, creatividades, vídeos y calendario editorial bajo una misma dirección creativa.",
    description:
      "Un departamento creativo que mantiene una línea editorial coherente, prepara guiones, escribe piezas, propone creatividades y coordina la producción audiovisual.",
    tagline: "Dirección creativa, guiones, creatividades y producción coordinada.",
    category: "Creatividad",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Piezas producidas / mes", value: "Hasta 40" },
      { label: "Canales cubiertos", value: "Web, RRSS, Vídeo" },
      { label: "Iteración por pieza", value: "Ilimitada",
      },
    ],
    members: [
      {
        id: "creative-lead",
        role: "Dirección creativa",
        initials: "DC",
        pattern: "spiral",
        responsibilities: [
          "Define la línea editorial",
          "Aprueba conceptos",
          "Mantiene coherencia de marca",
        ],
      },
      {
        id: "editorial",
        role: "Estrategia editorial",
        initials: "EE",
        pattern: "grid",
        responsibilities: [
          "Detecta temas relevantes",
          "Construye el calendario",
          "Detecta tendencias",
        ],
      },
      {
        id: "script",
        role: "Guion",
        initials: "GU",
        pattern: "wave",
        responsibilities: [
          "Escribe guiones para vídeo y podcast",
          "Adapta a formato y canal",
          "Mantiene el tono de marca",
        ],
      },
      {
        id: "design",
        role: "Diseño",
        initials: "DS",
        pattern: "bars",
        responsibilities: [
          "Prepara creatividades",
          "Mantiene plantillas vivas",
          "Adapta formatos por canal",
        ],
      },
      {
        id: "video",
        role: "Producción de vídeo",
        initials: "PV",
        pattern: "orbit",
        responsibilities: [
          "Planifica rodajes y edición",
          "Coordina locuciones",
          "Optimiza por plataforma",
        ],
      },
      {
        id: "distribution",
        role: "Distribución",
        initials: "DT",
        pattern: "dots",
        responsibilities: [
          "Publica en los canales correctos",
          "Adapta copies por red",
          "Mide rendimiento",
        ],
      },
    ],
    capabilities: [
      "Estrategia editorial y línea de marca",
      "Guiones para vídeo, podcast y redes",
      "Creatividades adaptadas por canal",
      "Producción de vídeo con iteración",
      "Calendario editorial completo",
      "Métricas de contenido y aprendizaje continuo",
    ],
    deliverables: [
      "Línea editorial documentada",
      "Calendario editorial mensual",
      "Guiones y creatividades listos",
      "Piezas audiovisuales producidas",
      "Informes de rendimiento",
    ],
    problems: [
      {
        title: "Piezas sin coherencia",
        description:
          "La dirección creativa mantiene una línea de marca viva que se aplica a cada formato.",
      },
      {
        title: "Producción paralizada",
        description:
          "El equipo coordina guion, diseño y vídeo bajo un mismo plan, sin cuellos de botella.",
      },
      {
        title: "Sin aprendizaje acumulativo",
        description:
          "El departamento recuerda qué funcionó y propone iteraciones informadas.",
      },
    ],
    integrations: [
      "YouTube",
      "Canva",
      "Figma",
      "Notion",
      "Buffer",
      "Meta",
      "LinkedIn",
      "Google Drive",
    ],
    workflow: defaultWorkflow,
    permissions: defaultPermissions,
    faq: [
      {
        question: "¿Genera vídeos automáticamente?",
        answer:
          "Prepara guiones, storyboards y propuestas. La generación de vídeo final se ejecuta tras tu aprobación.",
      },
      {
        question: "¿Puedo mantener mi estilo de marca?",
        answer:
          "Sí. La dirección creativa aprende tu tono, tipografías, paleta y referencias durante el onboarding.",
      },
      {
        question: "¿Quién aprueba las creatividades?",
        answer:
          "Tú. Todas las piezas pasan por tu visto bueno antes de publicarse.",
      },
      {
        question: "¿Puedo usar mis propias plantillas?",
        answer:
          "Sí, el departamento aprende tus plantillas y mantiene la coherencia visual con ellas.",
      },
    ],
    mission: {
      brief:
        "Queremos lanzar una serie de 6 vídeos cortos sobre casos de uso de nuestro producto.",
      response:
        "He identificado 6 casos con mejor potencial narrativo. Propongo una serie con hilo conductor, mismo formato y escaleta común para mantener la coherencia.",
      tasks: [
        "Investigar casos de uso destacados",
        "Construir escaleta común",
        "Escribir los 6 guiones",
        "Preparar creatividades de promoción",
        "Definir calendario de publicación",
        "Plan de medición de la serie",
      ],
    },
    color: {
      base: "#ffbd59",
      accent: "rgba(255, 189, 89, 0.14)",
    },
    ordering: 3,
  },
];

export const comingSoonDepartments: Pick<Department, "slug" | "name" | "shortName" | "tagline" | "status" | "ordering">[] = [
  {
    slug: "operaciones",
    name: "Departamento de Operaciones",
    shortName: "Operaciones",
    tagline: "Procesos, datos y optimización de la operativa diaria.",
    status: "coming-soon",
    ordering: 4,
  },
  {
    slug: "atencion-cliente",
    name: "Departamento de Atención al Cliente",
    shortName: "Atención al cliente",
    tagline: "Soporte consistente, con memoria y tono de marca.",
    status: "coming-soon",
    ordering: 5,
  },
  {
    slug: "seo",
    name: "Departamento SEO",
    shortName: "SEO",
    tagline: "Auditorías, contenidos y autoridad construida a largo plazo.",
    status: "coming-soon",
    ordering: 6,
  },
  {
    slug: "administracion",
    name: "Departamento Administrativo",
    shortName: "Administración",
    tagline: "Facturación, conciliaciones y reporting financiero controlado.",
    status: "coming-soon",
    ordering: 7,
  },
];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

export function listAvailableDepartments(): Department[] {
  return departments
    .filter((d) => d.status === "available")
    .sort((a, b) => a.ordering - b.ordering);
}

export const integrations: IntegrationRef[] = [
  {
    name: "Gmail",
    category: "communication",
    color: "#EA4335",
    reads: "Conversaciones relevantes con clientes y proveedores",
    prepares: "Borradores, respuestas y resúmenes",
    requiresApproval: "Cualquier envío en tu nombre",
  },
  {
    name: "Google Calendar",
    category: "productivity",
    color: "#4285F4",
    reads: "Tu agenda y disponibilidad",
    prepares: "Propuestas de reunión y bloqueos",
    requiresApproval: "Crear eventos en nombre de la empresa",
  },
  {
    name: "Google Drive",
    category: "storage",
    color: "#FBBC04",
    reads: "Documentos compartidos con el equipo",
    prepares: "Borradores, informes y plantillas",
    requiresApproval: "Modificar o compartir documentos sensibles",
  },
  {
    name: "HubSpot",
    category: "crm",
    color: "#FF7A59",
    reads: "Contactos, negocios y actividades",
    prepares: "Notas, seguimientos y propuestas",
    requiresApproval: "Modificar o cerrar negocios",
  },
  {
    name: "Pipedrive",
    category: "crm",
    color: "#1A1A1A",
    reads: "Pipeline y actividades comerciales",
    prepares: "Actualizaciones de estado y notas",
    requiresApproval: "Mover deals de etapa o cerrarlos",
  },
  {
    name: "WordPress",
    category: "productivity",
    color: "#21759B",
    reads: "Entradas, páginas y categorías",
    prepares: "Borradores, outlines y metadatos",
    requiresApproval: "Publicar artículos en producción",
  },
  {
    name: "Buffer",
    category: "social",
    color: "#2C4BFF",
    reads: "Cuentas conectadas y calendario",
    prepares: "Posts y creatividades en cola",
    requiresApproval: "Publicar contenido en redes",
  },
  {
    name: "Telegram",
    category: "communication",
    color: "#26A5E4",
    reads: "Mensajes que le envías al departamento",
    prepares: "Respuestas, informes y aprobaciones",
    requiresApproval: "Acciones que afecten a clientes o producción",
  },
  {
    name: "Meta",
    category: "social",
    color: "#1877F2",
    reads: "Cuentas de Instagram y Facebook",
    prepares: "Borradores y creatividades adaptadas",
    requiresApproval: "Publicación de contenido",
  },
  {
    name: "LinkedIn",
    category: "social",
    color: "#0A66C2",
    reads: "Perfiles de empresa y páginas",
    prepares: "Posts y artículos en borrador",
    requiresApproval: "Publicación y respuestas oficiales",
  },
  {
    name: "Canva",
    category: "design",
    color: "#00C4CC",
    reads: "Plantillas y creatividades de marca",
    prepares: "Diseños en borrador y adaptaciones",
    requiresApproval: "Publicar diseños en tu biblioteca",
  },
  {
    name: "YouTube",
    category: "social",
    color: "#FF0000",
    reads: "Canal y vídeos publicados",
    prepares: "Guiones, miniaturas y metadatos",
    requiresApproval: "Subir vídeos o modificar los existentes",
  },
];

export function getIntegrationsByCategory(): Record<IntegrationRef["category"], IntegrationRef[]> {
  const map: Record<IntegrationRef["category"], IntegrationRef[]> = {
    communication: [],
    productivity: [],
    crm: [],
    social: [],
    design: [],
    storage: [],
  };
  for (const i of integrations) map[i.category].push(i);
  return map;
}
