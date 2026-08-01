import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Departamentos",
  description: "Catálogo global de departamentos.",
};

export default function AdminDepartments() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="A2">Departamentos</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Catálogo global y activaciones.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Los 7 departamentos del catálogo se siembran automáticamente desde la
          migración inicial. Esta consola mostrará el listado cuando se conecte
          Supabase.
        </p>
      </div>
    </div>
  );
}
