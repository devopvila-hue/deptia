import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

/**
 * robots.txt localizado. Next.js emite este archivo bajo `/[locale]/robots.txt`
 * (es decir, `/es/robots.txt` y `/en/robots.txt`). Las sitemaps localizadas se
 * emiten bajo el mismo segmento. Como Google y Bing descubren robots.txt por
 * su URL canónica del dominio, declaramos ambos endpoints aquí para que cada
 * crawler descubra su sitemap localizada.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo", "/registro", "/acceso", "/api", "/admin", "/panel"],
      },
    ],
    sitemap: [
      `${brand.url}/es/sitemap.xml`,
      `${brand.url}/en/sitemap.xml`,
    ],
  };
}
