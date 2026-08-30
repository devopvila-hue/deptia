/**
 * Middleware de Next.js:
 * 1. Manejo de sesión Supabase y rutas protegidas (existente).
 * 2. i18n — next-intl middleware combina detección de locale + Supabase.
 *    Detección por navegador DESACTIVADA (localePrefix: 'as-needed' + no cookie):
 *    la URL es la autoridad del idioma. Determinista.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const PROTECTED_PREFIXES = ["/panel", "/admin"];
const AUTH_PAGES = ["/acceso", "/registro"];

const intl = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1) i18n — primero decide el locale y construye response con headers correctos.
  const intlResponse = intl(request);

  // 2) Supabase — refresca sesión si existe, sobre el response de i18n.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return intlResponse;

  const response = intlResponse;
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Las rutas /panel y /admin existen dentro de [locale]. Quitamos el
  // prefijo /en para evaluar el match contra los PROTECTED_PREFIXES originales.
  const stripped = path.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

  const isProtected = PROTECTED_PREFIXES.some((p) => stripped.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => stripped === p || stripped.startsWith(p + "/"));

  if (isProtected && !user) {
    const portalUrl = new URL("https://app.departify.app/login");
    portalUrl.searchParams.set("next", stripped);
    return NextResponse.redirect(portalUrl, { status: 307 });
  }

  if (isAuthPage && user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = stripped === "/acceso" || stripped === "/registro" ? "/panel" : stripped;
    redirect.search = "";
    return NextResponse.redirect(redirect);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto:
     *  - archivos estáticos, API, _next
     *  - archivos servidos desde /public directamente (cualquier asset con
     *    extensión: svg, png, jpg, jpeg, webp, ico, gif, avif, woff, woff2, css, js)
     *    Sin esto, next-intl reescribe /logo-light.svg → /es/logo-light.svg y el
     *    logo (y cualquier asset de /public) devuelve 404.
     *  - rutas de aplicación (/admin, /panel, /acceso, /registro): no son landing
     *    y no deben pasar por el middleware de i18n para preservar sus URLs originales.
     */
    "/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|admin|panel|acceso|registro|auth|.*\\.(?:svg|png|jpg|jpeg|webp|ico|gif|avif|woff2?|css|js|map|txt|xml)$).*)",
  ],
};
