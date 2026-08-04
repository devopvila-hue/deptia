"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// CÓMO EMPEZAR — los 3 pasos del diagnóstico.
// No "crear cuenta". No "elegir departamento". Escuchar primero.
export function HowToStart() {
  return (
    <section className="border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{copy.howToStart.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.howToStart.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.howToStart.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-background p-6 sm:p-7"
            >
              <span className="font-mono text-[0.85rem] tracking-[0.05em] text-accent">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-[1.375rem] leading-[1.15] tracking-[-0.015em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="https://app.departify.app/signup"
            variant="primary"
            size="lg"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            {copy.howToStart.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}