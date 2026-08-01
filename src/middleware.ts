/**
 * Middleware de Next.js — refresca la sesión de Supabase y
 * protege las rutas que requieren autenticación.
 *
 * - Rutas públicas: libres.
 * - /acceso, /registro: solo si NO hay sesión activa; si la hay,
 *   se redirige a /panel.
 * - /panel/**: requiere sesión activa.
 * - /admin/**: requiere sesión con rol super_admin (verificación server-side).
 *
 * Si Supabase no está configurado, el middleware es no-op (no rompe build/dev).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROTECTED_PREFIXES = ["/panel", "/admin"];
const AUTH_PAGES = ["/acceso", "/registro"];

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.next();

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

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

  // Refresh session si existe — solo entonces se actualiza la cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => path === p || path.startsWith(p + "/"));

  if (isProtected && !user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/acceso";
    redirect.searchParams.set("next", path);
    return NextResponse.redirect(redirect);
  }

  if (isAuthPage && user) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/panel";
    redirect.search = "";
    return NextResponse.redirect(redirect);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto archivos estáticos y API.
     * Mantener /api/ fuera para evitar latencia extra en webhooks.
     */
    "/((?!api|_next/static|_next/image|favicon.svg|robots.txt|sitemap.xml).*)",
  ],
};
