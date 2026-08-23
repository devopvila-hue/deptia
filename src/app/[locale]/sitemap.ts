import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { departments } from "@/data/departments";

// Genera el sitemap con variantes ES + EN para las rutas que tienen cobertura
// bilingüe (ver src/i18n/guard.ts: LOCALIZED_ROUTES + /departamentos/[slug]).
// Las rutas que sólo tienen versión ES se incluyen una sola vez, con hreflang
// ES-only (Google las entiende como URLs de un solo idioma).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const now = new Date();

  const es = (path: string) => `${base}${path}`;
  const en = (path: string) =>
    path === "/" ? `${base}/en` : `${base}/en${path}`;

  // Rutas con cobertura bilingüe
  const localizedRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/departamentos", priority: 0.9, changeFrequency: "weekly" as const },
  ];

  // Rutas sólo-ES (legal, recursos, demo). Aparecen una vez sin variant.
  const esOnlyRoutes = [
    { path: "/como-funciona", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/seguridad", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/precios", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contacto", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terminos", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
    // /demo se omite del sitemap: robots.ts lo bloquea (Disallow: /demo).
  ];

  const localizedPages: MetadataRoute.Sitemap = localizedRoutes.flatMap(({ path, priority, changeFrequency }) => [
    {
      url: es(path),
      lastModified: now,
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
      lastModified: now,
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
  ]);

  const esOnlyPages: MetadataRoute.Sitemap = esOnlyRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: es(path),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  // Department pages — bilingües (ES + EN)
  const departmentPages: MetadataRoute.Sitemap = departments.flatMap((d) => {
    const esPath = `/departamentos/${d.slug}`;
    const enPath = `/en/departamentos/${d.slug}`;
    return [
      {
        url: `${base}${esPath}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            "es-ES": `${base}${esPath}`,
            "en-US": `${base}${enPath}`,
            "x-default": `${base}${esPath}`,
          },
        },
      },
      {
        url: `${base}${enPath}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            "es-ES": `${base}${esPath}`,
            "en-US": `${base}${enPath}`,
            "x-default": `${base}${esPath}`,
          },
        },
      },
    ];
  });

  return [...localizedPages, ...esOnlyPages, ...departmentPages];
}