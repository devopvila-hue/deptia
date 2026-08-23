import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Colores sincronizados con tailwind.config.ts y globals.css.
  // No importamos CSS aquí: ImageResponse se renderiza en edge y solo
  // acepta estilos inline. Mantener sincronía manual.
  const BG = "#080908";
  const FG = "#f5f5f4";
  const MUTED = "#a1a1aa";
  const ACCENT = "#d8ff62";
  const BORDER = "rgba(255,255,255,0.08)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          color: FG,
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(216,255,98,0.10), transparent 40%), radial-gradient(circle at 100% 100%, rgba(216,255,98,0.06), transparent 50%)",
        }}
      >
        {/* Top: marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0c08",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {brand.name}
          </div>
        </div>

        {/* Centro: titular */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 600,
            }}
          >
            {brand.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: MUTED,
              maxWidth: 820,
            }}
          >
            Departamentos que conocen tu empresa, trabajan con tus herramientas y se ocupan
            de tareas que hoy dependen de ti.
          </div>
        </div>

        {/* Bottom: dominio + claim */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 24,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{brand.domain}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ display: "flex", color: ACCENT }}>●</span>
            <span style={{ display: "flex" }}>Tú decides qué delegar</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}