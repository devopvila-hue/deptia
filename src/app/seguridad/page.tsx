import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/marketing/final-cta";
import { IsolatedInstances } from "@/components/visualizations/isolated-instances";
import { ShieldCheck, Lock, Database, FileLock, Users, Eye, MailCheck, KeyRound } from "lucide-react";
import Link from "next/link";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Seguridad",
  description:
    "Tu instancia privada, tus credenciales, tu memoria. Cómo protegemos los datos de tu empresa.",
  alternates: { canonical: "/seguridad" },
  openGraph: {
    title: `Seguridad · ${brand.name}`,
    description:
      "Instancia privada por cliente, claves de cifrado propias, permisos por acción. Cómo protegemos tus datos.",
    url: "/seguridad",
    type: "website",
  },
};

const PILLARS = [
  {
    icon: Lock,
    title: "Instancia independiente",
    description:
      "Cada cliente opera sobre una instancia con recursos dedicados. No se comparte infraestructura con otros clientes.",
  },
  {
    icon: Database,
    title: "Datos separados",
    description:
      "Cada empresa tiene su propia base de datos y perímetro. No se mezclan datos entre clientes.",
  },
  {
    icon: KeyRound,
    title: "Credenciales propias",
    description:
      "Las claves de cifrado son únicas por instancia. Si decides irte, puedes desconectar y exportar todo.",
  },
  {
    icon: ShieldCheck,
    title: "Permisos por acción",
    description:
      "Cada acción se clasifica en tres niveles: puede, aprueba, nunca. El equipo los respeta.",
  },
  {
    icon: Eye,
    title: "Registros de actividad",
    description:
      "Queda constancia de cada acción ejecutada, propuesta o aprobada. Visible para tu equipo administrador.",
  },
  {
    icon: Users,
    title: "Acceso administrativo",
    description:
      "Solo las personas que invites pueden ver y aprobar. Roles separados entre administradores y miembros.",
  },
  {
    icon: FileLock,
    title: "Integraciones reversibles",
    description:
      "Puedes desconectar cualquier integración cuando quieras. Los datos previamente leídos se eliminan bajo solicitud.",
  },
  {
    icon: MailCheck,
    title: "Eliminación a la cancelación",
    description:
      "Tienes 30 días para reactivar o exportar. Pasado ese plazo, los datos asociados a la instancia se eliminan.",
  },
];

const RESERVED = [
  {
    title: "DPA",
    description:
      "Acuerdo de tratamiento de datos disponible bajo solicitud. Plantilla revisada por asesoría jurídica.",
  },
  {
    title: "Subencargados",
    description:
      "Listado completo de subencargados disponible en el panel de seguridad. Actualizado de forma continua.",
  },
  {
    title: "Ubicación de datos",
    description:
      "Los datos se procesan en la Unión Europea. Las regiones exactas se documentan en el DPA.",
  },
  {
    title: "Política de conservación",
    description:
      "Cada tipo de dato tiene un periodo de conservación documentado. Configurable a nivel de instancia.",
  },
  {
    title: "Backups",
    description:
      "Copias de seguridad cifradas según el plan contratado. Frecuencia y retención detalladas en el panel.",
  },
  {
    title: "Contacto de seguridad",
    description:
      "Canal directo para reportar incidentes. Respuesta en horario laboral en menos de 24 horas.",
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">Seguridad</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            Tu empresa no comparte oficina digital con nadie.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Cada cliente opera sobre una instancia privada, con credenciales propias, memoria
            independiente y permisos auditables.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="/contacto?asunto=seguridad"
              variant="primary"
              size="lg"
              rightIcon={<MailCheck className="h-4 w-4" />}
            >
              Contactar con seguridad
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Ver el panel
            </Button>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-[#0c0e0a] p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/30 bg-accent-soft text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[0.875rem] text-muted text-pretty">{p.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Isolation visualization */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="02">Aislamiento</Eyebrow>
              <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
                Empresas diferentes, instancias diferentes.
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
                Cada empresa mantiene su propia instancia, con sus claves, su base de datos y su
                perímetro. La información nunca se cruza.
              </p>
            </div>
            <div className="lg:col-span-7">
              <IsolatedInstances />
            </div>
          </div>
        </Container>
      </section>

      {/* Reserved sections */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="03">Documentación</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                Información técnica disponible
              </h2>
              <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
                Estos apartados se completan con la documentación definitiva. De momento dejamos
                constancia de los compromisos.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 lg:col-span-8 sm:grid-cols-2">
              {RESERVED.map((r) => (
                <li
                  key={r.title}
                  className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-5"
                >
                  <h3 className="text-[1.0625rem] font-medium text-foreground">{r.title}</h3>
                  <p className="mt-2 text-[0.875rem] text-muted text-pretty">{r.description}</p>
                  <Link
                    href="/contacto?asunto=seguridad"
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
                  >
                    Solicitar documento →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Note about certifications */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="narrow" className="py-20 sm:py-24">
          <div className="rounded-2xl border border-border bg-[#0c0e0a] p-6 sm:p-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Aclaración
            </p>
            <h2 className="mt-3 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
              Sobre certificaciones
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              No mostramos sellos de certificaciones que todavía no poseemos. El equipo técnico
              está trabajando para alcanzar las principales certificaciones del sector cuando
              el producto esté en un estado operativo más maduro.
            </p>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
