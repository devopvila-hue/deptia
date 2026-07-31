import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { departments, comingSoonDepartments } from "@/data/departments";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/departamentos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/como-funciona`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seguridad`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/precios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/acceso`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/registro`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const departmentPages: MetadataRoute.Sitemap = [
    ...departments.map((d) => ({
      url: `${base}/departamentos/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...comingSoonDepartments.map((d) => ({
      url: `${base}/departamentos/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];

  return [...staticPages, ...departmentPages];
}
