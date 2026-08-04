"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// RECOMENDACIÓN — departamentos como consecuencia, no como catálogo.
// Lista simple. Sin botones individuales. Sin "comprar".
export function Recommendation() {
  return (
    <section className="border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{copy.recommendation.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.recommendation.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {copy.recommendation.subtitle}
          </p>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {copy.recommendation.departments.map((dept, i) => (
            <motion.li
              key={dept}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-lg border border-border bg-background px-4 py-3 font-display text-[1rem] text-foreground"
            >
              {dept}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl text-center text-[1rem] leading-relaxed text-muted text-pretty"
        >
          {copy.recommendation.footnote}
        </motion.p>
      </Container>
    </section>
  );
}