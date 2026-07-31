"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(1, "Introduce tu contraseña"),
  remember: z.boolean().optional(),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
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
        >
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

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
              >
                Contraseña
              </label>
              <a
                href="/acceso?recuperar=1"
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

          <label className="flex items-center gap-2 text-[0.8125rem] text-muted">
            <input
              type="checkbox"
              {...register("remember")}
              className="h-3.5 w-3.5 rounded-sm border-border bg-surface-soft accent-accent"
            />
            Recordar este dispositivo
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-50"
          >
            {isSubmitting && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            {isSubmitting ? "Verificando…" : "Acceder"}
          </button>

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
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function inputClass(invalid: boolean): string {
  return cn(
    "h-11 w-full rounded-md border bg-[#0c0e0a] px-3 text-[0.9375rem] text-foreground placeholder:text-muted focus:outline-none focus:ring-1 transition-colors",
    invalid
      ? "border-danger/60 focus:border-danger focus:ring-danger/30"
      : "border-border focus:border-accent/50 focus:ring-accent/30"
  );
}
