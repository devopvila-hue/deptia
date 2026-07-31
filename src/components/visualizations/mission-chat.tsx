"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Check, Eye, FileText, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: "plan" | "tasks" | "approvals" | "result";
  label: string;
  icon: typeof FileText;
}

const STEPS: Step[] = [
  { id: "plan", label: "Ver plan", icon: FileText },
  { id: "tasks", label: "Ver tareas", icon: ListChecks },
  { id: "approvals", label: "Ver aprobaciones", icon: Check },
  { id: "result", label: "Ver resultado", icon: Eye },
];

interface MissionData {
  plan: string[];
  tasks: { id: string; label: string; status: "listo" | "en-curso" | "pendiente" }[];
  approvals: { id: string; label: string; who: string }[];
  result: { metric: string; value: string }[];
}

const DATA: MissionData = {
  plan: [
    "Foco: LinkedIn + Email + Landing específica",
    "Audiencia: decisores con poder de firma en empresas de 20–200 empleados",
    "Mensaje principal: ROI demostrable en 30 días",
    "Calendario: 4 semanas con iteración quincenal",
  ],
  tasks: [
    { id: "t1", label: "Investigar histórico y audiencias", status: "listo" },
    { id: "t2", label: "Borrador 6 creatividades LinkedIn", status: "listo" },
    { id: "t3", label: "Secuencia email 5 emails", status: "en-curso" },
    { id: "t4", label: "Wireframe landing", status: "en-curso" },
    { id: "t5", label: "Definir métricas y dashboard", status: "pendiente" },
  ],
  approvals: [
    { id: "a1", label: "Aprobar creatividad LinkedIn #1", who: "Tú" },
    { id: "a2", label: "Aprobar asunto email 1", who: "Tú" },
    { id: "a3", label: "Confirmar presupuesto medios", who: "Tú" },
  ],
  result: [
    { metric: "Leads cualificados", value: "37" },
    { metric: "Tasa apertura email", value: "48%" },
    { metric: "CTR landing", value: "11.2%" },
    { metric: "CPL estimado", value: "↓ 23%" },
  ],
};

export function MissionChat({ className }: { className?: string }) {
  const [step, setStep] = useState<Step["id"]>("plan");

  return (
    <div className={cn("relative", className)}>
      {/* Chat thread */}
      <div className="space-y-4">
        <ChatBubble role="user">
          Queremos captar 30 clientes nuevos durante septiembre.
        </ChatBubble>
        <ChatBubble role="agent">
          Antes de proponer la campaña, he revisado el producto, los canales actuales y el
          histórico. Recomiendo priorizar LinkedIn, email y una landing específica. Te he
          preparado un plan operativo que puedes revisar abajo.
        </ChatBubble>
      </div>

      {/* Step controls */}
      <div className="mt-6 flex flex-wrap gap-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const active = step === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={cn(
                "group flex items-center gap-2 rounded-md border px-3 py-2 text-[0.8125rem] font-medium transition-all",
                active
                  ? "border-accent/60 bg-accent-soft text-foreground"
                  : "border-border bg-surface-soft/50 text-muted hover:border-foreground/30 hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.label}
              <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <div className="mt-5 rounded-xl border border-border bg-[#0c0e0a] p-5">
        {step === "plan" && (
          <motion.ul
            key="plan"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {DATA.plan.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.875rem] text-foreground/90">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="text-pretty">{line}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {step === "tasks" && (
          <motion.ul
            key="tasks"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {DATA.tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-surface-soft/40 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      t.status === "listo" && "bg-success",
                      t.status === "en-curso" && "bg-warning animate-pulse",
                      t.status === "pendiente" && "bg-muted/40"
                    )}
                  />
                  <span className="text-[0.875rem] text-foreground/90">{t.label}</span>
                </div>
                <span
                  className={cn(
                    "font-mono text-[0.65rem] uppercase tracking-[0.14em]",
                    t.status === "listo" && "text-success",
                    t.status === "en-curso" && "text-warning",
                    t.status === "pendiente" && "text-muted"
                  )}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </motion.ul>
        )}

        {step === "approvals" && (
          <motion.ul
            key="approvals"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {DATA.approvals.map((a, i) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 rounded-md border border-warning/30 bg-warning/5 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded border border-warning/40 bg-warning/10 font-mono text-[0.65rem] text-warning">
                    {i + 1}
                  </span>
                  <span className="text-[0.875rem] text-foreground/90">{a.label}</span>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  Espera a {a.who}
                </span>
              </li>
            ))}
          </motion.ul>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {DATA.result.map((r) => (
              <div
                key={r.metric}
                className="rounded-md border border-border bg-surface-soft/40 p-3"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {r.metric}
                </p>
                <p className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                  {r.value}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ChatBubble({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "user" | "agent";
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div
          className="mt-1 h-7 w-7 shrink-0 rounded-md border border-border bg-[#0c0e0a] flex items-center justify-center"
          aria-hidden
        >
          <span className="font-mono text-[0.6rem] tracking-[0.14em] text-foreground">DA</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[88%] rounded-xl px-4 py-3 text-[0.9375rem] leading-relaxed text-pretty sm:max-w-[80%]",
          isUser
            ? "bg-surface-soft border border-border"
            : "bg-[#0c0e0a] border border-border-strong"
        )}
      >
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
          {isUser ? "Tú" : "Departamento · Marketing"}
        </p>
        <p className="mt-1.5 text-foreground/90">{children}</p>
      </div>
    </motion.div>
  );
}
