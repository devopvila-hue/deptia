"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

export function CategoryStatement() {
  return (
    <section className="relative border-b border-border bg-background">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="02">La diferencia</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground"
            >
              {copy.positioning.title}
            </motion.h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              {copy.positioning.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Column
                variant="muted"
                label={copy.positioning.leftColumn.label}
                items={copy.positioning.leftColumn.items}
                description="Una interfaz con un modelo de lenguaje detrás."
                index="A"
              />
              <Column
                variant="accent"
                label={copy.positioning.rightColumn.label}
                items={copy.positioning.rightColumn.items}
                description="Un equipo con memoria, procesos y miembros especializados."
                index="B"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Column({
  variant,
  label,
  items,
  description,
  index,
}: {
  variant: "accent" | "muted";
  label: string;
  items: string[];
  description: string;
  index: string;
}) {
  const isAccent = variant === "accent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-8 ${
        isAccent
          ? "border-accent/30 bg-gradient-to-b from-[#101210] to-[#0a0c08]"
          : "border-border bg-surface-soft/30"
      }`}
    >
      {isAccent && (
        <div
          className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(216,255,98,0.4) 0%, transparent 60%)",
          }}
          aria-hidden
        />
      )}
      <div className="relative flex items-center justify-between border-b border-border/60 pb-4">
        <span
          className={`font-mono text-[0.65rem] uppercase tracking-[0.18em] ${
            isAccent ? "text-accent" : "text-muted"
          }`}
        >
          {index}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {isAccent ? "lo que ofrecemos" : "lo que no es"}
        </span>
      </div>
      <p
        className={`mt-5 font-display text-[1.75rem] tracking-[-0.02em] ${
          isAccent ? "text-foreground" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-[0.875rem] text-muted">{description}</p>

      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-start gap-3 border-t border-border/40 pt-3 text-[0.9375rem] first:border-t-0 first:pt-0"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isAccent ? "bg-accent" : "bg-muted/40"
              }`}
            />
            <span className={isAccent ? "text-foreground/90" : "text-muted"}>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
