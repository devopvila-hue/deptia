import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon dinámico. Se sirve en /icon y reemplaza al /favicon.ico tradicional.
// Mantén sincronía con src/app/opengraph-image.tsx (colores + letter "D").
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d8ff62",
          color: "#0a0c08",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 6,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        D
      </div>
    ),
    { ...size }
  );
}
