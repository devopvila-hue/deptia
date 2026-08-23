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
});

// Helpers para <Link>, useRouter, redirect, getPathname con soporte i18n.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
