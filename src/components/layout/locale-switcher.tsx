"use client";

// Selector de idioma discreto ES | EN.
// - Discreto: mismo estilo que el resto del chrome (font-mono uppercase tracking).
// - Conserva la ruta equivalente al cambiar.
// - Determinista: el locale activo es el de la URL, no cookie.
//
// Implementación: usa el Link i18n-aware de @/i18n/routing en lugar del
// next/link plano. Con localePrefix: 'as-needed', el Link plano no navega
// correctamente al cambiar entre locales (especialmente EN → ES) porque no
// entiende la semántica del segmento [locale]. El Link de next-intl sabe que
// /departamentos = ES y /en/departamentos = EN, y enruta correctamente.
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { localeShort, type Locale } from "@/i18n/config";

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const t = useTranslations("chrome.languageSwitcher");

  return (
    <div
      aria-label={t("label")}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-soft/30 p-0.5"
    >
      {(["es", "en"] as const).map((loc) => {
        const active = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={{ pathname, query: undefined }}
            locale={loc}
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
