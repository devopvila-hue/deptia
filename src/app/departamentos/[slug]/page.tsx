import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { MemberPattern } from "@/components/visualizations/member-pattern";
import { AGENT_ICONS, Icon } from "@/components/ui/icon";
import { VideoPlaceholder } from "@/components/visualizations/video-placeholder";
import { PermissionsBoardStatic } from "@/components/visualizations/permissions-board";
import { FAQ } from "@/components/ui/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { DepartmentAgent } from "@/components/departments/department-agent";
import { DepartmentImage } from "@/components/departments/department-image";
import { ProductJsonLd, FAQJsonLd } from "@/components/layout/json-ld";
import {
  departments,
  comingSoonDepartments,
  getDepartment,
} from "@/data/departments";
import { getAgent } from "@/data/department-agents";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { brand } from "@/config/brand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return [...departments, ...comingSoonDepartments].map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDepartment(slug) ?? comingSoonDepartments.find((cd) => cd.slug === slug);
  if (!d) return { title: "Departamento" };
  const desc = "promise" in d ? d.promise : d.tagline;
  return {
    title: d.name,
    description: typeof desc === "string" ? desc : brand.description,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) {
    const coming = comingSoonDepartments.find((d) => d.slug === slug);
    if (coming) return <ComingSoonPage department={coming} />;
    notFound();
  }

  const agent = getAgent(department.slug);

  return (
    <>
      <DepartmentHero department={department} />
      <AgentIntro id="agent-intro" department={department} agent={agent} />
      <DepartmentShowcase department={department} />
      <DepartmentProblems id="agent-problems" department={department} />
      <DepartmentMembers id="agent-members" department={department} />
      <DepartmentCapabilities id="agent-capabilities" department={department} />
      <DepartmentMission id="agent-mission" department={department} />
      <DepartmentOutput department={department} />
      <DepartmentPermissions id="agent-permissions" department={department} />
      <DepartmentWorkflow id="agent-workflow" department={department} />
      <DepartmentPricing id="agent-price" department={department} />
      <DepartmentFaq id="agent-faq" department={department} />
      <FinalCta />
      {agent && <DepartmentAgent agent={agent} />}
      <ProductJsonLd
        name={`${department.name} — DEPT.IA`}
        description={department.promise}
        price={department.priceFrom}
      />
      <FAQJsonLd items={department.faq} />
    </>
  );
}

function ComingSoonPage({ department }: { department: (typeof comingSoonDepartments)[number] }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="wide" className="relative flex min-h-[60vh] flex-col items-start justify-center py-32">
        <Eyebrow index="Próximamente">Catálogo</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
          {department.name}
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
          {department.tagline}
        </p>
        <p className="mt-3 max-w-xl text-[0.9375rem] text-muted">
          Estamos formando este equipo. Si quieres ser de las primeras empresas en tenerlo,
          déjanos tu contacto.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={`/contacto?departamento=${department.slug}`}
            variant="primary"
            size="lg"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            Apuntarme a la lista
          </Button>
          <Button href="/departamentos" variant="ghost" size="lg">
            Ver departamentos disponibles
          </Button>
        </div>
      </Container>
    </section>
  );
}

function DepartmentHero({ department }: { department: (typeof departments)[number] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background: `radial-gradient(ellipse, ${department.color.accent} 0%, transparent 60%)`,
        }}
        aria-hidden
      />
      <Container width="wide" className="relative py-20 sm:py-28">
        <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          <Link href="/departamentos" className="hover:text-foreground">
            Departamentos
          </Link>
          <span className="text-border-strong">/</span>
          <span className="text-foreground">{department.shortName}</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={`0${department.ordering}`}>{department.category}</Eyebrow>
            <h1 className="mt-6 text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
              {department.name}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed text-muted text-pretty">
              {department.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/registro"
                variant="primary"
                size="lg"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                Contratar este departamento
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                Ver demo del panel
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              <span>Desde {formatCurrency(department.priceFrom, department.priceCurrency)} / mes</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
              <span>Instancia privada</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
              <span>Web + Telegram</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <DepartmentImage
              src={department.assets?.hero ?? `/departments/${department.slug}/hero.png`}
              alt={`${department.name} — imagen editorial`}
              badge="Imagen editorial"
              ratio="video"
              priority
              caption="Sala de trabajo del departamento. Render editorial, 2K."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function AgentIntro({
  id,
  department,
  agent,
}: {
  id: string;
  department: (typeof departments)[number];
  agent: ReturnType<typeof getAgent>;
}) {
  if (!agent) return null;
  return (
    <section
      id={id}
      className="relative border-b border-border"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at top, ${agent.colorSoft} 0%, transparent 60%)`,
        }}
        aria-hidden
      />
      <Container width="wide" className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Tu director
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-balance text-foreground">
              {agent.name}, {agent.role.toLowerCase()}.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-foreground/85 text-pretty">
              {agent.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em]"
                style={{
                  borderColor: `${agent.color}40`,
                  background: agent.colorSoft,
                  color: agent.color,
                }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: agent.color }} />
                En línea
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                {agent.catchphrase}
              </span>
            </div>
            <p className="mt-6 text-[0.8125rem] text-muted">
              Pulsa la burbuja abajo a la derecha para abrir el panel y acompañarte por todo el
              departamento. Te explicaré cada sección en contexto.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#101210] to-[#080908] p-6 sm:p-8"
              style={{
                boxShadow: `0 0 0 1px ${agent.color}22`,
              }}
            >
              <div
                className="absolute -right-20 -top-20 h-40 w-40 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${agent.colorSoft} 0%, transparent 60%)`,
                }}
                aria-hidden
              />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                  <AgentAvatarInline agent={agent} size="md" />
                  <div>
                    <p
                      className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                      style={{ color: agent.color }}
                    >
                      {agent.role}
                    </p>
                    <p className="font-display text-[1.125rem] tracking-[-0.01em] text-foreground">
                      {agent.name}
                    </p>
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-foreground/90 text-pretty">
                  Te contaré qué hace cada miembro, cómo se coordinan y qué esperar cuando
                  contrates este equipo. Todo a tu ritmo, sin prisas.
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
                  {[
                    { k: agent.scripts.length, v: "Mensajes" },
                    { k: department.members.length, v: "Personas a cargo" },
                    { k: department.mission.tasks.length, v: "Tareas en la demo" },
                  ].map((stat) => (
                    <div key={stat.v}>
                      <p
                        className="font-display text-[1.5rem] tracking-[-0.02em]"
                        style={{ color: agent.color }}
                      >
                        {stat.k}
                      </p>
                      <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                        {stat.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AgentAvatarInline({
  agent,
  size = "md",
}: {
  agent: NonNullable<ReturnType<typeof getAgent>>;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-16 w-16" }[size];
  const iconSize = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-7 w-7" }[size];
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-[#0c0e0a] ${sizeClass}`}
      style={{ boxShadow: `0 0 0 1px ${agent.color}33, 0 0 24px ${agent.color}20` }}
      aria-hidden
    >
      <span className="relative z-10" style={{ color: agent.color }}>
        <Icon code={agent.icon} className={iconSize} strokeWidth={2} />
      </span>
    </div>
  );
}

function DepartmentShowcase({ department }: { department: (typeof departments)[number] }) {
  return (
    <section className="relative border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Demo
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Cómo trabaja este departamento
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              Una vista general del flujo operativo, las herramientas que usa y la cadencia con
              la que entrega resultados.
            </p>
          </div>
          <div className="lg:col-span-7">
            <VideoPlaceholder
              title={`${department.shortName} en acción`}
              subtitle="Demostración · 60 s"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentProblems({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Problemas que resuelve
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Lo que cambia cuando este equipo entra a trabajar.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:col-span-8 sm:grid-cols-3">
            {department.problems.map((p, i) => (
              <div
                key={p.title}
                className="rounded-xl border border-border bg-[#0c0e0a] p-5"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-medium text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentMembers({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Miembros
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Quién forma parte de este departamento
            </h2>
          </div>
          <p className="hidden text-[0.875rem] text-muted sm:block">
            {department.members.length} miembros · 1 dirección
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {department.members.map((m) => (
            <div
              key={m.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-[#0c0e0a] p-4"
            >
              <MemberPattern
                member={m}
                color={department.color.base}
                size="md"
                icon={AGENT_ICONS[department.slug]}
              />
              <div className="flex-1">
                <p className="text-[0.9375rem] font-medium text-foreground">{m.role}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  ID {m.id.toUpperCase()}
                </p>
                <ul className="mt-3 space-y-1.5 border-t border-border/60 pt-3">
                  {m.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-[0.8125rem] text-foreground/80"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: department.color.base }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Team image */}
        <div className="mt-8">
          <DepartmentImage
            src={department.assets?.team ?? `/departments/${department.slug}/team.png`}
            alt={`${department.name} — equipo en sesión`}
            badge="En sesión"
            ratio="photo"
            caption="El equipo colaborando en una sesión de trabajo. La dirección coordina, los miembros ejecutan."
          />
        </div>
      </Container>
    </section>
  );
}

function DepartmentCapabilities({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Capacidades
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Qué puede hacer este equipo
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              Una selección de las capacidades habituales. El alcance exacto se adapta a tu
              empresa durante el onboarding.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2 lg:col-span-7 sm:grid-cols-2">
            {department.capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-lg border border-border bg-[#0c0e0a] p-3.5"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-[0.875rem] text-foreground/90">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function DepartmentMission({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section
      id={id}
      className="border-b border-border bg-surface-soft/20"
    >
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Ejemplo de misión
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Una petición real y la respuesta del departamento
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-8">
            <div className="rounded-xl border border-border bg-[#0c0e0a] p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Tú
              </p>
              <p className="mt-2 text-[1.0625rem] text-foreground text-pretty">
                {department.mission.brief}
              </p>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: `${department.color.base}50`,
                background: `linear-gradient(180deg, ${department.color.accent} 0%, #0a0c08 100%)`,
              }}
            >
              <p
                className="font-mono text-[0.65rem] uppercase tracking-[0.16em]"
                style={{ color: department.color.base }}
              >
                {department.shortName}
              </p>
              <p className="mt-2 text-[1.0625rem] text-foreground text-pretty">
                {department.mission.response}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-[#0c0e0a] p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Tareas internas
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {department.mission.tasks.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-[0.875rem] text-foreground/80"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: department.color.base }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentOutput({ department }: { department: (typeof departments)[number] }) {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p
              className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
              style={{ color: department.color.base }}
            >
              Resultado
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Lo que el equipo entrega cuando termina una misión.
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              Cada ciclo termina con entregables tangibles: una campaña lanzada, deals cerrados,
              contenido publicado. No con PDFs que nadie abre.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {department.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-md border border-border bg-[#0c0e0a] p-3"
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {m.label}
                  </p>
                  <p
                    className="mt-1 font-display text-[1.25rem] tracking-[-0.02em]"
                    style={{ color: department.color.base }}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <DepartmentImage
              src={department.assets?.output ?? `/departments/${department.slug}/output.png`}
              alt={`${department.name} — output visualizado`}
              badge="Output"
              ratio="video"
              caption="Visualización editorial del output del departamento. Métricas, entregables, impacto."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentPermissions({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Permisos
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              La autonomía la decides tú
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              Estos son los permisos por defecto de este departamento. Puedes ajustarlos en
              cualquier momento desde el panel.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PermissionsBoardStatic />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentWorkflow({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Flujo de trabajo
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Cómo se activa este departamento
            </h2>
          </div>
        </div>
        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {department.workflow.map((step) => (
            <li
              key={step.number}
              className="rounded-xl border border-border bg-[#0c0e0a] p-5"
            >
              <span
                className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                style={{ color: department.color.base }}
              >
                {step.number}
              </span>
              <h3 className="mt-3 text-[1.0625rem] font-medium text-foreground">{step.title}</h3>
              <p className="mt-2 text-[0.875rem] text-muted text-pretty">{step.description}</p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                {step.duration}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function DepartmentPricing({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section
      id={id}
      className="border-b border-border bg-surface-soft/20"
    >
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Precio
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Un precio, sin extras ocultos
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              Este departamento puede incluirse en cualquiera de nuestros planes. En el Starter
              opera con su propio equipo, en el Business se coordina con otros.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-[#0c0e0a] p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Próximos pasos
              </p>
              <ul className="mt-3 space-y-2 text-[0.875rem] text-foreground/90">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  14 días para cancelar sin coste
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Cambio de plan en cualquier momento
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Exportación completa de datos al cancelar
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-[#0c0e0a] p-6 sm:p-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[3rem] tracking-[-0.02em] text-foreground">
                  {formatCurrency(department.priceFrom, department.priceCurrency)}
                </span>
                <span className="text-[0.9375rem] text-muted">/ mes</span>
              </div>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                IVA no incluido
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Instancia privada dedicada",
                  "Onboarding guiado",
                  `Integraciones: ${department.integrations.length} disponibles`,
                  "Panel web + Telegram",
                  "Borradores y aprobaciones",
                  "Informes operativos",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-[0.875rem] text-foreground/90"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/registro"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Contratar {department.shortName}
                </Button>
                <Button href="/precios" variant="ghost" size="lg">
                  Ver todos los planes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DepartmentFaq({
  id,
  department,
}: {
  id: string;
  department: (typeof departments)[number];
}) {
  return (
    <section id={id} className="border-b border-border">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Preguntas
            </p>
            <h2 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Sobre este departamento
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={department.faq} />
          </div>
        </div>
      </Container>
    </section>
  );
}
