import type { Metadata } from "next";
import Link from "next/link";
import { resolveSession } from "@/lib/access";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Panel",
  description: "Resumen operativo de tu cuenta en Deptify.",
};

export default async function PanelOverview() {
  const session = await resolveSession();

  return (
    <div className="space-y-10">
      <div>
        <Eyebrow index="01">Resumen</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Tu cuenta, de un vistazo.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Vista rápida del estado de tu instancia y los departamentos activados.
          Las acciones del día a día (tareas, aprobaciones, misiones) viven en
          el panel interactivo que verás en próximas versiones.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Departamentos activados"
          value={String(session.enabledDepartments.length)}
        />
        <SummaryTile
          label="Miembros"
          value="—"
          hint="Disponible cuando conectes Supabase."
        />
        <SummaryTile
          label="Plan"
          value={session.plan?.name ?? "Sin asignar"}
        />
      </div>

      <div>
        <h3 className="font-display text-[1.25rem] tracking-[-0.01em] text-foreground">
          Departamentos habilitados
        </h3>
        {session.enabledDepartments.length === 0 ? (
          <p className="mt-3 text-[0.9375rem] text-muted">
            Cuando tu empresa active un departamento, aparecerá aquí. Mientras
            tanto, puedes revisar el{" "}
            <Link href="/departamentos" className="underline underline-offset-4">
              catálogo completo
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {session.enabledDepartments.map((d) => (
              <li
                key={d.id}
                className="rounded-xl border border-border bg-[#0c0e0a] p-4"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  {d.category}
                </p>
                <p className="mt-2 text-[1.0625rem] font-medium text-foreground">
                  {d.name}
                </p>
                {d.tagline && (
                  <p className="mt-1 text-[0.8125rem] text-muted">{d.tagline}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-b from-surface-soft/60 to-surface p-5">
        <p className="text-[0.875rem] text-muted">
          Esta sección está lista para integrarse con Supabase en cuanto se
          configuren las credenciales. Por ahora solo se muestra la
          información pública disponible.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-[#0a0c08] p-3 font-mono text-[0.7rem] text-muted">
{`NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= (server only)`}
        </pre>
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-[#0c0e0a] p-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[0.75rem] text-muted text-pretty">{hint}</p>
      )}
    </div>
  );
}
