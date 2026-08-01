import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Administración",
  description: `${brand.name} · consola interna.`,
};

export default function AdminOverview() {
  return (
    <div className="space-y-10">
      <div>
        <Eyebrow index="ADM">Consola</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Estado de la plataforma
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Esta consola está preparada para conectarse a Supabase en cuanto se
          proporcionen las credenciales. Mientras tanto, solo se muestran los
          recursos configurados en el repositorio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Placeholder label="Empresas" hint="Listado y alta de nuevas empresas." />
        <Placeholder label="Departamentos" hint="Catálogo global, activaciones y orden." />
        <Placeholder label="Planes" hint="Starter, Business y Company." />
      </div>

      <section className="rounded-xl border border-border bg-[#0c0e0a] p-5">
        <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Próximos pasos
        </h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.9375rem] text-foreground/90">
          <li>Configurar variables de Supabase en <code>.env.local</code>.</li>
          <li>
            Aplicar la migración inicial desde{" "}
            <code>supabase/migrations/0001_init.sql</code>.
          </li>
          <li>
            Marcar al menos un usuario como <code>super_admin</code> para
            acceder a esta consola.
          </li>
        </ol>
      </section>
    </div>
  );
}

function Placeholder({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-[#0c0e0a] p-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-[0.9375rem] text-foreground/90 text-pretty">
        {hint}
      </p>
    </div>
  );
}
