/**
 * Cliente Supabase con privilegios de servicio (service_role).
 *
 * ⚠ SOLO PARA USAR EN SERVIDOR (Route Handlers / Server Actions).
 * ⚠ NUNCA importar desde un Client Component ni desde un hook.
 * ⚠ NUNCA exponer su resultado al frontend.
 *
 * Úsalo únicamente para:
 *  - Webhooks (Stripe, etc.) que necesitan saltar RLS.
 *  - Tareas administrativas puntuales (invitaciones, desactivación).
 *  - Operaciones cross-tenant con auditoría explícita.
 *
 * En el resto del código, prefiere `getSupabaseServerClient()` (anon + RLS).
 */
import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
