// Configuración de next-intl por-request.
// Carga el catálogo correspondiente al locale del segmento [locale].
// Implementa la regla del brief: si falta una clave requerida, FAIL en build/dev,
// no fallback silencioso a otro idioma.
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 15 / next-intl 3.22+: requestLocale es Promise.
  const requested = await requestLocale;
  const locale: Locale =
    requested && (locales as readonly string[]).includes(requested)
      ? (requested as Locale)
      : defaultLocale;

  const messages = (await import(`./messages/${locale}.json`)).default;

  // Validación de paridad: si existe el otro catálogo y difiere en keys, lanza error
  // en dev/build para evitar "mezcla silenciosa" en producción.
  if (process.env.NODE_ENV !== "production") {
    const otherLocale = locale === "es" ? "en" : "es";
    try {
      const other = (await import(`./messages/${otherLocale}.json`)).default;
      const a = Object.keys(flatten(messages)).sort();
      const b = Object.keys(flatten(other)).sort();
      if (a.length !== b.length || a.some((k, i) => k !== b[i])) {
        const missingInOther = a.filter((k) => !(k in flatten(other)));
        const extraInOther = b.filter((k) => !(k in flatten(messages)));
        console.warn(
          `[i18n] key parity drift between '${locale}' and '${otherLocale}': ` +
            `missingInOther=${missingInOther.length} extraInOther=${extraInOther.length}`,
        );
        if (missingInOther.length) console.warn(`  missing in ${otherLocale}:`, missingInOther.slice(0, 20));
        if (extraInOther.length) console.warn(`  extra in ${otherLocale}:`, extraInOther.slice(0, 20));
      }
    } catch {
      // El otro catálogo aún no existe — solo se valida cuando ambos están.
    }
  }

  return { locale, messages };
});

// Aplana un objeto anidado a keys con notación de puntos.
function flatten(input: Record<string, unknown>, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v as Record<string, unknown>, key));
    } else {
      out[key] = String(v ?? "");
    }
  }
  return out;
}
