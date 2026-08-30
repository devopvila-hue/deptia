import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

// robots.txt a nivel raíz. Se publica en `/robots.txt` (canónico del dominio)
// para que cualquier crawler que consulte el dominio descubra su sitemap y
// las rutas que NO debe rastrear. Las áreas privadas (panel, admin,
// registro, demo, acceso) están explícitamente bloqueadas para evitar
// indexación de estados autenticados.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo", "/registro", "/acceso", "/api", "/admin", "/panel"],
      },
    ],
    sitemap: `${brand.url}/sitemap.xml`,
    host: brand.url,
  };
}
