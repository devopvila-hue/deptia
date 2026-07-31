import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const DEPT_PAGES = [
  { name: "dept-marketing", path: "/departamentos/marketing" },
  { name: "dept-ventas", path: "/departamentos/ventas" },
  { name: "dept-contenido", path: "/departamentos/contenido" },
];

async function main() {
  const outDir = path.resolve("screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  for (const p of DEPT_PAGES) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();
    const url = `http://localhost:3000${p.path}`;
    process.stdout.write(`→ ${p.name}: ${url}\n`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: path.join(outDir, `${p.name}.png`),
        fullPage: true,
      });
      process.stdout.write(`  ✓ saved\n`);

      // Also open the agent panel and screenshot
      await page.click('button[aria-label*="Hablar con"]').catch(() => null);
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(outDir, `${p.name}-agent.png`),
        fullPage: false,
      });
      process.stdout.write(`  ✓ agent panel saved\n`);
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
