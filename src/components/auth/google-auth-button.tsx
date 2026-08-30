"use client";

import { useCallback, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "@/lib/auth/oauth";
import { cn } from "@/lib/utils";

/**
 * Botón "Continuar con Google" — Supabase OAuth.
 *
 * Si Supabase está configurado, dispara `signInWithOAuth({ provider: "google" })`
 * y deja que Supabase redirija al provider. Si no lo está, abre el portal
 * externo como fallback para que la UI nunca quede rota.
 *
 * Se renderiza como `<button>` (no `<a>`) porque el flujo OAuth vive en
 * el cliente: Supabase redirige via `window.location`, no via navegación
 * Next.js (que pasaría por RSC y rompería el code_verifier PKCE).
 */
export function GoogleAuthButton({
  children,
  fallbackHref,
  className,
  variant = "primary",
  size = "md",
  onAfterClick,
}: {
  children: ReactNode;
  /** URL externa a la que caer si Supabase no está configurado. */
  fallbackHref: string;
  className?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  /** Hook tras click — útil para cerrar menús móviles. */
  onAfterClick?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(async () => {
    setError(null);
    onAfterClick?.();
    const result = await signInWithGoogle();
    if (result.ok) return;
    if (result.reason === "not_configured") {
      // Fallback transparente al portal externo.
      window.open(fallbackHref, "_self");
      return;
    }
    setLoading(false);
    setError(result.message ?? "No se pudo iniciar sesión con Google.");
  }, [fallbackHref, onAfterClick]);

  const sizeClass =
    size === "sm" ? "h-9 px-3 text-[0.875rem]" : "h-11 px-5 text-[0.9375rem]";
  const variantClass =
    variant === "primary"
      ? "bg-accent text-[#0a0c08] hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-60"
      : "border border-border bg-surface-soft/50 text-foreground hover:bg-surface-soft disabled:opacity-60";

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        void handleClick();
      }}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
        sizeClass,
        variantClass,
        className,
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <GoogleMark className="h-4 w-4" />
      )}
      <span>{children}</span>
      {error ? (
        <span role="alert" className="sr-only">
          {error}
        </span>
      ) : null}
    </button>
  );
}

/**
 * Logotipo oficial de Google (cuatro colores) — SVG inline para
 * evitar dependencias externas. La marca se usa estrictamente para
 * identificar el provider OAuth; Departify no la reclama.
 */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
