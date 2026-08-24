// Guard de cobertura i18n por ruta.
//
// Lista blanca de rutas que tienen contenido localizado en ES + EN. Las rutas que
// NO están aquí sólo tienen versión ES; cuando se accede a ellas con locale='en'
// debemos devolver 404 (que se renderiza con el not-found localizado) para
// preservar la regla ZERO-MIXED del brief.
//
// Para añadir una nueva ruta bilingüe: añadirla al Set correspondiente.
//
// IMPORTANTE: este guard es la única fuente de verdad sobre qué rutas están
// internacionalizadas. No usar `locale === 'en'` en el código de página.
import { notFound } from "next/navigation";
import type { Locale } from "./config";

/** Rutas (sin locale) que están traducidas a ambos idiomas. */
export const LOCALIZED_ROUTES: ReadonlySet<string> = new Set([
  "/",
  "/departamentos",
  "/como-funciona",
  "/contacto",
  "/demo",
  "/precios",
  "/privacidad",
  "/recursos",
  "/seguridad",
  "/cookies",
  "/terminos",
]);

/**
 * Versión dinámica para rutas con segmentos. Úsala para `/departamentos/[slug]`.
 * Devuelve true si la ruta base está cubierta para el locale indicado.
 */
export function isRouteLocalized(pathname: string): boolean {
  // Limpia prefijos /en o /es que pueda traer
  const clean = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  if (LOCALIZED_ROUTES.has(clean)) return true;
  // Rutas con segmentos dinámicos conocidos
  if (clean.startsWith("/departamentos/")) return true;
  if (clean.startsWith("/recursos/")) return true;
  return false;
}

/**
 * Llama a `notFound()` (404 localizado) si la ruta no está traducida al locale dado.
 * Úsalo al principio de cada página que aún no se ha refactorizado para bilingüe.
 *
 * @example
 *   export default async function Page({ params }) {
 *     const { locale } = await params;
 *     assertLocalizedForRoute(locale, "/como-funciona");
 *     // ... resto del render ES-only
 *   }
 */
export function assertLocalizedForRoute(locale: Locale | string, _route: string): void {
  const typedLocale = locale as Locale;
  if (typedLocale === "es") return; // ES siempre cubierto (fuente de verdad)
  // Para EN: confiar en la lógica de isRouteLocalized usando la ruta solicitada.
  // La página que llama pasa su _route; el guard valida.
  if (isRouteLocalized(_route)) return;
  notFound();
}