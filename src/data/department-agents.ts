import type { DepartmentAgent } from "@/components/departments/department-agent";

export const departmentAgents: Record<string, DepartmentAgent> = {
  marketing: {
    id: "marketing",
    name: "Sofía",
    role: "Dirección de Marketing",
    initials: "SM",
    color: "#d8ff62",
    colorSoft: "rgba(216, 255, 98, 0.16)",
    avatarStyle: "strategic",
    catchphrase: "Estrategia, ejecución y memoria de marca.",
    intro:
      "Te acompaño por el departamento. Te explicaré qué hace cada miembro, cómo se coordinan y qué puedes esperar cuando contrates este equipo.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Hola, soy Sofía. Dirigiré este departamento cuando lo actives. Mi trabajo es que cada campaña tenga una estrategia detrás, un plan operativo y memoria para que la siguiente iteración sea mejor que la anterior.",
        highlight:
          "No entrego tareas sueltas. Entrego departamentos que ejecutan y aprenden.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Estos son los tres problemas que más cuesta resolver sin estructura. La mayoría de empresas que llegan a nosotros ya han probado herramientas, agencias, freelancers. Lo que les falta es exactamente lo que ofrecemos: un equipo que opera bajo tus reglas.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Detrás de cada misión hay seis personas especializadas: dirección estratégica, copywriting, email, redes, analítica y medios. Cada una sabe qué tiene que hacer y cuándo pedir tu aprobación.",
        highlight:
          "Cuando le pides algo al equipo, no se lo estás pidiendo a un chatbot. Se lo estás pidiendo a un equipo de seis.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Estas son las capacidades habituales. Si necesitas algo más específico, el equipo se adapta durante el onboarding para incorporar nuevas herramientas o metodologías.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real y la respuesta del departamento. Fíjate en el orden: primero analiza, después propone, luego espera tu aprobación. Nunca al revés.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Aquí ves la autonomía por defecto. Nosotros recomendamos: el equipo prepara y propone, tú apruebas antes de publicar o enviar. Para cosas sensibles, ni siquiera tiene acceso.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "De la contratación a la primera misión, en menos de una hora. La instancia se crea, el equipo aprende tu marca y empieza a trabajar bajo tus reglas. Puedes ver el proceso completo en la página de cómo funciona.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "Este departamento tiene un precio de entrada claro. No hay costes ocultos por uso habitual. Solo si generas mucho vídeo o campañas masivas, podrías necesitar créditos adicionales. Siempre te avisamos antes.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si tienes alguna otra, escríbeme desde el formulario de contacto y te respondo personalmente.",
      },
    ],
  },
  ventas: {
    id: "ventas",
    name: "Marcos",
    role: "Dirección Comercial",
    initials: "MC",
    color: "#7ce5a3",
    colorSoft: "rgba(124, 229, 163, 0.16)",
    avatarStyle: "commercial",
    catchphrase: "Pipeline vivo, seguimiento persistente, cierres limpios.",
    intro:
      "Soy Marcos, dirigiré este departamento. Te voy a enseñar cómo investigamos cuentas, preparamos outreach y mantenemos el pipeline activo sin que pierdas el control.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Lo que vendo no es una herramienta, es un equipo. La diferencia es que este equipo investiga a tus cuentas antes de escribir, mantiene cadencia de seguimiento y no deja deals huérfanos en el pipeline.",
        highlight: "Cada cuenta tiene un dossier vivo. Cada interacción queda registrada.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Leads que se enfrían, propuestas que tardan días, pipelines sin orden. Si te suena, este departamento está diseñado exactamente para esto. No para generar más leads, para que los que ya tienes no se pierdan.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Investigación, prospección, seguimiento, propuestas y operaciones de CRM. Más yo como dirección. Cada cuenta pasa por al menos tres manos antes de llegar a una propuesta.",
        highlight: "No envío emails genéricos. Investigamos, preparamos, personalizamos.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Estas son las capacidades que vienen por defecto. Durante el onboarding, configuramos los criterios de cualificación según tu ICP, no el genérico.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una reactivación real. Fíjate que no empezamos enviando emails: primero auditamos el pipeline, clasificamos por señal, después proponemos tres secuencias distintas según el tipo de cuenta.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Importante: este departamento nunca cierra un deal sin tu OK. Puede actualizar el estado de un deal, preparar la propuesta, pero moverlo a 'cerrado' requiere tu aprobación explícita.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "La activación se conecta a tu CRM y tus herramientas. En menos de una hora ya tenemos el primer dossier de cuentas prioritarias listo para revisar contigo.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El plan Business cubre hasta 500 cuentas activas simultáneas. Si tienes más, hablamos. No hay sorpresa en la factura.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si necesitas una demo personalizada con tus cuentas, escríbeme y agendamos una sesión de 30 minutos.",
      },
    ],
  },
  contenido: {
    id: "contenido",
    name: "Lucía",
    role: "Dirección Creativa",
    initials: "LC",
    color: "#ffbd59",
    colorSoft: "rgba(255, 189, 89, 0.16)",
    avatarStyle: "creative",
    catchphrase: "Dirección creativa, guiones, creatividades y producción.",
    intro:
      "Soy Lucía, llevaré la dirección creativa de este departamento. Te voy a enseñar cómo mantenemos una línea editorial coherente y producimos bajo una misma visión.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Cuando contratas este departamento, contratas una dirección creativa, no un script. Mantenemos la línea editorial viva, coordinamos guion, diseño y producción. Tú apruebas, nosotros ejecutamos.",
        highlight:
          "La creatividad sin sistema es un sorteo. Aquí tenemos sistema sin perder creatividad.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Piezas sin coherencia entre formatos, producción paralizada por cuellos de botella, sin aprendizaje acumulativo. Lo que ofrezco no es más contenido, es mejor contenido bajo una dirección.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección creativa, estrategia editorial, guion, diseño, vídeo y distribución. Seis roles, una sola línea editorial. Si tu marca cambia, todos cambian al mismo tiempo.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Guiones, creatividades, vídeo, calendario editorial, distribución. Si tienes un formato específico que no ves aquí, dímelo y lo añadimos al plan.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real para una serie de vídeos. Fíjate en el orden: identifico los casos con mejor potencial, construyo una escaleta común, después escribo cada guion manteniendo el hilo conductor.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "El equipo nunca publica contenido sin tu visto bueno. Lo que sí puede hacer: preparar guiones, storyboards, creatividades. Lo que no: subir nada a tu canal sin tu OK explícito.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "La activación de este departamento incluye una sesión específica de marca: tono, paleta, tipografías, referencias, lo que funciona y lo que no. Sin esa sesión, no empezamos a producir.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio base cubre el ritmo habitual de producción. Si escalas a producción intensiva de vídeo o audio, hablamos de créditos adicionales. Te avisamos antes de generar nada que cueste.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres ver ejemplos de dirección creativa con marcas similares a la tuya, escríbeme y te paso una selección.",
      },
    ],
  },
};

export function getAgent(slug: string): DepartmentAgent | undefined {
  return departmentAgents[slug];
}
