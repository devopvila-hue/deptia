import type { Metadata } from "next";
import { DemoPanel } from "@/components/demo/demo-panel";
import { brand } from "@/config/brand";
import { assertLocalizedForRoute } from "@/i18n/guard";

export const metadata: Metadata = {
  title: "Demo del panel",
  description: "Vista previa del panel de control con datos de ejemplo. Recorre el departamento, las tareas, aprobaciones y resultados.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: `Demo del panel · ${brand.name}`,
    description: "Recorre un departamento con datos de ejemplo. Tareas, aprobaciones y resultados.",
    url: "/demo",
    type: "website",
  },
};

export default function DemoPage({ params }: { params: { locale: string } }) {
  assertLocalizedForRoute(params.locale, "/demo");
  return <DemoPanel />;
}
