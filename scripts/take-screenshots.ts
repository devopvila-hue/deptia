import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const PAGES: { name: string; path: string; viewport?: { width: number; height: number } }[] = [
  { name: "01-home", path: "/", viewport: { width: 1440, height: 900 } },
  { name: "01-home-mobile", path: "/", viewport: { width: 375, height: 812 } },
  { name: "02-departamentos", path: "/departamentos", viewport: { width: 1440, height: 900 } },
  { name: "03-departamento-marketing", path: "/departamentos/marketing", viewport: { width: 1440, height: 900 } },
  { name: "04-como-funciona", path: "/como-funciona", viewport: { width: 1440, height: 900 } },
  { name: "05-seguridad", path: "/seguridad", viewport: { width: 1440, height: 900 } },
  { name: "06-precios", path: "/precios", viewport: { width: 1440, height: 900 } },
  { name: "07-demo", path: "/demo", viewport: { width: 1440, height: 900 } },
  { name: "08-contacto", path: "/contacto", viewport: { width: 1440, height: 900 } },
  { name: "09-registro", path: "/registro", viewport: { width: 1440, height: 900 } },
  { name: "10-acceso", path: "/acceso", viewport: { width: 1440, height: 900 } },
];

async function main() {
  const outDir = path.resolve("screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  for (const p of PAGES) {
    const context = await browser.newContext({
      viewport: p.viewport ?? { width: 1440, height: 900 },
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    const url = `http://localhost:3000${p.path}`;
    process.stdout.write(`→ ${p.name}: ${url}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Wait a bit for animations
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(outDir, `${p.name}.png`),
        fullPage: true,
      });
      process.stdout.write(`  ✓ saved\n`);
    } catch (err) {
      process.stdout.write(`  ✗ ${(err as Error).message}\n`);
    }
    await context.close();
  }
  await browser.close();
  process.stdout.write("done\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
