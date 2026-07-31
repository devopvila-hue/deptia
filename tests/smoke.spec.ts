import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/departamentos",
  "/departamentos/marketing",
  "/departamentos/ventas",
  "/departamentos/contenido",
  "/como-funciona",
  "/seguridad",
  "/precios",
  "/demo",
  "/contacto",
  "/acceso",
  "/registro",
  "/recursos",
  "/privacidad",
  "/terminos",
  "/cookies",
];

test.describe("Smoke tests — todas las rutas", () => {
  for (const path of ROUTES) {
    test(`GET ${path} → 200 + título correcto`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} status`).toBe(200);
      await expect(page).toHaveTitle(/DEPT\.IA/);
    });
  }
});

test.describe("SEO", () => {
  test("Home tiene meta description", async ({ page }) => {
    await page.goto("/");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(20);
  });

  test("Open Graph configurado", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).toContain("DEPT.IA");
  });

  test("JSON-LD Organization presente en home", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.some((s) => s.includes("Organization"))).toBe(true);
  });

  test("Sitemap.xml accesible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("dept.ia");
  });
});

test.describe("Header y navegación", () => {
  test("Header contiene logo y links principales", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /DEPT\.IA — Inicio/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "Departamentos" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Precios" }).first()).toBeVisible();
  });

  test("Botón 'Crear mi equipo' apunta a /registro", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Crear mi equipo/i }).first();
    await expect(cta).toHaveAttribute("href", "/registro");
  });
});

test.describe("Accesibilidad básica", () => {
  test("Skip link al contenido principal", async ({ page }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: /Saltar al contenido principal/ });
    await expect(skip).toHaveCount(1);
  });

  test("html[lang]", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toMatch(/es/);
  });
});
