/**
 * Callback de OAuth para Supabase (Google, GitHub, etc.).
 *
 * Supabase redirige aquí con `?code=...` después de que el usuario
 * aprueba el provider. Esta ruta intercambia el código por una
 * sesión (PKCE), persiste las cookies de sesión, y redirige al
 * usuario al destino apropiado:
 *  - usuarios autenticados que aterrizan en /acceso o /registro
 *    se redirigen a /panel
 *  - en cualquier otro caso, respeta `?next=` si es interno; si no,
 *    cae al `/panel` por defecto
 *
 * Esta ruta vive FUERA de `[locale]` a propósito: la URL canónica
 * `/auth/callback` es lo que se registra en la allow-list de
 * Supabase y lo que devuelve el provider. Excluida del middleware
 * de i18n (ver `src/middleware.ts`).
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

function safeNext(next: string | null, request: NextRequest): string {
  // Solo aceptamos paths internos (mismo origen, sin scheme externo)
  // para evitar open-redirect. Por defecto, /panel.
  if (!next) return "/panel";
  try {
    // Parseamos como URL absoluta y comprobamos que el origen coincide.
    const base = new URL(request.url);
    const target = new URL(next, base);
    if (target.origin !== base.origin) return "/panel";
    return target.pathname + target.search;
  } catch {
    return "/panel";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const redirectTo = safeNext(next, request);

  // Si Supabase no está configurado, redirigimos a /acceso con un
  // mensaje claro — la UI lo muestra en pantalla.
  const { configured } = getSupabasePublicConfig();
  // eslint-disable-next-line no-console
  console.log("[auth/callback] env probe", {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasCode: Boolean(code),
    configured,
  });
  if (!configured) {
    const fallback = new URL("/acceso", origin);
    fallback.searchParams.set("error", "supabase_not_configured");
    return NextResponse.redirect(fallback);
  }

  if (!code) {
    // Sin código, algo fue mal en el provider. Volvemos a /acceso.
    const fallback = new URL("/acceso", origin);
    fallback.searchParams.set("error", "missing_code");
    return NextResponse.redirect(fallback);
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    const fallback = new URL("/acceso", origin);
    fallback.searchParams.set("error", "supabase_not_configured");
    return NextResponse.redirect(fallback);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const fallback = new URL("/acceso", origin);
    fallback.searchParams.set("error", "exchange_failed");
    return NextResponse.redirect(fallback);
  }

  // Sesión creada → redirigir al destino solicitado (panel por defecto).
  return NextResponse.redirect(new URL(redirectTo, origin));
}
