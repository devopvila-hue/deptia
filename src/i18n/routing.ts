// Routing i18n — usa el segmento dinámico [locale] con localePrefix "as-needed":
//   /                       → ES (default, sin prefijo en URL, conserva URLs actuales)
//   /en                     → EN
//   /departamentos          → ES
//   /en/departamentos       → EN
// No hay redirección para `/` → `/es/...`: las URLs actuales siguen siendo válidas.
// Detección por navegador desactivada: el idioma es siempre la URL. Determinista.
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Sin detección por navegador: el idioma es siempre la URL. Si no hay
  // prefijo, se sirve el defaultLocale (es). Evita que Accept-Language
  // de un bot desvíe /departamentos/marketing hacia /en/departamentos/marketing
  // y mantiene la URL canónica determinista.
  localeDetection: false,
});

// Helpers para <Link>, useRouter, redirect, getPathname con soporte i18n.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
