/**
 * Helpers de OAuth para el cliente (Supabase).
 *
 * Cada función dispara `signInWithOAuth` con el provider pedido.
 * Si Supabase no está configurado, devolvemos `{ ok: false, reason }`
 * para que la UI pueda degradar con elegancia (botón deshabilitado
 * o fallback al portal externo).
 *
 * El `redirectTo` siempre apunta a `/auth/callback`, la ruta
 * server-side que intercambia el código por la sesión (PKCE).
 */
"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type OAuthProvider = "google" | "github" | "azure" | "apple";

export type OAuthResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "missing_origin" | "provider_error"; message?: string };

interface SignInWithProviderOptions {
  provider: OAuthProvider;
  /** Si se pasa, se añade a `?next=` para que el callback redirija allí. */
  next?: string;
}

export async function signInWithProvider({
  provider,
  next,
}: SignInWithProviderOptions): Promise<OAuthResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: false, reason: "not_configured" };

  if (typeof window === "undefined") {
    return { ok: false, reason: "missing_origin" };
  }

  const origin = window.location.origin;
  const callbackUrl = new URL("/auth/callback", origin);
  if (next) callbackUrl.searchParams.set("next", next);

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl.toString(),
      // Flujo PKCE implícito: Supabase genera el code_verifier en el
      // cliente y lo entrega al callback vía query string.
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { ok: false, reason: "provider_error", message: error.message };
  }
  // signInWithOAuth redirige la página: nunca llegamos aquí.
  return { ok: true };
}

export async function signInWithGoogle(next?: string): Promise<OAuthResult> {
  return signInWithProvider({ provider: "google", next });
}
