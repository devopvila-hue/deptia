import { ImageResponse } from "next/og";
import type { departments } from "@/data/departments";
import { getDepartment, departments as allDepartments } from "@/data/departments";
import { brand } from "@/config/brand";

export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const d = getDepartment(slug);
  if (!d) return [];
  return [
    {
      id: slug,
      alt: `${d.name} · ${brand.name}`,
      contentType: "image/png",
      size,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const d = getDepartment(slug);
  if (!d) {
    return new ImageResponse(<Fallback />, size);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#080908",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(201,169,97,0.08), transparent 60%)",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#F5F2EA",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 2,
            color: "#A8A39A",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <span>{brand.name}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#C9A961",
                display: "flex",
              }}
            />
            DEPARTAMENTO
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#C9A961",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            {d.slug}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 16,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {d.name}
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#D9D4C9",
            marginTop: 32,
            maxWidth: 950,
            display: "flex",
          }}
        >
          {d.tagline}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid #1F1E1B",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#6B6864",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            {brand.url}/departamentos/{d.slug}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#A8A39A",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {allDepartments.length} departamentos · IA operada
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function Fallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#080908",
        color: "#F5F2EA",
        fontSize: 48,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {brand.name}
    </div>
  );
}

export type { departments };
