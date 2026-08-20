"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Sparkles, Building2, KeyRound, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { departments, listAvailableDepartments } from "@/data/departments";
import { signUp, type AuthError } from "@/lib/auth";

const accountSchema = z.object({
  name: z.string().min(2, "Necesitamos tu nombre"),
  email: z.string().email("Email no válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  company: z.string().min(2, "Indica el nombre de tu empresa"),
  country: z.string().min(2, "Indica tu país"),
  acceptTerms: z.literal(true),
  acceptPrivacy: z.literal(true),
});

const selectionSchema = z.object({
  department: z.string().min(1, "Elige un departamento"),
  plan: z.enum(["starter", "business", "company"]),
  region: z.enum(["eu-west", "eu-central", "us-east"]),
  access: z.enum(["web", "telegram", "ambos"]),
});

type AccountValues = z.infer<typeof accountSchema>;
type SelectionValues = z.infer<typeof selectionSchema>;

type Step = "account" | "selection" | "provisioning" | "onboarding" | "ready";

const STEPS: { id: Step; label: string; index: string }[] = [
  { id: "account", label: "Cuenta", index: "01" },
  { id: "selection", label: "Departamento", index: "02" },
  { id: "provisioning", label: "Aprovisionamiento", index: "03" },
  { id: "onboarding", label: "Onboarding", index: "04" },
  { id: "ready", label: "Listo", index: "05" },
];

export function RegistrationFlow() {
  const [step, setStep] = useState<Step>("account");
  const [progress, setProgress] = useState(0);

  const advance = (next: Step, delay = 0) => {
    if (delay > 0) {
      setTimeout(() => setStep(next), delay);
    } else {
      setStep(next);
    }
  };

  const currentIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2.4fr]">
      {/* Sidebar / progress */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Activación
        </p>
        <h1 className="mt-2 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
          Crear mi equipo
        </h1>
        <p className="mt-2 text-[0.875rem] text-muted text-pretty">
          El proceso dura menos de 10 minutos. Puedes volver atrás en cualquier momento.
        </p>

        <ol className="mt-8 space-y-1">
          {STEPS.map((s, i) => {
            const active = s.id === step;
            const complete = i < currentIndex;
            return (
              <li
                key={s.id}
                className={cn(
                  "flex items-center gap-3 rounded-md border px-3 py-2 transition-colors",
                  active
                    ? "border-accent/40 bg-accent-soft"
                    : complete
                    ? "border-success/30 bg-success/5"
                    : "border-border/60 bg-surface-soft/30"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border text-[0.65rem] font-mono",
                    active
                      ? "border-accent/50 bg-accent text-[#0a0c08]"
                      : complete
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-border bg-surface-soft text-muted"
                  )}
                >
                  {complete ? <Check className="h-3.5 w-3.5" /> : s.index}
                </span>
                <div>
                  <p
                    className={cn(
                      "text-[0.875rem]",
                      active ? "text-foreground" : complete ? "text-foreground/80" : "text-muted"
                    )}
                  >
                    {s.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Main */}
      <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-5 sm:p-8">
        <AnimatePresence mode="wait">
          {step === "account" && (
            <AccountStep
              key="account"
              onComplete={() => {
                setProgress(1);
                advance("selection");
              }}
            />
          )}
          {step === "selection" && (
            <SelectionStep
              key="selection"
              onBack={() => advance("account")}
              onComplete={() => {
                setProgress(2);
                advance("provisioning");
                // Simulate provisioning steps
                let p = 0;
                const id = setInterval(() => {
                  p += 1;
                  setProgress(2 + p * 0.2);
                  if (p >= 4) {
                    clearInterval(id);
                    advance("onboarding", 400);
                  }
                }, 700);
              }}
            />
          )}
          {step === "provisioning" && <ProvisioningStep key="provisioning" progress={progress} />}
          {step === "onboarding" && (
            <OnboardingStep
              key="onboarding"
              onComplete={() => {
                setProgress(4);
                advance("ready");
              }}
            />
          )}
          {step === "ready" && <ReadyStep key="ready" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AccountStep({ onComplete }: { onComplete: () => void }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
  });

  const onSubmit = async (values: AccountValues) => {
    setServerError(null);
    const result = await signUp({
      email: values.email,
      password: values.password,
      fullName: values.name,
      companyName: values.company,
    });

    if (!result.ok) {
      // Si Supabase aún no está configurado, dejamos al usuario continuar
      // con el flujo de demo: es un entorno de previsualización.
      if (result.error.kind === "not_configured") {
        setServerError(result.error.message);
        // No bloqueamos la demo. Avanzamos tras mostrar el aviso.
        await new Promise((r) => setTimeout(r, 600));
        onComplete();
        return;
      }
      setServerError(formatAuthError(result.error));
      return;
    }
    onComplete();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      <header>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Paso 01 · Cuenta
        </p>
        <h2 className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
          Cuéntanos quién eres
        </h2>
      </header>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-[0.8125rem] text-foreground"
        >
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden />
          <span
            className="text-pretty"
            // `serverError` puede incluir un <a> sugerido cuando la
            // integración aún no está configurada. El contenido
            // proviene de `formatAuthError`, sin input de usuario, así
            // que `dangerouslySetInnerHTML` es seguro.
            dangerouslySetInnerHTML={{ __html: serverError }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldRow label="Nombre" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass(!!errors.name)}
          />
        </FieldRow>
        <FieldRow label="Email de trabajo" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </FieldRow>
      </div>

      <FieldRow label="Contraseña" error={errors.password?.message}>
        <input
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className={inputClass(!!errors.password)}
        />
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          Mínimo 8 caracteres
        </p>
      </FieldRow>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldRow label="Empresa" error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            {...register("company")}
            className={inputClass(!!errors.company)}
          />
        </FieldRow>
        <FieldRow label="País" error={errors.country?.message}>
          <input
            type="text"
            autoComplete="country-name"
            {...register("country")}
            className={inputClass(!!errors.country)}
          />
        </FieldRow>
      </div>

      <div className="space-y-2 border-t border-border/60 pt-4">
        <Consent
          label="Acepto los términos de servicio"
          error={errors.acceptTerms?.message}
          {...register("acceptTerms")}
        />
        <Consent
          label="Acepto la política de privacidad"
          error={errors.acceptPrivacy?.message}
          {...register("acceptPrivacy")}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a] disabled:opacity-50"
        >
          Continuar
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.form>
  );
}

function SelectionStep({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SelectionValues>({
    resolver: zodResolver(selectionSchema),
    defaultValues: { plan: "starter", region: "eu-west", access: "ambos" },
  });

  const selectedDept = watch("department");
  const plan = watch("plan");
  const department = listAvailableDepartments().find((d) => d.slug === selectedDept);

  return (
    <motion.form
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onSubmit={handleSubmit(onComplete)}
      noValidate
      className="space-y-5"
    >
      <header>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Paso 02 · Departamento
        </p>
        <h2 className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
          Elige tu primer equipo
        </h2>
      </header>

      <FieldRow label="Departamento" error={errors.department?.message}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {listAvailableDepartments().map((d) => (
            <label
              key={d.slug}
              className="cursor-pointer rounded-xl border border-border bg-[#0c0e0a] p-4 transition-colors has-[:checked]:border-accent/50 has-[:checked]:bg-accent-soft"
            >
              <input
                type="radio"
                value={d.slug}
                {...register("department")}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                  style={{ color: d.color.base }}
                >
                  {d.category}
                </span>
                <span className="font-mono text-[0.65rem] text-foreground">€{d.priceFrom}</span>
              </div>
              <p className="mt-2 text-[0.9375rem] font-medium text-foreground">{d.shortName}</p>
              <p className="mt-1 text-[0.75rem] text-muted line-clamp-2">{d.promise}</p>
            </label>
          ))}
        </div>
      </FieldRow>

      <FieldRow label="Plan">
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "starter", label: "Starter", price: "99€" },
            { id: "business", label: "Business", price: "249€" },
            { id: "company", label: "Company", price: "499€+" },
          ].map((p) => (
            <label
              key={p.id}
              className="cursor-pointer rounded-md border border-border bg-[#0c0e0a] px-3 py-2 transition-colors has-[:checked]:border-accent/50 has-[:checked]:bg-accent-soft"
            >
              <input
                type="radio"
                value={p.id}
                {...register("plan")}
                className="sr-only"
              />
              <p className="text-[0.875rem] font-medium text-foreground">{p.label}</p>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {p.price}/mes
              </p>
            </label>
          ))}
        </div>
      </FieldRow>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldRow label="Región preferida">
          <select
            {...register("region")}
            className={inputClass(false)}
          >
            <option value="eu-west">Europa · oeste</option>
            <option value="eu-central">Europa · central</option>
            <option value="us-east">EE. UU. · este</option>
          </select>
        </FieldRow>
        <FieldRow label="Acceso">
          <select
            {...register("access")}
            className={inputClass(false)}
          >
            <option value="ambos">Web + Telegram</option>
            <option value="web">Solo web</option>
            <option value="telegram">Solo Telegram</option>
          </select>
        </FieldRow>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-border bg-[#0c0e0a] p-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Resumen</p>
        <p className="mt-2 text-[0.9375rem] text-foreground">
          Vas a activar{" "}
          <span className="font-medium">
            {department?.name ?? "—"}
          </span>{" "}
          en el plan <span className="font-medium capitalize">{plan}</span>.
        </p>
        <p className="mt-1 text-[0.8125rem] text-muted text-pretty">
          La instancia se creará tras confirmar. Tendrás 14 días para cancelar sin coste.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-5 text-[0.9375rem] text-foreground transition-colors hover:border-foreground/30"
        >
          <ChevronLeft className="h-4 w-4" />
          Atrás
        </button>
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a]"
        >
          Crear mi instancia
          <Sparkles className="h-4 w-4" />
        </button>
      </div>
    </motion.form>
  );
}

function ProvisioningStep({ progress }: { progress: number }) {
  const steps = [
    { id: "instance", label: "Creando instancia privada", icon: Building2 },
    { id: "department", label: "Configurando el departamento", icon: KeyRound },
    { id: "workspace", label: "Preparando el espacio de trabajo", icon: Sparkles },
    { id: "permissions", label: "Aplicando permisos", icon: ShieldCheck },
  ];

  const completedSteps = Math.min(steps.length, Math.floor((progress - 2) * steps.length));
  const currentStep = Math.min(steps.length - 1, completedSteps);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="space-y-6"
    >
      <header>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Paso 03 · Aprovisionamiento
        </p>
        <h2 className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
          Estamos preparando tu empresa digital.
        </h2>
      </header>

      {/* Big illustration */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0c0e0a] p-6">
        <div className="absolute inset-0 grid-pattern-fine opacity-30" aria-hidden />
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(216,255,98,0.18) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center justify-center py-10">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border-strong bg-[#0c0e0a] shadow-2xl">
              <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-[#1a1d18] to-[#0c0e0a]" aria-hidden />
              <div className="relative flex flex-col items-center">
                <Building2 className="h-6 w-6 text-accent" />
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  Atlas
                </p>
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border border-accent/60"
              aria-hidden
            />
          </div>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Construyendo capa {currentStep + 1} de {steps.length}
          </p>
          <div className="mt-3 h-1 w-48 overflow-hidden rounded-full bg-surface-soft">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="h-full bg-accent"
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="space-y-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                done
                  ? "border-success/30 bg-success/5"
                  : active
                  ? "border-accent/40 bg-accent-soft"
                  : "border-border bg-[#0c0e0a]"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md border",
                  done
                    ? "border-success/40 bg-success/10 text-success"
                    : active
                    ? "border-accent/50 bg-accent text-[#0a0c08]"
                    : "border-border bg-surface-soft text-muted"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </span>
              <div className="flex-1">
                <p className="text-[0.875rem] text-foreground">{s.label}</p>
                {active && (
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                    En proceso…
                  </p>
                )}
                {done && (
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-success">
                    Completado
                  </p>
                )}
              </div>
              {active && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent"
                >
                  …
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

function OnboardingStep({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const questions = [
    {
      label: "¿Qué vende tu empresa?",
      placeholder: "Describe brevemente tu producto o servicio principal…",
    },
    {
      label: "¿A quién se lo vendes?",
      placeholder: "Tipo de cliente ideal, sector, tamaño…",
    },
    {
      label: "¿Cuál es tu objetivo principal este trimestre?",
      placeholder: "Captación, retención, lanzamiento, awareness…",
    },
    {
      label: "¿Qué canales usas actualmente?",
      placeholder: "Email, redes, contenido, eventos…",
    },
    {
      label: "¿Cómo es el tono de tu marca?",
      placeholder: "Formal, directo, cercano, técnico…",
    },
    {
      label: "¿Qué herramientas usas a diario?",
      placeholder: "CRM, email, calendario, etc.",
    },
    {
      label: "¿Qué nivel de autonomía quieres darle al equipo?",
      placeholder: "Solo borradores, también publicar, etc.",
    },
    {
      label: "¿Cuál es la primera misión que te gustaría delegar?",
      placeholder: "Describe la tarea o el resultado esperado…",
    },
  ];

  const q = questions[step];
  const last = step === questions.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="space-y-5"
    >
      <header>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Paso 04 · Onboarding · pregunta {step + 1} de {questions.length}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-accent-soft font-mono text-[0.65rem] text-foreground">
            DA
          </span>
          <div>
            <p className="text-[0.875rem] font-medium text-foreground">Director de Incorporación</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              Conversación guiada
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-border bg-[#0c0e0a] p-5">
        <p className="text-[1.0625rem] text-foreground text-pretty">{q?.label}</p>
        <textarea
          rows={4}
          placeholder={q?.placeholder}
          className="mt-4 w-full rounded-md border border-border bg-[#0a0c08] px-3 py-2.5 text-[0.9375rem] text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 w-6 rounded-full transition-colors",
                  i <= step ? "bg-accent" : "bg-border"
                )}
              />
            ))}
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {step + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-5 text-[0.9375rem] text-foreground transition-colors hover:border-foreground/30 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-4 text-[0.8125rem] text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Omitir
          </button>
        </div>
        <button
          type="button"
          onClick={() => (last ? onComplete() : setStep((s) => s + 1))}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-[#0a0c08] transition-all hover:-translate-y-px hover:bg-[#e3ff7a]"
        >
          {last ? "Finalizar onboarding" : "Siguiente"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ReadyStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex flex-col items-center gap-6 py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        className="flex h-20 w-20 items-center justify-center rounded-2xl border border-success/40 bg-success/10"
      >
        <Check className="h-8 w-8 text-success" />
      </motion.div>
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Paso 05 · Listo
        </p>
        <h2 className="mt-2 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
          Tu equipo está operativo.
        </h2>
        <p className="mt-3 max-w-md text-[0.9375rem] text-muted text-pretty">
          El departamento ha empezado a trabajar en tu primera misión. Te enviaremos un informe
          en las próximas horas.
        </p>
      </div>

      <div className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        <Button href="/panel" variant="primary" size="md" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
          Ir al panel
        </Button>
        <Button href="/contacto" variant="ghost" size="md">
          Hablar con el equipo
        </Button>
      </div>
    </motion.div>
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

function FieldRow({
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
      <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function formatAuthError(err: AuthError): string {
  switch (err.kind) {
    case "not_configured":
      return (
        `${err.message} ` +
        `Regístrate desde ya en el portal oficial: ` +
        `<a class="underline" href="https://app.departify.app/signup">app.departify.app/signup</a>.`
      );
    case "invalid_credentials":
      return err.message;
    case "rate_limited":
      return err.message;
    case "validation":
      return err.message;
    case "unknown":
      return "No hemos podido crear la cuenta. Inténtalo de nuevo en unos minutos.";
  }
}

function Consent({
  label,
  error,
  ...rest
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="flex items-start gap-2 text-[0.8125rem] text-muted">
        <input
          type="checkbox"
          {...rest}
          className="mt-1 h-3.5 w-3.5 rounded-sm border-border bg-surface-soft accent-accent"
        />
        <span className="text-pretty">{label}</span>
      </label>
      {error && (
        <p className="mt-1.5 pl-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
