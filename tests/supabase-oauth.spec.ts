import { test, expect } from "@playwright/test";

/**
 * Smoke tests para el flujo de Supabase OAuth (Google) en la landing.
 *
 * Cobertura:
 *  - El botón "Crear mi equipo" del header dispara OAuth cuando
 *    Supabase está configurado; cae al portal externo si no.
 *  - /acceso y /registro exponen un shell con botón Google + título
 *    Departify.
 *  - /auth/callback sin `code` redirige a /acceso (no rompe la UX).
 *
 * Estos tests asumen que Supabase NO está configurado en CI (es el
 * entorno por defecto del repo). Cuando el cliente Supabase esté
 * conectado, el helper cae al fallback externo y los botones siguen
 * siendo clickeables.
 */
test.describe("Supabase OAuth (Google) — landing", () => {
  test("Header expone dos botones con el logo de Google", async ({ page }) => {
    await page.goto("/");
    const signIn = page.getByRole("button", { name: /Acceder/i }).first();
    const create = page.getByRole("button", { name: /Crear mi equipo/i }).first();
    await expect(signIn).toBeVisible();
    await expect(create).toBeVisible();
    // El SVG inline del logo de Google (cuatro paths).
    await expect(signIn.locator("svg")).toHaveCount(1);
    await expect(create.locator("svg")).toHaveCount(1);
  });

  test("Hero expone el CTA principal con Google OAuth", async ({ page }) => {
    await page.goto("/");
    // El CTA principal del hero: "Crear mi equipo" / "Probar gratis"
    const cta = page.locator("section").first().getByRole("button").first();
    await expect(cta).toBeVisible();
    await expect(cta.locator("svg")).toHaveCount(1);
  });

  test("/acceso sirve una página Departify con botón Google", async ({ page }) => {
    const response = await page.goto("/acceso");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Departify/);
    // El shell muestra el BrandMark y un botón "Continuar con Google".
    await expect(page.getByRole("button", { name: /Continuar con Google/i })).toBeVisible();
  });

  test("/registro sirve una página Departify con botón Google", async ({ page }) => {
    const response = await page.goto("/registro");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Departify/);
    await expect(page.getByRole("button", { name: /Continuar con Google/i })).toBeVisible();
  });

  test("/auth/callback sin código redirige a /acceso", async ({ page, request }) => {
    // 307 desde el route handler cuando falta `code`.
    const res = await request.get("/auth/callback", { maxRedirects: 0 });
    expect([302, 307]).toContain(res.status());
    // Después de seguir el redirect, aterrizamos en /acceso.
    const redirected = await request.get("/auth/callback");
    expect(redirected.url()).toMatch(/\/acceso(\?|$)/);
  });

  test("robots.txt sigue bloqueando /acceso y /registro", async ({ request }) => {
    const res = await request.get("/robots.txt");
    const txt = await res.text();
    expect(txt).toMatch(/Disallow:\s*\/acceso/);
    expect(txt).toMatch(/Disallow:\s*\/registro/);
  });
});
