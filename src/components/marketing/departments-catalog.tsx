"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MemberPattern } from "@/components/visualizations/member-pattern";
import { AGENT_ICONS } from "@/components/ui/icon";
import { departments } from "@/data/departments";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function DepartmentsCatalog() {
  const ordered = [...departments].sort((a, b) => a.ordering - b.ordering);

  return (
    <section id="departamentos" className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Eyebrow>Catálogo</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              Quince departamentos en el catálogo. Activa los que necesitas hoy.
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] text-muted text-pretty">
            Cada departamento es un equipo completo con miembros, tareas, memoria y entregables.
            Activa los que necesitas hoy. Los demás se incorporarán cuando los contrates.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((d, i) => (
            <DepartmentCard key={d.slug} department={d} index={i} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            {ordered.length} departamentos · todos disponibles · pronto más
          </p>
          <Link
            href="/departamentos"
            onClick={() => track("department_viewed", { department: "all" })}
            className="group inline-flex items-center gap-1.5 text-[0.875rem] text-foreground/80 transition-colors hover:text-foreground"
          >
            Ver todos los departamentos
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function DepartmentCard({
  department,
  index,
}: {
  department: (typeof departments)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => {
        setHovered(true);
        track("department_card_hovered", { department: department.slug });
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 transition-all sm:p-7",
        hovered ? "border-foreground/30" : "border-border"
      )}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${department.color.accent} 0%, transparent 60%)`,
        }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between">
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.18em]"
          style={{ color: department.color.base }}
        >
          {department.category} · {String(department.ordering).padStart(2, "0")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-success">
          <span className="h-1 w-1 rounded-full bg-success" />
          Disponible
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2rem]">
          {department.name}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted text-pretty">
          {department.promise}
        </p>
      </div>

      {/* Members preview */}
      <div className="relative mt-6 grid grid-cols-6 gap-2">
        {department.members.slice(0, 6).map((m) => (
          <MemberPattern
            key={m.id}
            member={m}
            size="sm"
            color={department.color.base}
            icon={AGENT_ICONS[department.slug]}
          />
        ))}
      </div>
      <p className="relative mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        {department.members.length} miembros · 1 dirección · {department.integrations.length} integraciones
      </p>

      {/* Capabilities list — expands on hover */}
      <motion.ul
        animate={{
          height: hovered ? "auto" : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative mt-4 space-y-1.5 overflow-hidden"
      >
        {department.capabilities.slice(0, 4).map((c) => (
          <li
            key={c}
            className="flex items-start gap-2 text-[0.8125rem] text-foreground/80"
          >
            <span
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
              style={{ background: department.color.base }}
            />
            {c}
          </li>
        ))}
      </motion.ul>

      <div className="relative mt-auto flex items-center justify-between border-t border-border/60 pt-5">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            Desde
          </p>
          <p className="mt-0.5 font-display text-[1.25rem] tracking-[-0.02em] text-foreground">
            {department.priceFrom}€{" "}
            <span className="text-[0.875rem] text-muted">/ mes</span>
          </p>
        </div>
        <Link
          href={`/departamentos/${department.slug}`}
          onClick={() => track("department_viewed", { department: department.slug })}
          className="group/btn inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft/60 px-3 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
        >
          Entrar
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
