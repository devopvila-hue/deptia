import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/departamentos",
  "/departamentos/marketing",
  "/departamentos/ventas",
  "/departamentos/contenido",
  "/departamentos/operaciones",
  "/departamentos/atencion-cliente",
  "/departamentos/seo",
  "/departamentos/administracion",
  "/departamentos/rrhh",
  "/departamentos/logistica",
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
    expect(ogTitle).toContain("Deptify");
  });

  test("JSON-LD Organization presente en home", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.some((s) => s.includes("Organization"))).toBe(true);
  });

  test("Department page tiene metadata propia", async ({ page }) => {
    await page.goto("/departamentos/marketing");
    const title = await page.title();
    expect(title).toContain("Marketing");
    expect(title).toContain("Deptify");
  });

  test("Sitemap.xml accesible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("deptify.com");
  });
});

test.describe("Header y navegación", () => {
  test("Header contiene logo y links principales", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /DEPT\.IA — Inicio/ })).toBeVisible();
    await expect(page.getByRole("link", { name: "Precios" }).first()).toBeVisible();
  });

  test("Botón 'Crear mi equipo' apunta a /registro", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Crear mi equipo/i }).first();
    await expect(cta).toHaveAttribute("href", "/registro");
  });

  test("Menú desplegable desktop de Departamentos se muestra en hover", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /Departamentos/i }).first();
    await expect(trigger).toBeVisible();
    await trigger.hover();
    // El dropdown aparece con todos los departamentos
    await expect(page.getByRole("menu")).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Marketing/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Operaciones/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /SEO/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Recursos Humanos/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Log[íi]stica/i })).toBeVisible();
  });
});

test.describe("Departamentos", () => {
  test("Catálogo muestra 7 departamentos sin etiqueta 'Próximamente'", async ({ page }) => {
    await page.goto("/departamentos");
    await expect(page.getByText(/Departamento de Marketing/)).toBeVisible();
    await expect(page.getByText(/Departamento de Operaciones/)).toBeVisible();
    await expect(page.getByText(/Departamento de Atención al Cliente/)).toBeVisible();
    await expect(page.getByText(/Departamento SEO/)).toBeVisible();
    await expect(page.getByText(/Departamento Administrativo/)).toBeVisible();
    await expect(page.getByText(/Recursos Humanos/)).toBeVisible();
    await expect(page.getByText(/Log[íi]stica/)).toBeVisible();
    // Aseguramos que ningún departamento aparece como "Próximamente" / "En preparación"
    const comingSoon = page.getByText(/Próximamente|En preparación/i);
    expect(await comingSoon.count()).toBe(0);
  });

  test("Cada landing de departamento renderiza secciones clave", async ({ page }) => {
    await page.goto("/departamentos/operaciones");
    await expect(page.getByRole("heading", { name: /Operaciones/ })).toBeVisible();
    await expect(page.getByText(/Aitor/)).toBeVisible();
    await expect(page.getByText(/Capacidades/i)).toBeVisible();
    await expect(page.getByText(/Permisos/i)).toBeVisible();
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
