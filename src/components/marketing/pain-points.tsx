"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// POR QUÉ ME SIRVE — los 3 problemas que Manolo siente cada día.
// No compite con ChatGPT ni con chatbots. Compite con "seguir haciéndolo todo tú".
export function PainPoints() {
  return (
    <section className="border-b border-border bg-background">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{copy.painPoints.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.painPoints.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
            {copy.painPoints.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {copy.painPoints.items.map((item, i) => (
            <motion.div
              key={item.head}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface-soft/30 p-6 sm:p-7"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-[1.375rem] leading-[1.15] tracking-[-0.015em] text-foreground">
                {item.head}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}