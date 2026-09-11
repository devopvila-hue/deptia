/* eslint-disable @next/next/no-img-element -- ImageResponse requires a native image node. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default async function Icon() {
  const symbol = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/departify-d-symbol.png"))).toString("base64")}`;
  return new ImageResponse(
    <img src={symbol} width={64} height={64} alt="" />,
    size,
  );
}
