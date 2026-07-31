import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DepartmentGrid } from "@/components/departments/department-grid";
import { departments, comingSoonDepartments } from "@/data/departments";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Departamentos",
  description: `Catálogo completo de departamentos operados con IA. ${brand.description}`,
};

export default function DepartmentsIndex() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="D">Catálogo</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            Cada departamento, un equipo completo. No un agente aislado.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Selecciona el equipo que necesita tu empresa. Cada uno incluye dirección, miembros
            especializados, memoria de marca, tareas, entregables y aprobaciones.
          </p>
        </Container>
      </section>

      {/* Active departments */}
      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {departments.map((d) => (
              <DepartmentGrid key={d.slug} department={d} />
            ))}
          </div>
        </Container>
      </section>

      {/* Coming soon */}
      <section>
        <Container width="wide" className="py-16 sm:py-20">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Próximamente
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                Estamos formando los siguientes equipos
              </h2>
            </div>
            <p className="hidden text-[0.875rem] text-muted sm:block">
              {comingSoonDepartments.length} departamentos en preparación
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoonDepartments.map((d) => (
              <div
                key={d.slug}
                className="rounded-xl border border-dashed border-border bg-surface-soft/40 p-5"
              >
                <p className="font-display text-[1.125rem] tracking-[-0.01em] text-foreground">
                  {d.name}
                </p>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">{d.tagline}</p>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  En preparación
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
