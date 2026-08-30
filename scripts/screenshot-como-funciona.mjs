// Captura rápida del infographic /como-funciona en 3 viewports.
// Se usa para validar visualmente los cambios de copy (sin "skills") y los
// logos reales de las herramientas (sin dots de color).
import { chromium } from "@playwright/test";

const URL = process.env.URL ?? "http://localhost:3000/como-funciona";
const OUT = process.env.OUT ?? "/tmp/como-funciona-qa.png";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 1500 },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  for (const vp of viewports) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.screenshot({
      path: `${OUT.replace(/\.png$/, "")}-${vp.name}.png`,
      fullPage: true,
    });
    await page.close();
  }
  await browser.close();
  console.log("Screenshots written.");
})();
