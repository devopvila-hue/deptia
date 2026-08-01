import type { DepartmentAgent } from "@/components/departments/department-agent";

export const departmentAgents: Record<string, DepartmentAgent> = {
  marketing: {
    id: "marketing",
    name: "Sofía",
    role: "Dirección de Marketing",
    initials: "SM",
    icon: "MKT-01",
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
    icon: "SLS-02",
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
    icon: "CNT-03",
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
  operaciones: {
    id: "operaciones",
    name: "Aitor",
    role: "Dirección de Operaciones",
    initials: "AO",
    icon: "OPS-04",
    color: "#69b4ff",
    colorSoft: "rgba(105, 180, 255, 0.16)",
    avatarStyle: "operational",
    catchphrase: "Procesos vivos, datos conciliados, decisiones humanas.",
    intro:
      "Soy Aitor, llevaré este departamento. Mi trabajo es convertir tu operativa en procesos vivos, documentados y reversibles, sin quitarle el control a tu equipo humano.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Lo que entrego no es más software: es un equipo de operaciones que mantiene tus procesos vivos, los documenta y propone mejoras. Tu gente sigue decidiendo qué se ejecuta.",
        highlight:
          "Si un proceso vive en la cabeza de una persona, no es un proceso: es un riesgo.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Procesos dispersos, datos que no cuadran entre herramientas, automatizaciones que nadie sabe tocar. Te propongo un mapa vivo, conciliaciones diarias y automatizaciones documentadas.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección, diseño de procesos, datos, automatizaciones, integraciones y calidad. Seis roles especializados, una sola operación coordinada desde tu instancia privada.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Documentación viva de procesos, conciliaciones recurrentes, automatizaciones reversibles, auditorías periódicas. Todo queda explicable y reversible por tu equipo humano.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real sobre conciliar tres fuentes para detectar impagos. Fíjate: primero exploro qué hay, después propongo reglas y umbrales, por último documento el proceso. Nada se ejecuta sin tu OK.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto: el departamento lee, propone y prepara. Ninguna escritura en tus bases se ejecuta sin tu confirmación. Lo que toca datos sensibles queda bloqueado por defecto.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación en menos de una hora. Empezamos por un mapa vivo de tus procesos clave, priorizando los que más impacto tienen en ingresos o en quejas de cliente.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre la operativa habitual. Si sumas integraciones externas nuevas o conexión con ERPs pesados, lo hablamos antes para que sepas exactamente qué cuesta.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres un mapa inicial sin compromiso, escríbeme y agendamos una sesión de descubrimiento de 30 minutos.",
      },
    ],
  },
  "atencion-cliente": {
    id: "atencion-cliente",
    name: "Elena",
    role: "Dirección de Soporte",
    initials: "ES",
    icon: "SUP-05",
    color: "#c4a3ff",
    colorSoft: "rgba(196, 163, 255, 0.16)",
    avatarStyle: "support",
    catchphrase: "Memoria del cliente, tono consistente, escalado humano cuando hace falta.",
    intro:
      "Soy Elena. Mi prioridad es que cada cliente sienta que le conoce alguien, no que le responde un script. Te enseñaré cómo mantenemos memoria y tono en cada canal.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Un departamento que entiende al cliente antes de responder, propone el siguiente paso coherente con tu marca y escala lo sensible a tu equipo humano sin perder contexto.",
        highlight:
          "Si el cliente tiene que repetir su historia, no tienes soporte: tienes un muro.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Tiempos lentos, tono inconsistente entre canales, casos sensibles sin control. Te propongo respuestas propuestas, unificación de tono y escalado automático con resumen para tu equipo.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección, triaje, respuesta, base de conocimiento, escalado humano y calidad. Seis roles trabajando sobre el mismo historial conversacional por cliente.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Atención multicanal, memoria por cliente, borradores para tu visto bueno, escalado automático y una base de conocimiento que crece con cada caso resuelto.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real sobre reducir el tiempo de respuesta. No empezamos abriendo canales: clasificamos, automatizamos lo recurrente y aislamos lo sensible para tu equipo humano.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto nunca responde por ti: te enseña el borrador. Para reembolsos, descuentos o cierres, siempre escala a un humano con resumen completo del caso.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación que empieza por tu voz: tonos válidos, tonos prohibidos, FAQs iniciales y casos arquetipo. Sin ese trabajo previo, no abrimos canales al público.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre el volumen habitual. Si tu ticketera tiene picos estacionales, añadimos capacidad temporalmente con previo aviso y sin sorpresas en la factura.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres una auditoría de tu soporte actual antes de empezar, escríbeme y te preparo una sesión de 30 minutos.",
      },
    ],
  },
  seo: {
    id: "seo",
    name: "Sandra",
    role: "Dirección SEO",
    initials: "SO",
    icon: "OPT-06",
    color: "#6ed3a0",
    colorSoft: "rgba(110, 211, 160, 0.14)",
    avatarStyle: "analytic",
    catchphrase: "Auditoría técnica, estrategia temática, autoridad medida.",
    intro:
      "Soy Sandra, llevaré este departamento. Te voy a enseñar cómo construimos SEO a meses vista, con una auditoría técnica seria y una estrategia temática que respeta tu marca.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "SEO no es magia ni atajos. Es auditoría técnica, estrategia temática, contenidos optimizados y construcción de autoridad explicada paso a paso. Tú apruebas cada pieza antes de publicar.",
        highlight:
          "Si tu tráfico depende de paid, no tienes SEO: tienes una factura.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Tráfico estancado, contenidos sin estrategia, perfil de authority sucio. Te propongo un roadmap trimestral con auditorías, briefings y construcción de enlaces explicada y aprobada por ti.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección SEO, auditoría técnica, palabras clave, contenidos, link building y analítica. Seis roles coordinados en torno a tu situación actual y tus objetivos trimestrales.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Auditoría técnica trimestral, clusters temáticos, briefings SEO, outreach para autoridad, monitorización constante y reporting ejecutivo mensual.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición para salir del estancamiento orgánico. Empiezo auditando, después priorizo, termino proponiendo un roadmap trimestral con 8 piezas estratégicas para ti.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto nunca publica ni compra enlaces. Te presenta borradores de cada contenido y cada outreach. Cualquier borrado o reescritura queda a tu firma.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación con auditoría técnica inicial. Sin ese punto de partida no empezamos a producir: si no sabemos qué falla, cualquier esfuerzo es a ciegas.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre el ritmo sostenido. SEO se mide a meses vista, no a semanas. Si quieres una auditoría sin compromiso como primer paso, tienes sesionesDiscovery prepadas.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres saber en qué punto está realmente tu SEO hoy, escríbeme y te propongo un primer diagnóstico de 30 minutos.",
      },
    ],
  },
  administracion: {
    id: "administracion",
    name: "Carmen",
    role: "Dirección Administrativa",
    initials: "CA",
    icon: "ADM-07",
    color: "#f08775",
    colorSoft: "rgba(240, 135, 117, 0.16)",
    avatarStyle: "administrative",
    catchphrase: "Conciliaciones vivas, reporting claro, control humano siempre.",
    intro:
      "Soy Carmen. Voy a traer orden a tu operativa administrativa para que cada número tenga trazabilidad, y tu asesoría solo valide en lugar de construir desde cero.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "Facturación recurrente, conciliaciones vivas, reporting ejecutivo y documentación lista para tu asesoría. Trabajo contigo y con tu asesoría; nunca en su lugar.",
        highlight:
          "Si tu cierre trimestral depende de noches en una hoja, no tienes administración: tienes un héroe quemándose.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Hojas dispersas, cierres que tardan semanas, riesgo de incumplimiento. Propongo conciliaciones diarias, borradores ejecutivos y soporte real a tu asesoría.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección administrativa, facturación, gastos, conciliaciones, reporting y cumplimiento. Seis roles coordinados para darte una sola fuente de la verdad operativa.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Facturación recurrente, clasificación de gastos, conciliaciones bancarias, borradores de informes ejecutivos y documentación auditable para tu asesoría.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real para cerrar el trimestre sin errores. No ejecuto pagos: cuaderno, propongo asientos, y dejo todo preparado para que tu asesoría valide con margen.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto no ejecuta movimientos financieros. Solo propone. Para cerrar libros, firmar contratos o tocar medios de pago, siempre escalo a un humano.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación que empieza conectando tus fuentes financieras y entendiendo cómo trabaja tu asesoría. Sin esa primera foto, todo lo demás se monta sobre arena.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre el volumen administrativo habitual. Si tu operativa escala (más países, varios ERP, multi-moneda), lo conversamos antes para que sepas qué cuesta.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres ver un ejemplo de cierre trimestral con tus mismos números, agendo una sesión de diagnóstico de 30 minutos.",
      },
    ],
  },
  rrhh: {
    id: "rrhh",
    name: "Noa",
    role: "Dirección de Personas",
    initials: "NP",
    icon: "PPL-08",
    color: "#f5a866",
    colorSoft: "rgba(245, 168, 102, 0.16)",
    avatarStyle: "people",
    catchphrase: "Talento, cultura y decisiones humanas, en orden.",
    intro:
      "Soy Noa, llevaré este departamento. Mi prioridad es que cada persona sea tratada como tal: con cuidado, con tu voz y dejando las decisiones sensibles en manos de tu equipo humano.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "No contrato personas: te ayudo a cubrirlas, cuidarlas y desarrollarlas. El departamento prepara, propone y documenta; las decisiones de personas importantes siguen siendo tuyas.",
        highlight: "Un buen equipo se cuida. Un gran equipo se cuida con sistemas.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Coberturas lentas, onboarding sin estructura, cultura solo en el discurso. Te propongo vacantes ágiles, planes de primer mes y manual cultural que se ejecuta cada semana.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección, talento, onboarding, cultura, desarrollo y compliance. Seis roles especializados en torno a la misma voz, la misma cultura y los mismos principios.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Selección con mensajes diferenciados, onboarding guiado, manual cultural, feedback continuo y compliance laboral documentado. Si necesitas algo más, lo adaptamos.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real para cubrir tres puestos en 6 semanas. Fíjate en el orden: investigo, preparo mensajes diferenciados, construyo cantera, después coordino entrevistas sin forzar a nadie.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto, el departamento propone y nunca contrata, despide ni modifica sueldos a tu nombre. Lo sensible queda escalado a tu equipo humano con contexto completo.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación que empieza por tu voz y tu cultura. Sin manual cultural previo, publicamos poco: primero alineamos, después ejecutamos con consistencia.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre el ritmo habitual. Si necesitas reclutamiento internacional o más de 10 vacantes simultáneas, lo hablamos antes para que sepas exactamente qué coste añadirá.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres una auditoría de tu proceso actual de selección, escríbeme y te propongo una sesión de 30 minutos.",
      },
    ],
  },
  logistica: {
    id: "logistica",
    name: "Bruno",
    role: "Dirección de Logística",
    initials: "BL",
    icon: "LOG-09",
    color: "#7adcb5",
    colorSoft: "rgba(122, 220, 181, 0.16)",
    avatarStyle: "logistics",
    catchphrase: "Stock vivo, rutas optimizadas, decisiones en tus manos.",
    intro:
      "Soy Bruno, llevaré este departamento. Voy a mantener tu operación viva: inventario, rutas, proveedores y atención al envío. Tú decides cuándo se ejecuta cada acción.",
    scripts: [
      {
        id: "intro",
        sectionId: "agent-intro",
        sectionLabel: "Visión general",
        message:
          "El departamento coordina inventario, rutas y atención de cada envío. Lo que hago no es automatizar: es darte visibilidad y proponer, dejando las decisiones críticas en tu equipo.",
        highlight:
          "Si cada excepción es sorpresa, no tienes logística, tienes improvisación.",
      },
      {
        id: "problems",
        sectionId: "agent-problems",
        sectionLabel: "Problemas",
        message:
          "Roturas intermitentes, rutas improvisadas, incidencias que se pierden. Te propongo recalibrar inventario, planificar rutas y documentar cada excepción con SLA.",
      },
      {
        id: "members",
        sectionId: "agent-members",
        sectionLabel: "Equipo",
        message:
          "Dirección, inventario, rutas, proveedores, seguimiento y devoluciones. Seis roles coordinados para que cada pedido cumpla su SLA sin perder el control humano.",
      },
      {
        id: "capabilities",
        sectionId: "agent-capabilities",
        sectionLabel: "Capacidades",
        message:
          "Inventario conciliado, optimización de rutas, reposición automática por umbrales, atención al envío trazada y devoluciones documentadas. Te ayudo a definir umbrales y SLA.",
      },
      {
        id: "mission",
        sectionId: "agent-mission",
        sectionLabel: "Misión real",
        message:
          "Esta es una petición real con roturas intermitentes y pedidos tarde. Empiezo auditando 90 días, recalibro umbrales y propongo rutas por zona y ventana durante seis semanas.",
      },
      {
        id: "permissions",
        sectionId: "agent-permissions",
        sectionLabel: "Permisos",
        message:
          "Por defecto no mueve stock, no cancela pedidos ni aprueba devoluciones económicas. Solo propone. Cada acción queda registrada con autor y motivo.",
      },
      {
        id: "workflow",
        sectionId: "agent-workflow",
        sectionLabel: "Activación",
        message:
          "Activación que empieza conectando tus fuentes: ventas, stock y transportistas. Sin esa primera foto no optimizamos nada: todo sería a ciegas.",
      },
      {
        id: "price",
        sectionId: "agent-price",
        sectionLabel: "Precio",
        message:
          "El precio cubre el volumen operativo habitual. Si sumas multi-país, multi-almacén o transportistas con SLA duro, lo hablamos antes para que sepas qué costará.",
      },
      {
        id: "faq",
        sectionId: "agent-faq",
        sectionLabel: "Preguntas",
        message:
          "Las preguntas más habituales. Si quieres una auditoría de tus rutas e incidencias, agendo una sesión de diagnóstico de 30 minutos.",
      },
    ],
  },
};

export function getAgent(slug: string): DepartmentAgent | undefined {
  return departmentAgents[slug];
}
