"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, requestPasswordRecovery, type AuthError } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(1, "Introduce tu contraseña"),
  remember: z.boolean().optional(),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;
  const recoveryMode = searchParams.get("recuperar") === "1";
  const resetMode = searchParams.get("reset") === "true";

  const [submitted, setSubmitted] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: Values) => {
    setServerError(null);
    startTransition(async () => {
      const result = await signIn({
        email: values.email,
        password: values.password,
        next,
      });
      if (result.ok) {
        router.push(result.redirectTo);
        router.refresh();
        return;
      }
      setServerError(formatAuthError(result.error));
    });
  };

  const onRecovery = () => {
    const email = getValues("email");
    if (!email || !/^.+@.+\..+$/.test(email)) {
      setServerError("Introduce tu email arriba para enviarte las instrucciones.");
      return;
    }
    setServerError(null);
    startTransition(async () => {
      const result = await requestPasswordRecovery(email);
      if (result.ok) {
        setRecoverySent(true);
      } else {
        setServerError(formatAuthError(result.error));
      }
    });
  };

  return (
    <AnimatePresence mode="wait">
      {recoveryMode ? (
        <motion.div
          key="recovery"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="space-y-4"
        >
          {recoverySent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-success/40 bg-success/10">
                <Check className="h-5 w-5 text-success" />
              </span>
              <p className="text-[0.9375rem] text-foreground">
                Te hemos enviado un enlace para restablecer tu contraseña.
              </p>
            </div>
          ) : (
            <>
              <header>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  Recuperar contraseña
                </p>
                <h2 className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                  Te ayudamos a recuperarla
                </h2>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">
                  Indica el email con el que te registraste y te enviaremos las
                  instrucciones.
                </p>
              </header>
              <ServerError message={serverError} />
              <button
                type="button"
                onClick={onRecovery}
                disabled={isPending}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-50"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {isPending ? "Enviando…" : "Enviar enlace de recuperación"}
              </button>
              <a
                href="https://app.departify.app/login"
                className="block text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-foreground"
              >
                Volver a iniciar sesión
              </a>
            </>
          )}
        </motion.div>
      ) : submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 py-6 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-success/40 bg-success/10">
            <Check className="h-5 w-5 text-success" />
          </span>
          <p className="text-[0.9375rem] text-foreground">
            Te hemos enviado un enlace de acceso a tu email.
          </p>
          <p className="text-[0.8125rem] text-muted text-pretty">
            Revisa la bandeja de entrada. El enlace caduca en 10 minutos.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
          aria-label={resetMode ? "Restablecer contraseña" : "Iniciar sesión"}
        >
          <ServerError message={serverError} />

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-danger">
                {errors.email.message}
              </p>
            )}
          </div>

          {!resetMode && (
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
                >
                  Contraseña
                </label>
                <a
                  href="https://app.departify.app/login?recuperar=1"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-foreground"
                >
                  ¿La has olvidado?
                </a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                {...register("password")}
                className={inputClass(!!errors.password)}
              />
              {errors.password && (
                <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {!resetMode && (
            <label className="flex items-center gap-2 text-[0.8125rem] text-muted">
              <input
                type="checkbox"
                {...register("remember")}
                className="h-3.5 w-3.5 rounded-sm border-border bg-surface-soft accent-accent"
              />
              Recordar este dispositivo
            </label>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-50"
          >
            {(isSubmitting || isPending) && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            {resetMode
              ? isSubmitting || isPending
                ? "Enviando…"
                : "Enviar instrucciones"
              : isSubmitting || isPending
                ? "Verificando…"
                : "Acceder"}
          </button>

          {!resetMode && (
            <>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0c0e0a] px-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    o
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-5 text-[0.9375rem] text-foreground transition-colors hover:border-foreground/30"
              >
                <span aria-hidden>🔒</span>
                Continuar con SSO
              </button>
            </>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function ServerError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/10 p-3 text-[0.8125rem] text-foreground"
    >
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden />
      <span
        className="text-pretty"
        // `message` puede llevar un <a> sugerido cuando la integración
        // aún no está configurada. El contenido proviene de
        // `formatAuthError`, un módulo interno sin datos de usuario,
        // por lo que `dangerouslySetInnerHTML` es seguro.
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
}

function formatAuthError(err: AuthError): string {
  switch (err.kind) {
    case "not_configured":
      return (
        `${err.message} ` +
        `Accede desde ya al portal oficial: ` +
        `<a class="underline" href="https://app.deptify.com/login">app.deptify.com</a>.`
      );
    case "invalid_credentials":
      return err.message;
    case "rate_limited":
      return err.message;
    case "validation":
      return err.message;
    case "unknown":
      return "No hemos podido completar la operación. Inténtalo de nuevo en unos minutos.";
  }
}

function inputClass(invalid: boolean): string {
  return cn(
    "h-11 w-full rounded-md border bg-[#0c0e0a] px-3 text-[0.9375rem] text-foreground placeholder:text-muted focus:outline-none focus:ring-1 transition-colors",
    invalid
      ? "border-danger/60 focus:border-danger focus:ring-danger/30"
      : "border-border focus:border-accent/50 focus:ring-accent/30"
  );
}
