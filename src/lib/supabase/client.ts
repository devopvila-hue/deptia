/**
 * Cliente Supabase para el navegador.
 *
 * Usa `@supabase/ssr` con el adapter de navegador (cookies opcionales).
 * Mientras las credenciales no estén configuradas, devolvemos `null`
 * para que la UI pueda degradar con elegancia en vez de romper.
 */
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

let cached: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (cached) return cached;
  const { url, anonKey, configured } = getSupabasePublicConfig();
  if (!configured) return null;
  cached = createBrowserClient(url!, anonKey!);
  return cached;
}
// touched
