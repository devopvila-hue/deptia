"use client";

/**
 * HowItWorksInfographic — diagrama horizontal de 8 pasos del flujo de un
 * departamento de IA en Departify, refactorizado al manual de marca:
 *   · fondo ink con gradiente vertical y grid fino desenfocado
 *   · color de acento lime (<15% de cobertura) complementado por paleta
     desaturada para los pasos (teal, mint, cyan, gold, coral, violet)
 *   · números y chips en JetBrains Mono · cuerpo en Manrope
 *   · sin nuevos componentes UI: reusa Container, Button y cn()
 *
 * Layout:
 *   · 8 columnas en xl, 4 en md, 2 en sm con conectores → entre círculos
 *   · conector inferior punteado con pill "Conexiones seguras"
 *   · tira de herramientas conectadas
 *   · fila de 4 resultados reales
 *   · fila final de 3 afirmaciones con cohete
 */

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  Clock,
  Database,
  Gift,
  Heart,
  Lightbulb,
  Lock,
  Rocket,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
  Wand2,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ToolLogo, type ToolSlug } from "@/components/ui/tool-logos";

/* ── Tipos ───────────────────────────────────────────────────────────── */

type IconKind =
  | "target"
  | "brain"
  | "lightbulb"
  | "wand"
  | "settings"
  | "user-check"
  | "shield-check"
  | "gift";

type StepDef = {
  IconKind: IconKind;
  /** Token hex para el acento del paso (anillo, halo, icono). */
  accent: string;
};

type StepResolved = StepDef & {
  n: number;
  title: string;
  body: string;
  chip: string;
  Icon: typeof Target;
};

type ResultDef = {
  IconKind: "shield-check" | "clock" | "trending-up" | "heart";
  accent: string;
};

/* ── Datos del diagrama (estructura y paleta) ────────────────────────── */

const STEP_DEFS: StepDef[] = [
  { IconKind: "target", accent: "#D8FF62" },
  { IconKind: "brain", accent: "#7BD9C8" },
  { IconKind: "lightbulb", accent: "#A8E08E" },
  { IconKind: "wand", accent: "#7DC8E8" },
  { IconKind: "settings", accent: "#F0BE7E" },
  { IconKind: "user-check", accent: "#F08A6B" },
  { IconKind: "shield-check", accent: "#C49AFF" },
  { IconKind: "gift", accent: "#D8FF62" },
];

const TOOLS: Array<{ name: string; slug: ToolSlug }> = [
  { name: "GitHub", slug: "github" },
  { name: "Vercel", slug: "vercel" },
  { name: "Supabase", slug: "supabase" },
  { name: "Railway", slug: "railway" },
  { name: "Gmail", slug: "gmail" },
  { name: "Google Drive", slug: "google-drive" },
];

const RESULT_DEFS: ResultDef[] = [
  { IconKind: "shield-check", accent: "#7BD9C8" },
  { IconKind: "clock", accent: "#F0BE7E" },
  { IconKind: "trending-up", accent: "#D8FF62" },
  { IconKind: "heart", accent: "#F08A6B" },
];

const ICONS: Record<IconKind, typeof Target> = {
  target: Target,
  brain: Brain,
  lightbulb: Lightbulb,
  wand: Wand2,
  settings: Settings2,
  "user-check": UserCheck,
  "shield-check": ShieldCheck,
  gift: Gift,
};

const RESULT_ICONS: Record<ResultDef["IconKind"], typeof ShieldCheck> = {
  "shield-check": ShieldCheck,
  clock: Clock,
  "trending-up": TrendingUp,
  heart: Heart,
};

/* ── Helpers de color ────────────────────────────────────────────────── */

/** Convierte #RRGGBB a componentes r,g,b en 0–255. */
function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.substring(0, 2), 16),
    parseInt(v.substring(2, 4), 16),
    parseInt(v.substring(4, 6), 16),
  ];
}

/** Color RGBA a partir de hex + alpha 0–1. */
function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── Subcomponentes ───────────────────────────────────────────────────── */

function StepIcon({ Icon, accent }: { Icon: typeof Target; accent: string }) {
  return (
    <div className="relative mx-auto h-14 w-14 sm:h-16 sm:w-16">
      {/* Halo exterior */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: rgba(accent, 0.35) }}
        aria-hidden
      />
      {/* Anillo */}
      <div
        className="absolute inset-0 rounded-full border bg-[#0c0e0a]"
        style={{
          borderColor: rgba(accent, 0.55),
          boxShadow: `inset 0 0 0 4px ${rgba(accent, 0.08)}`,
        }}
      />
      {/* Icono */}
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={{ color: accent }}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
      </div>
    </div>
  );
}

function StepColumn({ step, isLast }: { step: StepResolved; isLast: boolean }) {
  const { n, title, body, chip, accent, Icon } = step;
  return (
    <div className="relative flex flex-col items-stretch">
      {/* Cabecera: icono + conector horizontal */}
      <div className="relative flex items-center justify-center">
        <StepIcon Icon={Icon} accent={accent} />
        {/* Línea de conexión (oculta en el último y en móvil) */}
        {!isLast && (
          <div
            className="absolute left-[calc(50%+36px)] right-[calc(-50%+36px)] top-1/2 hidden h-px -translate-y-1/2 xl:block"
            style={{
              background: `linear-gradient(90deg, ${rgba(accent, 0.55)} 0%, rgba(216,255,98,0.55) 100%)`,
            }}
            aria-hidden
          >
            <ChevronRight
              className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-accent"
              strokeWidth={3}
            />
          </div>
        )}
      </div>

      {/* Tarjeta del paso */}
      <div
        className={cn(
          "mt-4 flex flex-1 flex-col rounded-xl border bg-[#0c0e0a]/80 p-4",
          "border-border backdrop-blur-sm"
        )}
      >
        {/* Encabezado: número + título */}
        <div className="flex items-start gap-2">
          <span
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold"
            style={{
              color: accent,
              background: rgba(accent, 0.12),
              border: `1px solid ${rgba(accent, 0.35)}`,
            }}
          >
            {n}
          </span>
          <h3 className="font-display text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] text-foreground">
            <span
              className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{ background: accent }}
              aria-hidden
            />
            {title}
          </h3>
        </div>

        {/* Descripción */}
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-muted">
          {body}
        </p>

        {/* Chip */}
        <div className="mt-auto pt-3">
          <span
            className="inline-flex w-full items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
            style={{
              color: accent,
              background: rgba(accent, 0.06),
              borderColor: rgba(accent, 0.3),
            }}
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: accent }}
              aria-hidden
            />
            <span className="truncate normal-case tracking-normal text-[0.7rem] font-medium">
              {chip}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function StepFlow({ steps, secureLabel }: { steps: StepResolved[]; secureLabel: string }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-x-6">
        {steps.map((step, i) => (
          <StepColumn key={step.n} step={step} isLast={i === steps.length - 1} />
        ))}
      </div>

      {/* Conector inferior punteado con pill "Conexiones seguras" */}
      <div className="relative mt-10 hidden h-12 md:block">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 12"
          aria-hidden
        >
          <line
            x1="2"
            y1="6"
            x2="98"
            y2="6"
            stroke="rgba(216,255,98,0.5)"
            strokeWidth="0.4"
            strokeDasharray="1.4 1.4"
          />
          {/* Puntos por paso */}
          {steps.map((_, i) => {
            const x = 2 + (i * 96) / (steps.length - 1);
            return (
              <circle
                key={i}
                cx={x}
                cy={6}
                r={0.7}
                fill="#D8FF62"
                opacity={0.9}
              />
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-[#0c0e0a] px-3 py-1.5 shadow-[0_0_24px_rgba(216,255,98,0.15)]">
            <Lock className="h-3 w-3 text-accent" strokeWidth={2} />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/90">
              {secureLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolsStrip({
  labelEyebrow,
  labelTitle,
  labelSubtitle,
  moreLabel,
}: {
  labelEyebrow: string;
  labelTitle: string;
  labelSubtitle: string;
  moreLabel: string;
}) {
  return (
    <div
      className={cn(
        "mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-[#0c0e0a]/70 p-4 sm:p-5",
        "md:flex-row md:items-center md:gap-6"
      )}
    >
      {/* Lado izquierdo: label */}
      <div className="md:max-w-[220px]">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          {labelEyebrow}
        </p>
        <p className="mt-1 font-display text-[1.0625rem] font-semibold leading-tight tracking-[-0.01em] text-foreground">
          {labelTitle}
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          <Lock className="h-3 w-3 text-accent" strokeWidth={2} />
          <span className="normal-case tracking-normal">{labelSubtitle}</span>
        </div>
      </div>

      {/* Herramientas */}
      <div className="flex flex-1 flex-wrap items-center justify-start gap-2 md:justify-end">
        {TOOLS.map((tool) => (
          <span
            key={tool.name}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-3 font-display text-[0.8125rem] font-medium text-foreground/90 transition-colors hover:border-foreground/30"
          >
            <ToolLogo slug={tool.slug} size={14} className="shrink-0" />
            {tool.name}
          </span>
        ))}
        <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-dashed border-border-strong bg-transparent px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          + {moreLabel}
        </span>
      </div>
    </div>
  );
}

function ResultsRow({ results }: { results: Array<ResultDef & { title: string; body: string; Icon: typeof ShieldCheck }> }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {results.map(({ Icon, title, body, accent }) => (
        <div
          key={title}
          className="group flex items-start gap-3 rounded-xl border border-border bg-[#0c0e0a]/60 p-4 transition-colors hover:border-foreground/20"
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              color: accent,
              background: rgba(accent, 0.1),
              border: `1px solid ${rgba(accent, 0.3)}`,
            }}
            aria-hidden
          >
            <Icon className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] text-foreground">
              {title}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-pretty text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterLine({ items }: { items: Array<{ Icon: typeof Check; text: string }> }) {
  return (
    <div className="mt-6 flex flex-col items-stretch gap-3 rounded-xl border border-accent/20 bg-accent-soft/40 px-4 py-3 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-accent/20 sm:px-5">
      {items.map(({ Icon, text }, i) => (
        <div
          key={text}
          className={cn(
            "flex items-center gap-2 sm:px-4",
            i === 0 && "sm:pl-0",
            i === items.length - 1 && "sm:pr-0"
          )}
        >
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
            <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          </span>
          <p className="font-display text-[0.875rem] font-medium tracking-[-0.005em] text-foreground">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Componente público ──────────────────────────────────────────────── */

export function HowItWorksInfographic() {
  const t = useTranslations("comoFunciona.infographic");
  const steps: StepResolved[] = STEP_DEFS.map((def, i) => ({
    ...def,
    n: i + 1,
    title: t(`steps.${i}.title`),
    body: t(`steps.${i}.body`),
    chip: t(`steps.${i}.chip`),
    Icon: ICONS[def.IconKind],
  }));

  const results = RESULT_DEFS.map((def, i) => ({
    ...def,
    title: t(`results.${i}.title`),
    body: t(`results.${i}.body`),
    Icon: RESULT_ICONS[def.IconKind],
  }));

  const footerItems: Array<{ Icon: typeof Check; text: string }> = [
    { Icon: Check, text: t("footer.0") },
    { Icon: Zap, text: t("footer.1") },
    { Icon: Rocket, text: t("footer.2") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Fondo: grid + radial lime */}
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[920px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(216,255,98,0.10) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <Container width="wide" className="relative py-16 sm:py-24">
        {/* Cabecera */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-6 bg-border-strong" />
            <span>{t("eyebrow")}</span>
            <span className="h-px w-6 bg-border-strong" />
          </div>
          <h2 className="mt-5 text-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Diagrama de pasos */}
        <div className="mt-12">
          <StepFlow steps={steps} secureLabel={t("secureConnections")} />
        </div>

        {/* Tira de herramientas */}
        <ToolsStrip
          labelEyebrow={t("toolsTitle")}
          labelTitle={t("toolsTitle")}
          labelSubtitle={t("toolsSubtitle")}
          moreLabel="Más"
        />

        {/* Resultados */}
        <ResultsRow results={results} />

        {/* Línea final */}
        <FooterLine items={footerItems} />

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            href="https://app.departify.app/signup"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Empieza con Departify
          </Button>
          <Button href="/demo" variant="secondary" size="lg" leftIcon={<Database className="h-4 w-4" />}>
            Ver el panel en vivo
          </Button>
        </div>
      </Container>
    </section>
  );
}