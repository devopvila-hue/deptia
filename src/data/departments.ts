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

const operationsPermissions = [
  {
    action: "Leer bases de datos y plataformas internas",
    level: "can" as const,
    example: "Consulta repositorios y detecta operaciones pendientes.",
  },
  {
    action: "Preparar borradores de informes operativos",
    level: "can" as const,
    example: "Construye dashboards y resúmenes ejecutivos.",
  },
  {
    action: "Ejecutar tareas operativas en tus herramientas",
    level: "approval" as const,
    example: "Propone la ejecución y espera tu confirmación.",
  },
  {
    action: "Modificar integraciones o permisos",
    level: "approval" as const,
    example: "Te sugiere cambios, no los aplica por su cuenta.",
  },
  {
    action: "Aprobar solicitudes internas de personal",
    level: "never" as const,
    example: "Solo evalúa, las decisiones de RR.HH. quedan contigo.",
  },
  {
    action: "Realizar movimientos bancarios",
    level: "never" as const,
    example: "No tiene credenciales para operar tus cuentas.",
  },
  {
    action: "Eliminar registros de clientes",
    level: "never" as const,
    example: "Cualquier borrado requiere confirmación humana.",
  },
  {
    action: "Sobrescribir políticas internas",
    level: "never" as const,
    example: "Los protocolos solo los修改 tu equipo humano.",
  },
];

const supportPermissions = [
  {
    action: "Leer hilos de soporte y tickets previos",
    level: "can" as const,
    example: "Accede a la memoria del cliente antes de responder.",
  },
  {
    action: "Proponer borradores de respuesta",
    level: "can" as const,
    example: "Mantiene el tono de marca y la consistencia.",
  },
  {
    action: "Responder a clientes en tu nombre",
    level: "approval" as const,
    example: "Te enseña la respuesta y espera tu OK antes de enviarla.",
  },
  {
    action: "Escalar el caso a un humano",
    level: "can" as const,
    example: "Detecta frustración y lo deriva automáticamente.",
  },
  {
    action: "Reembolsar o compensar al cliente",
    level: "never" as const,
    example: "Solo propone el reembolso, no lo ejecuta.",
  },
  {
    action: "Cerrar tickets sin tu revisión",
    level: "never" as const,
    example: "Los casos sensibles quedan abiertos para tu equipo.",
  },
  {
    action: "Borrar historial del cliente",
    level: "never" as const,
    example: "La memoria del cliente es sagrada para tu soporte.",
  },
  {
    action: "Modificar condiciones comerciales",
    level: "never" as const,
    example: "Nunca promete descuentos o excepciones por su cuenta.",
  },
];

const seoPermissions = [
  {
    action: "Auditar técnicamente tu sitio web",
    level: "can" as const,
    example: "Detecta problemas de rastreo, indexación y velocidad.",
  },
  {
    action: "Investigar palabras clave y competencia",
    level: "can" as const,
    example: "Construye clusters temáticos listos para aprobar.",
  },
  {
    action: "Publicar contenidos SEO en tu CMS",
    level: "approval" as const,
    example: "Te muestra el artículo y espera tu visto bueno.",
  },
  {
    action: "Construir backlinks y outreach",
    level: "approval" as const,
    example: "Prepara el contacto, tú apruebas cada envío.",
  },
  {
    action: "Modificar la estructura de tu sitio",
    level: "approval" as const,
    example: "Propone cambios, no toca la arquitectura.",
  },
  {
    action: "Comprar dominios o medios pagados",
    level: "never" as const,
    example: "No gestiona gastos en nombre de tu empresa.",
  },
  {
    action: "Eliminar URLs indexadas",
    level: "never" as const,
    example: "Los borrados siempre pasan por tu revisión.",
  },
  {
    action: "Cambiar de proveedor de hosting",
    level: "never" as const,
    example: "Cualquier migración se decide con tu equipo.",
  },
];

const adminPermissions = [
  {
    action: "Leer facturas y conciliaciones bancarias",
    level: "can" as const,
    example: "Accede a extractos y movimientos detectados.",
  },
  {
    action: "Preparar borradores de informes financieros",
    level: "can" as const,
    example: "Construye resúmenes ejecutivos y cuentas de resultados.",
  },
  {
    action: "Categorizar gastos e ingresos",
    level: "approval" as const,
    example: "Te sugiere categorías, no las guarda sin tu OK.",
  },
  {
    action: "Enviar recordatorios de pago a clientes",
    level: "approval" as const,
    example: "Prepara el envío y espera tu visto bueno.",
  },
  {
    action: "Ejecutar pagos o transferencias",
    level: "never" as const,
    example: "No tiene acceso a tus medios de pago.",
  },
  {
    action: "Modificar contratos con proveedores",
    level: "never" as const,
    example: "Solo prepara borradores para tu firma.",
  },
  {
    action: "Cerrar libros contables",
    level: "never" as const,
    example: "El cierre fiscal lo decides tú con tu asesoría.",
  },
  {
    action: "Borrar asientos o facturas",
    level: "never" as const,
    example: "Operaciones destructivas requieren confirmación humana.",
  },
];

const rrhhPermissions = [
  {
    action: "Leer organigrama y documentos de personas",
    level: "can" as const,
    example: "Consulta la estructura viva del equipo bajo permisos.",
  },
  {
    action: "Preparar borradores de ofertas y comunicaciones internas",
    level: "can" as const,
    example: "Redacta ofertas, feedbacks y one-pagers culturales.",
  },
  {
    action: "Publicar vacantes o responder a candidatos",
    level: "approval" as const,
    example: "Propone los mensajes y espera tu visto bueno antes de publicar.",
  },
  {
    action: "Programar entrevistas o reuniones internas",
    level: "approval" as const,
    example: "Te sugiere huecos en el calendario y nunca cierra a tu nombre.",
  },
  {
    action: "Aprobar cambios de sueldo o contratos",
    level: "never" as const,
    example: "Solo prepara propuestas; la firma siempre es humana.",
  },
  {
    action: "Ejecutar despidos o ceses",
    level: "never" as const,
    example: "Asuntos sensibles los trata exclusivamente tu equipo humano.",
  },
  {
    action: "Acceder a datos personales sensibles sin base legal",
    level: "never" as const,
    example: "Cumple RGPD: nada de historiales médicos, religiosos o sindicales.",
  },
  {
    action: "Borrar perfiles de personas",
    level: "never" as const,
    example: "Operaciones destructivas requieren confirmación humana.",
  },
];

const logisticaPermissions = [
  {
    action: "Leer inventario, pedidos y proveedores",
    level: "can" as const,
    example: "Consulta el stock y el estado de cada envío.",
  },
  {
    action: "Preparar borradores de rutas y planes",
    level: "can" as const,
    example: "Calcula rutas óptimas y planes de reposición.",
  },
  {
    action: "Notificar al cliente sobre su pedido",
    level: "approval" as const,
    example: "Te enseña el mensaje y espera tu OK antes de enviarlo.",
  },
  {
    action: "Modificar cantidades de stock",
    level: "approval" as const,
    example: "Propone ajustes, no actualiza inventario sin tu firma.",
  },
  {
    action: "Cancelar pedidos confirmados",
    level: "never" as const,
    example: "Solo prepara la cancelación; la decisión es tuya.",
  },
  {
    action: "Aprobar devoluciones económicas",
    level: "never" as const,
    example: "Propone reembolsos; la aprobación económica es humana.",
  },
  {
    action: "Cerrar acuerdos con nuevos proveedores",
    level: "never" as const,
    example: "No negocia ni firma contratos en tu nombre.",
  },
  {
    action: "Eliminar registros de envíos o pedidos",
    level: "never" as const,
    example: "Operaciones destructivas requieren confirmación humana.",
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
  {
    slug: "operaciones",
    name: "Departamento de Operaciones",
    shortName: "Operaciones",
    promise:
      "Procesos internos, reporting, conciliaciones de datos y automatización ejecutados bajo tus reglas.",
    description:
      "Un departamento de operaciones que mantiene tus procesos vivos, prepara informes recurrentes, conecta tus herramientas y propone automatizaciones documentadas. Tú decides qué se ejecuta.",
    tagline: "Procesos, datos y optimización de la operativa diaria.",
    category: "Operaciones",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Procesos automatizados", value: "Continuos" },
      { label: "Reportes recurrentes", value: "Hasta 12/mes" },
      { label: "Tiempo de auditoría", value: "< 24 h" },
    ],
    members: [
      {
        id: "ops-lead",
        role: "Dirección de operaciones",
        initials: "DO",
        pattern: "orbit",
        responsibilities: [
          "Define los procesos prioritarios",
          "Asigna capacidad entre áreas",
          "Revisa SLAs y cuellos de botella",
        ],
      },
      {
        id: "process",
        role: "Diseño de procesos",
        initials: "PR",
        pattern: "grid",
        responsibilities: [
          "Documenta procesos en notación clara",
          "Detecta redundancias",
          "Propone mejoras medibles",
        ],
      },
      {
        id: "data",
        role: "Datos y reporting",
        initials: "DR",
        pattern: "dots",
        responsibilities: [
          "Construye dashboards vivos",
          "Concilia fuentes internas",
          "Prepara informes recurrentes",
        ],
      },
      {
        id: "automation",
        role: "Automatización",
        initials: "AT",
        pattern: "bars",
        responsibilities: [
          "Propone automatizaciones seguras",
          "Documenta pasos manuales repetidos",
          "Mantiene el catálogo de scripts",
        ],
      },
      {
        id: "integrations",
        role: "Integraciones",
        initials: "IT",
        pattern: "spiral",
        responsibilities: [
          "Conecta tus herramientas actuales",
          "Detecta silos y duplicados",
          "Sugiere consolidaciones",
        ],
      },
      {
        id: "qa",
        role: "Calidad y auditoría",
        initials: "QA",
        pattern: "wave",
        responsibilities: [
          "Audita entregables de otros departamentos",
          "Detecta desviaciones",
          "Mantiene check-list viva",
        ],
      },
    ],
    capabilities: [
      "Mapeo y documentación de procesos internos",
      "Reportes operativos recurrentes",
      "Conciliación de datos entre plataformas",
      "Automatizaciones documentadas paso a paso",
      "Auditorías de calidad periódicas",
      "Propuestas de optimización con métricas",
    ],
    deliverables: [
      "Mapa de procesos vivos",
      "Informes recurrentes con KPIs",
      "Catálogo de automatizaciones",
      "Auditorías de calidad",
      "Histórico operativo consultable",
    ],
    problems: [
      {
        title: "Procesos que viven en la cabeza de uno",
        description:
          "Documentamos cada proceso vivo en tu instancia privada, accesible para tu equipo humano.",
      },
      {
        title: "Datos que no cuadran",
        description:
          "El departamento concilia fuentes y deja trazabilidad de cada operación.",
      },
      {
        title: "Automatizaciones opacas",
        description:
          "Cada automatización viene explicada y reversible por tu equipo humano.",
      },
    ],
    integrations: [
      "Google Sheets",
      "Airtable",
      "Notion",
      "Slack",
      "Gmail",
      "Google Calendar",
      "Zapier",
      "Make",
    ],
    workflow: defaultWorkflow,
    permissions: operationsPermissions,
    faq: [
      {
        question: "¿Puede tocar datos de clientes sin que yo lo apruebe?",
        answer:
          "No. Toda escritura se propone antes y se ejecuta solo con tu confirmación, dejando auditoría completa.",
      },
      {
        question: "¿Trabaja con mis hojas de cálculo y mi Airtable?",
        answer:
          "Sí. Se conecta a Google Sheets y Airtable, propone conciliaciones y dashboards vivos.",
      },
      {
        question: "¿Automatiza sin mi permiso?",
        answer:
          "Nunca. Cada automatización llega con un documento paso a paso y requiere tu visto bueno antes de ejecutarse.",
      },
      {
        question: "¿Qué pasa si algo falla?",
        answer:
          "Cada acción queda registrada con autor, hora y origen. Si algo se desvía, lo detectamos antes de que afecte al cliente.",
      },
    ],
    mission: {
      brief:
        "Necesitamos unificar los datos de clientes entre CRM, facturación y soporte para detectar impagos antes del día 30.",
      response:
        "He revisado las tres fuentes y detecté tres discrepancias recurrentes. Propongo una conciliación diaria automatizada con alerta si el desajuste supera el 2%, más un informe semanal resumen.",
      tasks: [
        "Cruzar las tres fuentes actuales",
        "Definir reglas de conciliación",
        "Preparar dashboard de discrepancias",
        "Construir alerta por umbral",
        "Programar informe semanal",
        "Documentar el proceso para tu equipo",
      ],
    },
    color: {
      base: "#69b4ff",
      accent: "rgba(105, 180, 255, 0.16)",
    },
    ordering: 4,
    assets: {
      hero: "/departments/operaciones/hero.svg",
      team: "/departments/operaciones/team.svg",
      output: "/departments/operaciones/output.svg",
    },
  },
  {
    slug: "atencion-cliente",
    name: "Departamento de Atención al Cliente",
    shortName: "Atención al cliente",
    promise:
      "Soporte 24/7 consistente, con memoria del cliente y tono de marca controlado.",
    description:
      "Un departamento de soporte que entiende a cada cliente antes de responder, propone borradores de respuesta coherentes con tu marca y escala los casos sensibles a tu equipo humano.",
    tagline: "Soporte consistente, con memoria y tono de marca.",
    category: "Soporte",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Tiempo medio de respuesta", value: "< 15 min" },
      { label: "Cobertura", value: "24/7" },
      { label: "Casos derivados a humanos", value: "Mínimos",
      },
    ],
    members: [
      {
        id: "support-lead",
        role: "Dirección de soporte",
        initials: "DS",
        pattern: "wave",
        responsibilities: [
          "Define los protocolos de atención",
          "Revisa los casos escalados",
          "Entrena al equipo en tono de marca",
        ],
      },
      {
        id: "triage",
        role: "Triaje",
        initials: "TR",
        pattern: "grid",
        responsibilities: [
          "Clasifica tickets entrantes",
          "Asigna prioridad por impacto",
          "Detecta urgencias reales",
        ],
      },
      {
        id: "responder",
        role: "Respuesta",
        initials: "RE",
        pattern: "orbit",
        responsibilities: [
          "Prepara borradores con contexto",
          "Mantiene tono de marca",
          "Cierra hilos con elegancia",
        ],
      },
      {
        id: "knowledge",
        role: "Base de conocimiento",
        initials: "BC",
        pattern: "dots",
        responsibilities: [
          "Documenta soluciones recurrentes",
          "Mantiene FAQs vivos",
          "Sincroniza el manual interno",
        ],
      },
      {
        id: "escalation",
        role: "Escalado humano",
        initials: "ES",
        pattern: "bars",
        responsibilities: [
          "Detecta frustración o riesgos",
          "Pasa el caso al equipo humano",
          "Mantiene trazabilidad completa",
        ],
      },
      {
        id: "quality",
        role: "Calidad y feedback",
        initials: "QA",
        pattern: "spiral",
        responsibilities: [
          "Audita conversaciones",
          "Detecta patrones de insatisfacción",
          "Propone mejoras al manual",
        ],
      },
    ],
    capabilities: [
      "Atención multicanal con un único historial",
      "Memoria por cliente en cada conversación",
      "Borradores listos para tu visto bueno",
      "Escalado humano cuando hace falta",
      "Base de conocimiento que crece sola",
      "Análisis de sentimiento y carga",
    ],
    deliverables: [
      "Borradores por caso en cola de aprobación",
      "Histórico consultable por cliente",
      "Reportes semanales de tono y carga",
      "Faqs que se actualizan automáticamente",
      "Alertas cuando un caso se desvía",
    ],
    problems: [
      {
        title: "Clientes que repiten su historia",
        description:
          "Cada conversación parte del historial completo. Tu equipo nunca vuelve a preguntar lo mismo.",
      },
      {
        title: "Tono inconsistente entre canales",
        description:
          "Mismo tono, misma marca y mismas reglas en email, chat, redes y Telegram.",
      },
      {
        title: "Casos sensibles sin control",
        description:
          "El departamento detecta frustración, escalado legal o reembolsos y los pone delante de tu equipo humano.",
      },
    ],
    integrations: [
      "Gmail",
      "Intercom",
      "Zendesk",
      "Freshdesk",
      "Front",
      "Telegram",
      "WhatsApp",
      "Slack",
    ],
    workflow: defaultWorkflow,
    permissions: supportPermissions,
    faq: [
      {
        question: "¿Responde a clientes sin que yo lo apruebe?",
        answer:
          "No. Te enseña cada borrador y espera tu OK antes de enviarlo. Tú mantienes el control total.",
      },
      {
        question: "¿Trabaja con mi helpdesk actual?",
        answer:
          "Sí, se conecta a Intercom, Zendesk, Front o Freshdesk sin cambiar tus herramientas.",
      },
      {
        question: "¿Y si el cliente está muy enfadado?",
        answer:
          "El departamento detecta frustración, escala el caso automáticamente a tu equipo humano y prepara un resumen.",
      },
      {
        question: "¿Puede prometer descuentos o reembolsos?",
        answer:
          "Nunca por su cuenta. Solo propone. Cualquier excepción la decides tú con un clic.",
      },
    ],
    mission: {
      brief: "Nos llegan 80 tickets al día y los clientes esperan horas para una respuesta útil.",
      response:
        "He revisado los tickets de la última semana: 60% son preguntas recurrentes, 25% información de seguimiento y 15% casos sensibles. Propongo responder automáticamente las recurrentes con tu visto bueno, y poner el resto delante de tu equipo humano con contexto completo.",
      tasks: [
        "Clasificar las consultas recurrentes",
        "Preparar borradores para FAQs",
        "Definir reglas de escalado",
        "Activar alertas para casos sensibles",
        "Documentar protocolo de crisis",
        "Informe semanal de satisfacción",
      ],
    },
    color: {
      base: "#c4a3ff",
      accent: "rgba(196, 163, 255, 0.16)",
    },
    ordering: 5,
    assets: {
      hero: "/departments/atencion-cliente/hero.svg",
      team: "/departments/atencion-cliente/team.svg",
      output: "/departments/atencion-cliente/output.svg",
    },
  },
  {
    slug: "seo",
    name: "Departamento SEO",
    shortName: "SEO",
    promise:
      "Auditorías técnicas, contenidos optimizados y autoridad construida durante meses.",
    description:
      "Un departamento SEO que audita tu sitio, propone una estrategia temática, prepara contenidos optimizados y trabaja la autoridad de tu marca a largo plazo. Tú apruebas cada publicación.",
    tagline: "Auditorías, contenidos y autoridad construida a largo plazo.",
    category: "Crecimiento",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Auditorías técnicas", value: "Trimestrales" },
      { label: "Briefings preparados", value: "Hasta 8/mes" },
      { label: "Tendencia de autoridad", value: "Medible",
      },
    ],
    members: [
      {
        id: "seo-lead",
        role: "Dirección SEO",
        initials: "DS",
        pattern: "spiral",
        responsibilities: [
          "Define la estrategia trimestral",
          "Asigna prioridades de ataque",
          "Revisa el progreso con datos",
        ],
      },
      {
        id: "tech-audit",
        role: "Auditor técnico",
        initials: "AT",
        pattern: "grid",
        responsibilities: [
          "Audita indexación y velocidad",
          "Detecta canibalizaciones",
          "Propone correcciones estructuradas",
        ],
      },
      {
        id: "keywords",
        role: "Estrategia de palabras clave",
        initials: "KW",
        pattern: "wave",
        responsibilities: [
          "Investiga clusters temáticos",
          "Detecta intención por consulta",
          "Construye roadmap editorial",
        ],
      },
      {
        id: "content",
        role: "Contenido SEO",
        initials: "CO",
        pattern: "bars",
        responsibilities: [
          "Prepara borradores optimizados",
          "Adapta piezas existentes",
          "Trabaja con tu equipo de marketing",
        ],
      },
      {
        id: "link",
        role: "Link building y autoridad",
        initials: "LB",
        pattern: "orbit",
        responsibilities: [
          "Investiga dominios relevantes",
          "Prepara outreach personalizado",
          "Mantiene el perfil de backlinks",
        ],
      },
      {
        id: "analytics",
        role: "Analítica SEO",
        initials: "AN",
        pattern: "dots",
        responsibilities: [
          "Monitoriza posiciones",
          "Mide tráfico orgánico",
          "Detecta desviaciones y penalizaciones",
        ],
      },
    ],
    capabilities: [
      "Auditoría técnica trimestral del sitio",
      "Estrategia temática por clusters",
      "Briefings SEO listos para tu equipo de contenido",
      "Outreach para construcción de autoridad",
      "Optimización continua de piezas existentes",
      "Monitorización con alertas y reporting",
    ],
    deliverables: [
      "Auditoría técnica con plan de acción",
      "Roadmap editorial trimestral",
      "Briefings optimizados por pieza",
      "Perfil vivo de backlinks",
      "Informes mensuales con tendencia",
    ],
    problems: [
      {
        title: "Tráfico estancado",
        description:
          "Una estrategia temática sostenida durante meses, basada en datos, no en corazonadas.",
      },
      {
        title: "Publicar sin estrategia",
        description:
          "Cada pieza responde a un brief preparado por auditoría técnica + investigación de palabras clave.",
      },
      {
        title: "Perfil de backlinks sucio",
        description:
          "Auditamos y mejoramos tu autoridad con outreach relevante y aprobado por tu equipo.",
      },
    ],
    integrations: [
      "Google Search Console",
      "Google Analytics",
      "Ahrefs",
      "Semrush",
      "Screaming Frog",
      "WordPress",
      "Notion",
      "Slack",
    ],
    workflow: defaultWorkflow,
    permissions: seoPermissions,
    faq: [
      {
        question: "¿Publica artículos sin que yo los revise?",
        answer:
          "Nunca. Te enseña cada borrador SEO, espera tu aprobación y publica tras tu confirmación.",
      },
      {
        question: "¿Puedo mantener mi marca y mi tono?",
        answer:
          "Por supuesto. El SEO se adapta a tu manual de marca; investigamos palabras clave, no cambiamos tu voz.",
      },
      {
        question: "¿Cuánto tarda en notarse?",
        answer:
          "SEO es un trabajo de meses. Verás movimiento real entre el tercer y sexto mes con ejecución constante.",
      },
      {
        question: "¿Compra enlaces?",
        answer:
          "No. Solo outreach orgánico y relevante, aprobado por tu equipo, documentado paso a paso.",
      },
    ],
    mission: {
      brief: "Llevamos un año estancados en búsqueda orgánica y dependemos demasiado de paid.",
      response:
        "He auditado 320 URLs: detecto 18 canibalizaciones, 22 piezas sin tráfico y un cluster sin estructurar. Propongo un roadmap trimestral con 8 piezas estratégicas para recuperar autoridad y desbloquear términos rentables.",
      tasks: [
        "Cruzar Search Console y Analytics",
        "Detectar canibalizaciones y huecos",
        "Construir clusters temáticos",
        "Preparar 8 briefings priorizados",
        "Auditar backlinks tóxicos",
        "Plan de medición mensual",
      ],
    },
    color: {
      base: "#6ed3a0",
      accent: "rgba(110, 211, 160, 0.14)",
    },
    ordering: 6,
    assets: {
      hero: "/departments/seo/hero.svg",
      team: "/departments/seo/team.svg",
      output: "/departments/seo/output.svg",
    },
  },
  {
    slug: "administracion",
    name: "Departamento Administrativo",
    shortName: "Administración",
    promise:
      "Facturación, conciliaciones y reporting financiero ejecutados con control humano total.",
    description:
      "Un departamento administrativo que clasifica movimientos, prepara conciliaciones, redacta borradores de informes financieros y mantiene la documentación lista para tu asesoría.",
    tagline: "Facturación, conciliaciones y reporting financiero controlado.",
    category: "Finanzas",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Documentos clasificados", value: "Continuos" },
      { label: "Reportes recurrentes", value: "Mensuales" },
      { label: "Plazo de entrega", value: "< 24 h" },
    ],
    members: [
      {
        id: "admin-lead",
        role: "Dirección administrativa",
        initials: "DA",
        pattern: "bars",
        responsibilities: [
          "Define los protocolos de control",
          "Revisa conciliaciones y cierres",
          "Coordina con tu asesoría",
        ],
      },
      {
        id: "invoicing",
        role: "Facturación",
        initials: "FC",
        pattern: "grid",
        responsibilities: [
          "Prepara borradores de facturas",
          "Concilia cobros con tu CRM",
          "Mantiene la numeración correcta",
        ],
      },
      {
        id: "expenses",
        role: "Gastos y compras",
        initials: "GC",
        pattern: "dots",
        responsibilities: [
          "Clasifica gastos por categoría",
          "Propone asientos contables",
          "Detecta duplicidades de cobro",
        ],
      },
      {
        id: "reconciliation",
        role: "Conciliaciones",
        initials: "CN",
        pattern: "wave",
        responsibilities: [
          "Cruza extractos bancarios",
          "Detecta descuadres diarios",
          "Mantiene histórico conciliado",
        ],
      },
      {
        id: "reporting",
        role: "Reporting financiero",
        initials: "RF",
        pattern: "spiral",
        responsibilities: [
          "Prepara cuentas de resultados",
          "Construye dashboards vivos",
          "Genera resúmenes ejecutivos",
        ],
      },
      {
        id: "compliance",
        role: "Cumplimiento",
        initials: "CP",
        pattern: "orbit",
        responsibilities: [
          "Documenta plazos y vencimientos",
          "Prepara borradores para asesoría",
          "Mantiene el archivo auditable",
        ],
      },
    ],
    capabilities: [
      "Facturación recurrente y conciliada",
      "Clasificación de gastos e ingresos",
      "Conciliaciones bancarias diarias",
      "Borradores de informes financieros",
      "Documentación auditable para tu asesoría",
      "Recordatorios y vencimientos controlados",
    ],
    deliverables: [
      "Facturas en borrador listas para emitir",
      "Conciliaciones diarias firmadas",
      "Cuenta de resultados mensual",
      "Resumen ejecutivo para dirección",
      "Archivo auditable en tu instancia",
    ],
    problems: [
      {
        title: "Finanzas que viven en hojas dispersas",
        description:
          "Toda la operativa queda registrada en tu instancia privada, accesible para tu asesoría.",
      },
      {
        title: "Cierres que tardan semanas",
        description:
          "El departamento prepara borradores de cierre para que tu asesoría solo valide, no construya.",
      },
      {
        title: "Riesgo de incumplimiento",
        description:
          "Borradores de vencimientos, modelos y recordatorios listos para tu OK antes de cada fecha crítica.",
      },
    ],
    integrations: [
      "Stripe",
      "Holded",
      "QuickBooks",
      "Xero",
      "Airtable",
      "Google Sheets",
      "Gmail",
      "Slack",
    ],
    workflow: defaultWorkflow,
    permissions: adminPermissions,
    faq: [
      {
        question: "¿Hace pagos por mí?",
        answer:
          "Nunca. No tiene credenciales a tus cuentas. Solo propone movimientos y los deja a tu firma.",
      },
      {
        question: "¿Sustituye a mi asesoría?",
        answer:
          "No. Trabaja para tu asesoría: le entrega borradores conciliados para que solo valide.",
      },
      {
        question: "¿Puede cerrar libros contables?",
        answer:
          "No. El cierre fiscal siempre lo decides tú con tu asesoría. El departamento solo prepara.",
      },
      {
        question: "¿Y mis datos fiscales confidenciales?",
        answer:
          "Viven en tu instancia privada, cifrada, con permisos por persona y auditoría de cada acceso.",
      },
    ],
    mission: {
      brief: "Necesitamos cerrar el trimestre sin errores y tener visibilidad real del margen por cliente.",
      response:
        "He conciliado 1.240 movimientos y detecté 14 desajustes recurrentes con proveedores. Propongo un cierre a tres bandas: borrador de cuenta de resultados, ajustes pendientes y revisión cruzada con tu asesoría.",
      tasks: [
        "Cruzar extractos bancarios del trimestre",
        "Detectar desajustes recurrentes",
        "Construir cuenta de resultados borrador",
        "Preparar ajustes para tu asesoría",
        "Generar informe ejecutivo por cliente",
        "Documentar el cierre para auditoría",
      ],
    },
    color: {
      base: "#f08775",
      accent: "rgba(240, 135, 117, 0.16)",
    },
    ordering: 7,
    assets: {
      hero: "/departments/administracion/hero.svg",
      team: "/departments/administracion/team.svg",
      output: "/departments/administracion/output.svg",
    },
  },
  {
    slug: "rrhh",
    name: "Departamento de Recursos Humanos",
    shortName: "Recursos Humanos",
    promise:
      "Selección, onboarding, comunicación interna y desarrollo bajo control humano real.",
    description:
      "Un departamento de RR.HH. que prepara ofertas, redacta feedbacks, mantiene el manual vivo, programa onboarding guiado y propone planes de desarrollo. Las decisiones sensibles las toma tu equipo humano.",
    tagline: "Personas, selección, onboarding y cultura, ejecutados con tu voz.",
    category: "Personas",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Tiempos de cobertura", value: "Acotados" },
      { label: "Onboarding guiado", value: "Paso a paso" },
      { label: "Feedback continuo", value: "Trimestral" },
    ],
    members: [
      {
        id: "people-lead",
        role: "Dirección de personas",
        initials: "DP",
        pattern: "wave",
        responsibilities: [
          "Define la estrategia de talento",
          "Revisa decisiones sensibles",
          "Mantiene la coherencia cultural",
        ],
      },
      {
        id: "talent",
        role: "Talent acquisition",
        initials: "TA",
        pattern: "orbit",
        responsibilities: [
          "Investiga el mercado de talento",
          "Prepara ofertas y mensajes a candidatos",
          "Programa entrevistas y seguimientos",
        ],
      },
      {
        id: "onboarding",
        role: "Onboarding",
        initials: "OB",
        pattern: "grid",
        responsibilities: [
          "Diseña el primer mes de cada persona",
          "Mantiene plantillas de bienvenida",
          "Verifica que cada kit esté listo",
        ],
      },
      {
        id: "culture",
        role: "Cultura y comunicación interna",
        initials: "CC",
        pattern: "dots",
        responsibilities: [
          "Edita la newsletter interna",
          "Cuida el manual cultural",
          "Propone rituales de equipo",
        ],
      },
      {
        id: "development",
        role: "Desarrollo y feedback",
        initials: "DF",
        pattern: "bars",
        responsibilities: [
          "Prepara borradores de feedback continuo",
          "Propone planes de carrera",
          "Construye mapas de skills",
        ],
      },
      {
        id: "compliance",
        role: "Compliance laboral",
        initials: "CL",
        pattern: "spiral",
        responsibilities: [
          "Mantiene plantillas contractuales",
          "Controla vencimientos y alertas",
          "Documenta cada acción sensible",
        ],
      },
    ],
    capabilities: [
      "Selección con publicaciones preparadas y criba estructurada",
      "Onboarding guiado con plan para el primer mes",
      "Manual cultural vivo y comunicación interna",
      "Feedback continuo y planes de desarrollo",
      "Compliance laboral documentado",
      "Reportes mensuales de personas y rotación",
    ],
    deliverables: [
      "Ofertas en borrador listas para enviar",
      "Plan de onboarding por puesto",
      "Manual cultural documentado",
      "Plantillas de feedback y one-on-one",
      "Reportes trimestrales de talento",
    ],
    problems: [
      {
        title: "Coberturas que tardan meses",
        description:
          "El departamento prepara ofertas ágiles y mantiene viva tu cantera de talento.",
      },
      {
        title: "Onboarding inconsistente",
        description:
          "Cada nueva persona recibe el mismo plan adaptado a su puesto, no información a medias.",
      },
      {
        title: "Cultura que vive solo en el discurso",
        description:
          "Manual vivo, rituales listos y comunicación interna que se ejecuta cada semana.",
      },
    ],
    integrations: [
      "Notion",
      "Google Calendar",
      "Gmail",
      "Slack",
      "LinkedIn",
      "Greenhouse",
      "Personio",
      "BambooHR",
    ],
    workflow: defaultWorkflow,
    permissions: rrhhPermissions,
    faq: [
      {
        question: "¿Publica vacantes sin mi OK?",
        answer:
          "No. Te enseña cada mensaje y oferta, espera tu visto bueno y publica tras tu confirmación.",
      },
      {
        question: "¿Puede decidir quién se queda?",
        answer:
          "Nunca. Solo propone perfiles y agenda entrevistas; la decisión final siempre es humana.",
      },
      {
        question: "¿Cumple la normativa laboral?",
        answer:
          "Sí. Todas las plantillas contractuales siguen la normativa española y se revisan con tu asesoría jurídica.",
      },
      {
        question: "¿Y los datos personales sensibles?",
        answer:
          "Quedan fuera de su alcance por defecto. Solo accede a la información operativa con base legal clara.",
      },
    ],
    mission: {
      brief: "Necesitamos cubrir tres vacantes técnicas en menos de 6 semanas sin perder calidad.",
      response:
        "He revisado vuestras tres posiciones,你们的 perfiles previos y vuestras ofertas históricas. Propongo tres mensajes diferenciados por puesto, una cantera de 40 perfiles pre-cualificados y un onboarding listo por si cualquiera entra a la vez.",
      tasks: [
        "Investigar mercado de cada rol",
        "Preparar 3 mensajes de vacante",
        "Construir cantera inicial",
        "Definir plan de onboarding por puesto",
        "Programar primera ronda de entrevistas",
        "Cerrar con oferta lista para enviar",
      ],
    },
    color: {
      base: "#f5a866",
      accent: "rgba(245, 168, 102, 0.16)",
    },
    ordering: 8,
    assets: {
      hero: "/departments/rrhh/hero.svg",
      team: "/departments/rrhh/team.svg",
      output: "/departments/rrhh/output.svg",
    },
  },
  {
    slug: "logistica",
    name: "Departamento de Logística",
    shortName: "Logística",
    promise:
      "Inventario, rutas, proveedores y atención postventa coordinados bajo tus reglas.",
    description:
      "Un departamento de logística que mantiene tu inventario vivo, propone rutas óptimas, prepara comunicaciones al cliente y documenta incidencias. Tú decides qué se ejecuta y cuándo.",
    tagline: "Inventario, rutas y proveedores coordinados bajo control humano.",
    category: "Operaciones",
    status: "available",
    priceFrom: 99,
    priceCurrency: "EUR",
    metrics: [
      { label: "Cobertura de stock", value: "Continua" },
      { label: "Rutas optimizadas", value: "Diarias" },
      { label: "Tiempo de incidencia", value: "< 24 h" },
    ],
    members: [
      {
        id: "logistics-lead",
        role: "Dirección de logística",
        initials: "DL",
        pattern: "spiral",
        responsibilities: [
          "Define la estrategia de supply chain",
          "Revisa excepciones y roturas",
          "Coordina con tu equipo humano",
        ],
      },
      {
        id: "inventory",
        role: "Inventario",
        initials: "IN",
        pattern: "grid",
        responsibilities: [
          "Mantiene el stock actualizado",
          "Detecta umbrales de reposición",
          "Concilia entradas y salidas",
        ],
      },
      {
        id: "routing",
        role: "Planificación de rutas",
        initials: "RT",
        pattern: "wave",
        responsibilities: [
          "Optimiza rutas por ventana y destino",
          "Propone agrupados y prioridades",
          "Detecta excepciones en tiempo real",
        ],
      },
      {
        id: "suppliers",
        role: "Proveedores",
        initials: "PR",
        pattern: "orbit",
        responsibilities: [
          "Prepara pedidos de reposición",
          "Mantiene histórico de proveedores",
          "Detecta alternativas en caso de rotura",
        ],
      },
      {
        id: "tracking",
        role: "Seguimiento y atención",
        initials: "SG",
        pattern: "dots",
        responsibilities: [
          "Notifica al cliente sobre su pedido",
          "Mantiene trazabilidad por envío",
          "Resuelve dudas habituales",
        ],
      },
      {
        id: "returns",
        role: "Devoluciones y postventa",
        initials: "DV",
        pattern: "bars",
        responsibilities: [
          "Documenta cada incidencia",
          "Propone流程 de devolución",
          "Mantiene KPIs de calidad",
        ],
      },
    ],
    capabilities: [
      "Inventario conciliado en tiempo real",
      "Optimización de rutas diarias",
      "Reposición automática por umbrales",
      "Atención al cliente con trazabilidad por envío",
      "Devoluciones documentadas paso a paso",
      "Reportes operativos y de calidad",
    ],
    deliverables: [
      "Plan diario de rutas listo",
      "Pedidos de reposición en borrador",
      "Mensajes a clientes por envío",
      "Histórico auditable de incidencias",
      "Reportes semanales de operaciones",
    ],
    problems: [
      {
        title: "Stock que no cuadra con ventas",
        description:
          "El departamento concilia inventario, ventas y devoluciones para que nunca te quedes corto.",
      },
      {
        title: "Rutas improvisadas",
        description:
          "Cada día se propone un plan óptimo por ventana, destino y prioridad.",
      },
      {
        title: "Incidencias que se pierden",
        description:
          "Trazabilidad por envío: cada excepción queda documentada y resuelta bajo SLA.",
      },
    ],
    integrations: [
      "Holded",
      "Airtable",
      "Notion",
      "Google Sheets",
      "Gmail",
      "Slack",
      "Shopify",
      "Stripe",
    ],
    workflow: defaultWorkflow,
    permissions: logisticaPermissions,
    faq: [
      {
        question: "¿Toca inventario sin mi OK?",
        answer:
          "No. Solo propone ajustes. Cualquier modificación de stock queda a tu firma.",
      },
      {
        question: "¿Puede cancelar un pedido?",
        answer:
          "Nunca por su cuenta. Prepara la cancelación y los motivos, la decisión final es tuya.",
      },
      {
        question: "¿Qué pasa con las devoluciones?",
        answer:
          "Documenta cada incidencia, propone流程 y prepara reembolso borrador; tú apruebas el importe.",
      },
      {
        question: "¿Trabaja con mi Shopify o mi ERP?",
        answer:
          "Sí, se conecta a Shopify, Holded, Airtable y otros. Adaptamos el equipo a tu stack.",
      },
    ],
    mission: {
      brief: "Tenemos roturas de stock intermitentes y los pedidos salen tarde dos de cada diez veces.",
      response:
        "He auditado los últimos 90 días: detecto 6 referencias con umbral de reposición mal calibrado y dos rutas recurrentes que cruzan la ciudad a media tarde. Propongo recalibrar el inventario, fijar ventanas por zona y un plan diario optimizado durante seis semanas.",
      tasks: [
        "Cruzar ventas y stock de los últimos 90 días",
        "Recalibrar umbrales por referencia",
        "Segmentar rutas por ventanas y zonas",
        "Preparar plan diario optimizado",
        "Documentar protocolo de incidencias",
        "Informe semanal de calidad de servicio",
      ],
    },
    color: {
      base: "#7adcb5",
      accent: "rgba(122, 220, 181, 0.16)",
    },
    ordering: 9,
    assets: {
      hero: "/departments/logistica/hero.svg",
      team: "/departments/logistica/team.svg",
      output: "/departments/logistica/output.svg",
    },
  },
];

export const comingSoonDepartments: Pick<Department, "slug" | "name" | "shortName" | "tagline" | "status" | "ordering">[] = [];

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
  {
    name: "Slack",
    category: "communication",
    color: "#4A154B",
    reads: "Mensajes y menciones relevantes",
    prepares: "Resúmenes y propuestas de respuesta",
    requiresApproval: "Publicar mensajes en canales compartidos",
  },
  {
    name: "Stripe",
    category: "storage",
    color: "#635BFF",
    reads: "Pagos, suscripciones y facturas",
    prepares: "Conciliaciones y borradores de informes",
    requiresApproval: "Reembolsos y cancelaciones",
  },
  {
    name: "Airtable",
    category: "productivity",
    color: "#FCB400",
    reads: "Bases internas y registros operativos",
    prepares: "Vistas, dashboards y conciliaciones",
    requiresApproval: "Modificar o eliminar registros",
  },
  {
    name: "Notion",
    category: "productivity",
    color: "#000000",
    reads: "Documentación y bases de conocimiento",
    prepares: "Resúmenes, borradores y plantillas",
    requiresApproval: "Publicar páginas en espacios compartidos",
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
