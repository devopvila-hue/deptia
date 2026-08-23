// Helper para prefijar rutas con el segmento de locale cuando no es el default.
// ES: rutas sin prefijo (URLs actuales conservadas).
// EN: rutas con prefijo /en.
import type { Locale } from "./config";

// Rutas externas (Portal, docs, api) no se prefijan.
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function localePrefixPath(locale: Locale, href: string): string {
  if (!href || isExternal(href)) return href;
  if (href.startsWith("#")) return href;
  if (locale === "es") return href; // ES sin prefijo, conserva URLs actuales.
  // EN: prepend /en
  if (href === "/") return "/en";
  return `/en${href.startsWith("/") ? "" : "/"}${href}`;
}
