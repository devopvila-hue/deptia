import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

// Vending Machine — smoke checks for the public landing.
// These were originally written against an older home copy; they now
// assert the actual sections/copy present after the SEO architecture
// sprint. The detailed SEO/JSON-LD coverage lives in seo-architecture.spec.ts.
test.describe("Vending Machine — Landing smoke", () => {
  test("Home muestra un H1 con promesa clara", async ({ page }) => {
    await page.goto(BASE);

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()) ?? "";
    // Promesa actual: Departamentos con IA que trabajan para tu empresa 24/7
    expect(text.toLowerCase()).toMatch(/departamentos con ia|trabajan para tu empresa|24\/7/);
    // Mensajes viejos prohibidos
    expect(text).not.toContain("Business Operating System");
    expect(text).not.toContain("Operating System");
  });

  test("Home expone confianza sin fricción y CTA de signup", async ({ page }) => {
    await page.goto(BASE);

    // Micro-confianza visible (sin tarjeta)
    await expect(page.getByText(/Sin tarjeta/i).first()).toBeVisible();

    // CTA principal → app.departify.app/signup
    const cta = page.getByRole("link", { name: /Crear mi equipo|Probar gratis/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /app\.departify\.app\/signup/);

    // CTA secundario → app.departify.app/login
    const signin = page.getByRole("link", { name: /Iniciar sesi[óo]n|Iniciar|Acceder/i }).first();
    await expect(signin).toHaveAttribute("href", /app\.departify\.app\/login/);
  });

  test("Home tiene una sección de FAQ visible", async ({ page }) => {
    await page.goto(BASE);

    // El título de la sección FAQ existe con su copy actual.
    await expect(page.getByText(/preguntas que nos hace/i)).toBeVisible();
  });

  test("Home no muestra 'departamentos disponibles' (catálogo completo)", async ({ page }) => {
    await page.goto(BASE);

    // El catálogo detallado vive en /departamentos, no en la home.
    const catalog = page.getByText(/departamentos disponibles/i);
    expect(await catalog.isVisible({ timeout: 1000 }).catch(() => false)).toBe(false);
  });
});
