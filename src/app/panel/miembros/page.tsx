import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Miembros",
  description: "Gestión de miembros de tu empresa.",
};

export default function PanelMembers() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="03">Miembros</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Quién puede entrar a tu panel.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Esta sección está preparada para gestionar miembros, invitaciones y
          desactivaciones. Cuando se conecten las credenciales de Supabase se
          mostrará automáticamente el listado.
        </p>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-6 text-[0.875rem] text-muted">
        Plantilla lista. La gestión CRUD vive en <code>company_members</code> y
        las políticas RLS ya están aplicadas.
      </div>
    </div>
  );
}
