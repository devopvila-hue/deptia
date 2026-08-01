import type { Metadata } from "next";
import Link from "next/link";
import { resolveSession } from "@/lib/access";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Departamentos",
  description: "Departamentos activados para tu empresa.",
};

export default async function PanelDepartments() {
  const session = await resolveSession();

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="02">Departamentos</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Equipos activados en tu empresa.
        </h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted text-pretty">
          Estos son los departamentos que tienes contratados. Activa más desde el{" "}
          <Link href="/departamentos" className="underline underline-offset-4">
            catálogo general
          </Link>
          .
        </p>
      </div>
      {session.enabledDepartments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-6 text-[0.9375rem] text-muted">
          Aún no tienes departamentos activados.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {session.enabledDepartments.map((d) => (
            <li
              key={d.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-[#0c0e0a] p-4"
            >
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  {d.category}
                </p>
                <p className="mt-1 text-[1.0625rem] font-medium text-foreground">
                  {d.name}
                </p>
                {d.tagline && (
                  <p className="mt-1 text-[0.8125rem] text-muted text-pretty">{d.tagline}</p>
                )}
              </div>
              <Link
                href={`/departamentos/${d.slug}`}
                className="shrink-0 rounded-md border border-border bg-surface-soft/40 px-3 py-1.5 text-[0.75rem] text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
              >
                Ver detalle
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
