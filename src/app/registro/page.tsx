/**
 * /registro — Entrada canónica a "Crear mi equipo".
 *
 * Antes: redirigía a app.departify.app/signup (portal externo).
 * Ahora: dispara Supabase OAuth (Google) directamente desde la landing.
 */
import type { Metadata } from "next";
import { RegistroClient } from "./registro-client";

export const metadata: Metadata = {
  title: "Crear mi equipo — Departify",
  description: "Crea tu cuenta en Departify con Google y empieza en minutos.",
  robots: { index: false, follow: false },
};

export default function RegistroPage() {
  return <RegistroClient />;
}

