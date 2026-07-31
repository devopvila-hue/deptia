import type { Metadata } from "next";
import { DemoPanel } from "@/components/demo/demo-panel";

export const metadata: Metadata = {
  title: "Demo del panel",
  description: "Vista previa del panel de control con datos de ejemplo. Recorre el departamento, las tareas, aprobaciones y resultados.",
};

export default function DemoPage() {
  return <DemoPanel />;
}
