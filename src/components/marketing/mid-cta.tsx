"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * CTA intermedio. Aparece 2 veces en la home (después de departments y
 * después de demo-conversation) para mantener la conversión visible en
 * cada scroll. Variante "alt" usa fondo elevado para romper el ritmo.
 */
export function MidCta({ variant }: { variant?: "alt" }) {
  const isAlt = variant === "alt";
  return (
    <section
      className={cn(
        "relative border-y border-border",
        isAlt ? "bg-surface-soft/40" : "bg-background"
      )}
      aria-labelledby="mid-cta-title"
    >
      <Container width="wide" className="py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between",
            "rounded-2xl border border-border/80 p-6 sm:p-7",
            isAlt ? "bg-gradient-to-b from-[#101210] to-[#0a0c08]" : "bg-surface-soft/30"
          )}
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Siguiente paso
            </p>
            <h2
              id="mid-cta-title"
              className="mt-2 font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.15] tracking-[-0.02em] text-foreground text-balance"
            >
              ¿Listo para que tu próximo departamento arranque hoy?
            </h2>
            <p className="mt-2 text-[0.9375rem] text-muted text-pretty">
              Configuración guiada en menos de 30 minutos. Sin tarjeta, sin permanencia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <GoogleAuthButton
              fallbackHref="https://app.departify.app/signup"
              variant="primary"
              size="md"
              onAfterClick={() => track("mid_cta_clicked", { variant: variant ?? "default" })}
            >
              Crear mi equipo
            </GoogleAuthButton>
            <Button href="/como-funciona" variant="ghost" size="md">
              Ver cómo funciona
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}