"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { pricingPlans, pricingNotes } from "@/data/pricing";
import { track } from "@/lib/analytics";
import { cn, formatCurrency } from "@/lib/utils";

export function Pricing({ hideHeader = false }: { hideHeader?: boolean }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section
      id={hideHeader ? undefined : "precios"}
      className="relative bg-background"
    >
      <Container width="wide" className={hideHeader ? "" : "py-24 sm:py-32"}>
        {!hideHeader && (
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <Eyebrow>Precios</Eyebrow>
              <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
                Tres planes. Sin sorpresas. Cancela cuando quieras.
              </h2>
            </div>

            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        )}

        {hideHeader && (
          <div className="mb-10 flex justify-end">
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const price = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            return (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-gradient-to-b p-6 sm:p-8",
                  plan.highlighted
                    ? "border-accent/40 from-[#101210] to-[#0a0c08] shadow-[0_0_0_1px_rgba(216,255,98,0.2)]"
                    : "border-border from-[#0f110f] to-[#080908]"
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-[#0c0e0a] px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <h3 className="font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                    {plan.name}
                  </h3>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    0{plan.slug === "starter" ? "1" : plan.slug === "business" ? "2" : "3"}
                  </span>
                </div>
                <p className="mt-4 text-[0.875rem] text-muted text-pretty">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-[2.5rem] tracking-[-0.025em] text-foreground">
                    {formatCurrency(price, plan.currency)}
                  </span>
                  <span className="text-[0.875rem] text-muted">
                    / {billing === "monthly" ? "mes" : "año"}
                  </span>
                </div>
                {billing === "yearly" && (
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    Equivale a 2 meses gratis
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-3 border-t border-border/60 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.875rem] text-foreground/90">
                      <Check
                        className={cn(
                          "mt-0.5 h-3.5 w-3.5 shrink-0",
                          plan.highlighted ? "text-accent" : "text-muted"
                        )}
                      />
                      <span className="text-pretty">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href={plan.cta.href}
                    variant={plan.highlighted ? "primary" : "secondary"}
                    size="md"
                    onClick={() =>
                      track("pricing_plan_selected", { plan: plan.slug, billing })
                    }
                    rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 space-y-2 border-t border-border pt-6 text-[0.8125rem] text-muted">
          {pricingNotes.map((note) => (
            <p key={note} className="flex items-start gap-2 text-pretty">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted/40" />
              {note}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: "monthly" | "yearly";
  onChange: (b: "monthly" | "yearly") => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-soft/60 p-1">
      {(["monthly", "yearly"] as const).map((b) => {
        const isActive = billing === b;
        return (
          <button
            key={b}
            onClick={() => onChange(b)}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="billing-toggle"
                className="absolute inset-0 rounded-md bg-surface border border-border-strong"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">
              {b === "monthly" ? "Mensual" : "Anual"}
              {b === "yearly" && (
                <span className="ml-1.5 inline-flex items-center rounded-sm bg-accent-soft px-1 py-px font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
                  -17%
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
