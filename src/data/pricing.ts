import type { PricingPlan } from "@/types/department";

export const pricingPlans: PricingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    description: "Para incorporar un primer departamento y validar la dinámica.",
    price: { monthly: 99, yearly: 990 },
    currency: "EUR",
    features: [
      "Un departamento completo",
      "Un usuario administrador",
      "Panel privado accesible desde web y Telegram",
      "Onboarding guiado en menos de 30 minutos",
      "Borradores, tareas e informes",
      "Uso mensual incluido para el alcance habitual",
    ],
    cta: { label: "Empezar con un departamento", href: "https://app.departify.app/signup?plan=starter" },
  },
  {
    slug: "business",
    name: "Business",
    description: "El plan recomendado para empresas en crecimiento.",
    price: { monthly: 249, yearly: 2490 },
    currency: "EUR",
    features: [
      "Hasta tres departamentos simultáneos",
      "Cinco usuarios administradores",
      "Integraciones con CRM, email, calendario y redes",
      "Automatizaciones y flujos de aprobación",
      "Informes avanzados y métricas por canal",
      "Soporte prioritario en horario laboral",
    ],
    cta: { label: "Crear mi equipo", href: "https://app.departify.app/signup?plan=business" },
    highlighted: true,
    badge: "Recomendado",
  },
  {
    slug: "company",
    name: "Company",
    description: "Para estructuras más amplias o con necesidades a medida.",
    price: { monthly: 499, yearly: 4990 },
    currency: "EUR",
    features: [
      "Más departamentos y sub-espacios de marca",
      "Configuración personalizada de la instancia",
      "Mayor capacidad de uso mensual",
      "Integraciones avanzadas y conectores a medida",
      "Onboarding asistido con sesiones dedicadas",
      "Soporte prioritario con SLA",
    ],
    cta: { label: "Hablar con nosotros", href: "/contacto?plan=company" },
  },
];

export const pricingNotes = [
  "El consumo intensivo de generación de vídeo, audio, campañas masivas o servicios externos puede requerir créditos adicionales.",
  "Puedes cambiar de plan en cualquier momento desde el panel de administración.",
  "Si cancelas, tu instancia se mantiene durante 30 días por si decides reactivar.",
];
