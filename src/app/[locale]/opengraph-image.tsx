import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "DEPARTIFY — Siete departamentos. Un mismo rumbo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const symbol = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/departify-d-symbol.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 66px",
          background: "#0a0c08",
          color: "#f2f4e9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={symbol} width={65} height={65} alt="" />
          <span
            style={{ fontSize: 25, fontWeight: 600, letterSpacing: "0.16em" }}
          >
            DEPARTIFY
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.14em",
                color: "#a3af96",
              }}
            >
              SIETE DEPARTAMENTOS. UN MISMO RUMBO.
            </span>
            <span
              style={{
                fontSize: 78,
                letterSpacing: "-0.05em",
                lineHeight: 1.02,
              }}
            >
              Tu próximo gran paso.
            </span>
            <span
              style={{
                fontSize: 78,
                letterSpacing: "-0.05em",
                color: "#d8ff62",
                lineHeight: 1.02,
              }}
            >
              Con más equipo.
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2a3523",
            paddingTop: 24,
            fontSize: 15,
            color: "#a3af96",
          }}
        >
          <span>Tú decides. Departify trabaja.</span>
          <span>departify.app</span>
        </div>
      </div>
    ),
    size,
  );
}
