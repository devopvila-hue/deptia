// Catálogo de locales soportados y locale por defecto.
// ES es source of truth. EN añadido en Sprint i18n 01.
// Añadir fr/de más adelante sin tocar componentes: solo este archivo + fr.json/de.json.
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Locale canónico BCP-47 usado en <html lang>, hreflang y OpenGraph.
export function toBcp47(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en-US";
}

// Etiqueta humana mostrada en el selector de idioma.
export function localeLabel(locale: Locale): string {
  return locale === "es" ? "Español" : "English";
}

// Etiqueta corta usada en badges/chips.
export function localeShort(locale: Locale): string {
  return locale === "es" ? "ES" : "EN";
}
