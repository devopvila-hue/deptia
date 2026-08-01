"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  Session,
  SupabaseClient,
  AuthChangeEvent,
} from "@supabase/supabase-js";

/**
 * Hook de cliente para conocer el estado de la sesión actual.
 *
 * Devuelve `null` mientras Supabase no esté configurado o no haya
 * sesión. Ideal para headers condicionales ("Iniciar sesión" /
 * "Mi panel") sin necesidad de un SSR completo.
 */
export function useSupabaseSession(): {
  client: SupabaseClient | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
} {
  const [client] = useState(() => getSupabaseBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    void client.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (cancelled) return;
      setSession(data.session ?? null);
      setLoading(false);
    });
    const { data: sub } = client.auth.onAuthStateChange(
      (_event: AuthChangeEvent, s: Session | null) => {
        if (cancelled) return;
        setSession(s ?? null);
      }
    );
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [client]);

  return {
    client,
    session,
    loading,
    configured: Boolean(client),
  };
}
