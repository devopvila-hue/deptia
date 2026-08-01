import type { Metadata } from "next";
import { resolveSession } from "@/lib/access";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Ajustes",
  description: "Ajustes generales de tu cuenta.",
};

export default async function PanelSettings() {
  const session = await resolveSession();
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="04">Ajustes</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Configuración de la cuenta.
        </h2>
      </div>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Row label="Email" value={session.user.email} />
        <Row label="Nombre" value={session.profile?.full_name ?? "—"} />
        <Row label="Empresa" value={session.company?.name ?? "—"} />
        <Row label="Rol" value={session.role ?? "—"} />
        <Row label="Plan" value={session.plan?.name ?? "—"} />
        <Row label="Departamentos activados" value={String(session.enabledDepartments.length)} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-[#0c0e0a] p-4">
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-[0.9375rem] text-foreground">{value}</dd>
    </div>
  );
}
