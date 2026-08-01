import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Auditoría",
  description: "Registro de auditoría interna.",
};

export default function AdminAudit() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="A4">Auditoría</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Registro de operaciones sensibles.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Toda escritura administrativa queda registrada en{" "}
          <code>public.audit_log</code>. Esta vista estará disponible cuando se
          conecte Supabase.
        </p>
      </div>
    </div>
  );
}
