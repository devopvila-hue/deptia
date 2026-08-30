/**
 * /acceso — Entrada canónica a "Iniciar sesión".
 *
 * Antes: redirigía a app.departify.app/login (portal externo).
 * Ahora: dispara Supabase OAuth (Google) directamente desde la landing.
 *
 * Auto-redirect al provider en cuanto el cliente monta; si JS está
 * deshabilitado o Supabase no está configurado, mostramos un botón
 * de fallback al portal externo.
 */
import type { Metadata } from "next";
import { AccesoClient } from "./acceso-client";

export const metadata: Metadata = {
  title: "Acceder — Departify",
  description: "Inicia sesión en Departify con tu cuenta de Google.",
  robots: { index: false, follow: false },
};

export default function AccesoPage() {
  return <AccesoClient />;
}

