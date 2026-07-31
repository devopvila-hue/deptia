"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Settings,
  Users,
  ListChecks,
  Bell,
  Search,
  Plus,
  ChevronRight,
  X,
  Building2,
  Sparkles,
  Circle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MemberPattern } from "@/components/visualizations/member-pattern";
import { departments, listAvailableDepartments } from "@/data/departments";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Tab = "resumen" | "departamentos" | "tareas" | "aprobaciones" | "calendario" | "conexiones" | "consumo" | "ajustes";

const TABS: { id: Tab; label: string; icon: typeof ListChecks }[] = [
  { id: "resumen", label: "Resumen", icon: TrendingUp },
  { id: "departamentos", label: "Departamentos", icon: Building2 },
  { id: "tareas", label: "Tareas", icon: ListChecks },
  { id: "aprobaciones", label: "Aprobaciones", icon: CheckCircle2 },
  { id: "calendario", label: "Calendario", icon: Calendar },
  { id: "conexiones", label: "Conexiones", icon: Users },
  { id: "consumo", label: "Consumo", icon: Sparkles },
  { id: "ajustes", label: "Ajustes", icon: Settings },
];

interface Task {
  id: string;
  title: string;
  department: string;
  status: "ready" | "in-progress" | "waiting" | "done";
  due: string;
  priority: "low" | "med" | "high";
}

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    title: "Secuencia email · Reactivación Q3",
    department: "Marketing",
    status: "ready",
    due: "Hoy",
    priority: "high",
  },
  {
    id: "t2",
    title: "Borrador creatividad LinkedIn #1",
    department: "Marketing",
    status: "waiting",
    due: "Hoy",
    priority: "med",
  },
  {
    id: "t3",
    title: "Reactivar 40 cuentas del pipeline",
    department: "Ventas",
    status: "in-progress",
    due: "Mañana",
    priority: "high",
  },
  {
    id: "t4",
    title: "Guión episodio 3 — Casos de uso",
    department: "Contenido",
    status: "ready",
    due: "Jue",
    priority: "med",
  },
  {
    id: "t5",
    title: "Informe semanal enviado",
    department: "Marketing",
    status: "done",
    due: "Lun",
    priority: "low",
  },
];

interface Approval {
  id: string;
  title: string;
  department: string;
  requested: string;
  type: "publish" | "send" | "modify" | "create";
}

const MOCK_APPROVALS: Approval[] = [
  {
    id: "a1",
    title: "Publicar creatividad LinkedIn #1",
    department: "Marketing",
    requested: "hace 4 min",
    type: "publish",
  },
  {
    id: "a2",
    title: "Enviar email 1 de secuencia",
    department: "Marketing",
    requested: "hace 18 min",
    type: "send",
  },
  {
    id: "a3",
    title: "Mover 12 deals a etapa ‘Propuesta’",
    department: "Ventas",
    requested: "hace 1 h",
    type: "modify",
  },
  {
    id: "a4",
    title: "Crear evento onboarding cliente",
    department: "Ventas",
    requested: "hace 2 h",
    type: "create",
  },
];

export function DemoPanel() {
  const [tab, setTab] = useState<Tab>("resumen");
  const [dismissed, setDismissed] = useState<string[]>([]);

  return (
    <div className="border-b border-border bg-background">
      <Container width="wide" className="py-10 sm:py-12">
        {/* Panel frame */}
        <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0c0e0a] to-[#080908]">
          {/* Top bar */}
          <div className="flex flex-col gap-3 border-b border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-danger/60" />
                <span className="h-2 w-2 rounded-full bg-warning/60" />
                <span className="h-2 w-2 rounded-full bg-success/60" />
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  Atlas / Panel
                </span>
                <span className="text-border-strong">/</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground">
                  {TABS.find((t) => t.id === tab)?.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warning">
                <span className="h-1 w-1 rounded-full bg-warning" />
                Modo demo
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> operativo
              </span>
            </div>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-border/60 lg:border-b-0 lg:border-r">
              <div className="px-3 py-4 lg:px-4 lg:py-5">
                <div className="flex items-center gap-2 rounded-md border border-border bg-surface-soft/40 px-2.5 py-1.5">
                  <Search className="h-3.5 w-3.5 text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar en el panel…"
                    aria-label="Buscar en el panel"
                    className="flex-1 bg-transparent text-[0.8125rem] text-foreground placeholder:text-muted focus:outline-none"
                    readOnly
                  />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                    ⌘K
                  </span>
                </div>

                <nav className="mt-5 space-y-0.5" aria-label="Secciones del panel">
                  {TABS.map((t) => {
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.8125rem] transition-colors",
                          active
                            ? "bg-accent-soft text-foreground border border-accent/30"
                            : "text-muted hover:bg-surface-soft/60 hover:text-foreground"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="flex-1">{t.label}</span>
                        {t.id === "aprobaciones" && (
                          <span className="rounded-full bg-warning/20 px-1.5 py-0.5 font-mono text-[0.6rem] text-warning">
                            4
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 hidden border-t border-border/60 pt-5 lg:block">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    Departamento activo
                  </p>
                  <div className="mt-3 rounded-md border border-border bg-[#0c0e0a] p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/30 bg-accent-soft text-[0.65rem] font-mono text-foreground">
                        MK
                      </span>
                      <div>
                        <p className="text-[0.8125rem] font-medium text-foreground">Marketing</p>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                          Operativo
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[0.7rem]">
                      <div>
                        <p className="text-muted">Miembros</p>
                        <p className="font-medium text-foreground">6</p>
                      </div>
                      <div>
                        <p className="text-muted">Tareas hoy</p>
                        <p className="font-medium text-foreground">8</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="min-h-[640px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  {tab === "resumen" && <ResumenView />}
                  {tab === "departamentos" && <DepartamentosView />}
                  {tab === "tareas" && <TareasView />}
                  {tab === "aprobaciones" && (
                    <AprobacionesView
                      approvals={MOCK_APPROVALS.filter((a) => !dismissed.includes(a.id))}
                      onApprove={(id) => setDismissed((d) => [...d, id])}
                      onReject={(id) => setDismissed((d) => [...d, id])}
                    />
                  )}
                  {tab === "calendario" && <CalendarioView />}
                  {tab === "conexiones" && <ConexionesView />}
                  {tab === "consumo" && <ConsumoView />}
                  {tab === "ajustes" && <AjustesView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA below demo */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-surface-soft/40 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Esto es un recorrido
            </p>
            <p className="mt-1 text-[0.9375rem] text-foreground">
              Cuando actives un departamento, los datos mostrados aquí serán los de tu empresa.
            </p>
          </div>
          <div className="flex gap-2">
            <Button href="/registro" variant="primary" size="md" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
              Crear mi equipo
            </Button>
            <Button href="/como-funciona" variant="ghost" size="md">
              Cómo funciona
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ResumenView() {
  return (
    <div className="p-5 sm:p-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tareas activas", value: "8", trend: "+3 esta semana" },
          { label: "Aprobaciones", value: "4", trend: "esperando" },
          { label: "Departamentos", value: "3", trend: "1 próximo" },
          { label: "Uso del mes", value: "62%", trend: "de 100%" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-[#0c0e0a] p-3.5">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              {k.label}
            </p>
            <p className="mt-2 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              {k.value}
            </p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              {k.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Activity chart mock */}
        <div className="rounded-xl border border-border bg-[#0c0e0a] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Actividad · últimos 7 días
            </p>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-success">
              ↑ 24% vs semana anterior
            </span>
          </div>
          <div className="mt-6 flex h-32 items-end gap-2">
            {[40, 55, 30, 70, 90, 60, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/30 to-accent"
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            <span>L</span>
            <span>M</span>
            <span>X</span>
            <span>J</span>
            <span>V</span>
            <span>S</span>
            <span>D</span>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-border bg-[#0c0e0a] p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Actividad reciente
          </p>
          <ul className="mt-4 space-y-3">
            {[
              { time: "10:42", text: "Borrador campaña listo", dept: "Marketing" },
              { time: "10:24", text: "Acción esperando aprobación", dept: "Ventas" },
              { time: "09:58", text: "Informe semanal enviado", dept: "Marketing" },
              { time: "09:15", text: "Reunión registrada", dept: "Ventas" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
                <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {a.time}
                </span>
                <div className="flex-1">
                  <p className="text-[0.8125rem] text-foreground/90">{a.text}</p>
                  <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                    {a.dept}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DepartamentosView() {
  const list = listAvailableDepartments();
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Equipos contratados
          </p>
          <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            3 departamentos activos
          </h2>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft/60 px-3 py-1.5 text-[0.75rem] text-foreground hover:border-foreground/30">
          <Plus className="h-3 w-3" />
          Añadir
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((d) => (
          <div
            key={d.slug}
            className="rounded-xl border border-border bg-[#0c0e0a] p-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span
                className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                style={{ color: d.color.base }}
              >
                {d.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-success">
                <span className="h-1 w-1 rounded-full bg-success" />
                operativo
              </span>
            </div>
            <h3 className="mt-3 text-[1.0625rem] font-medium text-foreground">{d.shortName}</h3>
            <p className="mt-1 text-[0.8125rem] text-muted text-pretty line-clamp-2">{d.promise}</p>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {d.members.slice(0, 6).map((m) => (
                <MemberPattern key={m.id} member={m} size="sm" color={d.color.base} />
              ))}
            </div>
            <button className="mt-3 inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-foreground">
              Ver detalle <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TareasView() {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Tareas</p>
          <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            Bandeja del departamento
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {(["todas", "mias", "esperando"] as const).map((f) => (
            <button
              key={f}
              className="rounded-md border border-border bg-surface-soft/40 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:border-foreground/30 hover:text-foreground"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {MOCK_TASKS.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-[#0c0e0a] p-3"
          >
            <StatusDot status={t.status} />
            <div className="flex-1">
              <p className="text-[0.875rem] text-foreground">{t.title}</p>
              <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                {t.department} · vence {t.due}
              </p>
            </div>
            <span
              className={cn(
                "rounded-md border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]",
                t.priority === "high" && "border-danger/40 text-danger",
                t.priority === "med" && "border-warning/40 text-warning",
                t.priority === "low" && "border-border text-muted"
              )}
            >
              {t.priority}
            </span>
            <ChevronRight className="h-4 w-4 text-muted" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusDot({ status }: { status: Task["status"] }) {
  const styles: Record<Task["status"], string> = {
    ready: "bg-success",
    "in-progress": "bg-warning animate-pulse",
    waiting: "bg-muted/40",
    done: "bg-success/40",
  };
  return <span className={cn("h-2 w-2 shrink-0 rounded-full", styles[status])} />;
}

function AprobacionesView({
  approvals,
  onApprove,
  onReject,
}: {
  approvals: Approval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Aprobaciones pendientes
          </p>
          <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            {approvals.length} decisiones esperándote
          </h2>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {approvals.length === 0 && (
          <li className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-6 text-center">
            <p className="text-[0.875rem] text-muted">No hay aprobaciones pendientes.</p>
          </li>
        )}
        {approvals.map((a) => (
          <li
            key={a.id}
            className="flex flex-col gap-3 rounded-xl border border-border bg-[#0c0e0a] p-4 sm:flex-row sm:items-center"
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                a.type === "publish" && "border-accent/40 bg-accent-soft",
                a.type === "send" && "border-warning/40 bg-warning/10",
                a.type === "modify" && "border-border-strong bg-surface-soft",
                a.type === "create" && "border-success/40 bg-success/10"
              )}
            >
              {a.type === "publish" && <Sparkles className="h-4 w-4 text-accent" />}
              {a.type === "send" && <Bell className="h-4 w-4 text-warning" />}
              {a.type === "modify" && <Settings className="h-4 w-4 text-foreground/80" />}
              {a.type === "create" && <Plus className="h-4 w-4 text-success" />}
            </span>
            <div className="flex-1">
              <p className="text-[0.9375rem] text-foreground">{a.title}</p>
              <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                {a.department} · solicitado {a.requested}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onReject(a.id)}
                className="rounded-md border border-border bg-surface-soft/40 px-3 py-1.5 text-[0.75rem] text-muted hover:border-foreground/30 hover:text-foreground"
              >
                Rechazar
              </button>
              <button
                onClick={() => onApprove(a.id)}
                className="rounded-md border border-accent/50 bg-accent-soft px-3 py-1.5 text-[0.75rem] text-foreground hover:border-accent/80"
              >
                Aprobar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalendarioView() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const today = 17;
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Calendario · octubre
          </p>
          <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            Eventos y publicaciones
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const isToday = d === today;
          const hasEvent = [3, 7, 12, 18, 24, 28].includes(d);
          return (
            <div
              key={d}
              className={cn(
                "relative aspect-square rounded-md border bg-[#0c0e0a] p-1.5 text-left transition-colors",
                isToday ? "border-accent/50" : "border-border/60"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[0.65rem]",
                  isToday ? "text-accent" : "text-muted"
                )}
              >
                {d}
              </span>
              {hasEvent && (
                <span className="absolute bottom-1.5 left-1.5 right-1.5 h-1 rounded-full bg-accent/60" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConexionesView() {
  const tools = [
    { name: "Gmail", connected: true },
    { name: "Google Calendar", connected: true },
    { name: "Google Drive", connected: true },
    { name: "HubSpot", connected: true },
    { name: "Slack", connected: false },
    { name: "Telegram", connected: true },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Integraciones
          </p>
          <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
            {tools.filter((t) => t.connected).length} conectadas
          </h2>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft/60 px-3 py-1.5 text-[0.75rem] text-foreground hover:border-foreground/30">
          <Plus className="h-3 w-3" />
          Añadir
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between rounded-lg border border-border bg-[#0c0e0a] p-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-soft text-[0.65rem] font-mono text-foreground">
                {t.name.slice(0, 2)}
              </span>
              <span className="text-[0.8125rem] text-foreground">{t.name}</span>
            </div>
            <span
              className={cn(
                "font-mono text-[0.6rem] uppercase tracking-[0.14em]",
                t.connected ? "text-success" : "text-muted"
              )}
            >
              {t.connected ? "● conectado" : "○ disponible"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsumoView() {
  return (
    <div className="p-5 sm:p-6">
      <div className="border-b border-border/60 pb-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Consumo</p>
        <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
          Octubre · día 17
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Mensajes", used: 1240, max: 2000 },
          { label: "Generaciones", used: 64, max: 100 },
          { label: "Búsquedas", used: 320, max: 1000 },
        ].map((c) => {
          const pct = (c.used / c.max) * 100;
          return (
            <div key={c.label} className="rounded-xl border border-border bg-[#0c0e0a] p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  {c.label}
                </p>
                <span className="font-mono text-[0.7rem] text-foreground">
                  {c.used}/{c.max}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-soft">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-accent/40 to-accent"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AjustesView() {
  return (
    <div className="p-5 sm:p-6">
      <div className="border-b border-border/60 pb-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Ajustes</p>
        <h2 className="mt-1 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
          Configuración general
        </h2>
      </div>

      <div className="mt-4 space-y-2">
        {[
          { label: "Idioma", value: "Español (España)" },
          { label: "Zona horaria", value: "Europe/Madrid" },
          { label: "Notificaciones por email", value: "Activadas" },
          { label: "Resumen diario por Telegram", value: "08:30" },
          { label: "Idioma de los informes", value: "Español" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-[#0c0e0a] px-3 py-2.5"
          >
            <span className="text-[0.875rem] text-foreground">{s.label}</span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
