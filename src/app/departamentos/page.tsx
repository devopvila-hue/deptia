import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DepartmentGrid } from "@/components/departments/department-grid";
import { departments } from "@/data/departments";
import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Departamentos",
  description: `Catálogo completo de departamentos operados con IA. ${brand.description}`,
  alternates: { canonical: "/departamentos" },
  openGraph: {
    title: `Departamentos · ${brand.name}`,
    description: `Catálogo completo de departamentos operados con IA. Cada uno con dirección, miembros especializados y aprobaciones.`,
    url: "/departamentos",
    type: "website",
  },
};

export default function DepartmentsIndex() {
  const ordered = [...departments].sort((a, b) => a.ordering - b.ordering);

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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ordered.map((d) => (
              <DepartmentGrid key={d.slug} department={d} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
