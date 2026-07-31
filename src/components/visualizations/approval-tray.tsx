"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";

type TaskStatus = "pending" | "in-review" | "approved";

interface ApprovalTask {
  id: string;
  title: string;
  department: string;
  status: TaskStatus;
  eta: string;
}

const TASKS: ApprovalTask[] = [
  {
    id: "t1",
    title: "Secuencia de email · Reactivación",
    department: "Marketing",
    status: "in-review",
    eta: "8 min",
  },
  {
    id: "t2",
    title: "Borrador campaña LinkedIn",
    department: "Marketing",
    status: "pending",
    eta: "12 min",
  },
  {
    id: "t3",
    title: "Reactivación 40 cuentas pipeline",
    department: "Ventas",
    status: "approved",
    eta: "—",
  },
];

export function ApprovalTray({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TASKS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#101210] to-[#0a0b09] p-4 sm:p-5 ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            Bandeja de aprobaciones
          </span>
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/70">
          3 activas
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {TASKS.map((task, i) => {
          const isActive = i === active;
          return (
            <motion.li
              key={task.id}
              animate={{
                backgroundColor: isActive ? "rgba(216,255,98,0.04)" : "rgba(255,255,255,0)",
                borderColor: isActive ? "rgba(216,255,98,0.4)" : "rgba(242,240,233,0.05)",
              }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 rounded-md border px-3 py-2.5"
            >
              <StatusGlyph status={task.status} />
              <div className="flex-1">
                <p className="text-[0.8125rem] text-foreground">{task.title}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {task.department} · {task.status === "approved" ? "Aprobado" : `Listo en ${task.eta}`}
                </p>
              </div>
              {task.status === "in-review" && isActive && (
                <motion.div
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 rounded border border-accent/40 bg-accent-soft px-2 py-1"
                >
                  <Check className="h-3 w-3 text-accent" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-foreground">
                    Aprobar
                  </span>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function StatusGlyph({ status }: { status: TaskStatus }) {
  const cls =
    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border";
  if (status === "approved") {
    return (
      <span className={`${cls} border-success/40 bg-success/10`}>
        <Check className="h-3 w-3 text-success" />
      </span>
    );
  }
  if (status === "in-review") {
    return (
      <span className={`${cls} border-warning/40 bg-warning/10`}>
        <Clock className="h-3 w-3 text-warning" />
      </span>
    );
  }
  return (
    <span className={`${cls} border-border bg-surface-soft`}>
      <AlertCircle className="h-3 w-3 text-muted" />
    </span>
  );
}
