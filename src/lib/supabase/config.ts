/**
 * Configuración del cliente Supabase.
 *
 * NO exponer SUPABASE_SERVICE_ROLE_KEY al bundle del cliente.
 * Esta función es segura de importar en cualquier lado: solo lee
 * variables NEXT_PUBLIC_* y devuelve null si faltan.
 */
export interface SupabasePublicConfig {
  url: string | null;
  anonKey: string | null;
  configured: boolean;
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;
  return {
    url,
    anonKey,
    configured: Boolean(url && anonKey),
  };
}
