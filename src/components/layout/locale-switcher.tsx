"use client";

// Selector de idioma discreto ES | EN.
// - Discreto: mismo estilo que el resto del chrome (font-mono uppercase tracking).
// - Conserva la ruta equivalente al cambiar.
// - Determinista: el locale activo es el de la URL, no cookie.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { locales, localeShort, type Locale } from "@/i18n/config";

// Quita el prefijo /en o /es del pathname para obtener la ruta base canónica.
// Útil para construir el switch.
function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|es)(?=\/|$)/);
  if (!match) return pathname;
  const stripped = pathname.replace(/^\/(en|es)/, "");
  return stripped === "" ? "/" : stripped || "/";
}

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() || "/";
  const t = useTranslations("chrome.languageSwitcher");
  const base = stripLocale(pathname);

  return (
    <div
      aria-label={t("label")}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-soft/30 p-0.5"
    >
      {locales.map((loc) => {
        const href = loc === "es" ? base : base === "/" ? "/en" : `/en${base}`;
        const active = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={href}
            aria-current={active ? "true" : undefined}
            className={
              "rounded px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors " +
              (active
                ? "bg-foreground/10 text-foreground"
                : "text-muted hover:bg-surface-soft/60 hover:text-foreground")
            }
          >
            {localeShort(loc)}
          </Link>
        );
      })}
    </div>
  );
}
