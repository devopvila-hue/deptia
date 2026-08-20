import { ImageResponse } from "next/og";
import OpengraphImage from "./opengraph-image";

// Twitter hereda del mismo asset OG. Evita duplicar el renderer
// y garantiza que ambas redes sociales ven la misma imagen.
export const runtime = "edge";
export const alt = "Departify — Te devolvemos tiempo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return OpengraphImage();
}