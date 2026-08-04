// La landing NO registra usuarios. Cualquier visita a /registro es un
// puente SEO-friendly hacia el Portal real. Devuelve HTTP 307 nativo.
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect("https://app.departify.app/signup", {
    status: 307,
  });
}