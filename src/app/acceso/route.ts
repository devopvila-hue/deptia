// La landing NO autentica. Cualquier visita a /acceso es un puente
// SEO-friendly hacia el Portal real. Devuelve HTTP 307 nativo.
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect("https://app.departify.app/login", {
    status: 307,
  });
}