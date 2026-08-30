import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { listPublicDepartments } from "@/data/departments";

// Sitemap a nivel raíz. Se publica en `/sitemap.xml` con todas las URLs
// públicas indexables (ES + EN), declarando hreflang en cada entrada.
//
// El sitemap incluye:
//   · Rutas bilingües top-level (home, /departamentos, /como-funciona, …)
//   · Las 7 páginas del catálogo público (6 comerciales + Developer)
//   · Recursos publicados
//
// Lo que NO entra aquí (por decisión de arquitectura):
//   · /api, /admin, /panel, /registro, /acceso, /demo (bloqueados en robots)
//   · Slugs legacy de departamento (Contenido, Operaciones, RR.HH., …).
//     Siguen existiendo en `data/departments.ts` como datos internos.
//   · Dirección: no es una URL, se describe como base incluida en
//     /departamentos.
//
// `lastModified` se mantiene estable por tipo de contenido — las páginas
// de marketing cambian con cada release menor (mensual), los departamentos
// cuando se actualizan sus datos (quincenal), los recursos cuando se publica
// una nueva pieza (quincenal). Evita el patrón "ahora" para todo, que
// entrena a Google a esperar cambios diarios y diluye la señal de recency.
const BASE = brand.url;

// Slugs de recursos, mantenidos sincronizados con i18n/messages/{es,en}.json
// (`recursos.items[].slug`). Hardcodeado aquí a propósito: el sitemap es
// build-time y no debe depender de runtime translation loading.
const RESOURCE_SLUGS = [
  "como-decidir-que-departamento-contratar-primero",
  "marketing-y-ventas-coordinados",
  "chatbots-vs-departamentos",
  "actualizaciones-octubre",
  "activacion-departamento-en-30-minutos",
  "brief-de-primera-mision",
] as const;

// Fechas estables por tipo de contenido. Si actualizas el contenido,
// bump la fecha correspondiente — el sitemap refleja la realidad.
const DATES = {
  marketingHome: new Date("2026-08-15"),
  catalog: new Date("2026-08-15"),
  how: new Date("2026-08-10"),
  resources: new Date("2026-08-20"),
  pricing: new Date("2026-08-12"),
  security: new Date("2026-07-28"),
  contact: new Date("2026-06-01"),
  legal: new Date("2026-05-01"),
} as const;

type RouteSpec = {
  path: string;
  priority: number;
  changeFrequency: "yearly" | "monthly" | "weekly" | "daily";
  lastModified: Date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const es = (path: string) => `${BASE}${path}`;
  const en = (path: string) =>
    path === "/" ? `${BASE}/en` : `${BASE}/en${path}`;

  // Rutas con cobertura bilingüe + frecuencia/prioridad/lastModified
  // ajustados a la cadencia real del contenido.
  const localizedRoutes: RouteSpec[] = [
    { path: "/", priority: 1, changeFrequency: "weekly", lastModified: DATES.marketingHome },
    { path: "/departamentos", priority: 0.9, changeFrequency: "weekly", lastModified: DATES.catalog },
    { path: "/como-funciona", priority: 0.8, changeFrequency: "monthly", lastModified: DATES.how },
    { path: "/recursos", priority: 0.7, changeFrequency: "monthly", lastModified: DATES.resources },
    { path: "/precios", priority: 0.9, changeFrequency: "monthly", lastModified: DATES.pricing },
    { path: "/seguridad", priority: 0.7, changeFrequency: "monthly", lastModified: DATES.security },
    { path: "/contacto", priority: 0.5, changeFrequency: "yearly", lastModified: DATES.contact },
    { path: "/privacidad", priority: 0.3, changeFrequency: "yearly", lastModified: DATES.legal },
    { path: "/terminos", priority: 0.3, changeFrequency: "yearly", lastModified: DATES.legal },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly", lastModified: DATES.legal },
  ];

  const localizedPages: MetadataRoute.Sitemap = localizedRoutes.flatMap(
    ({ path, priority, changeFrequency, lastModified }) => [
      {
        url: es(path),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            "es-ES": es(path),
            "en-US": en(path),
            "x-default": es(path),
          },
        },
      },
      {
        url: en(path),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            "es-ES": es(path),
            "en-US": en(path),
            "x-default": es(path),
          },
        },
      },
    ],
  );

  // Páginas de departamento — bilingüe (ES + EN). Filtradas por
  // PUBLIC_DEPARTMENT_SLUGS para mantener consistencia con /departamentos,
  // nav y footer. El resto de slugs existen en `data/departments.ts` pero
  // no deben aparecer en el sitemap público.
  const departmentPages: MetadataRoute.Sitemap = listPublicDepartments().flatMap((d) => {
    const esPath = `/departamentos/${d.slug}`;
    const enPath = `/en/departamentos/${d.slug}`;
    return [
      {
        url: `${BASE}${esPath}`,
        lastModified: DATES.catalog,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            "es-ES": `${BASE}${esPath}`,
            "en-US": `${BASE}${enPath}`,
            "x-default": `${BASE}${esPath}`,
          },
        },
      },
      {
        url: `${BASE}${enPath}`,
        lastModified: DATES.catalog,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            "es-ES": `${BASE}${esPath}`,
            "en-US": `${BASE}${enPath}`,
            "x-default": `${BASE}${esPath}`,
          },
        },
      },
    ];
  });

  // Páginas de recursos — bilingüe. lastModified por recurso cuando
  // se actualice el contenido; usamos la fecha del index como approximation.
  const resourcePages: MetadataRoute.Sitemap = RESOURCE_SLUGS.flatMap((slug) => {
    const esPath = `/recursos/${slug}`;
    const enPath = `/en/recursos/${slug}`;
    return [
      {
        url: `${BASE}${esPath}`,
        lastModified: DATES.resources,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            "es-ES": `${BASE}${esPath}`,
            "en-US": `${BASE}${enPath}`,
            "x-default": `${BASE}${esPath}`,
          },
        },
      },
      {
        url: `${BASE}${enPath}`,
        lastModified: DATES.resources,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            "es-ES": `${BASE}${esPath}`,
            "en-US": `${BASE}${enPath}`,
            "x-default": `${BASE}${esPath}`,
          },
        },
      },
    ];
  });

  return [...localizedPages, ...departmentPages, ...resourcePages];
}
