"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// PRUEBA SOCIAL — sectores reales.
// Responde: "¿quién lo usa?" (¿confío porque otros como yo lo usan?)
export function Proof() {
  return (
    <section className="border-b border-border bg-background">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{copy.proof.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.proof.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {copy.proof.items.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface-soft/30 p-6"
            >
              <h3 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.015em] text-foreground">
                {item.type}
              </h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}