/**
 * Cliente Supabase para Server Components, Route Handlers y Server Actions.
 *
 * Reutiliza el adapter de cookies de Next.js (next/headers).
 * Devuelve `null` si las credenciales no están configuradas — los
 * Server Components deben tratarlo como "no auth disponible".
 */
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export async function getSupabaseServerClient() {
  const { url, anonKey, configured } = getSupabasePublicConfig();
  if (!configured) return null;

  const cookieStore = await cookies();
  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components no pueden escribir cookies — se ignora.
          // Middleware se encarga del refresh.
        }
      },
    },
  });
}
