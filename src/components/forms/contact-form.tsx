"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Necesitamos tu nombre"),
  email: z.string().email("Email no válido"),
  company: z.string().min(2, "Indica el nombre de tu empresa"),
  topic: z.enum([
    "demo",
    "seguridad",
    "precios",
    "partnership",
    "prensa",
    "otro",
  ]),
  message: z.string().min(10, "Cuéntanos un poco más"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Necesitamos tu consentimiento" }),
  }),
});

type ContactValues = z.infer<typeof contactSchema>;

const TOPICS: { id: ContactValues["topic"]; label: string }[] = [
  { id: "demo", label: "Demostración" },
  { id: "seguridad", label: "Seguridad" },
  { id: "precios", label: "Precios" },
  { id: "partnership", label: "Partnership" },
  { id: "prensa", label: "Prensa" },
  { id: "otro", label: "Otro" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: "demo",
    },
  });

  const onSubmit = async (data: ContactValues) => {
    // In production this hits /api/contact
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.info("contact submission", data);
    setSubmitted(true);
    reset();
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex flex-col items-center gap-4 py-10 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-success/40 bg-success/10">
            <Check className="h-6 w-6 text-success" />
          </span>
          <h2 className="font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            Hemos recibido tu mensaje.
          </h2>
          <p className="max-w-md text-[0.9375rem] text-muted text-pretty">
            Te respondemos en horario laboral en menos de 24 horas. Si la consulta es urgente,
            escríbenos a hola@deptify.com.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted hover:text-foreground"
          >
            Enviar otro mensaje
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Nombre" error={errors.name?.message}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
                className={inputClass(!!errors.name)}
              />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
                className={inputClass(!!errors.email)}
              />
            </Field>
          </div>

          <Field label="Empresa" error={errors.company?.message}>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              {...register("company")}
              className={inputClass(!!errors.company)}
            />
          </Field>

          <Field label="¿Sobre qué quieres hablar?">
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <label
                  key={t.id}
                  className="cursor-pointer rounded-md border border-border bg-surface-soft/40 px-3 py-1.5 text-[0.8125rem] text-foreground transition-colors has-[:checked]:border-accent/50 has-[:checked]:bg-accent-soft"
                >
                  <input
                    type="radio"
                    value={t.id}
                    {...register("topic")}
                    className="sr-only"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Mensaje" error={errors.message?.message}>
            <textarea
              id="message"
              rows={5}
              aria-invalid={!!errors.message}
              {...register("message")}
              className={cn(inputClass(!!errors.message), "min-h-[120px] resize-y")}
            />
          </Field>

          <Field
            label=""
            error={errors.consent?.message}
          >
            <label className="flex items-start gap-2 text-[0.8125rem] text-muted">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 h-3.5 w-3.5 rounded-sm border-border bg-surface-soft accent-accent"
              />
              <span className="text-pretty">
                Acepto recibir comunicaciones relacionadas con esta consulta. No usamos tu email
                para newsletters ni lo compartimos con terceros.
              </span>
            </label>
          </Field>

          <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Respuesta en &lt; 24 h
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              {isSubmitting ? "Enviando…" : "Enviar mensaje"}
            </button>
          </div>
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={typeof children === "object" && children && "props" in children ? (children as { props: { id?: string } }).props.id : undefined}
          className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
