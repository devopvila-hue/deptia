import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { pricingPlans } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Planes",
  description: "Planes disponibles en la plataforma.",
};

export default function AdminPlans() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="A3">Planes</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Planes comercializables.
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {pricingPlans.map((p) => (
          <li
            key={p.slug}
            className="rounded-xl border border-border bg-[#0c0e0a] p-4"
          >
            <p className="text-[1rem] font-medium text-foreground">{p.name}</p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              {p.slug}
            </p>
            <ul className="mt-3 space-y-1 text-[0.8125rem] text-foreground/85">
              {p.features.slice(0, 4).map((f) => (
                <li key={f}>· {f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
