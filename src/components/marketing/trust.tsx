"use client";

import { motion } from "motion/react";
import { ShieldCheck, Eye, LogOut } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// POR QUÉ CONFIAR — lo que elimina el miedo.
export function Trust() {
  const icons = [ShieldCheck, Eye, LogOut];

  return (
    <section className="border-b border-border bg-background">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{copy.trust.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.trust.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.trust.items.map((item, i) => {
            const Icon = icons[i] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-surface-soft/30 p-6 sm:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-foreground/90">
                  {item}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}