"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth/oauth";
import { BrandMark } from "@/components/ui/brand-mark";

export function AccesoClient() {
  const [status, setStatus] = useState<"starting" | "ready" | "error">("starting");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await signInWithGoogle();
      if (cancelled) return;
      if (result.ok) return;
      if (result.reason === "not_configured") {
        setStatus("ready");
        return;
      }
      setStatus("error");
      setMessage(result.message ?? "No se pudo iniciar sesión con Google.");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = () => {
    void signInWithGoogle();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <BrandMark className="h-9" />
      <div className="mt-10 max-w-md text-center">
        {status === "starting" ? (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted" aria-hidden />
            <p className="mt-4 text-[0.9375rem] text-muted">
              Te estamos llevando a Google para iniciar sesión…
            </p>
          </>
        ) : status === "ready" ? (
          <>
            <h1 className="font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
              Continúa con Google
            </h1>
            <p className="mt-2 text-[0.9375rem] text-muted">
              Pulsa el botón para abrir Google en una pestaña nueva.
            </p>
            <button
              type="button"
              onClick={handleClick}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a]"
            >
              Continuar con Google
            </button>
            <p className="mt-6 text-[0.8125rem] text-muted">
              ¿No tienes cuenta?{" "}
              <a
                href="/registro"
                className="text-foreground underline-offset-2 hover:underline"
              >
                Crear mi equipo
              </a>
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
              No pudimos iniciar sesión
            </h1>
            <p role="alert" className="mt-2 text-[0.9375rem] text-muted">
              {message ?? "Error desconocido al iniciar sesión con Google."}
            </p>
            <button
              type="button"
              onClick={handleClick}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface-soft/50 px-6 text-[0.9375rem] font-medium text-foreground transition-all hover:bg-surface-soft"
            >
              Reintentar
            </button>
            <p className="mt-6 text-[0.8125rem] text-muted">
              ¿Prefieres el portal antiguo?{" "}
              <a
                href="https://app.departify.app/login"
                className="text-foreground underline-offset-2 hover:underline"
              >
                app.departify.app/login
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
